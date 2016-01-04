## Meta Tags ##

A special syntax provides processing instructions to JsDoc Toolkit. Any doc comment starting with the characters `/**#` is treated as a "meta tag."

### Tag Sharing ###

The tag sharing instruction allows you to apply a set of tags to a whole range of variables being documented in your code.

#### Syntax ####
```
/**#@+
 * anyTags
 */
```

  * anyTags - Required: any group of tags you wish to share.
  * Note: The affect of this instruction is in force until the end of the file or the next `/**#@-*/` doc comment is encountered.

#### Example ####

The tags in the tag sharing instruction will be applied to all of these functions.

```
/**#@+
   @private
   @memberOf Foo
*/

function baz() {}
function zop() {}
function pez() {}

/**#@-*/
```

In this example all three functions will be documented as private members of Foo. This syntax is more compact and convenient than creating three identical doc comments.

### Making Code Invisible ###

The nocode meta tag tells the JsDoc Toolkit parser to completely ignore the source code while it is in effect. This is the same as turning the -n commandline option on temporarily.

#### Syntax ####
```
/**#nocode+*/
```

  * Note: The affect of this instruction is in force until the end of the file or the next `/**#nocode-*/` doc comment is encountered.