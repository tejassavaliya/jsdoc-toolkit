## Namepaths ##

When referring to a JavaScript variable that is elsewhere in your documentation, you must provide a unique identifier that maps to that variable. A namepath provides a way to do so and disambiguate between instance members, static members and inner variables.

### Syntax ###
```
myFunction
MyConstructor
MyConstructor#instancMember
MyConstructor.staticMember
MyConstructor-innerMember
```

### Example ###

The example below shows: an _instance_ method named "say," an _inner_ function also named "say," and a _static_ method also named "say." These are three distinct methods that all exist independently of one another.

```
/** @constructor */
Person = function() {
    this.say = function() {
        return "I'm an instance.";
    }
    
    function say() {
        return "I'm inner.";
    }
}
Person.say = function() {
    return "I'm static.";
}

var p = new Person();
p.say();      // I'm an instance.
Person.say(); // I'm static.
// there is no way to directly access the inner function from here
```

You would use three different namepath syntaxes to refer to the three different methods:

```
Person#say  // the instance method named "say."
Person.say  // the static method named "say."
Person-say  // the inner method named "say."
```

You might wonder why there is a syntax to refer to an inner method when that method isn't directly accessible from outside the function it is defined in. While that is true, and thus the "-" syntax is rarely used, it _is_ possible to return a reference to an inner method from another method inside that container, so it is possible that some object elsewhere in your code might borrow an inner method.

Note that if a constructor has an instance member that is also a constructor, you can simply chain the namepaths together to form a longer namepath:

```
/** @constructor */
Person = function() {
    /** @constructor */
    this.Idea = function() {
        this.consider = function(){
            return "hmmm";
        }
    }
}

var p = new Person();
var i = new p.Idea();
i.consider();
```

In this case, to refer to the method named "consider," you would use the following namepath:

```
Person#Idea#consider
```

This chaining can be used with any combination of the connecting symbols: # . -