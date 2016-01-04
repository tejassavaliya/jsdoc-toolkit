## The @default Tag ##

The `@default` tag allows you to document the default value of an object, including fields of classes.

### Syntax ###

```
@default valueDescription
```

  * valueDescription - Required: a description of the default value.

### Example ###

```
/** @constructor */
function Page(title) {
    /**
     * @default "Undefined"
     */
     this.title = title || "Undefined";
}
```

The `@default` tag is only recognized when applied to objects, it is not meaningful to use it with functions.

### See Also ###

  * The [@type](TagType.md) tag can be used to document the type of an object's value, or the type of a value returned by a function. Contrast this with `@default` which documents what the actual default value is.