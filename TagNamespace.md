## The @namespace Tag ##

The namespace tag allows you to document an object that is being used as a "namespace" to keep a collection of properties and methods under a single global name.

### Syntax ###
```
@namespace description
```

  * description - Optional: a description of this namespace.

### Example ###

_In this example the `load` function will appear as a member of `Extensions.PluginManager`._
```
/**
    @namespace Holds functionality related to running plugins.
*/
Extensions.PluginManager = {
}

Extensions.PluginManager.load(plugin) {
}
```

In documentation a namespace should be treated like a static "class" -- it has no constructor -- similar to the built-in `Math` object in JavaScript. Namespaces should be listed among any other classes, but should not show any constructor in its documentation.