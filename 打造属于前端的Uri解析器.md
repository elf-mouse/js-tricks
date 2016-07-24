# 打造属于前端的Uri解析器

今天和大家一起讨论一下如何打造一个属于前端的url参数解析器。如果你是一个Web开发工程师，如果你了解过后端开发语言，譬如：PHP，Java等，那么你对下面的代码应该不会陌生：

```
$kw = $_GET['keyword']; // PHP
String kw = request.getParameter("keyword"); // JSP
```

对于后端语言，通过上面的代码我们可以很方便的获取到一个url请求中的参数值。但是，当我们在一个Web前端工程中需要使用到url参数的时候，我们熟悉的JavaScript却没有提供类似方便的使用方法。那么，我们前端开发工程师该如何去获取url参数呢？方法挺多的，咱一个一个来看。

## 使用字符串的split方法

基本思路：首先我们通过参数连接符 & 将整个search串split成类似 key=value 的子串数组，然后遍历得到的数组元素，根据 = 运算符将每个子串拆分为 key 和 value ，最后将结果存储到一个json对象中，就得到我们的结果了。取值操作只需要从最终得到的json对象中取响应key对应的值就好了。原理很简单，我们来看下具体代码：

```javascript
function query(search) {
    var s = search || location.search,
        str = s && /^\?/.test(s) ? s.slice(1) : s,
        r = {},
        kvs = str.split("&");
    for (var i = 0, len = kvs.length; i < len; i++) {
        var kv = kvs[i].split("=");
        r[kv[0]] = kv[1];
    }
    return r;
}
// use
query("a=1&b=2&c=3"); // {"a":"1","b":"2","c":"3"}
```

当然，如果想更直接一点可以写成下面这种：

```javascript
function query(search, key) {
    var s = search || location.search,
        str = s && /^\?/.test(s) ? s.slice(1) : s,
        r = {},
        kvs = str.split("&");
    for (var i = 0, len = kvs.length; i < len; i++) {
        var kv = kvs[i].split("=");
        r[kv[0]] = kv[1];
    }
    return r[key];
}
// use
query("a=1&b=2&c=3", "a"); // 1
```

不过，显然第二种方式不好，每取一次值都得去跑一遍循环，太浪费资源。那么如果非得这么用，有没有什么更简洁一点的方式呢？答案是肯定的。

## 使用字符串的match方法

基本思路：使用match方法，从目标字符串中匹配与key对应的参数的值并返回。使用正则表达式匹配，可以省去循环，可以说是第二种split用法的升级版（仅从省代码考虑，性能恐怕未必），具体代码如下：

```javascript
function query(search, key) {
    var reg = new RegExp("(^|\\?|\\&)" + key + "=([^&$]*)", ""),
        match = null;
    match = search.match(reg);
    return match && match[2] ? match[2] : undefined;
}
// use
query("a=1&b=2&c=3", "a"); // 1
query("a=1&b&c=3", "b"); // undefined
```

从代码实现来看，好像是比使用split来实现简单了很多，从测试结果看，二者效果完全一致，看来是没什么问题。接下来我们看一个和第一种split实现结果一致的另一种实现方法。

## 使用正则表达式的exec方法

基本思路：思路和split实现的思路大同小异，只是我们不在根据特殊符号进行字符串拆分，转而使用正则表达式对特征字符串进行匹配，再从匹配结果中获取我们需要的内容。代码如下：

```javascript
function query(search){
    var search = search || location.search,
        reg = /([?&])?([^=]+?)(?=(=|&|$))(([^&$]*))?/g,
        r = {},
        match = null;
    while(match = reg.exec(search)){
        r[match[2]] = match[4].replace(/^=/, "");
    }
    return r;
}
// use
query("a=1&b=2&c=3"); // {a: "1", b: "2", c: "3"}
query("a=1&b&c=2"); // {a: "1", b: undefined, c: "2"}
```

到此，看起来一切都很顺利，也没出现什么问题。然而，事实真的如此吗？

## 潜藏的那些坑

首先，我们得考虑一个问题，大多真实情况下我们都是从浏览器地址栏直接拿search串来获取参数值，并不是像上面我们测试写的那样手动准备 a=1&b=2&c=3 ，而我们又知道浏览器自身有对中文和一些特殊符号进行encode的功能，那么问题来了，当出现这种情况的时候，我们将会得到什么呢？

```javascript
// 准备一个中文串（a=中国&b=China）
// 将中文encode一下（a=%E4%B8%AD%E5%9B%BD&b=China）
var p = query("a=%E4%B8%AD%E5%9B%BD&b=China"); // {a: "%E4%B8%AD%E5%9B%BD", b: "China"}
console.log(p.a); // %E4%B8%AD%E5%9B%BD（看不懂啊！看不懂！）
```

这样肯定不行，我们得想办法搞定它，以exec的方式为例，我们代码稍作调整：

```javascript
function query(search){
    var search = search || location.search,
        reg = /([?&])?([^=]+?)(?=(=|&|$))(([^&$]*))?/g,
        r = {},
        match = null;
    while(match = reg.exec(search)){
        r[match[2]] = decodeURIComponent(match[4]).replace(/^=/, "");
    }
    return r;
}
```

现在再来一遍：

```javascript
var p = query("a=%E4%B8%AD%E5%9B%BD&b=China"); // {a: "中国", b: "China"}
```

这就对了，终于能看懂了！

然后，我们再来看一种情况。以登录为例，通常我们登录成功后希望能跳转回到来源页面。为了达到这个目的，一般我们会为登录页面添加一个redirect的url参数，形如：

```
http://www.xxx.com/login.jsp?a=1&b=2&redirect=http://www.yyy.cn/index.html
```

我们先来试下，看看上面那个链接中我们的参数能不能正常解析：

```javascript
// 查询串为：a=1&b=2&redirect=http://www.yyy.cn/index.html
query('a=1&b=2&redirect=http://www.yyy.cn/index.html');
// {a: "1", b: "2", redirect: "http://www.yyy.cn/index.html"}
```

OK，执行正常，没有问题，接下来我们稍微对我们的需求做点加工，我希望登录成功后调回 `http://www.yyy.cn/index.html?sub=search&keyword=中国&lang=cn` ，那么我们的查询串就应该是下面这个结果：

```
a=1&b=2&redirect=http://www.yyy.cn/index.html?sub=search&keyword=中国&lang=cn
```

按照顺理成章的逻辑，似乎没有问题吧？我们再来执行一下我们的query方法：

```javascript
query("a=1&b=2&redirect=http://www.yyy.cn/index.html?sub=search&keyword=中国&lang=cn");
/*
 * {
 *     a: "1",
 *     b: "2",
 *     redirect: "http://www.yyy.cn/index.html?sub=search",
 *     keyword: "中国",
 *     lang: "cn"
 * }
 */
```

发现问题了吗？对！咱的跳转链接的被拆分成几个url参数了，显然咱达不到跳转回来源链接的目的了。那这个问题如何解决呢？从我们方法实现的角度去考虑，暂时还想不到解决办法，翻查了一下淘宝KISSY框架的Uri.Query类，简单的测试了下，结果和上面是一样的。倒是从使用咱方法的角度去着手，有一个解决方法——将redirect链接做一次encode，如下：

```javascript
query("a=1&b=2&redirect=" + encodeURIComponent("http://www.yyy.cn/index.html?sub=search&keyword=中国&lang=cn"));
/*
 * {
 *     a: "1",
 *     b: "2",
 *     redirect: "http://www.yyy.cn/index.html?sub=search&keyword=中国&lang=cn"
 * }
 */
```

OK，结果正常了！由此，也可以映射一个问题，当我们在地址栏传递数据时，还是尽可能的encode好后再使用，这样可以避免一些不必要的麻烦。

## 封装

笔者喜欢把玩正则表达式（虽然还玩得不好），就以exec方式为例，对url参数解析的功能做了一下简单的封装，欢迎读者朋友批评指正：

```javascript
(function(window, undefined){
    var URI = {};
    URI.query = function(search){
        var s = search || location.search,
            reg = /([?&])?([^=]+?)(?=(=|&|$))(([^&$]*))?/g,
            r = {},
            match = null,
            total = 0;
        var _remove = function(key) {
            // r[key] = undefined;
            delete r[key];
            total--;
        };
        while(match = reg.exec(s)){
            var val = decodeURIComponent(match[4]).replace(/^=/, "");
            if (match[2].indexOf('[]') !== -1) {
                var k = match[2].replace('[]', '');
                if (typeof r[k] === 'undefined') {
                    r[k] = [val];
                    total++;
                } else {
                    r[k].push(val);
                }
            } else {
                r[match[2]] = val;
                total++;
            }
        }
        return {
            get: function(key) {
                return r[key];
            },
            keys: function() {
                var keys = [];
                if ('keys' in Object) {
                    keys = Object.keys(r);
                } else {
                    for (var key in r) {
                        keys.push(key);
                    }
                }
                return keys;
            },
            remove: _remove,
            count: function() {
                return total;
            }
        };
    };
    window.Uri = window.Uri || URI;
})(window);
```

用法当然很简单：

```javascript
var q = Uri.query('a=person&b=人&c=people&d=中国人');
q.keys(); // ["a", "b", "c", "d"]
q.get('d'); // 中国人
q.count(); // 4
```

至此，我们今天讨论的话题就完成了。以上只是一个雏形，有兴趣的朋友可以进行扩展优化。欢迎大家发表各自的意见，多多交流，共同进步！
