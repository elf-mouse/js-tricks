# 常见的数组操作函数及用法

## 数组创建

```javascript
var array1 = new Array();
var array2 = [];

var array3 = new Array("num1","num2","num3"); // ["num1", "num2", "num3"]

var array4 = new Array(5);
array4.length; // 5
```

## 数组检测

```javascript
var array5 = [];
array5 instanceof Array; // true

var array6 = [];
Array.isArray(array6); // true
```

## 获取数组长度

```javascript
var array7 = [1,2,3,4];
array7.length; // 4

var array8 = [1,2,3,4,5];
console.log(array8.length); // 5
array8.length = 8;
array8; // [1, 2, 3, 4, 5, undefined × 3]
 
array8.length = 3;
array8; // [1,2,3]
```

## 获取或者设置数组值

```javascript
var array9 = [1,2,3,4,5,6];
array9[2]; // 3
array9[2] = 4;
array9[2]; // 4
```

## 数组字符串转换

```javascript
var array10 = [1,2,3,4];
array10.toString(); // "1,2,3,4"

var array11 = [1,2,3,4];
array11.join("||"); // "1||2||3||4"
```

## 数组添加和删除项

```javascript
var array12 = [1,2,3,4];
array12[5] = 5;
array12[6] = 6;
array12; // [1, 2, 3, 4, undefined × 1, 5, 6]

var array13 = [1,2,3,4];
array13.push(5,6);
array13; // [1, 2, 3, 4, 5, 6]

var array14 = [1,2,3,4];
array14.pop(); // 4
array14.pop(); // 3
array14; // [1, 2]

var array15 = [1,2,3,4,5];
delete array15[1];
array15; // [1, undefined × 1, 3, 4, 5]

var array16 = [1,2,4,5,6];
array16.shift(); // 1
array16; // [2,4,5,6]

var array17 = [1,2,3,4];
array17.unshift(2); // 返回数组长度5，下同
array17.unshift(3);
array17.unshift(4);
array17; // [4, 3, 2, 1, 2, 3, 4]
```

## 数组翻转和排序

```javascript
var array18 = [21,14,54,35,23,44,103];
array18.reverse(); // [103, 44, 23, 35, 54, 14, 21]
array18.sort(); // [103, 14, 21, 23, 35, 44, 54]
```

* 注意，数组默认排序并不是大小，而是按照对应字符串逐个编码排序的。你可以通过给sort()传递一个比较函数，类改变规则，如下：

```javascript
var array18 = [21,14,54,35,23,44,103];
array18.reverse(); // [103, 44, 23, 35, 54, 14, 21]
array18.sort(function(a,b){return a - b;}); // [14, 21, 23, 35, 44, 54, 103]
```

## 数组连接

```javascript
var array19 = [1,2,3];
var array20 = [4,5];
var array21 = array19.concat(array20); // [1, 2, 3, 4, 5]
```

* 注意原数组都没有也不会发生改变。

## 数组分割

```javascript
var array22 = [1,2,3,4,5,6];
var array23 = array22.slice(4); // 5,6
var array24 = array22.slice(2,4); // 3,4
```

* 注意，分割的数组包含slice()的起始位置而不包含结束位置。

## 最强大的`splice()`

①添加元素

```javascript
var array25 = [1,2,3,4,5,6];
array25.splice(2,0,88,77); // [] 返回被删除的元素，这里没有删除，返回为空
array25; // [1, 2, 88, 77, 3, 4, 5, 6]
```

②修改元素

```javascript
var array26 = [1,2,3,4,5,6,7];
array26.splice(2,2,33,44); // [3,4]
array26; // [1, 2, 33, 44, 5, 6, 7]
```

③删除元素

```javascript
var array27 = [1,2,3,4,5,6,7];
array27.splice(2,2); // [3, 4]
array27; // [1, 2, 5, 6, 7]
```
