# 10 Javascript habits to make life easier

## 1. Short-circuit Evaluation

```js
if (var1 === null || var1 === undefined || var1 === '') {
  console.log('VARIABLE NOT FOUND!');
} else {
  console.log(var1);
}
```

The code above is pretty common, let’s do it smartly

```js
console.log(var1 || 'VARIABLE NOT FOUND!');
```

We can use short-circuit evaluation in many cases like:

```js
const firstName = person && person.firstNames;
```

This will return the persons `firstName` if the person is not invalid (`undefined`, `null`, etc).

## 2. Arrow Functions `() =>`

```js
function sayHello(name) {
  console.log('Hello', name);
}
```

This was a trivial function, which can be replaced with arrow function

```js
const sayHello = name => console.log('Hello', name);
```

How clean it is!

**WARNING:** function and arrow functions have different scoping methodology. So, use them carefully.

## 3. Avoid boring old for loop

```js
const list = [2, 5, 7, 2, 6, 2, 3, 5];
for (let i = 0; i < list.length; i++) {
  console.log(list[i]);
}
```

```js
list.forEach(number => console.log(number));
```

I think I don’t have to describe, code speaks for itself

## 4. Implicit Return

```js
function doubleValue(value) {
  return value * 2;
}
```

```js
const doubleValue = value => value * 2;
```

When using arrow functions, we can return implicitly if the function has a single line/statement without using the `return` keyword. We could return more complex values implicitly like:

```js
const getMeasures = length => ({
  area: length * length,
  volume: length * length * length
});
```

The code above returns an `Object`. Notice the braces `()` before curly braces `{}`.

## 5. Default Parameters

```js
function volume(l, w, h) {
  if (w === undefined) w = 1;
  if (h === undefined) h = 1;
  return l * w * h;
}
```

```js
const volume = (l, w = 1, h = 1) => l * w * h;
```

## 6. Destructuring

```js
const person = {
  first: 'Wes',
  last: 'Bos',
  country: 'Canada',
  city: 'Hamilton',
  twitter: '@wesbos'
};
const first = person.first;
const last = person.last;
```

The repetitive assignment work is boring, so let’s make it less-boring

```js
let { first, last } = person;
```

Now, we can also set default values here if the property doesn’t exist

```js
let { first = 'John', last = 'Doe' } = person;
```

We can also rename some property if need to,

```js
let { first, last: surname } = person;
```

Now, the `last` name will be assigned to `surname`

## 7. Spread Operator

```js
const odd = [1, 2, 3];
const nums = [4, 5, 6].concat(odd);
```

```js
const nums = [4, 5, 6, ...odd];
```

This also works with `Object` types

```js
const obj1 = { a: 1, b: 2, c: 3}
const obj2 = { …obj1, d: 4 }
// now the obj2 will be { a: 1, b: 2, c: 3, d: 4}
```

We could use spread operator anywhere (beginning, end, middle)

## 8. Importing Modules

```js
import mobx from 'mobx';
```

Most of the time we don’t need the whole library to work with. We need only a few things most of the time. We can easily do that using partial imports which uses destructuring.

```js
import { observable, action, runInAction } from ‘mobx’
```

## 9. Async/Await over Promises

This is quite an important topic to discuss and can be discussed for some time. In javascript we use callbacks here and there and also promises. Things can get pretty nasty if we use multiple nested promises. Even a single promise can lose readability pretty soon.

```js
const makeRequest = () =>
  getJSON().then(data => {
    console.log(data);
    return 'done';
  });

makeRequest();
```

If we transform this promise based code to async/await code block, it’ll look like below:

```js
const makeRequest = async () => {
  console.log(await getJSON());
  return 'done';
};

makeRequest();
```

Notice the indentation thing. This makes the code more readable, easily debuggable.

## 10. Map, Filter, Reduce

Let’s imagine a scenario. We need to calculate the **total distance in miles** of all items in our `distances` array where **distance is less than 10000 km**

If we use our traditional for-loop

```js
let distances = [
  { from: 'New York', to: 'Dhaka', distance: 12654 },
  { from: 'Sydney', to: 'chittagong', distance: 8858 },
  { from: 'Kolkata', to: 'Sylhet', distance: 670 }
];

let total = 0;
for (let i = 0; i < distances.length; i++) {
  if (distances[i].distance < 10000) {
    total += distances[i].distance * 0.621371;
  }
}
console.log(total);
```

The code works! Now, let’s try it with map-filter-reduce

```js
let distances = [
  { from: 'New York', to: 'Dhaka', distance: 12654 },
  { from: 'Sydney', to: 'chittagong', distance: 8858 },
  { from: 'Kolkata', to: 'Sylhet', distance: 670 }
];

let total = distances
  .filter(item => item.distance < 10000)
  .map(item => item.distance * 0.621371)
  .reduce((prev, distance) => prev + distance, 0);
console.log(total);
```

See, how readable and clean the code is!
