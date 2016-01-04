## The @name Tag ##

In most cases JsDoc Toolkit can determine the namepath of an object for you. This is a great convenience because it allows you to shorten your documentation comments to just the minimum information you wish to add. However, when it isn't clear you can provide the namepath yourself by using the `@name` tag.

Be warned though, by using the `@name` tag you are telling JsDoc Toolkit to ignore the surrounding code and to treat your documentation comment in isolation. This can be a powerful technique because it allows you to write documentation for objects that are not visible in the code itself (or are obscure for some reason).

### Syntax ###

```
@name theNamepath
```

  * theNamepath - Required: the namepath you wish to use, ignoring the surrounding code.

### Example ###

```
/**
 * @name hiliteSearchTerm
 * @function
 */
eval("window.hiliteSearchTerm = function(term) {};")

```

Without the `@name` tag, the `hiliteSearchTerm` function would be invisible to JsDoc Toolkit. That's because it never tries to run your code, and can't parse strings the way `eval` would.

Note that the `@function` tag was also required, and in many cases the `@memberOf` tag would be needed as well. Essentially this technique requires that you explicitly document _all_ of the information about an object, and so can be very verbose. Luckily, most of the time, it isn't needed as JsDoc Toolkit can determine all such information automatically for you.

### Warning ###

As mentioned, using the `@name` tag essentially isolates your documentation comment from the code. This usually gives you the result you expect, because this tag is only ever required when JsDoc Toolkit can't automatically find the necessary information in the code already.

However, JsDoc Toolkit can be run so that it documents uncommented objects (using the `-a` commandline option to run JsDoc Toolkit). So when you use the `@name` tag in places where JsDoc Toolkit _can_ determine the namepath of an object on its own there may be a conflict.

```
/** @name Foo */
Bar = function() {
}
```

In this case, if you use the `-a` option, you end up with _two_ objects in your documentation: the `Foo` object and the `Bar` function. That may be exactly what you intend, but you may be confused if you thought (incorrectly) that `@name` would force the Bar function to be treated as if it were named "Foo" -- it doesn't.

### See Also ###

  * the [@function](TagFunction.md) tag.
  * the [@memberOf](TagMemberOf.md) tag.
