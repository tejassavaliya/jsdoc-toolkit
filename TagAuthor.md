## The @author Tag ##

The `@author` tag allows you to document the author of the code for a constructor, a method, or property.

### Syntax ###

```
@author authorDescription
```

  * authorDescription - Required: any information you wish to provide about the author, typically name and email address.

### Example ###

```
/**
 * @author <a href="mailto:micmath@gmail.com">Michael Mathews</a>
 */
```

Multiple author tags are allowed in one documentation comment if you wish. Note: that using HTML tags in the text of any tag is always allowed, but is only useful if your documentation is formatted as HTML.