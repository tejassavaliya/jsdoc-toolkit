## The @class Tag ##

Like the [@constructor](TagConstructor.md) tag, the @class tag marks a function as being a constructor, but this tag also allows you to add a description of the class, rather than dscribe the constructor function.

### Syntax ###
```
@class description
```

  * description - Optional: the description of the class.

### Examples ###

In this example there are two descriptions. The first description is untagged and describes the constructor function. The second description is part of the `@class` tag, and is used to describe the entire `Person` class. In addition, because of the presence of the `@class` tag, the function is also marked as being a constructor.

```
/**
    Creates a new Person.
    @class Represents a person. 
 */ 
Person = function() {
}
```

### See Also ###
  * The [@constructor](TagConstructor.md) tag.