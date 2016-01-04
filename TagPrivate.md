## The @private Tag ##

The `@private` indicates that an object is not meant for general use.

### Syntax ###

```
@private
```

### Example ###

```
/**
 * @private
 * @constructor
 */
function Foo() {
    function inner() {
    }
    
    this.notPrivate = function() {
    }
}
```

This example illustrates the fact that the "private" status is not passed on to member objects: in this case the `Foo` object is private, but the member named `notPrivate` isn't. In addition the member `inner` is automatically marked as private, because of the fact that it's an inner function.

Note: objects marked as `@private` are not included in the output documentation by default. Using the `-p` commandline option you can indicate that you wish for private symbols to be documented.

Also, objects that have no JsDoc comments at all are, be default, not included in the output documentation either. In the above example `inner` and `notPrivate` will not be documented without the `-a` or `-A` commandline option.

### See Also ###

  * The [@public](TagPublic.md) tag can force inner functions to be documented as if they weren't private.


