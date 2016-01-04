## Dealing with Character Encoding in JsDoc Toolkit ##

There are three places that any file processing application might trip up over character encoding: reading your files, processing your files, writing your files. Happily, JsDoc Toolkit uses Java and Rhino to accomplish all three of these tasks, and in every test I've been able to devise they have proven to correctly handle any possible character encoding. The rule however is that whatever encoding goes in, that same encoding comes back out again. So if for example your source code contains Chinese characters, encoded against the GBK character set, your output file will also be encoded as GBK.

The implications of that are that you must **a)** be aware of what encoding your files use; and **b)** use the same encoding in all your source files.

This is because, in the output, text from several of your files are likely to be displayed together, and it won't be possible for your web browser to sort out more than one encoding scheme at the same time. The one exception to that is when you use "compatible" encodings. For example ASCII is a complete subset of Latin-1, so if you treat all your files as Latin-1, then the ASCII files will still work (the reverse is not true however).

Ideally you should encode all your source files as UTF-8. UTF-8 is capable of encoding practically every character set on Earth, and is the default for Java and JsDoc Toolkit. _However_ if you decide you really need to use a character set other than UTF-8 (you have your own reasons, I guess) then things will still work, but your output won't magically become UTF-8 encoded, it will still be in the same encoding as you started with.

That is all well and good, except for one thing: the standard HTML templates have a charset value inserted into their HTML meta tags, and the default value of that charset is "utf-8" like so:

```
<meta http-equiv="content-type" content="text/html; charset=utf-8">
```

But if you started with GBK encoded files, your output will still be in GBK, which is not a complete subset of UTF-8, and so your browser will be getting false information and displaying a lot of garbage as a result.

However that charset meta information can be changed from the command line. By using the -e or --encoding option, as listed on the CommandlineOptions page, you can tell JsDoc to write any arbitrary value you like into that meta tag, like so:

```
-e=GBK
```

Now all your HTML files will have the following meta tag inserted into their heads:

```
<meta http-equiv="content-type" content="text/html; charset=GBK">
```

And, assuming it really is encoded as GBK, you should see your output displayed correctly.