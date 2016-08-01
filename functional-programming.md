## Minimise Side Effects

```js
// A function with a side effect
var x = 10;

const myFunc = function ( y ) {
  x = x + y;
};

myFunc( 3 );
console.log( x ); // 13

myFunc( 3 );
console.log( x ); // 16
```

## Treat Data as Immutable

```js
// the push method mutates the array it's called on
const x = [1, 2];
console.log( x ); // [1, 2]

x.push( 3 );
console.log( x ); // [1, 2, 3]
```

```js
const frozenObject = Object.freeze( { valueOne : 1, valueTwo : { nestedValue : 1 } } );
frozenObject.valueOne = 2; // not allowed
frozenObject.valueTwo.nestedValue = 2; // allowed!
```

### Avoiding Mutations: Arrays

```js
// push mutates arrays.
const arrayOne = [1, 2, 3];
arrayOne.push( 4 );

console.log( arrayOne ); // [1, 2, 3, 4]

// concat creates a new array and leaves the original unchanged.
const arrayTwo = [1, 2, 3];
const arrayThree = arrayTwo.concat([ 4 ]);

console.log( arrayTwo ); // [1, 2, 3]
console.log( arrayThree ); // [1, 2, 3, 4]
```

### Avoiding Mutations: Objects

```js
const objectOne = { valueOne : 1 };
const objectTwo = { valueTwo : 2 };

const objectThree = Object.assign( {}, objectOne, objectTwo );

console.log( objectThree ); // { valueOne : 1, valueTwo : 2 }
```

### Note on `const`

```js
const x = 1;
x = 2; // not allowed

const myArray = [1, 2, 3];
myArray = [0, 2, 3]; // not allowed

myArray[0] = 0; // allowed!
```

## Write Pure Functions

```js
// Make the global variable local.
const myFunc = function ( y ) {
  const x = 10;
  return x + y;
}

console.log(myFunc( 3 )); // 13
console.log(myFunc( 3 )); // 13
```

```js
// Pass x as an argument.
const x = 10;

const myFunc = function ( x, y ) {
  return x + y;
}

console.log(myFunc( x, 3 )); // 13
console.log(myFunc( x, 3 )); // 13
```

## Write Function-Generating Functions

```js
const numbers = [1, 2, 3];

for ( let i = 0; i < numbers.length; i++ ) {
  console.log( numbers[i] );
}
```

```js
const numbers = [1, 2, 3];

const print = function ( input ) {
  console.log( input );
};

numbers.forEach( print );
```

### Function Composition

```js
// The function addThenSquare is made by combining the functions add and square.
const add = function ( x, y ) {
  return x + y;
};

const square = function ( x ) {
  return x * x;
};

const addThenSquare = function ( x, y ) {
  return square(add( x, y ));
};
```

```js
const add = function ( x, y ) {
  return x + y;
};

const square = function ( x ) {
  return x * x;
};

const composeTwo = function ( f, g ) {
  return function ( x, y ) {
    return g( f ( x, y ) );
  };
};

const addThenSquare = composeTwo( add, square );
```

```js
// This version of composeTwo can accept any number of arguments for the initial function.
const composeTwo = function ( f, g ) {
  return function ( ...args ) {
    return g( f( ...args ) );
  };
};

// composeMany can accept any number of functions as well as any number of arguments for the initial function.
const composeMany = function ( ...args ) {
  const funcs = args;
  return function ( ...args ) {
    funcs.forEach(( func ) => {
      args = [func.apply( this, args )];
    });
    return args[0];
  };
};
```

### Partial Function Application

```js
const multiply = function ( x, y ) {
  return x * y;
};

const partApply = function ( fn, x ) {
  return function ( y ) {
    fn( x, y );
  };
};

const double = partApply( multiply, 2 );
const triple = partApply( multiply, 3 );
const quadruple = partApply( multiply, 4 );
```

### Currying

```js
const multiply = function ( x, y ) {
  return x * y;
};

const curry = function ( fn ) {
  return function ( x ) {
    return function ( y ) {
      return fn( x, y );
    };
  };
};

const curriedMultiply = curry( multiply );

const double = curriedMultiply( 2 );
const triple = curriedMultiply( 3 );
const quadruple = curriedMultiply( 4 );

console.log(triple( 6 )); // 18
```

```js
const multiply = function ( x, y, z ) {
  return x * y * z;
};

const curry = function ( fn ) {
  return function ( x ) {
    return function ( y ) {
      return function ( z ) {
        return fn( x, y, z );
      };
    };
  };
};

const partApply = function ( fn, x ) {
  return function ( y, z ) {
    return fn( x, y, z );
  };
};

const curriedMultiply = curry( multiply );
const partiallyAppliedMultiply = partApply( multiply, 10 );

console.log(curriedMultiply( 10 )( 5 )( 2 )); // 100
console.log(partiallyAppliedMultiply( 5, 2 )); // 100
```

## Recursion

```js
const factorial = function ( n ) {
  if ( n === 0 ) {
    return 1;
  }
  return n * factorial( n - 1 );
};

console.log(factorial( 10 )); // 3628800
```

### Tail Call Optimisation

```js
const factorial = function ( n, base ) {
  if ( n === 0 ) {
    return base;
  }
  base *= n;
  return factorial( n - 1, base );
};

console.log(factorial( 10, 1 )); // 3628800
```
