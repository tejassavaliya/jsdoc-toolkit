## The @requires Tag ##

The `@requires` tag allows you to document a resource that is needed to use this code.

### Syntax ###

```
@requires requireDescription
```

  * requireDescription - Required: the name or description of the required resource.

### Example ###

```
/**
 * @requires ColorPicker
 */
function chooseColor() {
}
```
