# Command Line Options #

This is an overview of the command line options available to control how JsDoc Toolkit works.

_Note:_ On the Windows OS the filepaths will have back-slashes; On Mac OS X and Linux the filepaths will have forward-slashes. You should adjust the examples here to suit your own OS.

| Windows | c:\path\to\my\file.js |
|:--------|:----------------------|
| Mac OS X | /path/to/my/file.js   |
| Linux   | /path/to/my/file.js   |

_Note:_ This overview assumes you've changed your current working directory to the jsdoc-toolkit folder, the location where you've unzipped the jsdoc-toolkit download to. It doesn't matter where that is as long as you can change to that directory on the command line.

| Windows | > cd c:\where\ever\jsdoc-toolkit |
|:--------|:---------------------------------|
| Mac OS X | $ cd /where/ever/jsdoc-toolkit   |
| Linux   | % cd /where/ever/jsdoc-toolkit   |

## Summary ##

| -c=

&lt;PATH&gt;

 | Use the JSON style configuration file as command line options. |
|:--------------------|:---------------------------------------------------------------|
| -r=

&lt;DEPTH&gt;

 | Descend into src directories.                                  |
| -t=

&lt;PATH&gt;

 | **Required.** Use this template to format the output.          |
| -d=

&lt;PATH&gt;

 | Output to this directory (defaults to js\_docs\_out).          |
| -e=

&lt;ENCODING&gt;

 | Use this encoding to read and write files.                     |
| -a                  | Include all functions, even undocumented ones.                 |
| -A                  | Include all functions, even undocumented, underscored ones.    |
| -p                  | Include symbols tagged as private in the output.               |
| -x=

&lt;EXT&gt;

[,EXT] | Scan source files with the given extension/s (defaults to js). |
| -o=

&lt;PATH&gt;

 | Print log messages to a file (defaults to stdout).             |
| -h                  | Show this message and exit.                                    |
| -D="myVar:My value" | Multiple. Define a variable, available as JsDoc.opt.D.myVar    |
| -v                  | Show informational messages during processing.                 |

## Basic ##

JsDoc Toolkit runs via the Mozilla JavaScript Engine, included with the JsDoc Toolkit distribution. So all commands start with this...

```
java -jar app/js.jar app/run.js
```

## Source Files ##

The JavaScript source files you wish to process are listed after the basic command. These can be paths to single files, or paths to directories full of files.

```
java -jar app/js.jar app/run.js /single/file.js /another/file.js
```

```
java -jar app/js.jar app/run.js /myscripts/
```

You can combine directories and single files in any combination...
```
java -jar app/js.jar app/run.js /myscripts/ /single/file.js /another/file.js
```

## Source Directories ##

In the case where you are giving JsDoc Toolkit a path to a source directory, the default behavior is for that directory to be scanned for all files that end in ".js".

By default, subdirectories are _not_ scanned.

### Recursive Scanning ###

If you wish JsDoc Toolkit to descend into subdirectories, use the `-r` option. By default this will collect all source files to a depth of 10 folders deep, but you can specify your preferred depth.

```
java -jar app/js.jar app/run.js -r=4 /myscripts/
```

### Custom Source File Extensions ###

By default, the directory scanning code will only collect source files that end in ".js" (case insensitive). If you prefer that it collect files with a different extension, use the `-x` option. For example, to collect files that end in ".sc" use this...

```
java -jar app/js.jar app/run.js -x=sc /myscripts/
```

You can specify multiple file extensions like so...

```
java -jar app/js.jar app/run.js -x=sc,js,txt /myscripts/
```

_Note:_ You must not include a dot in the `-x` value/s, for example `-x=.scrpt` would **not** work.
_Note:_ The extensions are compared in a _case insensitive_ manner, so the following are effectively the same to JsDoc Toolkit: `-x=sc` and `-x=SC`

## Using a Template ##

To produce output files you must use a template to format the generated documentation. Use the `-t` option to specify which template you wish to use.

```
java -jar app/js.jar app/run.js -t=templates/sweet /myscripts/
```

_Note:_ You must specify a **directory** as the value to `-t`, not a file. And that directory must contain a file named "publish.js".

## Output Directories ##

If you are using an output template, by default the formatted output files will be created in a folder named "js\_docs\_out". If you wish to change this behavior with the `-d` option.

```
java -jar app/js.jar app/run.js -t=templates/sweet -d=my_docs /myscripts/
```

## Documenting All Functions ##

By default, only functions that you've written documentation comments for will appear in the output. If you want JsDoc Toolkit to generate documentation for _all_ functions, even the uncommented ones, in your source code use the `-a` option.

```
java -jar app/js.jar app/run.js -t=templates/sweet -a /myscripts/
```

It is a convention that if you name a function with an underscore as the first character, you intend it to be for internal use only, not part of the public API. If you wish all functions, even those that are uncommented and start with an underscore to be included in the output, use the `-A` option.

```
java -jar app/js.jar app/run.js -t=templates/sweet -A /myscripts/
```

## Using a Configuration File ##

If you find yourself entering the same command line switches over and over again, you can save these to a JSON file and include that file with the `-c` option.

```
java -jar app/js.jar app/run.js -c=sample.conf /myscripts/
```

_Note:_ There really is a "sample.conf" file included in the standard JsDoc Toolkit distribution, which should help to get you started writing your own.