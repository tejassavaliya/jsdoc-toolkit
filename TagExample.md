## The @example Tag ##

The `@example` tag allows you to provide a snippet of code that illustrates the usage of a constructor, a function (or method) or a variable.

### Syntax ###

```
@example snippet
```

  * snippet - Required: a snippet of code that illustrates usage.
  * Multiple `@example` tags are allowed.

### Example ###

```
/**
 * @example
 * var bleeper = makeBleep(3);
 * bleeper.flop();
 */
```

### Note ###

The @example tag is not intended to be used to generate "inline" examples, if
you want this, you need to do it via HTML markup embedded within a @description
block, using the `<code>` tag, for example.