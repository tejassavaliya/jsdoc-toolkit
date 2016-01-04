## The @public Tag ##

The `@public` indicates that an inner variable should be documented as if it were public.

### Syntax ###

```
@public
```

### Example ###

```
/**
 * @constructor
 */
function Foo() {
    /**@public*/
    function inner() {
    }
}
```

In the above example the inner function will appear as if it were a public member of Foo (an instance member by default). Use the `@static` tag to indicate that the inner function should be documented as a public static member.

### See Also ###

  * The [@private](TagPrivate.md) tag.
  * The [@static](TagStatic.md) tag.

