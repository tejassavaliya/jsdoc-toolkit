## The @augments Tag ##

The `@augments` tag indicates that the class being documented extends another class and adds methods or properties of its own. It is a synonym for the `@extends` tag.

### Syntax ###

```
@augments otherClass
```

  * otherClass - Required: the namepath to the class this one augments.

### Example ###

```
/**
 * @constructor
 */
function GeneralWriter() {
}

/**
 * @constructor
 * @augments GeneralWriter
 */
function SpecialWriter() {
}
```

In the documentation for `SpecialWriter` any methods and properties of `GeneralWriter` will appear as inherited members of `SpecialWriter`.

### See Also ###

  * The [@borrows](TagBorrows.md) tag.
  * The [@lends](TagLends.md) tag.