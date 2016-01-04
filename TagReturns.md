## The @returns Tag ##

The `@returns` tag documents the value returned by a function or method.

### Syntax ###

```
@returns {returnType} returnDescription
```

  * returnType - Optional: the type of the return value.
  * returnDescription - Optional: any additional description.

### Example ###
```
/** 
 * @returns {Array} Lines from the file.
 */
function readLines(filepath) {
}
```