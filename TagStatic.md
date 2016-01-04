## The @static Tag ##

The `@static` tag indicate that accessing the documented variable does not require instantiation of its parent or containing object.

### Syntax ###

```
@static
```

### Example ###

```
Hello = {}

/**
 * @static
 */
Hello.World = function() {
    alert("Hello world");
}
```

In this case you are documenting that the `World` function is a static method of the `Hello` object. In most cases the JsDoc Toolkit parser can determine that fact on its own, but this tag may rarely be required when it can't.

### See Also ###
  * The [@namespace](TagNamespace.md) tag is used to document that a variable is meant to be used like a "namespace" with static properties.