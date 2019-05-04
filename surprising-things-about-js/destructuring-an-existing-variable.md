```js
function pullOutInParams({ a }, [b]) {
  console.log(a, b);
}

function pullOutInLet(obj, arr) {
  let { a } = obj;
  let [b] = arr;
  console.log(a, b);
}

pullOutInParams({ a: "Hello" }, ["World"]);
pullOutInLet({ a: "Hello" }, ["World"]);
```

```js
var a, b, c;
a = 1;
[b] = [2];
({ c } = { c: 3 });

console.log(a, b, c);
```
