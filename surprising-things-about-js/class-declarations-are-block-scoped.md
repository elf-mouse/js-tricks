```js
func();

function func() {
  console.log("Fine");
}
```

---

```js
func(); // func is declared, but undefined, so this throws E.g. "func is not a function"

var func = function func() {
  console.log("Fine");
};
```

```js
new func(); // func is not defined

class func {
  constructor() {
    console.log("Fine");
  }
}
```

```js
new func(); // func is not defined

let func = function func() {
  console.log("Fine");
}
```
