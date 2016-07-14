- Imperative: C, C++, Java
- Declarative: SQL, HTML
- (Can Be) Mix: JavaScript, C#, Python

---

1. Write a function called double which takes in an array of numbers and returns a new array after doubling every item in that array. `double([1,2,3]) -> [2,4,6]`
2. Write a function called add which takes in an array and returns the result of adding up every item in the array. `add([1,2,3]) -> 6`
3. Using jQuery (or vanilla JavaScript), add a click event handler to the element which has an id of “btn”. When clicked, toggle (add or remove) the “highlight” class as well as change the text to “Add Highlight” or “Remove Highlight” depending on the current state of the element.

```js
function double (arr) {
  let results = []
  for (let i = 0; i < arr.length; i++){
    results.push(arr[i] * 2)
  }
  return results
}

function add (arr) {
  let result = 0
  for (let i = 0; i < arr.length; i++){
    result += arr[i]
  }
  return result
}

$("#btn").click(function() {
  $(this).toggleClass("highlight")
  $(this).text() === 'Add Highlight'
    ? $(this).text('Remove Highlight')
    : $(this).text('Add Highlight')
})
```

1. The most obvious commonality is that they’re describing HOW to do something. In each example we’re either explicitly iterating over an array or explicitly laying out steps for how to implement the functionality we want.
2. This one might not be as obvious if you’re not used to thinking in the “declarative” or even more specifically “functional” way. In each example we’re mutating some piece of state (If you’re unfamiliar with the term state, it’s basically information about something held in memory— which should sound a lot like variables.) In the first two examples we create a variable called results and then we continually modify it. In the second example we don’t have any variables, but we still have state living in the DOM itself — we then modify that state in the DOM.
3. This one is a bit subjective, but to me the code above isn’t very readable. I can’t just glance at the code and understand what’s going on. My brain needs to step through the code just as an interpreter would while also taking into account the context in which the code lives (another negativity of mutable data).

```js
function double (arr) {
  return arr.map((item) => item * 2)
}

function add (arr) {
  return arr.reduce((prev, current) => prev + current, 0)
}

<Btn
  onToggleHighlight={this.handleToggleHighlight}
  highlight={this.state.highlight}>
    {this.state.buttonText}
</Btn>
```
