# JavaScript 中继承实现方式归纳

不同于基于类的编程语言，如 C++ 和 Java，JavaScript 中的继承方式是基于原型的。同时由于 JavaScript 是一门非常灵活的语言，其实现继承的方式也非常多。

首要的基本概念是关于构造函数和原型链的，父对象的构造函数称为`Parent`，子对象的构造函数称为`Child`，对应的父对象和子对象分别为`parent`和`child`。

对象中有一个隐藏属性`[[prototype]]`(注意不是`prototype`)，在 Chrome 中是`__proto__`，而在某些环境下则不可访问，它指向的是这个对象的原型。在访问任何一个对象的属性或方法时，首先会搜索本对象的所有属性，如果找不到的话则会根据`[[prototype]]`沿着原型链逐步搜索其原型对象上的属性，直到找到为止，否则返回`undefined`。

## 原型链继承

原型链是 JavaScript 中实现继承的默认方式，如果要让子对象继承父对象的话，最简单的方式是将子对象构造函数的`prototype`属性指向父对象的一个实例：

```javascript
function Parent() {}
function Child() {}
Child.prototype = new Parent()
```

这个时候，`Child`的`prototype`属性被重写了，指向了一个新对象，但是这个新对象的`constructor`属性却没有正确指向`Child`，JS 引擎并不会自动为我们完成这件工作，这需要我们手动去将`Child`的原型对象的`constructor`属性重新指向`Child`:

```javascript
Child.prototype.constructor = Child
```

以上就是 JavaScript 中的默认继承机制，将需要重用的属性和方法迁移至原型对象中，而将不可重用的部分设置为对象的自身属性，但这种继承方式需要新建一个实例作为原型对象，效率上会低一些。

## 原型继承（非原型链）

为了避免上一个方法需要重复创建原型对象实例的问题，可以直接将子对象构造函数的`prototype`指向父对象构造函数的`prototype`，这样，所有`Parent.prototype`中的属性和方法也能被重用，同时不需要重复创建原型对象实例：

```javascript
Child.prototype = Parent.prototype
Child.prototype.constructor = Child
```

但是我们知道，在 JavaScript 中，对象是作为引用类型存在的，这种方法实际上是将`Child.prototype`和`Parent.prototype`中保存的指针指向了同一个对象，因此，当我们想要在子对象原型中扩展一些属性以便之后继续继承的话，父对象的原型也会被改写，因为这里的原型对象实例始终只有一个，这也是这种继承方式的缺点。

## 临时构造器继承

为了解决上面的问题，可以借用一个临时构造器起到一个中间层的作用，所有子对象原型的操作都是在临时构造器的实例上完成，不会影响到父对象原型：

```javascript
var F = function() {}
F.prototype = Parent.prototype
Child.prototype = new F()
Child.prototype.constructor = Child
```

同时，为了可以在子对象中访问父类原型中的属性，可以在子对象构造器上加入一个指向父对象原型的属性，如`uber`，这样，可以在子对象上直接通过`Child.constructor.uber`访问到父级原型对象。

我们可以将上面的这些工作封装成一个函数，以后调用这个函数就可以方便实现这种继承方式了：

```javascript
function extend(Child, Parent) {
  var F = function() {}
  F.prototype = Parent.prototype
  Child.prototype = new F()
  Child.prototype.constructor = Child
  Child.uber = Parent.prototype
}
```

然后就可以这样调用：

```javascript
extend(Dog, Animal)
```

## 属性拷贝

这种继承方式基本没有改变原型链的关系，而是直接将父级原型对象中的属性全部复制到子对象原型中，当然，这里的复制仅仅适用于基本数据类型，对象类型只支持引用传递。

```javascript
function extend2(Child, Parent) {
  var p = Parent.prototype
  var c = Child.prototype
  for (var i in p) {
    c[i] = p[i]
  }
  c.uber = p
}
```

这种方式对部分原型属性进行了重建，构建对象的时候效率会低一些，但是能够减少原型链的查找。不过我个人觉得这种方式的优点并不明显。

## 对象间继承

除了基于构造器间的继承方法，还可以抛开构造器直接进行对象间的继承。即直接进行对象属性的拷贝，其中包括浅拷贝和深拷贝。

__浅拷贝：__

接受要继承的对象，同时创建一个新的空对象，将要继承对象的属性拷贝至新对象中并返回这个新对象：

```javascript
function extendCopy(p) {
  var c = {}
  for (var i in p) {
    c[i] = p[i]
  }
  c.uber = p
  return c
}
```

拷贝完成之后对于新对象中需要改写的属性可以进行手动改写。

__深拷贝：__

浅拷贝的问题也显而易见，它不能拷贝对象类型的属性而只能传递引用，要解决这个问题就要使用深拷贝。深拷贝的重点在于拷贝的递归调用，检测到对象类型的属性时就创建对应的对象或数组，并逐一复制其中的基本类型值。

```javascript
function deepCopy(p, c) {
  c = c || {}
  for (var i in p) {
    if (p.hasOwnProperty(i)) {
      if (typeof p[i] === 'object') {
        c[i] = Array.isArray(p[i]) ? [] : {}
        deepCopy(p[i], c[i])
      } else {
        c[i] = p[i]
      }
    }
  }
  return c
}
```

其中用到了一个 ES5 的`Array.isArray()`方法用于判断参数是否为数组，没有实现此方法的环境需要自己手动封装一个 shim。

```javascript
Array.isArray = function(p) {
  return p instanceof Array
}
```

但是使用`instanceof`操作符无法判断来自不同框架的数组变量，但这种情况比较少。

## 原型继承

借助父级对象，通过构造函数创建一个以父级对象为原型的新对象：

```javascript
function object(o) {
  var n
  function F() {}
  F.prototype = o
  n = new F()
  n.uber = o
  return n
}
```

这里，直接将父对象设置为子对象的原型，ES5 中的 `Object.create()`方法就是这种实现方式。

## 原型继承和属性拷贝混用

原型继承方法中以传入的父对象为原型构建子对象，同时还可以在父对象提供的属性之外额外传入需要拷贝属性的对象：

```javascript
function ojbectPlus(o, stuff) {
  var n
  function F() {}
  F.prototype = o
  n = new F()
  n.uber = o

  for (var i in stuff) {
    n[i] = stuff[i]
  }
  return n
}
```

## 多重继承

这种方式不涉及原型链的操作，传入多个需要拷贝属性的对象，依次进行属性的全拷贝：

```javascript
function multi() {
  var n = {}, stuff, i = 0,
      len = arguments.length
  for (i = 0; i < len; i++) {
    stuff = arguments[i]
    for (var key in stuff) {
      n[i] = stuff[i]
    }
  }
  return n
}
```

根据对象传入的顺序依次进行拷贝，也就是说，如果后传入的对象包含和前面对象相同的属性，后者将会覆盖前者。

## 构造器借用

JavaScript中的`call()`和`apply()`方法非常好用，其改变方法执行上下文的功能在继承的实现中也能发挥作用。所谓构造器借用是指在子对象构造器中借用父对象的构造函数对`this`进行操作：

```javascript
function Parent() {}
Parent.prototype.name = 'parent'

function Child() {
  Parent.apply(this, arguments)
}
var child = new Child()
console.log(child.name)
```

这种方式的最大优势就是，在子对象的构造器中，是对子对象的自身属性进行完全的重建，引用类型的变量也会生成一个新值而不是一个引用，所以对子对象的任何操作都不会影响父对象。

而这种方法的缺点在于，在子对象的构建过程中没有使用过`new`操作符，因此子对象不会继承父级原型对象上的任何属性，在上面的代码中，`child`的`name`属性将会是`undefined`。

要解决这个问题，可以再次手动将子对象构造器原型设为父对象的实例：

```javascript
Child.prototype = new Parent()
```

但这样又会带来另一个问题，即父对象的构造器会被调用两次，一次是在父对象构造器借用过程中，另一次是在继承原型过程中。

要解决这个问题，就要去掉一次父对象构造器的调用，构造器借用不能省略，那么只能去掉后一次调用，实现继承原型的另一方法就是迭代复制：

```javascript
extend2(Child, Parent)
```

使用之前实现的`extend2()`方法即可。
