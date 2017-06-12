## 1) A vanilla Javascript method for cloning objects

```js
// recursive function to clone an object. If a non object parameter
// is passed in, that parameter is returned and no recursion occurs.

function cloneObject(obj) {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  var temp = obj.constructor(); // give temp the original obj's constructor
  for (var key in obj) {
    temp[key] = cloneObject(obj[key]);
  }

  return temp;
}

var bob = {
  name: "Bob",
  age: 32
};

var bill = (cloneObject(bob));
bill.name = "Bill";

console.log(bob);
console.log(bill);
```

## 2) A clever exploit of the JSON library to deep-clone objects

```js
var bob = {
  name: "Bob",
  age: 32
};

var bill = (JSON.parse(JSON.stringify(bob)));
bill.name = "Bill";

console.log(bob);
console.log(bill);
```

## 3) Using jQuery’s $.extend() function

```js
var bob = {
  name: "Bob",
  age: 32
};

var bill = $.extend(true, {}, bob);
bill.name = "Bill";

console.log(bob);
console.log(bill);
```
