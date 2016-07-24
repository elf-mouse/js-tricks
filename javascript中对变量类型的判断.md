以下几个变量差不多包含了我们在实际编码中常用的类型。

```js
var num  = 123;
var str  = 'abcdef';
var bool = true;
var arr  = [1, 2, 3, 4];
var json = {name:'wenzi', age:25};
var func = function(){ console.log('this is function'); }
var und  = undefined;
var nul  = null;
var date = new Date();
var reg  = /^[a-zA-Z]{5,20}$/;
var error= new Error();
```

### 1. 使用typeof检测

```js
console.log(
  typeof num,
  typeof str,
  typeof bool,
  typeof arr,
  typeof json,
  typeof func,
  typeof und,
  typeof nul,
  typeof date,
  typeof reg,
  typeof error
);
// number string boolean object object function undefined object object object object
```

从输出的结果来看，arr, json, nul, date, reg, error 全部被检测为`object`类型，其他的变量能够被正确检测出来。当需要变量是否是`number`, `string`, `boolean`, `function`, `undefined`, `json`类型时，可以使用__typeof__进行判断。其他变量是判断不出类型的，包括null。

还有，__typeof__是区分不出`array`和`json`类型的。因为使用typeof这个变量时，array和json类型输出的都是`object`。

### 2. 使用instance检测

```js
function Person(){

}
var Tom = new Person();
console.log(Tom instanceof Person); // true

function Student(){

}
Student.prototype = new Person();
var John = new Student();
console.log(John instanceof Student); // true
console.log(John instancdof Person);  // true
```

```js
console.log(
  num instanceof Number,
  str instanceof String,
  bool instanceof Boolean,
  arr instanceof Array,
  json instanceof Object,
  func instanceof Function,
  und instanceof Object,
  nul instanceof Object,
  date instanceof Date,
  reg instanceof RegExp,
  error instanceof Error
)
// num : false
// str : false
// bool : false
// arr : true
// json : true
// func : true
// und : false
// nul : false
// date : true
// reg : true
// error : true
```

从上面的运行结果我们可以看到，num, str和bool没有检测出他的类型，但是我们使用下面的方式创建num，是可以检测出类型的：

```js
var num = new Number(123);
var str = new String('abcdef');
var boolean = new Boolean(true);
```

同时，我们也要看到，und和nul是检测的Object类型，才输出的true，因为js中没有`Undefined`和`Null`的这种全局类型，他们und和nul都属于Object类型，因此输出了true。

### 3. 使用constructor检测

```js
function Person(){

}
var Tom = new Person();

// undefined和null没有constructor属性
console.log(
  Tom.constructor==Person,
  num.constructor==Number,
  str.constructor==String,
  bool.constructor==Boolean,
  arr.constructor==Array,
  json.constructor==Object,
  func.constructor==Function,
  date.constructor==Date,
  reg.constructor==RegExp,
  error.constructor==Error
);
// 所有结果均为true
```

不过使用constructor也不是保险的，因为constructor属性是可以被修改的，会导致检测出的结果不正确，例如：

```js
function Person(){

}
function Student(){

}
Student.prototype = new Person();
var John = new Student();
console.log(John.constructor==Student); // false
console.log(John.constructor==Person);  // true
```

同时，使用instaceof和construcor,被判断的array必须是在当前页面声明的！比如，一个页面（父页面）有一个框架，框架中引用了一个页面（子页面），在子页面中声明了一个array，并将其赋值给父页面的一个变量，这时判断该变量，Array == object.constructor;会返回false；
原因：

1. array属于引用型数据，在传递过程中，仅仅是引用地址的传递。
2. 每个页面的Array原生对象所引用的地址是不一样的，在子页面声明的array，所对应的构造函数，是子页面的Array对象；父页面来进行判断，使用的Array并不等于子页面的Array；切记，不然很难跟踪问题！

### 4. 使用Object.prototype.toString.call

```js
console.log(
  Object.prototype.toString.call(num),
  Object.prototype.toString.call(str),
  Object.prototype.toString.call(bool),
  Object.prototype.toString.call(arr),
  Object.prototype.toString.call(json),
  Object.prototype.toString.call(func),
  Object.prototype.toString.call(und),
  Object.prototype.toString.call(nul),
  Object.prototype.toString.call(date),
  Object.prototype.toString.call(reg),
  Object.prototype.toString.call(error)
);
// '[object Number]' '[object String]' '[object Boolean]' '[object Array]' '[object Object]'
// '[object Function]' '[object Undefined]' '[object Null]' '[object Date]' '[object RegExp]' '[object Error]'
```

从输出的结果来看，`Object.prototype.toString.call(变量)`输出的是一个字符串，字符串里有一个数组，第一个参数是Object，第二个参数就是这个变量的类型，而且，所有变量的类型都检测出来了，我们只需要取出第二个参数即可。或者可以使用`Object.prototype.toString.call(arr)=="object Array"`来检测变量arr是不是数组。

> Object.prototype.toString的行为：首先，取得对象的一个内部属性\[[Class]\]，然后依据这个属性，返回一个类似于"[object Array]"的字符串作为结果（看过ECMA标准的应该都知道，\[[]\]用来表示语言内部用到的、外部不可直接访问的属性，称为“内部属性”）。利用这个方法，再配合call，我们可以取得任何对象的内部属性\[[Class]\]，然后把类型检测转化为字符串比较，以达到我们的目的。

### 5. jquery中$.type的实现

```js
console.log(
  $.type(num),
  $.type(str),
  $.type(bool),
  $.type(arr),
  $.type(json),
  $.type(func),
  $.type(und),
  $.type(nul),
  $.type(date),
  $.type(reg),
  $.type(error)
);
// number string boolean array object function undefined null date regexp error
```

---

类型判断 | typeof | instanceof | constructor | toString.call | $.type
-------- | ------ | ---------- | ----------- | ------------- | ------
num | number | false | true | [object Number] | number
str | string | false | true | [object String] | string
bool | boolean | false | true | [object Boolean] | boolean
arr | object | true | true | [object Array] | array
json | object | true | true | [object Object] | object
func | function | true | true | [object Function] | function
und | undefined | false | - | [object Undefined] | undefined
nul | object | false | - | [object Null] | null
date | object | true | true | [object Date] | date
reg | object | true | true | [object RegExp] | regexp
error | object | true | true | [object Error] | error
优点 | 使用简单，能直接输出结果 | 能检测出复杂的类型 | 基本能检测出所有的类型 | 检测出所有的类型 | -
缺点 | 检测出的类型太少 | 基本类型检测不出，且不能跨iframe | 不能跨iframe，且constructor易被修改 | IE6下undefined,null均为Object | -

这样对比一下，就更能看到各个方法之间的区别了，而且`Object.prototype.toString.call`和`$type`输出的结果真的很像。我们来看看jquery（2.1.2版本）内部是怎么实现$.type方法的：

```js
// 实例对象是能直接使用原型链上的方法的
var class2type = {};
var toString = class2type.toString;

// 省略部分代码...

type: function( obj ) {
  if ( obj == null ) {
    return obj + "";
  }
  // Support: Android<4.0, iOS<6 (functionish RegExp)
  return (typeof obj === "object" || typeof obj === "function") ?
    (class2type[ toString.call(obj) ] || "object") :
    typeof obj;
},

// 省略部分代码...

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
  class2type[ "[object " + name + "]" ] = name.toLowerCase();
});
```

我们先来看看`jQuery.each`的这部分：

```js
// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
  class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

//循环之后，`class2type`的值是：
class2type = {
  '[object Boolean]' : 'boolean',
  '[object Number]'  : 'number',
  '[object String]'  : 'string',
  '[object Function]': 'function',
  '[object Array]'   : 'array',
  '[object Date]'    : 'date',
  '[object RegExp]'  : 'regExp',
  '[object Object]'  : 'object',
  '[object Error]'   : 'error'
}
```

再来看看`type`方法：

```js
// type的实现
type: function( obj ) {
  // 若传入的是null或undefined，则直接返回这个对象的字符串
  // 即若传入的对象obj是undefined，则返回"undefined"
  if ( obj == null ) {
    return obj + "";
  }
  // Support: Android<4.0, iOS<6 (functionish RegExp)
  // 低版本regExp返回function类型；高版本已修正，返回object类型
  // 若使用typeof检测出的obj类型是object或function，则返回class2type的值，否则返回typeof检测的类型
  return (typeof obj === "object" || typeof obj === "function") ?
    (class2type[ toString.call(obj) ] || "object") :
    typeof obj;
}
```

当`typeof obj === "object" || typeof obj === "function"`时，就返回`class2type[ toString.call(obj) ]`。到这儿，我们就应该明白为什么Object.prototype.toString.call和$.type那么像了吧，其实jquery中就是用`Object.prototype.toString.call`实现的，把'[object Boolean]'类型转成'boolean'类型并返回。若class2type存储的没有这个变量的类型，那就返回"object"。
除了"object"和"function"类型，其他的类型则使用typeof进行检测。即`number`, `string`, `boolean`类型的变量，使用typeof即可。
