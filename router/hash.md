## hash

我们经常在 url 中看到 #，这个 # 有两种情况，一个是我们所谓的锚点，比如典型的回到顶部按钮原理、Github 上各个标题之间的跳转等，路由里的 # 不叫锚点，我们称之为 hash，大型框架的路由系统大多都是哈希实现的。

同样我们需要一个根据监听哈希变化触发的事件 —— hashchange 事件

我们用 `window.location` 处理哈希的改变时不会重新渲染页面，而是当作新页面加到历史记录中，这样我们跳转页面就可以在 hashchange 事件中注册 ajax 从而改变页面内容。

> [demo](demo/index.html)

hashchange 在低版本 IE 需要通过轮询监听 url 变化来实现，我们可以模拟如下

```js
(function(window) {

  // 如果浏览器不支持原生实现的事件，则开始模拟，否则退出。
  if ( "onhashchange" in window.document.body ) { return; }

  var location = window.location,
  oldURL = location.href,
  oldHash = location.hash;

  // 每隔100ms检查hash是否发生变化
  setInterval(function() {
    var newURL = location.href,
    newHash = location.hash;

    // hash发生变化且全局注册有onhashchange方法（这个名字是为了和模拟的事件名保持统一）；
    if ( newHash != oldHash && typeof window.onhashchange === "function"  ) {
      // 执行方法
      window.onhashchange({
        type: "hashchange",
        oldURL: oldURL,
        newURL: newURL
      });

      oldURL = newURL;
      oldHash = newHash;
    }
  }, 100);
})(window);
```

大型框架的路由当然不会这么简单，angular 1.x 的路由对哈希、模版、处理器进行关联，大致如下

```js
app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
 $routeProvider
 .when('/article', {
   templateUrl: '/article.html',
   controller: 'ArticleController'
 }).otherwise({
   redirectTo: '/index'
 });
 $locationProvider.html5Mode(true);
}])
```

这套路由方案默认是以 # 开头的哈希方式，如果不考虑低版本浏览器，就可以直接调用 `$locationProvider.html5Mode(true)` 利用 H5 的方案而不用哈希方案。
