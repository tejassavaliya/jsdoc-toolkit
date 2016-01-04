## The @constructor Tag ##

The @constructor tag marks an function as being a constructor, meant to be called with the `new` keyword to return an instance.

### Syntax ###
```
@constructor
```

### Examples ###

```
/**
    Creates a new Person.
    @constructor 
*/ 
Person = function() {
}

var p = new Person();
```

### See Also ###
  * The [@class](TagClass.md) tag can also be used to mark a function as being a constructor.
  * The [@constructs](TagConstructs.md) tag can be used in combination with the [@lends](TagLends.md) tag.