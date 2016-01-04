# How do I document <some pattern>? #

## Prototype Library-Based Classes ##
### Class Pattern ###
```
var MyClass = Class.create(
  /** @lends MyClass# */
  {
    /**
     * Description of constructor.
     * @class Description of class.
     * @constructs
     */
    initialize: function(arg0, arg1) {
      //...
    },

    /** A method. */
    myFunc: function() {},
    
    /** An instance field. */
    myVar: 123
  }
);

// ... and if you want to add class fields ...

Object.extend(MyClass,
  /** @lends MyClass */
  {
    /** A class method. */
    classFunc: function() {}
  }
);
```

### Sub-class Pattern ###
```
/**
 * @class
 */
var MySuper = Class.create(
  /** @lends MySuper.prototype */
  {
    /** A method of the superclass. */
    superMethod: function() {
      // ...
    }
});

/**
 * Class description
 * @class
 * @augments MySuper
 */
var MyClass = Class.create(MySuper,
  /** @lends MyClass# */
  {
    /** A method of the  subclass. */
    myMethod: function() {
      // ...
    }
  }
);

```

### Mixin Pattern ###
```
// Here's how to define a mixin API
/**
 * Document Observable class here
 * @class
 */
var Observable =
 /**
  * This is an API that can be mixed into other objects
  * @lends Observable#
  */
 {
  observe: function(callback) {
    //...
  },
  notify: function(event) {
    //...
  }
 };

// Now let's mix the API into a class ...

/**
 * MyClass.prototype gets the Observable API
 * @class
 * @borrows Observable#observe as #observe
 * @borrows Observable#notify as #notify
 */
var MyClass = function() {
  //...
}
MyClass.addMethods(Observable);
```

### Extends Pattern ###
This is similar to the Mixin pattern, except it operates on individual instances of objects, not classes
```
var Slideable = 
/** @lends Slideable */
{
  /**
    @class API for enabling a "slide" effect on a DOM element
    @constructs
  */
  extend: function(anElement) {
    Object.extend(anElement, this._methods);
  },

  
  _methods: 
  /** @lends Slideable# */
  {
    /** Start the slide. */
    startSlide: function() {
    },
    /** Stop the slide. */
    stopSlide: function() {
    },
  }
}


// Now Make an element slideable
Slideable.extend(document.getElementById('slider'));
```