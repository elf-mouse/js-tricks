```js
outer: for (var i = 0; i < 4; i++) {
  while (true) {
    continue outer;
  }
}
```

```js
myswitch: switch (i) {
  case 1:
    break myswitch;
}
```

```js
outer: {
  inner: {
    if (true) {
      break outer;
    }
  }
  console.log("I will never be executed");
}
```

---

```js
function(a, b, c) {
  if (a) {
    if (b) {
      return true;
    }
    doSomething();
    if (c) {
      return c;
    }
  }
  return b;
}

// And use labels…
function(a, b, c) {
  var returnValue = b;
  myBlock: if (a) {
    if (b) {
      returnValue = true;
      break myBlock;
    }
    doSomething();
    if (c) {
      returnValue = c;
    }
  }
  return returnValue;
}

// The alternative being more blocks…
function(a, b, c) {
  var returnValue = b;
  if (a) {
    if (b) {
      returnValue = true;
    } else {
      doSomething();
      if (c) {
        returnValue = c;
      }
    }
  }
  return returnValue;
}
```
