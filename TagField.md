## The @field Tag ##

The `@field` tag allows you to force JsDoc Toolkit to document an object as if it were a non-function, even though it may not appear to be one to the parser.

### Syntax ###

```
@field
```

### Example ###

```
/**
 * @field
 */
var pages = function(){
}
```

Without the `@field` tag, the `pages` object would be documented as function.

### See Also ###

  * The [@function](TagFunction.md) tag.
