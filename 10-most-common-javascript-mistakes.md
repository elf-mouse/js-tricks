# JavaScript Not Working? Start with the 10 Most Common JavaScript Mistakes

## 1. Incorrect references to `this`

```javascript
Game.prototype.restart = function () {
  this.clearLocalStorage();
  this.timer = setTimeout(function() {
    this.clearBoard();    // what is "this"?
  }, 0);
};
```

A traditional, old-browser-compliant solution is to simply save your reference to `this` in a variable that can then be inherited by the closure; e.g.:

```javascript
Game.prototype.restart = function () {
  this.clearLocalStorage();
  var self = this;   // save reference to 'this', while it's still this!
  this.timer = setTimeout(function(){
    self.clearBoard();    // oh OK, I do know who 'self' is!
  }, 0);
};
```

Alternatively, in newer browsers, you can use the `bind()` method to pass in the proper reference:

```javascript
Game.prototype.restart = function () {
  this.clearLocalStorage();
  this.timer = setTimeout(this.reset.bind(this), 0);  // bind to 'this'
};

Game.prototype.reset = function(){
  this.clearBoard();    // ahhh, back in the context of the right 'this'!
};
```

## 2. Thinking there is block-level scope

```javascript
for (var i = 0; i < 10; i++) {
  /* ... */
}
console.log(i);  // what will this output?
```

## 3. Creating memory leaks

__Memory Leak Example 1: Dangling references to defunct objects__

```javascript
var theThing = null;
var replaceThing = function () {
  var priorThing = theThing;  // hold on to the prior thing
  var unused = function () {
    // 'unused' is the only place where 'priorThing' is referenced,
    // but 'unused' never gets invoked
    if (priorThing) {
      console.log("hi");
    }
  };
  theThing = {
    longStr: new Array(1000000).join('*'),  // create a 1MB object
    someMethod: function () {
      console.log(someMessage);
    }
  };
};
setInterval(replaceThing, 1000);    // invoke `replaceThing' once every second
```

__Memory Leak Example 2: Circular references__

```javascript
function addClickHandler(element) {
  element.click = function onClick(e) {
    alert("Clicked the " + element.nodeName);
  }
}
```

__Avoiding Memory Leaks: What you need to know__

JavaScript’s memory management (and, in paticular, [garbage collection](http://en.wikipedia.org/wiki/Garbage_collection_(computer_science))) is largely based on the notion of object [reachability](http://javascript.info/tutorial/memory-leaks#memory-management-in-javascript).

The following objects are assumed to be reachable and are known as “roots”:

* Objects referenced from anywhere in the current call stack (that is, all local variables and parameters in the functions currently being invoked, and all the variables in the closure scope)
* All global variables

## 4. Confusion about equality

```javascript
// All of these evaluate to 'true'!
console.log(false == '0');
console.log(null == undefined);
console.log(" \t\r\n" == 0);
console.log('' == 0);

// And these do too!
if ({}) // ...
if ([]) // ...
```

```javascript
console.log(NaN == NaN);    // false
console.log(NaN === NaN);   // false
console.log(isNaN(NaN));    // true
```

## 5. Inefficient DOM manipulation

One effective alternative when multiple DOM elements need to be added is to use [document fragments](https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment) instead, thereby improving both efficiency and performance.

```javascript
var div = document.getElementsByTagName("my_div");

var fragment = document.createDocumentFragment();

for (var e = 0; e < elems.length; e++) {  // elems previously set to list of elements
  fragment.appendChild(elems[e]);
}
div.appendChild(fragment.cloneNode(true));
```

## 6. Incorrect use of function definitions inside `for` loops

```javascript
var elements = document.getElementsByTagName('input');
var n = elements.length;    // assume we have 10 elements for this example
for (var i = 0; i < n; i++) {
  elements[i].onclick = function() {
    console.log("This is element #" + i);
  };
}
```

```javascript
var elements = document.getElementsByTagName('input');
var n = elements.length;    // assume we have 10 elements for this example
var makeHandler = function(num) {  // outer function
  return function() {   // inner function
    console.log("This is element #" + num);
  };
};
for (var i = 0; i < n; i++) {
  elements[i].onclick = makeHandler(i+1);
}
```

## 7. Failure to properly leverage prototypal inheritance

```javascript
var BaseObject = function(name) {
  if (typeof name !== "undefined") {
    this.name = name;
  } else {
    this.name = 'default';
  }
};
```

```javascript
var firstObj = new BaseObject();
var secondObj = new BaseObject('unique');

console.log(firstObj.name);  // -> Results in 'default'
console.log(secondObj.name); // -> Results in 'unique'
```

```javascript
delete secondObj.name;
console.log(secondObj.name); // -> Results in 'undefined'
```

---

```javascript
BaseObject = function (name) {
  if (typeof name !== "undefined") {
    this.name = name;
  }
};

BaseObject.prototype.name = 'default';
```

```javascript
var thirdObj = new BaseObject('unique');
console.log(thirdObj.name);  // -> Results in 'unique'

delete thirdObj.name;
console.log(thirdObj.name);  // -> Results in 'default'
```

## 8. Creating incorrect references to instance methods

```javascript
var MyObject = function() {};

MyObject.prototype.whoAmI = function() {
  console.log(this === window ? "window" : "MyObj");
};

var obj = new MyObject();
```

```javascript
var whoAmI = obj.whoAmI;

console.log(whoAmI);
//function () {
//  console.log(this === window ? "window" : "MyObj");
//}
```

```javascript
obj.whoAmI();  // outputs "MyObj" (as expected)
whoAmI();      // outputs "window" (uh-oh!)
```

---

```javascript
var MyObject = function() {};

MyObject.prototype.whoAmI = function() {
  console.log(this === window ? "window" : "MyObj");
};

var obj = new MyObject();
obj.w = obj.whoAmI;   // still in the obj namespace

obj.whoAmI();  // outputs "MyObj" (as expected)
obj.w();       // outputs "MyObj" (as expected)
```

## 9. Providing a string as the first argument to `setTimeout` or `setInterval`

```javascript
setInterval("logTime()", 1000);
setTimeout("logMessage('" + msgValue + "')", 1000);
```

---

```javascript
setInterval(logTime, 1000);   // passing the logTime function to setInterval

setTimeout(function() {       // passing an anonymous function to setTimeout
  logMessage(msgValue);       // (msgValue is still accessible in this scope)
}, 1000);
```

## 10. Failure to use “strict mode”

* Makes debugging easier
* Prevents accidental globals
* Eliminates `this` coercion
* Disallows duplicate property names or parameter values
* Makes `eval()` safer
* Throws error on invalid usage of `delete`
