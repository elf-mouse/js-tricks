# 7 Essential JavaScript Functions

## `debounce`

```js
// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

// Usage
var myEfficientFn = debounce(function() {
  // All the taxing stuff you do
}, 250);
window.addEventListener('resize', myEfficientFn);
```

## `poll`

```js
function poll(fn, callback, errback, timeout, interval) {
  var endTime = Number(new Date()) + (timeout || 2000);
  interval = interval || 100;

  (function p() {
    // If the condition is met, we're done!
    if(fn()) {
      callback();
    }
    // If the condition isn't met but the timeout hasn't elapsed, go again
    else if (Number(new Date()) < endTime) {
      setTimeout(p, interval);
    }
    // Didn't match and too much time, reject!
    else {
      errback(new Error('timed out for ' + fn + ': ' + arguments));
    }
  })();
}

// Usage:  ensure element is visible
poll(
  function() {
    return document.getElementById('lightbox').offsetWidth > 0;
  },
  function() {
    // Done, success callback
  },
  function() {
    // Error, failure callback
  }
);
```

## `once`

```js
function once(fn, context) {
  var result;

  return function() {
    if(fn) {
      result = fn.apply(context || this, arguments);
      fn = null;
    }

    return result;
  };
}

// Usage
var canOnlyFireOnce = once(function() {
  console.log('Fired!');
});

canOnlyFireOnce(); // "Fired!"
canOnlyFireOnce(); // nada
```

## `getAbsoluteUrl`

```js
var getAbsoluteUrl = (function() {
  var a;

  return function(url) {
    if(!a) a = document.createElement('a');
    a.href = url;

    return a.href;
  };
})();

// Usage
getAbsoluteUrl('/something'); // https://domain.com/something
```

## `isNative`

```js
;(function() {

  // Used to resolve the internal `[[Class]]` of values
  var toString = Object.prototype.toString;

  // Used to resolve the decompiled source of functions
  var fnToString = Function.prototype.toString;

  // Used to detect host constructors (Safari > 4; really typed array specific)
  var reHostCtor = /^\[object .+?Constructor\]$/;

  // Compile a regexp using a common native method as a template.
  // We chose `Object#toString` because there's a good chance it is not being mucked with.
  var reNative = RegExp('^' +
    // Coerce `Object#toString` to a string
    String(toString)
    // Escape any special regexp characters
    .replace(/[.*+?^${}()|[\]\/\\]/g, '\\$&')
    // Replace mentions of `toString` with `.*?` to keep the template generic.
    // Replace thing like `for ...` to support environments like Rhino which add extra info
    // such as method arity.
    .replace(/toString|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
  );

  function isNative(value) {
    var type = typeof value;
    return type == 'function'
      // Use `Function#toString` to bypass the value's own `toString` method
      // and avoid being faked out.
      ? reNative.test(fnToString.call(value))
      // Fallback to a host object check because some environments will represent
      // things like typed arrays as DOM methods which may not conform to the
      // normal native pattern.
      : (value && type == 'object' && reHostCtor.test(toString.call(value))) || false;
  }

  // export however you want
  module.exports = isNative;
}());

// Usage
isNative(alert); // true
isNative(myCustomFunction); // false
```

## `insertRule`

```js
var sheet = (function() {
  // Create the `<style>` tag
  var style = document.createElement('style');

  // Add a media (and/or media query) here if you'd like!
  // style.setAttribute('media', 'screen')
  // style.setAttribute('media', 'only screen and (max-width : 1024px)')

  // WebKit hack :(
  style.appendChild(document.createTextNode(''));

  // Add the `<style>` element to the page
  document.head.appendChild(style);

  return style.sheet;
})();

// Usage
sheet.insertRule("header { float: left; opacity: 0.8; }", 1);
```

## `matchesSelector`

```js
function matchesSelector(el, selector) {
  var p = Element.prototype;
  var f = p.matches || p.webkitMatchesSelector || p.mozMatchesSelector || p.msMatchesSelector || function(s) {
    return [].indexOf.call(document.querySelectorAll(s), this) !== -1;
  };
  return f.call(el, selector);
}

// Usage
matchesSelector(document.getElementById('myDiv'), 'div.someSelector[some-attribute=true]')
```
