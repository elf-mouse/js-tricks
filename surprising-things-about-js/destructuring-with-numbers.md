```js
var {1 : a} = { 1: true };

// Or quoted strings…
var {"1" : a} = { "1": true };

// Or you might want to pull out a computed name…
var myProp = "1";
var {[myProp] : a} = { [myProp]: true };
```

Which makes it quite easy to write confusing code…

```js
var a = "a";
var {[a] : [a]} = { a: [a] };
```
