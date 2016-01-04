## The @see Tag ##

The `@see` tag allows you to refer to another symbol or resource that may be related to the one being documented.

### Syntax ###

```
@see seeDescription
```

  * seeDescription - Required: a description of a resource to refer to for more information.

### Example ###

If the first word is a documented symbol then that will become a link to the documentation, otherwise the text is displayed exactly as entered (meaning @link tags will not be rendered).

```
/**
 * @see ClassName#methodName
 * @see The <a href="http://www.example.com">Example Project</a>.
 */
```

### See Also ###

  * The [@link](TagLink.md) tag can be used to duplicate the behavior of @see outside of the @see tag.