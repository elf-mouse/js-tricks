```js
function func(a, a) {
  console.log(a);
}

func("Hello", "World");
// outputs "World"
```

Except in strict mode…

```js
function func(a, a) {
  "use strict";
  console.log(a);
}

func("Hello", "World");
// errors in chrome - SyntaxError: Strict mode function may not have duplicate parameter names
```
