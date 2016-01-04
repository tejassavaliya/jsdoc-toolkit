## The @constructs Tag ##

When using the `@lends` tag, the `@constructs` tag allows you to document that a particular function will be used to construct instances of the class.

### Syntax ###
```
@constructs
```

### Example ###

```
var Person = makeClass(
    /**
      @lends Person.prototype
    */
    {
        /** @constructs */
        initialize: function(name) {
            this.name = name;
        },
        say: function(message) {
            return this.name + " says: " + message;
        }
    }
);
```

Note: that when using this tag you should not also use the `@constructor` or `@class` to document the class in another doclet, all documentation for the class should go in the `@constructs` doc comment instead.

## See Also ##
  * The [@lends](TagLends.md) tag.