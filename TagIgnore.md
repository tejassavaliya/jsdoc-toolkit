## The @ignore Tag ##

The `@ignore` tag tells JsDoc Toolkit to exclude an object in your code from the documentation, when it otherwise would be documented. This tag tags precedence over any other mechanism, and guarantess that an ignored ogject will not be documented.

### Syntax ###

```
@ignore
```

### Example ###

```
/**
 * @constructor
 * @ignore
 */
function Foo() {
    this.bar = function() {
    }
}
```

Note that in this example, both `Foo` and `bar` will be excluded from the documentation; when a parent object is ignored, all of its members are also ignored.