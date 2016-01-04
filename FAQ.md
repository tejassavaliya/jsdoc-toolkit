# Answers to frequently asked questions #

**The information here applies to Version 2 of JsDoc Toolkit.**

## I want to know about... ##
  * [Documenting the module pattern](FAQ#Documenting_the_module_pattern.md)
  * [Defining my own variables from the command line](FAQ#Defining_my_own_variables_from_the_command_line.md)
  * [Using custom tags](FAQ#Using_custom_tags.md)
  * [Making better templates](FAQ#Making_better_templates.md)
  * [How to get JsDoc Toolkit to work with my code](FAQ#How_to_get_JsDoc_Toolkit_to_work_with_my_code.md)
  * [How this project is related to JSDoc](FAQ#How_this_project_is_related_to_JSDoc.md)

## Documenting the module pattern ##

_Use options:_ -p

```
/** @namespace */
YOOHOO.myProject.myModule = function () {
	/** @private */
	var myPrivateVar = "";

	/** @private */
	var myPrivateMethod = function () {
	}

	/** @scope YOOHOO.myProject.myModule */
	return  {
		/** describe myPublicProperty here */
		myPublicProperty: "",
		
		/** describe myPublicMethod here */
		myPublicMethod: function () {
		}
	};
}();
```

## Defining my own variables from the command line ##

Use the `-D` command line option to define one or more variables.

```
-D="status:Beta" -D="milestone:112"
```

These values can then be accessed in your template, like so:

```
<i>Project release status is {+ JSDOC.opt.D.status +}, milestone {+ JSDOC.opt.D.milestone +}.</i>
```

To produce this output: _Project release status is Beta, milestone 112._

## Using custom tags ##

In this example we invent an arbitrary tag named "hilite" to indicate that the documentation should be displayed in a bright color.

```
/**
    Reverse the order of the letters in a string.
    @hilite orange
 */
function reverse(str) {
}
```

In your template you can then access that tag like so:

```
{!
    if (data.comment.getTag("hilite").length) {
        output += 'style="color: '+data.comment.getTag("hilite")[0]+'"';
    }
!}
```

To produce this output: style="color: orange"

## Making better templates ##

The architecture of JsDoc Toolkit was built around the idea of templates for a very good reason: you are meant to use them. A great deal of work has gone into separating out the template code and designing a simple templating language in order to encourage this to happen.

Traditionally the JSDoc output has tried to look like JavaDoc but I've moved away from that. Now the template that is included with the standard distribution is purposely generic and is meant to be a starting point for you to create your own customized output.

## How to get JsDoc Toolkit to work with my code ##

JsDoc Toolkit can be used to document **any** JavaScript code. In fact even if your source files contain no JavaScript whatsoever, or nothing but strings of random gibberish, JsDoc Toolkit can still be used to produce an entire website full of accurate API documentation.

But most people who ask this question mean something slightly different; they mean, "why can't I get JsDoc Toolkit's _static code analysis features_ to work with my code?"

It is true that in some common cases JsDoc Toolkit can generate API docs from source code, even with no doc comments. For example, if you wrote the following, and used the `-a` command line option, JsDoc Toolkit could document the function for you:

```
function helloWorld() {
    alert("Hello World.")
}
```

But because JavaScript is so flexible it is easy to write code that cannot be usefully analyzed from the source. For example, just by looking at the following code, would you document `greeting` as a function or as a boolean?

```
var now = new Date();
	
/** Give some seasonal cheer. */
var greeting = (now.getMonth()+1 == 12 && now.getDate() == 25) ?
    function () { alert("Merry Christmas."); }
    :
    false;
	
if (greeting) { greeting(); }
```

Rewriting that code would make the answer more obvious:

```
/** Give some seasonal cheer. */
function greeting() { alert("Merry Christmas."); }
	
var now = new Date();
if (now.getMonth()+1 == 12 && now.getDate() == 25) {
    greeting();
}
```

The rewritten code does exactly the same thing as the original, but now JsDoc Toolkit can more accurately guess that `greeting` should be documented as a function.

### But wait, it gets better ###

Even in obvious cases it can be a hit-or-miss proposition to let JsDoc Toolkit guess how to document your code, so there is a simple solution: just tell it. In every case it is always possible to explain exactly what you mean in your doc comments, even if your source code is completely indecipherable. To be certain you can even use the `-n` command line option to tell JsDoc Toolkit to ignore your source code completely. In that case you would provide all the documentation yourself, like so:

```
/**
    Give some seasonal cheer.
    @name greeting
    @function
 */
it.doesnt(matter, whats, here); // because it's ignored.
```

This will generate exactly the same documentation as the examples in the previous section, and you can write your code in any style you wish.

## How this project is related to JSDoc ##

The term JsDoc refers to the JavaDoc-like syntax used to write inline documentation comments in JavaScript, so one answer is that JsDoc Toolkit uses the JsDoc syntax. There are other applications which also use the JsDoc syntax.

But most people, when they say "JSDoc," are referring to the Perl-based project by that name hosted on Sourceforge. JsDoc Toolkit is related to that project because they were both created by the same developer: Michael Mathews.

_Michael writes..._
The original project was first released in 2001 but had been in private use at the company I worked at before that. About a year after JSDoc was publicly released Gabriel Reid took over the project and has done an outstanding job of maintaining, supporting and extending JSDoc.pm ever since. I am extremely grateful for Gabriel's contributions to JSDoc and he certainly deserves front-and-center mention in any credit listing.

But sometime in 2006 I became concerned that the basic architecture of JSDoc.pm was preventing it from keeping up with the renaissance that JavaScript had undergone, so I started working on what later became a total rewrite. Gabriel, along with many others participated in the initial discussions of this rewrite, but Gabriel declined to join the active development.