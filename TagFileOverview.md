## The @fileOverview Tag ##

The `@fileOverview` tag allows you to provide documentation for an entire file.

### Syntax ###

```
@fileOverview fileDescription
otherTags
```

  * fileDescription - Required: a description of the file.
  * otherTags - Currently the following are supported: `@author`, `@version`.
  * Note: There should only be one doc comment in a file with the `@fileOverview` tag.

### Example ###

```
/**
 * @fileOverview This file has functions related to documenting JavaScript.
 * @author <a href="mailto:micmath@gmail.com">Michael Mathews</a>
 * @version 1.0.1
 */
```
