# Functions #

  * Use the `-a` option to cause all functions and their parameters appear in your output.

```
function recast(employeeId, newRole) {
}

refresh = function(record) {
}
```

  * Alternatively add a description to the function. Documented functions always appear in the output, even without the `-a` option.

```
/** Change the role of the employee. */
function recast(employeeId, newRole) {
}
```

# Parameters #

  * Add the @param tag to your comment to document parameter. It takes the form `{type} name description`.

```
/**
 * Change the role of the employee.
 * @param {integer} employeeId The id of the employee.
 * @param {string} [newRole] The new role of the employee.
 */
function recast(employeeId, newRole) {
}
```

_Note:_ That the parameter `newRole` is surrounded by square-brackets to indicate it is optional.

If a parameter is expected to have a certain named property, you can document that with the `@config` tag, so-called because it is useful for functions (and constructors) that are designed to receive a configuration object.

```
/**
 * Modify the details of the employee.
 * @param {object} employee The employee.
 * @param {integer} newDetails
 * @config {string} [title] The new job title.
 * @config {number} [salary] The new salary.
 */
function modify(employee, newDetails) {
    if (newDetails.title != undefined)  employee.title = newDetails.title;
    if (newDetails.salary != undefined) employee.salary = newDetails.salary;
}
```

# Nested Functions #

  * Use the `-a` option to cause all nested functions and their parameters appear in your output.

```
record = {
    remove: function() {
    }
};

record.refresh = function(record) {
}
```

  * Optionally add a description to the nested function.

```
record = {
    /** Remove the record. */
    remove: function() {
    }
};
```

  * Works for arbitrarily deeply nested functions too.

```
record = {
    row: {
         field: {
            /** Remove the record. */
            remove: function() {
            }
        }
    }
};
```

# Underscored Functions #

  * The `-a` option will generally cause all functions to appear in your output, but a special exception is made for functions named with a leading underscore. By convention an underscored name means a function is for internal use only, therefore not part of the public API. If you wish **all** functions, even underscored functions, to appear in your output use the `-A` option instead.
  * Documented functions and objects (those that have valid doc comments preceding them) will always appear in your output, regardless of any option. (See the `@ignore` tag to override this behavior.)

```
function _peek(record) {
}
```

# Ignoring Functions #

  * To force a function to be ignored, when it would otherwise appear in the output, use the `@ignore` tag.

```
/** @ignore */
function hide(file) {
}
```

# Constructors #

  * Use the `@constructor` tag to indicate a function is a constructor.

```
/** @constructor */
function RecordSet() {
}
```

  * Optionally add a description to the constructor.

```
/**
 * A collection of records.
 * @constructor
 */
function RecordSet() {
}
```

# Methods #

  * Use the `-a` option to have all nested functions, including methods, and their parameters appear in your output.

```
/** @constructor */
function RecordSet() {
    this.getRecords = function(){
    }
}
```

  * Optionally add a description to the method.

```
/** @constructor */
function RecordSet() {
    /** Get all the records. */
    this.getRecords = function(){
    }
}
```

# Properties #

  * The `-a` option does not apply to properties. Only documented properties (those that have valid doc comments preceding them) will appear in the output.

```
/** @constructor */
function RecordSet(id) {
    /** The record set's id number */
    this.id = id;
}
```

  * Optionally add more information about the property.

```
/** @constructor */
function RecordSet(id) {
    /**
     * The record set's id number.
     * @type number
     */
    this.id = id;
}
```

  * Or you can briefly describe the property in the constructor's comment instead.

```
/**
 * @constructor
 * @property {number} id The record set's id number.
 */
function RecordSet(id) {
    this.id = id;
}
```

# Properties that are Methods #

  * In practice a "method" is just a property whose value is set to a function. Because JavaScript does not enforce types it's possible to set a property to either a function or non-function at any time. In cases where it isn't obvious from the source code what a property is going to be set to, use the `@function` tag to make it clear.

```
/** @constructor */
function RecordSet(f) {
    /** @function */
    this.write = f;
}
```

# Variables #

  * The `-a` option does not apply to variables. Only documented variables (those that have valid doc comments preceding them) will appear in the output.

```
/** The maximum number of records. */
var LIMIT = 99;
```

  * The same if the value is an object literal, or one of the nested values.

```
/** The maximum number of records. */
var CONFIG = {
    defaults: {
        /** The default format. */
        format: "XML"
    }
};
```

# File Overview #

  * You can create a doc comment that applies to the _entire file_ by using the `@fileOverview` tag.
  * The human-readable name of the library can be set by using the `@name` tag. This name will be used in index listings, otherwise the filename will be used.

```
/**
 * @fileOverview A collection of functions for records.
 * @name Record Keeper
 */
 
/** 
 * Gets the current record. 
 */
function getRecord(){
}
```

# Virtual Objects #

  * In some cases you want to document an object that either isn't in the source code, or is written in a way that can't be recognized by the JsDoc parser. Use the `@name` tag to provide the name of the object.
  * Note that this technique will _force_ the comment to be treated separately from the code around it. So, even if there is a recognizable function after the comment, that function will not be treated as connected to the comment in any way.

```
/**
 * The file index.
 * @name fileIndex
 */
```

  * You can add other tags, just like an ordinary doc comment. If the thing you are documenting is a function add the `@function` tag, if it is a constructor add the `@constructor` tag. If neither of these are found it will be assumed to be an object (variable).

```
/**
 * A file indexer.
 * @name Indexer
 * @constructor
 */
```

  * If the virtual object is a method it must be tagged with `@function` and additionally a `@memberOf` tag, indicating the name of the parent object.

```
/**
 * Get the file's index.
 * @name getIndex
 * @function
 * @memberOf Indexer
 */
```

# Augmenting Other Classes #

  * If you have a constructor A that inherits methods from another constructor B, you would say that A "augments" B, by adding additional functionality to it.
  * To indicate this relationship in your documentation use the `@augments` tag.
  * The `@extends` tag is a synonym for `@augments`.

```
/**
 * @constructor
 */
function Filebox() {
    this.add = function() {
    }
    this.remove = function() {
    }
}

SecureFilebox.prototype = new Filebox();
SecureFilebox.prototype.constructor = SecureFilebox;

/**
 * @constructor 
 * @augments Filebox
 */
function SecureFilebox() {
    this.shred = function() {
    }
}
```

# Inheriting Some Methods of Another Class #
  * If you have a constructor that only inherits one or some methods from another constructor, then use the `@inherits` tag to indicate which specific methods are inherited.
  * This is a more specific form of the `@augments` tag. Whereas `@augments` indicates that **all** methods are inherited, the `@inherits` tag indicates **one** method is inherited.

```
/**
 * @constructor
 */
function SafeDispose() {
}
SafeDispose.prototype.burn = function() {};
SafeDispose.prototype.smash = function() {};

/**
 * @constructor 
 * @inherits SafeDispose.burn
 */
function SecureFile() {
}
SecureFile.prototype.shred = function() {};
SecureFile.prototype.burn = SafeDispose.prototype.burn;
```

# Changing Scope #

  * In complex cases it can be impossible for the JsDoc parser to determine the scope and thus the full name of object properties and methods. In these cases the `@scope` tag tells the parser what the parent-scope is of a property or method.
  * The `@scope` tag _must_ immediately precede the opening of an object literal. Within that object definition all properties will be the applied to the given containing scope.

```
framework.addTo(
    "FileWatcher.Widget",
    /** @scope FileWatcher.Widget */
    {
        /** Set up the widget. */
        initialize: function(container, args) {
        }
    }
);
```

  * In the above example the parser will find a function named: `FileWatcher.Widget.initialize`. Note that this presumes you've already documented the parent object `FileWatcher.Widget` elsewhere.
  * You can also use the scope of an object's prototype.

```
Builder.make(
    "Sorter",
    /** @scope Sorter.prototype */
    {
        /** Register a sorting function. */
        register: function(f) {
        }
    }
);

// will be treated by JsDoc Toolkit as if you'd written...
function Sorter() {
    this.register = function(f) {
    }
}
```

  * A different example of using this technique...

```
var Record = function() {
    return /** @scope Record */ {
        getRecord: function() {}
    };
}();
```

# Creating Namespace #

  * You might use an object literal as a "namespace" to hold member objects together, like a collection of similar methods and properties. Use the `@namespace` tag to describe this.
  * When using the "sunny" template, a namespace is treated as a static class, a class that cannot be constructed by the user.

```

/**
 @namespace Holds all Filebox functionality.
*/
Filebox = {
    lookup: function() {
    },
    add: function() {
    },
    remove: function() {
    }
}
```

# Shared Doclets #

  * Sometimes you want to apply one or more tags to lots of doclets. You could cut and paste the tags into every doclet but that is tedious and bloats your file with repeated information. Use a "shared doclet" to accomplish this more efficiently.
  * Any tags in a doclet that begins with the special series of characters: "#@+" will be shared with every subsequent doclet until the end of the file or a doclet that contains "#@-" is encountered.

```
/**#@+
  @private
  @memberOf RecordSet
*/

/** Is the recordset locked? */
var locked = false;

/** 
  Destroy a particular record.
  @param id The id of the record to destroy.
*/
function shred(id) {}

/**#@-*/
```

Is the same as writing:

```
/**
  Is the recordset locked?
  @private
  @memberOf RecordSet
*/
var locked = false;

/** 
  Destroy a particular record.
  @param id The id of the record to destroy.
  @private
  @memberOf RecordSet
*/
function shred(id) {}
```