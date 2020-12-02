# 解析 URL

## 1. API

```js
const myUrl = new URL(
  "https://example.com:4000/folder/page.html?x=y&a=b#section-2"
);
const {
  href,
  protocol,
  hostname,
  port,
  host,
  origin,
  pathname,
  hash,
  search,
} = myUrl;

const searchParams = new URLSearchParams(myURL.search);
console.log(searchParams.get("x")); // Output: "y"
console.log(searchParams.get("a")); // Output: "b"
```

## 2. 正则法

```js
function getQueryString(name) {
  const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  const r = window.location.search.substr(1).match(reg);

  if (r != null) {
    return unescape(r[2]);
  }

  return null;
}

// 这样调用：
// getQueryString("参数1");
// getQueryString("参数2");
```

## 3. split 拆分法

```js
function getRequest() {
  const url = location.search; //获取url中"?"符后的字串
  let request = {};

  if (url.indexOf("?") != -1) {
    let str = url.substr(1);
    strs = str.split("&");
    for (let i = 0; i < strs.length; i++) {
      request[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
    }
  }

  return request;
}

let request = getRequest();
// request['参数1'];
// request['参数2'];
```

- 修改 URL 的中某个参数值

  ```js
  //替换指定传入参数的值,paramName为参数,replaceWith为新值
  function replaceParamVal(paramName, replaceWith) {
    const oUrl = this.location.href.toString();
    const re = eval("/(" + paramName + "=)([^&]*)/gi");
    const nUrl = oUrl.replace(re, paramName + "=" + replaceWith);
    this.location = nUrl;
    window.location.href = nUrl;
  }
  ```
