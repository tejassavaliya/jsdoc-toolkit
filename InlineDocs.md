## Using Inline Doc Comments ##

It is possible to add documentation to a function (including a constructor or method) to indicate its parameter type(s) and its return type, using special inline doc comments. For example, consider the following example:

```
/**
    @param {String} name
    @type Array
*/
function getPerson(name) {
}
```

The above example could be written using inline doc comments instead, like so:

```
function getPerson(/**String*/ name) /**Array*/ {
}
```

Multiple parameter comments are allowed:

```
function getPerson(/**String*/ name, /**City*/ birthplace) {
}
```

If you have a standard doc comment that refers to parameters, the type information from the inline comment will be merged with it.

```
/**
    @param name The name of the person.
 */
function getPerson(/**String*/ name) {
}
```

If you provide type information in _both_ the standard comment and the inline comment, the type information in the standard comment will take precedence over the inline comment.

```
/**
    @param {NameObject} name The name of the person.
 */
function getPerson(/**String*/ name) {
}
```

## See Also ##
  * The [@param](TagParam.md) tag.