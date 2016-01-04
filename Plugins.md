# Introduction #

New in Version 2 of JsDoc Toolkit is the ability to add your own functionality into the core processing of your source code (before it is ever sent to your template). This can be a convenient and portable way to change the way JsDoc Toolkit works to suit your own needs.

## It's Easy ##

The interface was designed to be simple. If you are using a plugin, installing it is as easy as saving the plugin file to the `app/plugins directory` - that's it. The plugin will automatically be loaded and used for you.

## API ##

Writing a plugin is also simple. The first step is to create a new text file; you can name it whatever you like. The contents of that plugin file should follow this pattern:

```
JSDOC.PluginManager.registerPlugin(
    "JSDOC.myPluginName",
    {
        onSymbol: function(symbol) {
            // modify properties of the symbol here
        }
    }
);
```

The call to `JSDOC.PluginManager.registerPlugin` takes two arguments:

  * **yourPluginName** - can be any string you wish, but must be unique among all the plugins being used at any given time: it acts as a registy name for your particular plugin. The dot pattern in the example is just a naming convention, it doesn't refer to any actual code object, I could have just as easily named it "JSDOC-myPluginName" or any other name for that matter.
  * **functionMap** - an object literal that maps events in the JsDoc Toolkit process model to a handler function that will be executed each time that event happens. In the example I bind a handler to the `onSymbol` event. That means that every time JsDoc Toolkit creates a `Symbol` instance the associated function will be called.

## Creating a Function Map ##

The function map binds JsDoc Toolkit events to functions that will be called when those events occur. In the API example the event names is `onSymbol` which means that whenever a `Symbol` instance is created the function will be called. The argument to that function will be the newly created `Symbol` instance. You can record, modify, add or delete any symbol property within your handler function.

The names of events currently supported by the JSDOC.PluginManager are...

  * onSymbol - fired every time a new code symbol is created. The handler will be passed a `symbol` argument.
  * onDocCommentSrc - fired every time comment is found in your source code. The handler will be passed a `comment` argument. You can modify the `comment.src` property of this argument to affect the raw source code of the comment.
  * onDocCommentTags -
  * onDocTagSynonym -
  * onDocTag -
  * onInit -
  * onFunctionCall -