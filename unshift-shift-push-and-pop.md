# Javascript Array Methods: Unshift(), Shift(), Push(), And Pop()

## `push`

```js
// Build an array of test data.
var data = ["X"];

// Push data onto the array. Push() appends elements to the end
// of the given array. Note that it can take more than one
// argument, each of which is individually appended to the array.
// In the output, notice that when push() takes multiple arguments
// they are appended in a left-to-right order (mimicing their
// appearence in the arguments list).
data.push("A");
data.push("B", "C");

// Output resultant array.
console.log(data);
```

> ["X", "A", "B", "C"]

## `pop`

```js
// Build an array of test data.
var data = ["A", "B", "C"];

// Pop the element off of the end of the array.
console.log(data.pop());
console.log(data);
```

> C
>
> ["A", "B"]

## `unshift`

```js
// Build an array of test data.
var data = ["X"];

// Unshift data onto the array. Unshift() prepends elements to
// the beginning of the given array. Note that it can take more
// than one argument. In the output, notice that when unshift()
// takes multiple arguments, they are prepended in a right-to-left
// order (mimicing their appearence in the arguments list).
data.unshift("A");
data.unshift("B", "C");

// Output resultant array.
console.log(data);
```

> ["B", "C", "A", "X"]

## `shift`

```js
// Build an array of test data.
var data = ["A", "B", "C"];

// Shift the element off of the beginning of the array.
console.log(data.shift());
console.log(data);
```

> A
>
> ["B", "C"]
