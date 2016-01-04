## Creating Templates fo JsDoc Toolkit ##

This refers to version 2.0 and later.

JsDoc Toolkit uses it's own templating system to format the output of your documentation, called "JsPlates". The standard template that comes with the JsDoc Toolkit distribution is named simply "JsDoc". Using this guide you should be able to modify that template to be more like what you want, or to write your own.

### The publish.js file ###

At it's most basic the concept of a "template" is just a folder. That folder is named with any arbitrary identifier you wish, and inside that folder is at least one file, which must be named "publish.js". The publish.js file must define at least one function, which must be named `publish()`.

```
// in templates/myCoolTemplate/publish.js
function publish(SymbolSet) {
}
```

Whatever else you define in that file, or whatever other files you include in the folder is completely up to you, but you must at least have publish.js.

### The publish() method ###

You'll notice from the previous example that the `publish()` function has a formal parameter declared, name `SymbolSet`. This is not strictly required, but is recommended as a convention. In fact your publish method will be automatically called by JsDoc Toolkit when all the source files have been parsed. That parsing results in a single object of type `JsDoc.SymbolSet` being created, which is then passed into your publish function. The idea is that your publish function will contain some code to process the symbols in the SymbolSet, creating output files as it does.

### Using the SymbolSet Object ###

`JsDoc.SymbolSet`s are new in Version 2.0 and are intended to allow relationships between symbols to be resolved , even across file boundaries. Most of the SymbolSet functionality is not important to template writers, at this stage they merely act as a a collection of Symbols. There are however 2 methods that are very useful:

```
function publish(SymbolSet) {
    // get an array of all the symbols in your source code
    var allSymbols = SymbolSet.toArray();

    // get a particular symbol, by it's namepath
    var radiusSymbol = SymbolSet.getSymbol("Circle#radius");
}
```

### Using the Symbol Object ###

A `JsDoc.Symbol` represents a named, documented thing in your code, like a function or other variable. A symbol object has many properties that describe what is documented about it (either explicitly documented or implicitly inferred). It is worth looking at the source code for `JsDoc.Symbol` to get a feel for all the properties available. A few examples are shown below:

```
function publish(SymbolSet) {
    var getRadiusSymbol = SymbolSet.getSymbol("Circle#getRadius");

    if (getRadiusSymbol.isPrivate) return;

    for (var i = 0; i < getRadiusSymbol.params; i++) {
        print("Param "+i" is "+getRadiusSymbol.params[i]+".");
    }
}
```

### Filtering Symbols ###

JsDoc Toolkit runs on the Rhino 1.7 engine, and as such has some [recent Mozilla JavaScript extensions](http://developer.mozilla.org/en/docs/New_in_JavaScript_1.6) available to it. One of these is the `filter` method, which is ideal for pulling out certain types of Symbols from the entire Symbol collection.

```
var allSymbols = SymbolSet.toArray();

// make a filter for things private
var privateFilter = function($) {
    return $.isPrivate;
}

// now we have just the private symbols
var privateSymbols = allSymbols.filter(privateFilter);
```

### Passing Data to JsPlate ###

Of all the things you are likely to want to do with a Symbol or an array of Symbols, passing it to a JsPlate object is most likely. The term "template" refers to a file containing JsPlate markup, and a template is required to create a JsPlate object.

```
var myTemplate = new JsDoc.JsPlate("path/to/my/template.tmpl");
```

Note: that the `.tmpl` filename extension is conventional but in no way required.

If you plan to distribute your template and intend for it to be saved into the standard `templates` directory, it is a good idea to use filepaths relative to the `app/run.js` location, rather than hard-coding the full path. The path to to the `app/run.js` can always be found by referring to `SYS.pwd`. So a more flexible way to refer to the templates directory is like so:

```
var myTemplate = new JsDoc.JsPlate(SYS.pwd+"../templates/my/template.tmpl");
```

Now that you have a JsPlate object, it's time to give it something to work on. How you do this depends on how you've written your template (which will be discussed soon). For this example we'll pass it a single Symbol:

```
function publish(SymbolSet) {
    var getRadiusSymbol = SymbolSet.getSymbol("Circle#getRadius");
    var myTemplate = new JsDoc.JsPlate(SYS.pwd+"../templates/my/template.tmpl");
    var output = myTemplate.process(getRadiusSymbol);
}

```

### What To Do With the Output ###

Once you have processed some data through your template you will have some "output" -- a string containing the formatted results. What you do with that string is up to you, but likely you will want to write it to an output file. Using the `IO` namespaced methods, this is quite easy.

```
var output = myTemplate.process(mySymbol);
IO.saveFile("path/to/output/", "myFilename", output);
```

By convention all output files produced by JsDoc Toolkit should be below a directory controlled by the `-d` command line option. So a more conventional way to write output would be like this:

```
var output = myTemplate.process(mySymbol);
var outDir = JsDoc.opt.d || SYS.pwd+"../out/";
IO.saveFile(outDir, "myFilename", output);
```


### See Also ###
  * An overview of the JsPlate templating language.