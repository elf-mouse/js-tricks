# Array的应用场景

## 目的

> 相信在网上都有很多的Array的api介绍 ， 这里就应用场景举例说明

## 前提

了解`apply`和`call`

> 一句话概括：用别人的方法，完成自己的功能。

```javascript
function Student(name,gender,age){
    this.name = name;
    this.gender = gender;
    this.age = age;

    this.introduce = function () {
        console.log('name : ' + this.name + ',
                   gender : ' + this.gender + ', age : ' +this.age);
    }
}

function Empolyee(name,gender,age,work){

    Student.apply(this,arguments);          //apply方法
    //Student.call(this,name,gender,age);   //call方法

    this.work = work;

}

var e = new Empolyee('lee','male','26','programmer');
console.log(e)
e.introduce();
```

用Student构造函数的属性和方法，来为自己所用！

你可能发现apply和call很相似，apply接受一个数组，call接受多个值。

应用：得到一组数的最大值

```javascript
var array = [1,5,2,3];

// 全局写法
console.log(Math.max.apply(this,array));

// 不指定函数参数写法
function getMax(){
    return Math.max.apply(this,Array.prototype.slice.apply(arguments));
}
console.log(getMax(1,2,3,45,3));

// 指定参数写法
function getMax(array){
    return Math.max.apply(this,array);
}
console.log(getMax(array));
```

## 正文

### 扁平化规则数组

有这样的数组，需要将其扁平化

```javascript
var array = [[1,2],[3,4],[5,6]];

var result = array.reduce(function (p, c) {
    return p.concat(c);
});
console.log(result);
// [ 1, 2, 3, 4, 5, 6 ]
```

注解：reduce的callback中，p指代上一个元素，c指代当前元素。

* 第一次迭代：p -- > [1,2]      c -- > [3,4]
* 第二次迭代：p -- > [1,2,3,4]  c -- > [5,6]

### 扁平化随机数组

既然有规则数组，那么就肯定有不规则数组，这就需要递归操作

```javascript
var array = [1,[2,[3,4],[1,9,8],[' ',3]],1];
// 随机嵌套数组

function flatten(array){
    var result = [];

    array.map(function(ele){
        if(!Array.isArray(ele)){     //判断是否为数组
            result.push(ele);
        }else{
            result = result.concat(flatten(ele));
            // 由于result是函数内部定义的，及每次递归result都会重置；
            // 如果不将result保存，则到递归完成后，之前的数据将会被覆盖
        }
    });
    return result;
}
console.log(flatten(array));
// [ 1, 2, 3, 4, 1, 9, 8, ' ', 3, 1 ]
```

注解：map会迭代数组里每一个元素，并应用callback函数对其操作，在这里就是判断是否继续递归。

### 检查数组是否通过给定函数检查

有一个成绩数组，需要检查通过和未通过的情况

```javascript
var score = [56,90,40,80,76,88,94,27,83,66];
// 成绩

function isPassExam(ele,index,array){
    return ele >= 60;
}
// 通过规则

var isAllPass = score.every(isPassExam);
console.log('is all pass the exam : ' + isAllPass);
// is all pass the exam : false

var isSomeonePass = score.some(isPassExam);
console.log('is someone pass the exam : ' + isSomeonePass);
// is someone pass the exam : true

var passedScore = score.filter(isPassExam);
console.log('score : ' + passedScore);
// score : 90,80,76,88,94,83,66
```

注解：

* every会遍历所有元素，直到有不能通过函数检查的元素为止，返回 false
* some会遍历所有元素，直到有能通过函数检查的元素为止，返回true
* filter会遍历所有元素，并将能通过函数检查的元素返回

### 过滤函数参数

有时我们可能需要过滤我们接受的函数参数，如：只需要number类型

```javascript
function filter(){
    var array = [];

    Array.prototype.slice.apply(arguments).map(function (ele) {
        if(typeof ele == 'number'){
            array.push(ele);
        }
    });

    return array;
    // do something
    // ....
}

var result = filter(1,'123',4,'qianjiahao',2,false,[]);
console.log(result);
// [ 1, 4, 2 ]
```

注解：由于函数参数arguments并不是真正意义上的"数组"，只是"类数组"

通过  console.log(arguments); 我们可以看到

```javascript
{ '0': 1,
  '1': '123',
  '2': 4,
  '3': 'qianjiahao',
  '4': 2,
  '5': false,
  '6': [] }
```

arguments是个"类数组"，在使用"map"方法之前我们需要将其"slice"后转化为"数组"，但是因为"类数组"没有"slice"方法，所以我们使用了"apply"，让Array帮我们完成这个工作。

### 乱序字符串/数组

```javascript
var str = '6ab3c5de1f4g7';

var array = str.split('');

var result = str.split('').sort(function () {
    return Math.random() > 0.5;
}).join('');
console.log(result);
// d7gfc51a34be7

result = array.sort(function () {
    return Math.random() > 0.5;
});
console.log(result);
// [ 'd', '6', 'b', '4', 'e', 'a', 'c', '1', 'f', '5', '7', '3', 'g' ]
```

注解：通过在sort中随机返回一个数并与0.5比较，会得到随机的true或false，然后会随机数组中的前后两个元素。

### 从数组a中去除数组b的元素

```javascript
var a = [1,5,2,6,4,7,9,0];
var b = [1,0,6,4,10];

var result = a.filter(function(ele){
    return b.indexOf(ele) < 0;
});
console.log(result);
```

注解：通过下标，判断a中元素是否在b中，然后用filter过滤

## 注意

### for..in..

效率

`for..in..`迭代效率较低，建议使用`for`循环迭代或`Array`的原生迭代方法。

缺陷：`for..in..`会带上原型属性或方法:

```javascript
var array = [1,2,3,4];

Array.prototype.newVariable = 100;

Array.prototype.newFunction = function () {};

var result = [];

for(var i in array){
    result.push(array[i]);
}

console.log(result);
// [ 1, 2, 3, 4, 100, [Function] ]
```

这会很麻烦，如果需要使用`for..in..`，需要使用`hasOwnProperty()`过滤

```javascript
for(var i in array){
    if(array.hasOwnProperty(i)){
        result.push(array[i]);
    }
}
// [ 1, 2, 3, 4 ]
```

但是，有个很蛋疼的事，就是`hasOwnProperty()`没有保护机制，可以被重写

```javascript
var array = [1,2,3,4];

Array.prototype.newVariable = 100;

Array.prototype.newFunction = function () {};

Array.prototype.hasOwnProperty = function (i) {
    return i;
};
// 重写 hasOwnProperty() 方法

var result = [];

for(var i in array){
    if(array.hasOwnProperty(i)){
        result.push(array[i]);
    }
}

console.log(result);
// [ 1, 2, 3, 4, 100, [Function], [Function] ]
```

## 优化

数组迭代是可以优化的，比如

```javascript
var array = [1,2,3,4,5,3,7,8];

for(var i = 0;i<array.length;i++){
    // ...
}
```

这样的循环，每次都要去获取array.length，我们可以将array.length存起来

```javascript
for(var i = 0,len = array.length;i<len;i++){
    // ...
}
```

这样整个循环只需要求一次length。虽然数据量小的时候效果不明显，但是当数据量很大时，提升效果就很显著了。
