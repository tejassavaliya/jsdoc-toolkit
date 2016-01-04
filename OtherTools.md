# Running JsDoc Toolkit from Eclipse #

_contributed by simon.speich_
You can run jsdoc\_toolkit from within eclipse or Aptana by setting up
Run -> External Tools -> Open External Tools Dialog...

Location
```
C:\DirectoryToWhereJavaIsLocated\Java\jre1.6.0_07\bin\java.exe
```

Working Directory
```
C:\DirectoryToWhereJsDocToolkitIsLocated\jsdoc-toolkit
```

Arguments
```
-jar jsrun.jar app\run.js "C:\PathToSourceFiles" -t=templates\jsdoc -d="C:\PathToOutputDirectory"
```

Note: You need to enclose the paths in quotes if they contain spaces (at least on windows)