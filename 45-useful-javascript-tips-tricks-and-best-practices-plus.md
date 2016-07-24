# 附加技巧

## 目录

1. 两个感叹号
2. 把数字变字符串，把字符串变数字
3. 把数组转换成CSV字符串
4. 转换CSV字符串为数组
5. 移除数组指定索引
6. 移除数组特定的值
7. 根据方法名调用方法
8. 检查Form是否dirty
9. 检查字符串是否包含子串
10. 移除数组的重复数据
11. 记不住apply和call的区别
12. 双波浪号~~是取整

## 两个感叹号

    !![] // true
    ![]  // false

    !!{} // true
    !{}  // false

    !!false // false
    !false  // true

    !!true // true
    !true  // false

    !!undefined // false
    !undefined  // true

## 把数字变字符串，把字符串变数字

    // to number
    s = s - 0;
    s = +s;

    // to string
    n = n + "";

## 把数组转换成CSV字符串

    var fruits = ['apple', 'peaches', 'oranges', 'mangoes'];

    var str1 = fruits.valueOf();
    // print str1: apple,peaches,oranges,mangoes

    var str2 = fruits.join("|");
    // print str2: apple|peaches|oranges|mangoes

## 转换CSV字符串为数组

    var str = "apple, peaches, oranges, mangoes";

    var fruitsArray = str.split(",");
    // print fruitsArray[0]: apple

## 移除数组指定索引

    function removeByIndex(arr, index) {
      arr.splice(index, 1);
    }

    var test = [];
    test[0] = 'Apple';
    test[1] = 'Ball';
    test[2] = 'Cat';
    test[3] = 'Dog';

    alert("Array before removing elements: " + test);

    removeByIndex(test, 2);

    alert("Array after removing elements: " + test);

## 移除数组特定的值

    function removeByValue(arr, val) {
      for(var i=0; i<arr.length; i++) {
        if(arr[i] === val) {
          arr.splice(i, 1);
          break;
        }
      }
    }

    var somearray = ["mon", "tue", "wed", "thur"];

    removeByValue(somearray, "tue");

    // somearray will now have "mon", "wed", "thur"

    // 为Array类增加removeByValue方法
    Array.prototype.removeByValue = function(val) {
      for(var i=0; i<this.length; i++) {
        if(this[i] == val) {
          this.splice(i, 1);
          break;
        }
      }
    };

## 根据方法名调用方法

    var strFun = "someFunction"; // Name of the function to be called
    var strParam = "this is the parameter"; // Parameters to be passed in function

    // Create the function
    var fn = window[strFun];

    // Call the function
    fn(strParam);

## 检查Form是否dirty

    /**
     * Determines if a form is dirty by comparing the current value of each element
     * with its default value.
     *
     * @param {Form} form the form to be checked.
     * @return {Boolean} <code>true</code> if the form is dirty, <code>false</code>
     *                   otherwise.
     */
    function formIsDirty(form) {
      for (var i = 0; i < form.elements.length; i++) {
        var element = form.elements[i];
        var type = element.type;
        if (type == "checkbox" || type == "radio") {
          if (element.checked != element.defaultChecked) {
            return true;
          }
        }
        else if (type == "hidden" || type == "password" ||
                 type == "text" || type == "textarea") {
          if (element.value != element.defaultValue) {
            return true;
          }
        }
        else if (type == "select-one" || type == "select-multiple") {
          for (var j = 0; j < element.options.length; j++) {
            if (element.options[j].selected !=
                element.options[j].defaultSelected) {
              return true;
            }
          }
        }
      }
      return false;
    }

## 检查字符串是否包含子串

    if (!Array.prototype.indexOf) {
      Array.prototype.indexOf = function(obj, start) {
        for (var i = (start || 0), j = this.length; i < j; i++) {
          if (this[i] === obj) { return i; }
        }
        return -1;
      }
    }

    if (!String.prototype.contains) {
      String.prototype.contains = function (arg) {
        return !!~this.indexOf(arg);
      };
    }

## 移除数组的重复数据

    function removeDuplicates(arr) {
      var temp = {};
      for (var i = 0; i < arr.length; i++)
        temp[arr[i]] = true;

      var r = [];
      for (var k in temp)
        r.push(k);
      return r;
    }

    // Usage
    var fruits = ['apple', 'orange', 'peach', 'apple', 'strawberry', 'orange'];
    var uniquefruits = removeDuplicates(fruits);
    // print uniquefruits ['apple', 'orange', 'peach', 'strawberry'];

## 记不住apply和call的区别

[Think of a in `apply` for **array** of args and c in `call` for **columns** of args](http://stackoverflow.com/questions/1986896/what-is-the-difference-between-call-and-apply).

## 双波浪号~~是取整

[单波浪号是按位非，双波浪号是取整。](http://rocha.la/JavaScript-bitwise-operators-in-practice)

    ~~2   === Math.floor(2); // true, 2
    ~~2.4 === Math.floor(2); // true, 2
    ~~3.9 === Math.floor(3); // true, 3

### 参考文档

[21 JavaScript Tips and Tricks for JavaScript Developers](http://viralpatel.net/blogs/javascript-tips-tricks/)
