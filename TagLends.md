## The @lends Tag ##

The `@lends` tag allows you to document all the members of an anonymous object literal as if they were members of an object with the given name. You might want to do this if you were passing an anonymous object literal into a function that creates a named class from its members.

### Syntax ###
```
@lends symbolAlias
```

  * symbolAlias - Required: the full namepath to the object you are lending methods and properties to.
  * Note: The doc comment containing the `@lends` tag must immediately precede an object literal in your code.

### Example ###

In this example we want to use a helper function to make a class named "Person," along with instance methods named "initialize" and "say." This is similar to how some popular frameworks handle class creation.

```
// we want to document this as being a class
var Person = makeClass(
    // we want to document these as being methods
    {
        initialize: function(name) {
            this.name = name;
        },
        say: function(message) {
            return this.name + " says: " + message;
        }
    }
);
```

Without any doc comments JsDoc Toolkit won't automatically recognize either a class named "Person" nor it's two methods. To document the methods we must use a "@lends" tag in a doc comment immediately before the object literal to tell JsDoc Toolkit that all the member names of that object literal are being "lent" to a variable named "Person."

```
/** @class */
var Person = makeClass(
    /** @lends Person */
    {
        initialize: function(name) {
            this.name = name;
        },
        say: function(message) {
            return this.name + " says: " + message;
        }
    }
);
```

Now the functions named "initialize" and "say" will be documented, but they appear as static methods of an class named "Person." That is possibly what you meant, but in this case we want "initialize" and "say" to belong to the _instances_ of the "Person" class. So we change things slightly by lending the methods to the class's prototype:

```
/** @class */
var Person = makeClass(
    /** @lends Person.prototype */
    {
        initialize: function(name) {
            this.name = name;
        },
        say: function(message) {
            return this.name + " says: " + message;
        }
    }
);
```

If you are using one of the lent functions to construct the class, you can mark it as such using the `@constructs` tag, but remember to remove the @class tag in that case, or else two @classes will be documented.

```
var Person = makeClass(
    /**
      @lends Person.prototype
    */
    {
        /** @constructs */
        initialize: function(name) {
            this.name = name;
        },
        say: function(message) {
            return this.name + " says: " + message;
        }
    }
);
```

## See Also ##
  * The [@borrows](TagBorrows.md) tag.
  * The [@constructs](TagConstructs.md) tag.
