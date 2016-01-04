## The @throws Tag ##

The `@throws` tag allows you to document the exception a function might throw.

### Syntax ###

```
@throws {exceptionType} exceptionDescription
```

  * exceptionType - Optional: the type of exception this function might throw.
  * exceptionDescription - Optional: any additional description.

### Example ###
```
/** 
 * @throws {OutOfMemeory} If the file is too big.
 */
function processFile(path) {

}
```