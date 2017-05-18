```js
// under Google Chrome 36

Object.prototype.toString.call([])
// "[object Array]"
Object.prototype.toString.call(function(){})
// "[object Function]"
Object.prototype.toString.call({})
// "[object Object]"
Object.prototype.toString.call(null)
// "[object Null]"
Object.prototype.toString.call(undefined)
// "[object Undefined]"
Object.prototype.toString.call(1)
// "[object Number]"
Object.prototype.toString.call(1.1)
// "[object Number]"
Object.prototype.toString.call(NaN)
// "[object Number]"
Object.prototype.toString.call(Infinity)
// "[object Number]"
Object.prototype.toString.call(true)
// "[object Boolean]"
Object.prototype.toString.call('')
// "[object String]"
Object.prototype.toString.call(/./g)
// "[object RegExp]"
Object.prototype.toString.call()
// "[object Undefined]"
Object.prototype.toString.call(void 0)
// "[object Undefined]"

Object.prototype.toString.call(window)
// "[object global]"
Object.prototype.toString.call(document)
// "[object HTMLDocument]"
Object.prototype.toString.call(document.location)
// "[object Location]"
Object.prototype.toString.call(document.location.href)
// "[object String]"

Object.prototype.toString.call(Object)
// "[object Function]"
Object.prototype.toString.call(Object.prototype)
// "[object Object]"
Object.prototype.toString.call(Object.prototype.toString)
// "[object Function]"

Object.prototype.toString.call(Date)
// "[object Function]"
Object.prototype.toString.call(Date())
// "[object String]"
Object.prototype.toString.call(new Date())
// "[object Date]"

Object.prototype.toString.call(Math)
// "[object Math]"
Object.prototype.toString.call(Math.abs)
// "[object Function]"

Object.prototype.toString.call(Symbol())
// "[object Symbol]"

Object.prototype.toString.call(JSON)
// "[object JSON]"
```
