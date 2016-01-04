# JsPlate Introduction #

JsPlate is a JavaScript-based templating system. This system is used by JsDoc Toolkit to format the documentation information it parses out of your source files into published output, such as HTML web pages or XML documents.

# Overview #

As JsDoc Toolkit uses them, a "template" is a directory containing the following files:

  * publish.js
  * <JsPlate template file/s>
  * <any other file/s>

### publish.js ###
The publish.js file is required. It defines and controls the process of publishing a collection of input and output files. Using JsDoc Toolkit you may have many input files, and these may be combined or split in various ways into a complete package of output files.

### JsPlate Files ###
A template file defines how to format some data into a particular kind of output file. It contains formatting instructions written in the JsPlate microlanguage, a very simple template language that will be demonstrated below.

### Other Files ###
Other files you might include could be static resources like images, stylesheets, or whatever else you want to be part of your final published output.

The expectation is that all output files will be saved to or copied over to a single output directory. By convention, the default name of this directory is "js\_docs\_out" but you can provide any name you prefer using the `-d=some/other/dir/` command line option.

# publish.js In Detail #

To create a JsPlate template you first create a folder. The name of that folder is the name of the template. For example, if you wanted to create a template called "mytmp" you would start with an empty folder named "mytmp". Within your new template folder you must now create a file named `publish.js`. A very minimal publish.js file might look like this:

```
function publish(fileGroup, context) {
}
```

As you can see, there is one function defined in the `publish.js` file: In the `publish` function you can add any code you like to handle the main publishing work. JsDoc Toolkit will pass in a fileGroup object along with the commandline options you provided when you invoked the application.

A fileGroup has a property called `files` that contains information about every file the parser scanned. You can iterate over that to get information about each file.

```
function publish(fileGroup, context) {
	var file_template = new JsPlate(context.t+"file.tmpl");

	for (var i = 0; i < fileGroup.files.length; i++) {
		var output = template.process(fileGroup.files[i]);
	}
}
```


# JsPlate In Detail #

The JsPlate micro-language really is "micro" -- it has exactly four syntax constructs. The first two are tags:

  * `<for>...</for>` - loops over objects in an array or named in an object.
  * `<if>...</if>` - conditionally renders some content based on a test.

Additionally there are two field specifiers.

  * `{+foo+}` - inserts the value in the foo variable into the template output.
  * `{!doSomething();!}` - evaluates the JavaScript code.

The content of a `{+ ... +}` doesn't have to be static, for example you can insert the current date into the output like so: `{+ new Date() +}`. Similarly, notice that  `{+ foo +}` is really just a nicer way of saying: `{! output += foo; !}` -- you can manipulate `output` directly from within `{! ... !}` if you want. Comments can be added using the `{# this is ignored #}` syntax.

## for Loops ##

The `for` mark-up tag lets you loop over all the items stored in an array or stored in an object as properties. For example, assume that `data.things` is an array. To render a list of the things in your output, you could do the following:

```
<ul>
<for each="thing" in="data.things">
	<li>{+thing+}</li>
</for>
</ul>
```


This would work exactly the same if you were accessing all the _values_ stored in an object: if `data.things` were set to {Sue: "red", Bob: "blue"} the above code would print the values like so:

```
<ul>

	<li>red</li>
	<li>blue</li>

</ul>
```

If you were only interested in outputting the keys, not the values, you could use the built-in `keys` function like so:

```
<ul>
<for each="thing" in="keys(data.things)">
	<li>{+thing+}</li>
</for>
</ul>
```

Which would yield:
```
<ul>

	<li>Sue</li>
	<li>Bob</li>

</ul>
```

And, since the `in` attribute can take any JavaScript as it's value you can get sorted keys like so.

```
<ul>
<for each="thing" in="keys(data.things).sort()">
	<li>{+thing+}</li>
</for>
</ul>
```

Which would yield:
```
<ul>

	<li>Bob</li>
	<li>Sue</li>

</ul>
```

If you wanted both the keys and values you can use the special key varaible that exists within each `for` loop. If the value is assigned to "foo" the key would be available as "$foo\_key" like so:

```
<ul>
<for each="thing" in="data.things">
	<li>{+$thing_key+": "+thing+}</li>
</for>
</ul>
```

Resulting in:

```
<ul>

	<li>Bob: blue</li>
	<li>Sue: red</li>

</ul>
```

Using another special variable you can get the numeric index of a `for` loop. If the value is assigned to "foo" the numeric key would be available as "$foo\_i" like so:

```
<ul>
<for each="thing" in="data.things">
	<li>{+$thing_i+": "+thing+}</li>
</for>
</ul>
```

Resulting in:

```
<ul>

	<li>0: blue</li>
	<li>1: red</li>

</ul>
```

Finally, within a `for` loop there is a way to detect if you are on the last iteration. If the value is assigned to "foo" the boolean that indicates the last loop will be available as "$foo\_last" like so:

```
<ul>
<for each="thing" in="data.things">
	<li>{+thing+}</li>
	<if test="!$thing_last">...</if>
</for>
</ul>
```

Resulting in:

```
<ul>

	<li>blue</li>
	...
	<li>red</li>

</ul>
```
## if Blocks ##

The `if` mark-up allows you conditionally output some text or field based on a test.

```
<if test="thing=='Bob'">
	<em>The Best</em>
</if>
```

Would only add "The Best" to the output when the `thing` was "Bob." You can of course nest `for` and `if` as much as you need, perhaps only looping in certain conditions, or only doing certain things for certain loop iterations.

```
<if test="thing=='Bob'">
	<em>The Best</em>
<else />
	<em>meh!</em>
</if>
```

# Creating Output Files #

## Saving Generated Output To Files ##

From within your `publish.js` file you can save the your template output to files using the `IO.saveFile` function.

```
function publish(fileGroup, context) {
	var file_template = new JsPlate(context.t+"file.tmpl");

	for (var i = 0; i < fileGroup.files.length; i++) {
		var output = template.process(fileGroup.files[i]);
		IO.saveFile(context.d, "docs"+i+".htm", output);
	}
}
```

The `IO.saveFile` function takes an output directory as it's first argument, and this will automatically be set on the `context` based on what output directory you specified on the command line when you executed JsDoc Toolkit.

## Copying Static Files To The Output Directory ##

From within your `publish.js` file you can copy files from the template directory into the output directory using the `IO.copyFile` function. For example if you had a static css file that you wanted copied into the output directory, you could do this:

```
	IO.copyFile(context.t+"mystyle.css", context.d);
```
