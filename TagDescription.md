## The @description Tag ##

The @description tag allows you to provide a description of the object being documented. The object can be almost anything: a function, a variable, a constructor.

### Syntax ###
```
@description description
```

  * description - Required: the description of the object.

### Examples ###

While descriptions of objects are extremely useful and also extremely common, this tag is rarely used because, by convention, if the first line of a doc comment has _no_ tag, it is assumed to be the start of a description. For example, the following two doc comments are functionally identical.

_An explicit description, using the `@description` tag._
```
/**
    @description Creates a new Person.
    @constructor
*/ 
Person = function() {
}
```

_An implied `@description` tag here, because the first line is untagged._
```
/**
    Creates a new Person.
    @constructor
*/ 
Person = function() {
}
```

The only time this tag would be _required_ is if you wanted to make the description appear anywhere else except the beginning of your doc comment.

```
/**
    @deprecated
    @description Creates a new Person. 
*/ 
Person = function() {
}
```

Note, like all tags, there is no restriction on how many lines your description spans, nor what characters it contains, as long as no line starts with an `@` character.

_This example shows that you can include newlines and HTML tags in a description._
```
/**
    <p>Creates a new Person, representative of a living human being,
    in addition to the collection of characteristics that define and
    distinguish an individual personality; the self.</p>

    <p>The word can be traced to the latin word <i>persona</i> for 
    "human being," originally "character in a drama," possibly borrowed
    from the ancient Etruscan word <i>phersu</i> for "mask."</p>

    @constructor
*/ 
Person = function() {
}
```