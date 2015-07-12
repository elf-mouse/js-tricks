```js
new Array(1); // [undefined]
new Array(1, 2); // [1, 2]
```

But a colleague was using it recently and came across something I haven’t seen before..

```js
var arr = new Array(10);
for(var i = 0; i < arr.length; i++) {
  arr[i] = i;
}
console.dir(arr);
```

This produces an array of items from 0 to 9. But then, if this is refactored to use map…

```js
var arr = new Array(10);
arr = arr.map(function(item, index) { return index; });
console.dir(arr);
```

```js
var arr = new Array(10);
arr[8] = undefined;
arr = arr.map(function(item, index) { return index; });
console.dir(arr);
```

---

```js
var arr = [];
arr[9] = undefined;
// or
var arr = [];
arr.length = 10;
```
