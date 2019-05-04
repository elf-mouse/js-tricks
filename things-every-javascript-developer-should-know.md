# 每个 Javascript 开发者都应当知道的那些事

## 如何 FizzBuzz

> 译者注：FizzBuzz 是英国学校里常玩的游戏，从 1 数到 100，如果遇见了 3 的倍数要说 Fizz，5 的倍数到说 Buzz，如果即是 3 的倍数又是 5 的倍数要说 FizzBuzz。

注意：在早些时候这个实现就有稍微改动。使用条件 if 语句，如果它不是一个条件的倍数，数字被打印出来。现有的解决方案可以工作，但没有打印不满足条件的数字或使用条件 if。

```js
for (var i = 1; i <= 100; i++) {
  if (i % 15 === 0) {
    console.log("FizzBuzz");
  } else if (i % 3 === 0) {
    console.log("Fizz");
  } else if (i % 5 === 0) {
    console.log("Buzz");
  } else {
    console.log(i);
  }
}
```

## `==` 和 `===` 的区别

`==` 双重等于(又名松等于)不会比较类型，它将在语句中将值进行类型转换。这就是所谓的强制类型转换，它被认为是一个有害的操作。

```js
console.log(24 == "24"); // true
```

`===` 三重等于(又名严格相等)将比较类型，但不会做类型转换，意味着他们在不被转换的情况下比较。因为没有强制类型转换，三重等于速度更快，作为推荐的方法用来比较各种各样的值。这意味着如果条件等于`true`，两种类型需要相同。

```js
console.log(24 === "24"); // false
```

## 如何在不使用第三方库的情况下查询 DOM

| Javascript 原生方法               | 功能                                                                                         |
| --------------------------------- | -------------------------------------------------------------------------------------------- |
| `document.getElementById`         | 通过 ID 查找元素的经典查询。                                                                 |
| `document.getElementsByClassName` | 通过 className 在 DOM 中查找元素。                                                           |
| `document.querySelector`          | 这是一个很好的方法。它拥有 jQuery \$()的所有力量，它是原生的。它将只返回它发现的第一个元素。 |
| `document.querySelectorAll`       | 几乎和上面的方法一样，除了它返回多个元素，而不仅仅是第一个。                                 |
| `document.getElementsByTagName`   | 这允许查询特定标记名的元素。想在页面或 span 标签中找到所有 DIV 元素吗？这是你想要的方法。    |

值得一提的是[querySelector](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector)和[querySelectorAll](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll)方法也可以使用在一个元素上，意味着你可以使用这些方法查询一个元素的内容。

## 变量提升

Javascript 是一种有趣的语言，变量的声明，会将声明提升到作用域的顶部。这意味着你可以在当前作用域(比如一个函数被认为是自己的作用域)定义它之前就引用一个变量。

作为一个经验法则：永远在你需要的作用域顶部定义你的变量。如果你在脚本文件(或者在函数中)的顶部使用 `use strict`；而你在一个变量被定义之前使用它将抛出一个错误。

一如既往，Mozilla 开发人员文档有一些很好的关于语法和类型的 JavaScript 文章，[这里](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#Variable_scope)有一篇关于变量提升的内容。

## 如何使用浏览器的开发者工具

- Chrome
- Firefox
- 后期版本的 Internet Explorer

## 控制台命令

| console                  | 功能                                                                                                                                                  |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `console.log`            | 基本的 logging ，用来记录在我的代码中发生的动作的基本消息。格式化标识符在 console 调用时也被支持。                                                    |
| `console.error`          | 在代码中记录错误。我在 AJAX 请求的错误回调和其他会抛出错误的地方使用 console.error。和 console.log 类似，这个方法还包括一个堆栈，用于跟踪错误在哪里。 |
| `console.dir`(对象)      | 这个方便的方法可以在你的控制台窗口打印一个 Javascript 对象的内容。很方便。                                                                            |
| `console.group`(标题)    | 这允许你通过一个可选的标题创建一组的控制台日志记录命令。意思你可以将类似的日志信息分组，比如当一段代码负责一个任务时。                                |
| `console.groupCollapsed` | 和上述方法完全相同，除了最开始是折叠的，没有打开。                                                                                                    |
| `console.groupEnd`       | 这允许你结束上面定义的组。                                                                                                                            |
| `console.time`(标签)     | 允许你测量一段特定的 Javascript 代码运行需要多长时间，以毫秒为单位。对测量可能的瓶颈方法尤其有效。                                                    |
| `console.timeEnd`(标签)  | 类似于 groupEnd 方法，这允许你停止计时器记录功能，同时运行时间将在控制台打印出来。                                                                    |
| `copy`(字符串)           | 在 Chrome 和 Firefox 控制台有这个方法，它允许你将一个字符串的内容复制到剪贴板。打开开发工具，试试它，它有时可以派上用场。                             |

## 理解 `this`

在更传统的编程语言中`this`是由类实例化的当前对象的一个引用。但 Javascript 并不是一个传统的编程语言，所以`this`实际上属于拥有方法的对象。

在 Javascript 中记住`this`的最简单方法就是**记住它的拥有者，即父亲**。`this`的值将总是等于拥有者，除非通过`call`，`apply`或者`bind`改变

在下面这个函数中，`this`实际上是`window`

```js
function myFunction() {
  console.log(this === window); // true
}
myFunction();
```

将`this`的值改变成完全属于它自己的新对象(而不是窗口)

```js
function myFunction() {
  console.log(this === window); // false
}
new myFunction();
```

在以下示例中，我们将创建一个虚构的 API 库，它有一个方法从服务器获取数据。如你所见，我们正在创建一个叫 API 的对象并添加了方法。

```js
var API = {
  getData: function() {
    console.log(this === window); // false
    console.log(this === API); // true
  }
};
API.getData();
```

永远不要认为`this`的值总是相同的。它基于函数如何被调用而改变，但是如果你使用`bind`，`this`的值总是等于`bing`方法上指定的值。

关于”this”的深入阅读，可以看看 Quirksmode 上的[这篇文章](http://www.quirksmode.org/js/this.html)。它运行了一些例子并且比我解释得更好。Mozilla 开发人员文档也有一些关于“this”的很棒解释，同时有例子（在[这里](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)）。

## `'use strict';`

在[Mozilla Developer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode)这里有一整篇关于这个主题的文章，我恳求你阅读，因为它比我深入了更多的细节。

## 如何写各种类型的循环

Javascript 中不同类型的循环:

- `for`
- `for..in`
- `for..of` (added in ES6)
- `forEach`
- `while`
- `do..while`

### For..循环

```js
for (condition 1; condition 2; condition 3) {
  // Your code
}
```

### For..in 循环

```js
var person = {
  first_name: "Dwayne",
  last_name: "Charrington",
  age: 27,
  star_sign: "Aquarius"
};

// The below loop will output:
// "Dwayne"
// "Charrington"
// 27
// "Aquarius"

for (var p in person) {
  if (person.hasOwnProperty(p)) {
    console.log(person[p]);
  }
}
```

### For..of 循环

```js
var fruits = ["orange", "apple", "squash", "pear"];

for (var fruit of fruits) {
  console.log(fruit);
}
```

### forEach 循环

```js
var fruits = ["apple", "banana", "orange", "grapes", "pear", "passionfruit"];

// The three values on the callback function are:
// element - The element being traversed
// index - The current index of the item in the array starting at 0
// array - The array being traversed (probably mostly irrelevant)

fruits.forEach(function(element, index, array) {
  console.log(index, element);
});
```

forEach 的唯一的缺点是你不能打破这个循环。如果你想使用 ES5 的语法创建一个循环，可以用 Array.every，你可以在[这里](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach#Example:_Breaking_a_loop)阅读使用方法。

### While 循环

```js
var i = 20;

while (i--) {
  console.log(i);
}
```

### Do. .While 循环

while 循环不会保证一定运行。意思是如果你为 while 循环提供了一个等于 false 的表达式，它将不会运行。而 do…while 被保证至少运行一次。

再次 Mozilla 开发人员文档有一篇关于大部分的循环的优秀文章，在[这里](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration)。

## 基本方法和任务

### 处理字符串

| String                                                        | 功能                                                                                       |
| ------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| `String.replace(regexp | replaceThis，replaceWith |callback)` | 允许你用另一个值替换一个值，甚至使用一个正则表达式。                                       |
| `String.concat(‘string1’,‘string2’,etc…)`                     | 这个方法允许你将一个或多个字符串值连接起来。                                               |
| `String.indexOf(value)`                                       | 这个方法允许你找到指定值第一次出现的位置，如果没有找到返回-1。                             |
| `String.slice(startIndex,endIndex)`                           | 这个方法做了它表达的做法。它需要一个开始索引(从零)和一个结束索引，并返回一个新的字符串块。 |
| `String.split(separator,limit)`                               | 这个方法将一个字符串分割成由一个或多个条目组成的数组。                                     |
| `String.substr(startIndex,length)`                            | 该方法将返回字符串中从 startIndex 开始到指定长度的字符。                                   |
| `String.toLowerCase`                                          | 这个方法将返回调用字符串的小写。                                                           |
| `String.toUpperCase`                                          | 这个方法将返回调用字符串的大写。                                                           |
| `String.trim`                                                 | 调用字符串开头和结尾的空格将被删除。                                                       |

### 使用数组

| Array                           | 功能                                                                                                           |
| ------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `Array.pop`                     | 删除数组中的最后一个元素并返回它                                                                               |
| `Array.shift`                   | 删除数组中的第一个元素并返回它                                                                                 |
| `Array.push(val1,val2…)`        | 在一个数组的尾部添加一个或多个条目。该方法运行后将始终返回新数组长度。你可以指定多个逗号分隔值。               |
| `Array.reverse`                 | 反转数组的顺序(第一个元素成为最后一个同时最后一个成为第一个，等等)。                                           |
| `Array.sort([compareFunction])` | 允许你通过指定一个比较函数进行数组排序，比较函数能访问数组中需要排序的每一个值。                               |
| `Array.join(separator)`         | 这个方法在数组中取一个或多个条目，并返回一个由分隔符连接的字符串值。如果你不指定一个分隔符，缺省值是一个逗号。 |
| `Array.indexOf(value)`          | 这个方法能得到指定值第一次出现的位置，如果没有找到返回-1。                                                     |

还有其他处理数组的方法没有列出来，你应该在[这里](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#Methods)进一步阅读。有一些添加到 ES6 的令人兴奋的新方法没有列在这里，还有其他应用于具体用例的数组方法。

## Call 和 Apply 之间的区别

这两个方法容易误解，同时吓到了很多开发者。虽然可以不使用 call 或 apply，但他们特别方便，因为它们允许你在运行期间调用方法时改变上下文中的 this 值。

两者的区别仅仅是微妙的，但有一个区别。使用 call 方法将允许你在调用一个函数时提供无限逗号分隔的参数。

使用 apply 方法将允许你调用一个方法时使用一个数组作为提供的参数。这个方法在你想使用一个数组作为方法调用参数以及改变上下文的 this 时非常棒。

如果你只是想要在函数上使用一个数组的值作为参数，ES6 提供了 spread operator(传播算子)。它不允许你更改上下文的 this，但是它允许你使用一个数组值作为参数。

**An example using .call:**

```js
function myFunc() {
  console.log(arguments);
}
myFunc.call(this, 1, 2, 3, 4, 5);
```

**An example using .apply:**

```js
function myFunc() {
  console.log(arguments);
}
myFunc.apply(this, [1, 2, 3, 4, 5]);
```

ES6 的新特性意味着未来只在非常有限的情况下，我们需要使用 call 或 apply。感谢 [spread operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator)，[arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) 和从 ES5 就能用的[bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)功能。

## 熟悉框架/库

## Node.js

毫无疑问 Node.js 已经证明了它的价值，并没有半路失败的迹象(除非 IO.js 干掉它)。几乎所有前端工具是在其基础上建立的，并使用 Node 包管理器，如果你一直还没有学习 Node.js，你应该重新考虑。

因为 Node.js 的内核是 Javascript，学习曲线是不存在的，如果你已经有一点 Javascript。你会发现你在配置 app 中需要使用的包上花了更多的时间，而不是在学习 Node.js。

我个人认为 Node.js 是每个开发人员在 2015 年需要掌握一种技巧。我不是说过于复杂的深入了解它，但足以用它来开发服务器，原型，测试和其他用例，这些地方 Node.js 将有利于你的工作流。

当然还有一个叫做 IO.js 的 Node.js 分支，目前是完全相同的。最后，你只是在编写 Javascript，尽管有一些小的差异。

## 测试

- [Karma](http://karma-runner.github.io/)

## 工具

2015 年，作为一个 Javascript 开发人员意味着知道如何使用 task runners，transpilers,分析器和其他工具，我们借助它们编写最好的 Javascript 代码。

有时浏览器中捆绑的工具并不总是准确地描述你的应用程序内部发生了什么。有时你需要使用专业的工具来获得应用程序的内部工作原理的更详细信息。

有用的工具(如果你还没有使用它们);Gulp，Webpack 和 BabelJS。这里还有很多工具，task runners 比如 Gulp 和 Grunt，他们对现代 Javascript 的繁重工作流特别有帮助(如果你还没有使用它们)。

下载一个单独的 Javascript 文件，包含在我们的页面中的日子一去不复返了。这个时期包管理器比如 NPM 和 Bower 被用来替代手动下载脚本。

我们使用 task runners 来合并和压缩脚本，测试使用单独的工具，工作通常更有组织性。

伴随这样的 Javascript 工具，编写同构的 Javascript(服务器和前端之间共享代码库)。

## ES6，又名 ECMAScript 6，又名 ESNext

尽管浏览器在 ECMAScript 6 大部分好的特性得到支持之前，还有一段时间要走，我们现在可以使用 transpilers 开始编写 ES6 代码。

熟悉所有新的 API 和方法;字符串，数组和其他很酷的功能，比如 WeakMaps，Symbols 和 Classes。在 2015 年，作为一名开发人员意味着与 Javascript 语言的变化保持同步。

尤其熟悉 Classes 的概念。他们只是原型继承上的语法糖(目前)，但也有打算在 ES7 中提升 classes，使它们更有用，语法糖更少。

## 进一步的阅读

在这之外还有很多学习 Javascript 深入部分的资源，很多比这篇文章更好且更深刻。

- [You Might Not Need jQuery](http://youmightnotneedjquery.com/)
- [Mozilla Developer: Javascript Reference & Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [JS: The Right Way](http://jstherightway.org/)
- [AirBnb’s Javascript Styleguide](https://github.com/airbnb/javascript)
