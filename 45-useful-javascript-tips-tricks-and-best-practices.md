# 45个实用的JavaScript技巧、窍门和最佳实践

## 1. 第一次给变量赋值时莫忘使用 `var` 关键字.

## 2. 使用 `===` 而不是 `==`

    [10] === 10    // is false
    [10]  == 10    // is true
    '10'  == 10    // is true
    '10' === 10    // is false
     []   == 0     // is true
     []  === 0     // is false
     ''   == false // is true but true == "a" is false
     ''  === false // is false

## 3. `undefined`, `null`, 0, `false`, `NaN`, `''` (empty string) 都是 `false` .

## 4. 行尾使用 `;`

## 5. 创建对象的构造函数

    function Person(firstName, lastName){
      this.firstName = firstName;
      this.lastName = lastName;
    }
    var Saad = new Person("Saad", "Mousliki");

## 6. 使用 `typeof`, `instanceof` 和 `constructor` 要万分小心.

    var arr = ["a", "b", "c"];
    typeof arr; // return "object"
    arr  instanceof Array // true
    arr.constructor(); // []

## 7. 创建一个自调用的函数 Self-calling Function

    (function(){
      // some private code that will be executed automatically
    })();

    (function(a,b){
      var result = a + b;
      return result;
    })(10,20);

## 8. 从数组中随机选取一个元素

    var items = [12, 548, 'a', 2, 5478, 'foo', 8852, , 'Doe', 2145, 119];
    var randomItem = items[Math.floor(Math.random() * items.length)];

## 9. 得到一个特定范围的随机值

    var x = Math.floor(Math.random() * (max - min + 1)) + min;

## 10. 生成一个[0,max]范围的数组

    var numbersArray = [], max = 100;
    for( var i=1; numbersArray.push(i++) < max;); // numbers = [1,2,3 ... 100]

## 11. 生成随机字符/数字的数组

    function generateRandomAlphaNum(len) {
      var rdmString = "";
      for( ; rdmString.length < len; rdmString += Math.random().toString(36).substr(2));
      return rdmString.substr(0, len);
    }

## 12. 打乱数组

    var numbers = [5, 458, 120, -215, 228, 400, 122205, -85411];
    numbers = numbers.sort(function(){ return Math.random() - 0.5});
    /* the array numbers will be equal for example to [120, 5, 228, -215, 400, 458, -85411, 122205] */

## 13. 字符串的 `trim` 函数

    String.prototype.trim = function(){return this.replace(/^\s+|\s+$/g, "");};

## 14. 将一个数组附加到另外一个数组上: `append` 函数

    var array1 = [12, "foo", {name "Joe"}, -2458];
    var array2 = ["Doe", 555, 100];
    Array.prototype.push.apply(array1, array2);
    /* array1 will be equal to  [12, "foo", {name "Joe"}, -2458, "Doe", 555, 100] */

## 15. 将 `arguments` 对象转为数组

    var argArray = Array.prototype.slice.call(arguments);

## 16. 校验参数是否为数字

    function isNumber(n){
      return !isNaN(parseFloat(n)) && isFinite(n);
    }

    // 另外一个技巧
    function isNumber(n) {
      return n === +n;
    }

## 17. 校验参数是否为数组

    function isArray(obj){
      return Object.prototype.toString.call(obj) === '[object Array]';
    }

    Array.isArray(obj); // its a new Array method

    var myFrame = document.createElement('iframe');
    document.body.appendChild(myFrame);
    var myArray = window.frames[window.frames.length-1].Array;
    var arr = new myArray(a,b,10); // [a,b,10]  
    // instanceof will not work correctly, myArray loses his constructor
    // constructor is not shared between frames
    arr instanceof Array; // false

## 18. 得到数组的最大或者最小元素

    var numbers = [5, 458, 120, -215, 228, 400, 122205, -85411];
    var maxInNumbers = Math.max.apply(Math, numbers);
    var minInNumbers = Math.min.apply(Math, numbers);

## 19. 清空数组

    var myArray = [12, 222, 1000];
    myArray.length = 0; // myArray will be equal to [].

## 20. 不要使用 `delete` 方法删除数组的元素

bad

    var items = [12, 548, 'a', 2, 5478, 'foo', 8852, , 'Doe', 2154, 119];
    items.length; // return 11
    delete items[3]; // return true
    items.length; // return 11
    /* items will be equal to [12, 548, "a", undefined × 1, 5478, "foo", 8852, undefined × 1, "Doe", 2154, 119] */

good

    var items = [12, 548, 'a', 2, 5478, 'foo', 8852, , 'Doe', 2154, 119];
    items.length; // return 11
    items.splice(3,1);
    items.length; // return 10
    /* items will be equal to [12, 548, "a", 5478, "foo", 8852, undefined × 1, "Doe", 2154, 119] */

## 21. 设置 `length` 实现截短数组

    var myArray = [12, 222, 1000, 124, 98, 10];
    myArray.length = 4; // myArray will be equal to [12, 222, 1000, 124].

    myArray.length = 10; // the new array length is 10
    myArray[myArray.length - 1]; // undefined

## 22. 使用逻辑 AND/OR 作为条件判断

    var foo = 10;
    foo == 10 && doSomething(); // is the same thing as if (foo == 10) doSomething();
    foo == 5 || doSomething(); // is the same thing as if (foo != 5) doSomething();

    function doSomething(arg1) {
      arg1 = arg1 || 10; // arg1 will have 10 as a default value if it’s not already set
    }

## 23. 使用 `map()` 函数遍历数组

    var squares = [1,2,3,4].map(function(val) {
      return val * val;
    }); 
    // squares will be equal to [1, 4, 9, 16]

## 24. 四舍五入，保留N位小数

    var num = 2.443242342;
    num = num.toFixed(4); // num will be equal to 2.4432

    // NOTE : the toFixed() function returns a string and not a number.

## 25. 浮点数问题

    0.1 + 0.2 === 0.3 // is false
    9007199254740992 + 1 // is equal to 9007199254740992
    9007199254740992 + 2 // is equal to 9007199254740994

    // You can use toFixed() and toPrecision() to resolve this problem.

## 26. 使用for-in循环检查对象的属性时需要注意

    for (var name in object) {  
      if (object.hasOwnProperty(name)) {
        // do something with name
      }  
    }

## 27. 逗号操作符

    var a = 0;
    var b = ( a++, 99 );
    console.log(a); // a will be equal to 1
    console.log(b); // b is equal to 99

## 28. 缓存需要查询或者计算的变量

    var navright = document.querySelector('#right');
    var navleft = document.querySelector('#left');
    var navup = document.querySelector('#up');
    var navdown = document.querySelector('#down');

## 29. 传给 `isFinite()` 的参数需要校验

    isFinite(0/0);       // false
    isFinite("foo");     // false
    isFinite("10");      // true
    isFinite(10);        // true
    isFinite(undefined); // false
    isFinite();          // false
    isFinite(null);      // true !!!

## 30. 避免数组的索引为负值

    var numbersArray = [1,2,3,4,5];
    var from = numbersArray.indexOf("foo"); // from is equal to -1
    numbersArray.splice(from,2); // will return [5]

## 31. JSON的序列化和反序列化

    var person = {name :'Saad', age : 26, department : {ID : 15, name : "R&D"} };
    var stringFromPerson = JSON.stringify(person);
    /* stringFromPerson is equal to "{"name":"Saad","age":26,"department":{"ID":15,"name":"R&D"}}" */
    var personFromString = JSON.parse(stringFromPerson);
    /* personFromString is equal to person object */

## 32. 避免使用 `eval()` 或者Function的构造函数

    var func1 = new Function(functionCode);
    var func2 = eval(functionCode);

## 33. 避免使用 `with()` (The good part)

## 34. 避免使用for-in遍历数组

bad

    var sum = 0;
    for (var i in arrayNumbers) {
      sum += arrayNumbers[i];
    }

good

    var sum = 0;
    for (var i = 0, len = arrayNumbers.length; i < len; i++) {
      sum += arrayNumbers[i];
    }

bad

    // for (var i = 0; i < arrayNumbers.length; i++)

## 35. 调用 `setTimeout()` 和 `setInterval()` 时传入函数而不是函数的字符串名字

bad

    setInterval('doSomethingPeriodically()', 1000);
    setTimeout('doSomethingAfterFiveSeconds()', 5000);

good

    setInterval(doSomethingPeriodically, 1000);
    setTimeout(doSomethingAfterFiveSeconds, 5000);

## 36. 使用 switch/case statement 而不是一堆的 if/else

## 37. 使用数字返回做 switch/case 的条件判断

    function getCategory(age) {
      var category = "";
      switch (true) {
        case isNaN(age):
          category = "not an age";
          break;
        case (age >= 50):
          category = "Old";
          break;
        case (age <= 20):
          category = "Baby";
          break;
        default:
          category = "Young";
          break;
      };
      return category;
    }
    getCategory(5); // will return "Baby"

## 38. 为创建的对象指定 `prototype`

    function clone(object) {
      function OneShotConstructor(){};
      OneShotConstructor.prototype= object;
      return new OneShotConstructor();
    } 
    clone(Array).prototype; // []

## 39. HTML 转义函数

    function escapeHTML(text) {
      var replacements = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        """: "&quot;",
        "'": "&#039;",
        "`": ""
      };
      return text.replace(/[&<>"`']/g, function(character) {
        return replacements[character];
      });
    }

## 40. 不要在循环内部使用try-catch-finally

bad

    var object = ['foo', 'bar'], i;
    for (i = 0, len = object.length; i <len; i++) {
      try {
        // do something that throws an exception
      }
      catch (e) {
        // handle exception
      }
    }

good

    var object = ['foo', 'bar'], i;
    try {
      for (i = 0, len = object.length; i <len; i++) {
        // do something that throws an exception
      }
    }
    catch (e) {
      // handle exception
    }

## 41. 为XMLHttpRequests设置超时

    var xhr = new XMLHttpRequest ();
    xhr.onreadystatechange = function () {
      if (this.readyState === 4) {
        clearTimeout(timeout);
        // do something with response data
      }
    }
    var timeout = setTimeout( function () {
      xhr.abort(); // call error callback
    }, 60 * 1000 /* timeout after a minute */ );
    xhr.open('GET', url, true);
    xhr.send();

## 42. 处理WebSocket超时

    var timerID = 0;
    function keepAlive() {
      var timeout = 15000;
      if (webSocket.readyState === webSocket.OPEN) {
        webSocket.send('');
      }
      timerId = setTimeout(keepAlive, timeout);
    }
    function cancelKeepAlive() {
      if (timerId) {
        cancelTimeout(timerId);
      }
    }

## 43. 牢记，原始运算符始终比函数调用要高效。使用[VanillaJS](http://vanilla-js.com/)。

bad

    var min = Math.min(a,b);
    A.push(v);

good

    var min = a < b ? a : b; 
    A[A.length] = v;

## 44. 编码时不要忘记使用代码美化工具。发布前使用JSLint和minification(如JSMin)。

## 45. JavaScript如此美好，快来看看学习的一些资源吧。

- [Code Academy JavaScript tracks](http://www.codecademy.com/tracks/javascript)
- [Eloquent JavaScript by Marjin Haverbeke](http://eloquentjavascript.net/)
- [Advanced JavaScript by John Resig](http://ejohn.org/apps/learn/)

### 参考

- [JavaScript Performance Best Practices (CC)](http://developer.nokia.com/Community/Wiki/JavaScript_Performance_Best_Practices)
- [Google Code JavaScript tips](https://code.google.com/p/jslibs/wiki/JavascriptTips)
- [StackOverFlow tips and tricks](http://stackoverflow.com/questions/724826/javascript-tips-and-tricks-javascript-best-practices)
- [TimeOut for XHR](http://stackoverflow.com/questions/6888409/settimeout-for-xhr-requests)
