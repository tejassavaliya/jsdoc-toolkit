## The {@link} Tag ##

The `{@link}` tag allows you to create a HTML link to some other documented symbol from within the text of any tag's description.

### Syntax ###

```
@anyTag This is some text {@link otherSymbol}.
```

  * anyTag - Can be any other tag.
  * otherSymbol - Required: the namepath to the symbol you wish to link to.

### Example ###

```
/**
 * This is similar to a {@link Printer} object but can also print to files.
 */
function Writer() {
}
```

Note that JsDoc Toolkit will automatically calculate where the documentation for `Printer` is and build the HTML link for you.

### See Also ###

  * While the @link tag works like the [@see](TagSee.md) tag, it actually isn't allowed in that particular tag.