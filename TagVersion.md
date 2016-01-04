## The @version Tag ##

The `@version` tag allows you to mark documented code with a version number or information about the version.

### Syntax ###

```
@version versionDescription
```
  * versionDescription - Required: a description of what version this code is

### Example ###

```
/**
 * @class
 * @version 2001 beta release
 */
function Hal() {
    this.sing = function(song) {
    }
}
```

### See Also ###
  * The [@since](TagSince.md) tag.
