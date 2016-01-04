# The @param Tag #

The param tag allows you to document information about the parameters to a function (such as constructors and methods).

## Syntax ##

```
@param {paramType} paramName paramDescription
```

  * paramType - Optional: the expected type of the parameter.
  * paramName - Required: the name of the parameter
  * paramDescription - Optional: a description associated with the parameter.

## Examples ##

```
/**
 * @param userName The name of the user.
 */
 function logIn(userName) {
 	// ...
 }
```

### Basic ###

It is not technically required for you to use the @param tag since JsDoc Toolkit will parse your function declarations and automatically find the parameter names for you. However it is useful to use @param tags to provide type information, and descriptive text.

The most basic @param documentation simply provides the name of the parameter. This should match the parameter name in the function source code.

```
/**
 * @param userName
 */
 function logIn(userName) {
 	// ...
 }
```

### Parameter Type Information ###

Use curly-braces around the expected type of the parameter to document this information.

```
 /**
  * @param {String} userName
  */
 function logIn(userName) {
 	// ...
 }
```

Use a pipe symbol to document that multiple types are permitted.

```
 /**
  * @param {String|Number} product
  */
```

Use the `[]` notation after a type to indicate an array of those types.

```
 /**
  * @param {String[]} aliases
  */
```

### Optional Parameters ###

> Use square brackets around the parameter name to indicate that it is optional.

```
 /**
  * @param {String} userName The user name to use when logging in.
  * @param {String} [accessLevel] The user accessLevel is optional.
  */
 function logIn(userName, accessLevel) {
 	// ...
 }
```

### Parameters With Default Values ###

> A parameter that can have a default value must be optional, so use square brackets around the parameter name to indicate that it is optional. Add an equals sign immediately after the parameter name to provide information about the default value. Note that the string you give for the default value is literally displayed in the documentation (any JavaScript you put there will not be evaluated).

```
 /**
  * @param {String} userName The user name to use when logging in.
  * @param {String} [accessLevel="author"] The user accessLevel is optional.
  */
 function logIn(userName, accessLevel) {
 	// ...
 }
```

### Parameters With Properties ###

> If a parameter is expected to have a particular property, you can document that immediately after the `@param` tag for that parameter, like so:

```
 /**
  * @param userInfo Information about the user.
  * @param userInfo.name The name of the user.
  * @param userInfo.email The email of the user.
  */
 function logIn(userInfo) {
 	doLogIn(userInfo.name, userInfo.email);
 }
```

## See Also ##

  * How to document parameters using [Inline Documentation](InlineDocs.md)