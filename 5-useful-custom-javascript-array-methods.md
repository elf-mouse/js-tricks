# 5 Useful Custom JavaScript Array Methods

## Array.last()

### Definition

```js
if (!Array.prototype.last){
  Array.prototype.last = function(){
    return this[this.length - 1];
  };
}
```

### Usage

```js
let stereotypes = [
  'Groundskeeper Willie', 
  'Fat Tony', 
  'Cletus',
  'Comic Book Guy'
];

console.log(
  stereotypes.last()
);
// -> 'Comic Book Guy'
```

## Array.removeElement()

### Definition

```js
if (!Array.prototype.removeElement) {
  Array.prototype.removeElement = function(element) {
    var elementIndex = this.indexOf(element);
    if (this.indexOf(element) !== -1) {
      this.splice(elementIndex, 1);
    }
    return this;
  };
}
```

### Usage

```js
let stereotypes = [
  'Groundskeeper Willie', 
  'Fat Tony', 
  'Cletus',
  'Comic Book Guy'
];

let mostHilariousStereotype = stereotypes[2];
console.log(
  mostHilariousStereotype
);
// -> 'Cletus'

stereoTypes.removeElement(mostHilariousStereotype);
console.log(
  stereotypes
);
// -> ['Groundskeeper Willie', 'Fat Tony', 'Comic Book Guy'];
```

## Array.pushIfNotPresent()

### Definition

```js
if (!Array.prototype.pushIfNotPresent) {
  Array.prototype.pushIfNotPresent = function (element) {
    if (this.indexOf(element) === -1) {
      this.push(element);
    }
    return this;
  };
}
```

### Usage

```js
let stereotypes = [
  'Groundskeeper Willie', 
  'Fat Tony', 
  'Cletus',
  'Comic Book Guy'
];

stereotypes.pushIfNotPresent('The Rich Texan');
console.log(
  stereotypes
);
// -> ['Groundskeeper Willie', 'Fat Tony', 'Cletus', 'Comic Book Guy', 'The Rich Texan'];
// ('The Rich Texan' was not already in the array, so it was successfully added.)

stereotypes.pushIfNotPresent('Fat Tony');
console.log(
  stereotypes
);
// -> ['Groundskeeper Willie', 'Fat Tony', 'Cletus', 'Comic Book Guy', 'The Rich Texan'];
// ('Fat Tony' was already in the array, so this method call had no effect.)
```

## Array.uniques()

### Definition

```js
if (!Array.prototype.uniques) {
  Array.prototype.uniques = function() {
    return this.reduce(function(p, c) {
      if (p.indexOf(c) < 0) p.push(c);
      return p;
    }, []);
  };
}
```

### Usage

```js
let thingsToRemember = [
  'Dental Plan',
  'Lisa Needs Braces',
  'Dental Plan',
  'Lisa Needs Braces'
];

console.log(
  thingsToRemember.uniques()
);
// -> ['Dental Plan', 'Lisa Needs Braces']
```

## Array.replaceWith()

### Definition

```js
if (!Array.prototype.replaceWith) {
  /**
   * Mutably replaces all the items in the array with `newValues`.
   *
   * @param {*|Array} newValues - can be a single item (so the array will now be [thing] or list of new items to
   *                              become the array's new contents.
   * @returns {Array} - Returns itself (the array modified in-place)
   */
  Array.prototype.replaceWith = function(newValues) {
    if ((newValues instanceof Array) === false) {
      newValues = [newValues];
    }
    /**
     * Remove all the current items
     */
    this.splice(0, this.length);

    /**
     * call `splice` again, but this time it inserts each value of `newValues`
     */
    this.splice.apply(
      this,
      /**
       * [0,0] is the first two arguments of `Array.splice`, and each newValues item is passed as an argument
       * afterwards.
       */
      [0,0].concat(newValues)
    );
    return this;
  };
}
```

### Usage

```js
let menuItems = [
  'Krusty Burger with cheese',
  'Krusty partially gelatinated nondairy gum-based beverages'
];

menuItems.replaceWith([
  'Quarter Pounder with cheese',
  'Shakes'
]);

console.log(menuItems);
// -> [ 'Quarter Pounder with cheese', 'Shakes']
```

## Warnings

Keep in mind that augmenting a built-in data type [should be reserved for advanced use only](http://perfectionkills.com/extending-native-builtins/).
