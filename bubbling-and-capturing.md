# 事件冒泡与事件捕获

```html
<div id="outer">
  <p id="inner">Click me!</p>
</div>
```

## 事件冒泡(event bubbling)

事件会从最内层的元素开始发生，一直向上传播，直到document对象。

`p -> div -> body -> html -> document`

## 事件捕获(event capturing)

与事件冒泡相反，事件会从最外层开始发生，直到最具体的元素。

`document -> html -> body -> div -> p`

## addEventListener的第三个参数

```javascript
element.addEventListener(event, function, useCapture)
```

第一个参数是需要绑定的事件，第二个参数是触发事件后要执行的函数。而第三个参数默认值是false，表示在事件冒泡的阶段调用事件处理函数，如果参数为true，则表示在事件捕获阶段调用处理函数。请看[例子](http://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_element_addeventlistener_capture)。

## 事件代理

```html
<ul id="color-list">
  <li>red</li>
  <li>yellow</li>
  <li>blue</li>
  <li>green</li>
  <li>black</li>
  <li>white</li>
</ul>
```

如果点击页面中的li元素，然后输出li当中的颜色，我们通常会这样写:

```javascript
(function(){
  var color_list = document.getElementById('color-list');
  var colors = color_list.getElementsByTagName('li');
  for (var i = 0; i < colors.length; i++) {
    colors[i].addEventListener('click', showColor, false);
  }
  function showColor(e){
      var x = e.target;
      alert('The color is ' + x.innerHTML);
  }
})();
```

利用事件流的特性，我们只绑定一个事件处理函数也可以完成：

```javascript
(function(){
  var color_list = document.getElementById('color-list');
  color_list.addEventListener('click', showColor, false);
  function showColor(e) {
      var x = e.target;
      if(x.nodeName.toLowerCase() === 'li'){
          alert('The color is ' + x.innerHTML);
      }
  }
})();
```

使用事件代理的好处不仅在于将多个事件处理函数减为一个，而且对于不同的元素可以有不同的处理方法。假如上述列表元素当中添加了其他的元素（如：a、span等），我们不必再一次循环给每一个元素绑定事件，直接修改事件代理的事件处理函数即可。

## 冒泡还是捕获？

对于事件代理来说，在事件捕获或者事件冒泡阶段处理并没有明显的优劣之分，但是由于事件冒泡的事件流模型被所有主流的浏览器兼容，从兼容性角度来说还是建议大家使用事件冒泡模型。

## IE浏览器兼容

* IE浏览器对`addEventListener`兼容性并不算太好，只有IE9以上可以使用。
* 要兼容旧版本的IE浏览器，可以使用IE的`attachEvent`函数

```javascript
object.attachEvent(event, function)
```

两个参数与`addEventListener`相似，分别是事件和处理函数，默认是事件冒泡阶段调用处理函数，要注意的是，写事件名时候要加上”on”前缀（”onload”、”onclick”等）。
