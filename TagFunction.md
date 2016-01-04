## The @function Tag ##

The `@function` tag allows you to force JsDoc Toolkit to document an object as if it were a function, even though it may not appear to be one to the parser.

### Syntax ###

```
@function
```

### Example ###

```
/**
 * @function
 */
var paginate = paginateFactory(pages);
```

Without the `@function` tag, the `paginate` object would be documented as generic object, because it isn't possible to tell from examining the line of code what type of value `paginate` will hold when it is run.

### See Also ###

  * The [@field](TagField.md) tag.