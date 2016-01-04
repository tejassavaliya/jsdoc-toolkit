This tag is available as of release 2.1.

## The @event Tag ##

The `@event` tag allows you to document a function that can be fired when an event of the same name occurs.

### Syntax ###

```
@event
```
  * The syntax of this tag is identical to the @function tag.

### Example ###

You can simply tag a normal function as being an event.

```
/**
 * @event
 * @param {Boolean} clockwise
 */
Cocktail.prototype.stir = function(clockwise) {
}
```

Or, you can use a named doclet without refering to any function in your code.

```
/**
 * @name Cocktail#shake
 * @event
 * @param {MyEventObject} e
 * @param {Boolean} [e.withIce=false]
 */
```


### Referring to Events ###

Note that, by using the named doclet method illustrated above, it is possible to have a method and an event that both have the same name. In order to disambiguate which symbol you are referring to (either the method or the event) the namepath of the event has a prefix of "event:" inserted into it.

So when you need to refer to an event by it's namepath the name should be written as event:name.

```
/**
 * @constructor
 * @borrows Cocktail#event:shake as this.event:shake
 */
function MilkShake() {
}
```

### See Also ###
  * The [@function](TagFunction.md) tag.
  * NamePaths