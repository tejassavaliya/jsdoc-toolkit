## The @memberOf Tag ##

The `@memberOf` tag allows you to document what you consider the "parent" or container of an object to be.

### Syntax ###

```
@memberOf parentNamepath
```

  * parentNamepath - Required: the namepath of the containing object.

### Example ###

```
var Tools = {};

/** @namespace */
Tools.Dom = {};

/** @memberOf Tools.Dom */
var hiliteSearchTerm = function(term) {
}

Tools.Dom.highlightSearchTerm = hiliteSearchTerm;
```

Without the `@memberOf` tag, the `hiliteSearchTerm` function would be documented as a global function. That's because, in fact, it is a global function, but it is also a member of the `Tools.Dom` namespace as well, and that's how you wish to document it.

### Note ###

By default, as in the above example, the member is documented as static. If you want to document a member as belonging to an instance, or to the prototype, adjust the namespace like so:

```
@memberOf Tools.Dom#
```

or

```
@memberOf Tools.Dom.prototype
```


### In Addition ###

There are two tags that act as if they are combined with `@memberOf`:

  * @methodOf - is a shorter synonym for `@function` plus `@memberOf`
  * @fieldOf - is a shorter synonym for `@field` plus `@memberOf`

### See Also ###

  * the [@name](TagName.md) tag.