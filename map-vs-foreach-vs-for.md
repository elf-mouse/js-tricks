## `map` vs `forEach` vs `for`

Consider this array:

```js
var arr = [1, 2, 3];

// .map(): 43 characters
arr.map(function(i) {
  console.log(i);
});

// .forEach(): 47 characters
arr.forEach(function(i) {
  console.log(i);
});

// for(): 70 characters
for (var i = 0, l = arr.length; i < l; i++) {
  console.log(arr[i]);
}
```

Here is a terrible example of method chaining:

```js
var arr = [1, 3, 2];

console.log(
  // This one works:
  arr
  .map(function (i) {
    return i + i;
  })
  // Chaining!
  .sort()
);
// => [ 2, 4, 6 ]

console.log(
  // This one does not:
  arr
  .forEach(function (i) {
    return i + i;
  })
  // This is where forEach breaks:
  .sort()
);
// => TypeError: Cannot read property 'sort' of undefined
```

__TL;DR__

> `.map()` > `.forEach()` > `for()`

UPDATE 2016.05.24: `.map()` is actually the fastest of all 3 in certain JavaScript engines (like [Mozilla’s SpiderMonkey](https://developer.mozilla.org/en-US/docs/Mozilla/Projects/SpiderMonkey)). I advise always using `map`.
