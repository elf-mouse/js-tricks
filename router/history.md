## [History API](https://developer.mozilla.org/en-US/docs/Web/API/History)

重点说其中的两个新增的API `history.pushState` 和 `history.replaceState`

这两个 API 都接收三个参数，分别是

- __状态对象（state object）__ — 一个JavaScript对象，与用pushState()方法创建的新历史记录条目关联。无论何时用户导航到新创建的状态，popstate事件都会被触发，并且事件对象的state属性都包含历史记录条目的状态对象的拷贝。
- __标题（title）__ — FireFox浏览器目前会忽略该参数，虽然以后可能会用上。考虑到未来可能会对该方法进行修改，传一个空字符串会比较安全。或者，你也可以传入一个简短的标题，标明将要进入的状态。
- __地址（URL）__ — 新的历史记录条目的地址。浏览器不会在调用pushState()方法后加载该地址，但之后，可能会试图加载，例如用户重启浏览器。新的URL不一定是绝对路径；如果是相对路径，它将以当前URL为基准；传入的URL与当前URL应该是同源的，否则，pushState()会抛出异常。该参数是可选的；不指定的话则为文档当前URL。

> 相同之处是两个 API 都会操作浏览器的历史记录，而不会引起页面的刷新。

> 不同之处在于，pushState会增加一条新的历史记录，而replaceState则会替换当前的历史记录。

__Console__ test

```js
window.history.pushState(null, null, "https://www.baidu.com/name/orange");
//url: https://www.baidu.com/name/orange

window.history.pushState(null, null, "?name=orange");
//url: https://www.baidu.com?name=orange

window.history.pushState(null, null, "name=orange");
//url: https://www.baidu.com/name=orange

window.history.pushState(null, null, "/name/orange");
//url: https://www.baidu.com/name/orange

window.history.pushState(null, null, "name/orange");
//url: https://www.baidu.com/name/orange
```

> 注意:这里的 url 不支持跨域，当我们把 `www.baidu.com` 换成 `baidu.com` 时就会报错。

回到上面例子中，每次改变 url 页面并没有刷新，同样根据上文所述，浏览器会产生历史记录

这就是实现页面无刷新情况下改变 url 的前提，下面我们说下第一个参数 __状态对象__

如果运行 `history.pushState()` 方法，历史栈对应的纪录就会存入 __状态对象__，我们可以随时主动调用历史条目

举个🌰

```html
<!DOCTYPE HTML>
<!-- this starts off as http://example.com/line?x=5 -->
<title>Line Game - 5</title>
<p>You are at coordinate <span id="coord">5</span> on the line.</p>
<p>
 <a href="?x=6" onclick="go(1); return false;">Advance to 6</a> or
 <a href="?x=4" onclick="go(-1); return false;">retreat to 4</a>?
</p>
<script>
 var currentPage = 5; // prefilled by server！！！！
 function go(d) {
     setupPage(currentPage + d);
     history.pushState(currentPage, document.title, '?x=' + currentPage);
 }
 onpopstate = function(event) {
     setupPage(event.state);
 }
 function setupPage(page) {
     currentPage = page;
     document.title = 'Line Game - ' + currentPage;
     document.getElementById('coord').textContent = currentPage;
     document.links[0].href = '?x=' + (currentPage+1);
     document.links[0].textContent = 'Advance to ' + (currentPage+1);
     document.links[1].href = '?x=' + (currentPage-1);
     document.links[1].textContent = 'retreat to ' + (currentPage-1);
 }
</script>
```

我们点击 `Advance to ?` 对应的 url 与模版都会 +1，反之点击 `retreat to ?` 就会都 -1，这就满足了 url 与模版视图同时变化的需求

实际当中我们不需要去模拟 onpopstate 事件，官方文档提供了 popstate 事件，当我们在历史记录中切换时就会产生 popstate 事件。对于触发 popstate 事件的方式，各浏览器实现也有差异，我们可以根据不同浏览器做兼容处理。
