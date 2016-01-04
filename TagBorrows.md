## The @borrows Tag ##

The `@borrows` tag documents that this class has a method or property originally documented in another class.

### Syntax ###

```
@borrows otherMemberName as thisMemberName
```

  * otherMemberName - Required: the namepath to the other member.
  * thisMemberName - Required: the new name that the member is being assigned to in this class.

### Example ###

```
/** @constructor */
function Remote() {
}

/** Connect to a remote address. */
Remote.prototype.transfer = function(address, data) {
}

/**
 * @constructor
 * @borrows Remote#transfer as this.send
 */
function SpecialWriter() {
    this.send = Remote.prototype.transfer;
}
```

Any documentation for `Remote#transfer` will also appear as documentation for `SpecialWriter#send`.

### See Also ###

  * The [@augments](TagAugments.md) tag.
  * The [@lends](TagLends.md) tag.