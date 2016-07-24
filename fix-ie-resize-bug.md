# 修正IE6 IE7的window.resize bug

应该是一个非常著名的bug了，在IE6 IE7中对window进行resize，此事件会执行多次，或者有时夸张地不断重复此回调函数，陷入死循环，造成假死现象。具体可参看这一篇文章《[window.onresize hangs IE6 and IE7](http://remysharp.com/2008/05/15/windowonresize-hangs-ie6-and-ie7/)》。在这篇文章给出的方法是给出一个记数器，用来判断其是否撞上这倒霉事，当i被重复了100次马上移除resize事件进行自救。

在jQuery中的许多插件中，我看到另一种方法，利用setTimeout进行延时操作，目的是让浏览器有个喘息的机会。但治根不治本。

在外国论坛中，我无意看到第三种方法。那高手建用创建一个与视口等大的DIV，把onsize事件转移到这个DIV。不过我想他应该漏了一些东西没有说，我在这里补充一下。原例子的body基本为空，实质上我们操作的页面不可能是这个样子。我们应该让这个页面透明并绝对化。

```javascript
var mask = document.createElement("div");
mask.style.cssText = "width:100%;height:100%;position:absolute;top:0px;left:0px;filter:alpha(opacity=50)";
document.body.appendChild(mask);
mask.onresize = resizeHandle;
```

这是一个比较完美的解决办法，但如何知道执行完resize事件呢？总是有一个层罩在上面，其他mousemove,click都用不了。MSDN提供了一个onresizeend事件，但是用不了。可能给VBScript使用的。用定时器判定吗？或者在回调函数的底部添加一个钩子吗？觉得都不好。我想，与其用一个麻烦的即用即弃的元素，不如看看页面上的元素能帮得上忙否。页面上，只要是HTML，总有几个元素都是少不了的。一个HTML元素，一个BODY元素。试了一下HTML，发现不起作用，真见鬼。不过心想，微软总是搞混HTML与BODY，这事没什么大不了，就绑定到body上吧。

```javascript
window.onload = function(){
  if(!+"\v1" && !document.querySelector) { // for IE6 IE7
    document.body.onresize = resize;
  } else {
    window.onresize = resize;
  }
  var text =  document.getElementById("text")
  function resize() {
    text.innerHTML = getWindowSize().join(" : ");
  }
}
```

```javascript
if(dom.ie){
  dom.events.special.resize = {
    setup: function() {
      var el = this,
      caller = dom.isWindow(el) ? dom.body(el) : el,
      args = slice.call( arguments, 1 ),
      event = dom.events.fix(window.event);
      event.type = "resize";
      args.unshift(event);
      caller.onresize=function(){
        dom.events.handle.apply( el, args );
      }
    },
    teardown: function() {
      var caller = dom.isWindow(this) ? dom.body(this) : this;
      caller.onresize = null;
    }
  }
}
```

第二版

```javascript
dom.events.special.resize = (function(){
  var size = function() {
    var el = dom(window);
    return {
      w: el.width(),
      h: el.height()
    };
  },
  lock_ = 0, size_, use_,
  setup = function() {
    if (!this.setTimeout) {
      return false;
    }
    size_ = size();
    use_ = true;
    (function loop() {
      if (!lock_++) {
        var now = size();
        if (size_.w !== now.w || size_.h !== now.h) {
          size_ = now;
          var evt = dom.Event("resize");
          evt.target = evt.originalTarget = evt.currentTarget = window;
          dom.events.handle.call(this, evt);
        }
        setTimeout(function() {
          lock_ = 0;
        }, 0);
      }
      if (use_) {
        setTimeout(loop, 100);
      }
    })();
  },
  teardown = function () {
    if (!this.setTimeout) {
      return false;
    }
    use_ = false;
  };
  return {
    setup: setup,
    teardown: teardown
  };
})();
```
