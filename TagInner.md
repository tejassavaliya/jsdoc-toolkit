## The @inner Tag ##

Use the @inner tag to indicate the function is an inner function. Inner functions are declared in the scope of an outer function, and are not directly accessible from outside that outer function.

### Syntax ###
```
@inner
```

### Examples ###

In many cases this tag is not neccessary, as JsDoc Toolkit can already recognize the fact that a function is an inner function on its own.

```
/**
    @constructor
 */ 
Person = function() {
    /** @inner */
    function daydream() {
    }
}
```

Because of the limited scope of the Person function, the daydream function is not directly accessible from outside of Person. For this reason JsDoc Toolkit will also mark it as `@private`.

### See Also ###
  * The [@private](TagPrivate.md) tag.