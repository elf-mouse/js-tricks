# 盘点 JavaScript 里好用的原生 API

## 解析`字符串对象`

我们都知道，JavaScript对象可以序列化为`JSON`，`JSON`也可以解析成对象，但是问题是如果出现了一个既不是JSON也不是对象的"_东西_"，转成哪一方都不方便，那么`eval`就可以派上用场

```javascript
var obj = "{a:1,b:2}";   // 看起来像对象的字符串
eval("("+ obj +")")      // {a: 1, b: 2}
```

> 因为 eval 可以执行字符串表达式，我们希望将 obj 这个字符串对象 执行成真正的对象，那么就需要用eval。但是为了避免eval 将带 `{}` 的 obj 当语句来执行，我们就在obj的外面套了对 `()`，让其被解析成表达式。

## 格式化`Date`

想得到format后的时间？现在不用再get年月日时分秒了，三步搞定

```javascript
var temp = new Date();
var regex = /\//g;
(temp.toLocaleDateString() + ' ' + temp.toLocaleTimeString().slice(2)).replace(regex,'-');

// "2015-5-7 9:04:10"
```

想将format后的时间转换为时间对象？直接用Date的构造函数

```javascript
new Date("2015-5-7 9:04:10");

// Thu May 07 2015 09:04:10 GMT+0800 (CST)
```

想将一个标准的时间对象转换为unix时间戳？valueOf搞定之

```javascript
(new Date).valueOf();

// 1431004132641
```

## 转义`URI`

需要将url当做参数在路由中传递，现在转义之

```javascript
var url = encodeURIComponent('http://example.com/questions/newest')

// "http%3A%2F%2Fexample.com%2Fquestions%2Fnewest"
```

再反转义

```javascript
decodeURIComponent(url)
// "http://example.com/questions/newest"
```

## Number

希望保留小数点后的几位小数，不用再做字符串截取了，toFixed拿走

```javascript
number.toFixed()     // "12346"
number.toFixed(3)    // "12345.679"
number.toFixed(6)    // "12345.678900"
```

参数范围为0~20，不写默认0

## 类型检测

`typeof`是使用最频繁的类型检测手段

```javascript
typeof 3        // "number"
typeof "333"    // "string"
typeof false    // "boolean"
```

对于基本（简单）数据类型还是挺好的，但是一旦到了引用数据类型的时候，就不那么好使了

```javascript
typeof new Date()   // "object"
typeof []           // "object"
typeof {}           // "object"
typeof null         // "object"      
```

前三个还能忍，null居然也返回object，你是在逗我吗！！！（ps：其实这是JavaScript的bug 人艰不拆）

这时，我们会使用`instanceof`

```javascript
toString instanceof Function // true
(new Date) instanceof Date   // true
[] instanceof Object         // true
[] instanceof Array          // true
```

其实我们可以发现，[] 和 Object得到了true，虽然我们知道，[]也是对象，但是我们希望一个能更准确的判断类型的方法，现在它来了

---

使用Object.prototype.toString()来判断，为了让每一个对象都能通过检测，我们需要使用Function.prototype.call或者Function.prototype.apply的形式来调用

```javascript
var toString = Object.prototype.toString;

toString.call(new Date)    // "[object Date]"
toString.call(new Array)   // "[object Array]"
toString.call(new Object)  // "[object Object]"
toString.call(new Number)  // "[object Number]"
toString.call(new String)  // "[object String]"
toString.call(new Boolean) // "[object Boolean]"
```

要注意的是：toString方法极有可能被重写，所以需要使用的时候，
可以直接使用Object.prototype.toString()方法

## 实现继承

看一个官方给的例子

```javascript
//Shape - superclass
function Shape() {
  this.x = 0;
  this.y = 0;
}

Shape.prototype.move = function(x, y) {
    this.x += x;
    this.y += y;
    console.info("Shape moved.");
};

// Rectangle - subclass
function Rectangle() {
  Shape.call(this); //call super constructor.
}

Rectangle.prototype = Object.create(Shape.prototype);

var rect = new Rectangle();

rect instanceof Rectangle //true.
rect instanceof Shape //true.

rect.move(1, 1); //Outputs, "Shape moved."
```

通过call来获取初始化的属性和方法，通过Object.create来获取原型对象上的属性和方法

## [迭代](Array的应用场景.md)

ES5出了挺多的迭代函数，如`map`，`filter`，`some`，`every`，`reduce`等

## [Array](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array)

* `join`,`pop`,`push`,`reverse`,`shift`,`sort`,`splice`,`unshift`会改变原数组
* `concat`,`indexOf`,`lastIndexOf`,`slice`,`toString`不会改变原数组
* `map`,`filter`,`some`,`every`,`reduce`,`forEach`这些迭代方法不会改变原数组

几个注意点：

1. `shift`,`pop`会返回那个被删除的元素
2. `splice` 会返回被删除元素组成的数组，或者为空数组
3. `push` 会返回新数组长度
4. `some` 在有true的时候停止
5. `every` 在有false的时候停止
6. 上述的迭代方法可以在最后追加一个参数thisArg,它是执行 callback 时的 this 值。
