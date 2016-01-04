## The @exports Tag (available since 2.2.0) ##

The `@exports` tag allows you to document any symbol as if it were a different symbol with a different name. This might be useful if you were using an alias to another symbol in your code but wanted to document that alias under the original name.

### Syntax ###

```
@exports codedName as documentedName
```

  * codedName - Required: the name you are using in your code.
  * documentedName - Required: the name you want to appear in the documentation.

### Example ###

```
/** @namespace */
var mxn = {};

(function() { 
    /** @exports Map as mxn.Map */
    var Map =
        /** @constructor */
        mxn.Map = function() {
        };
    
    /** This will be documented as a method of mxn.Map. */
    Map.prototype.doThings = function() {
    };
})();
```

Multiple exports tags are allowed in one documentation comment. It is a good idea, but not required, to put the documentation comment adjacent to the code where the alias is created.