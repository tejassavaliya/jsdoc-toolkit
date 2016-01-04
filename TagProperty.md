## The @property Tag ##

JsDoc Toolkit treats "properties" and "methods" slightly differently (defining a "method" in this case as a member variable that appears in the source code referring to a function). This based on the premise that methods are often more important to an API than properties. For example, using the `-a` option only affects undocumented _methods_. Non-function members, on the other hand, are only ever documented if you write doc comments for them.

You can add individual doc comments next to each property declaration, but the `@property` tag gives you a quick way to document properties in the same doc comment where the class is documented.

### Syntax ###

```
@property {propertyType} propertyName propertyDescription
```

  * propertyType - Optional: the expected type of the property.
  * propertyName - Required: the name of the property
  * propertyDescription - Optional: a description associated with the property.
  * _Note: the syntax of this tag is nearly identical to the `@param` tag._

### Example ###

_In this example, the `id` property will not appear in the documentation, even with the `-a` option on._
```
/**
 * @class
 */
function Person(id) {
    this.id = id;
}
```

_Adding a doc comment means the `id` property will appear in the documentation._
```
/**
 * @class
 */
function Person(id) {
    /**
     * The id of the person.
     * @type number
     */
    this.id = id;
}
```

_The `@property` tag accomplishes the same thing, with a more compact syntax._
```
/**
 * @class
 * @property {number} id The id of the person.
 */
function Person(id) {
    this.id = id;
}
```

You never have to use the `@property` tag, but it can result in cleaner looking doc comments.

### See Also ###

  * the [@class](TagClass.md) tag.
  * the [@param](TagParam.md) tag.
