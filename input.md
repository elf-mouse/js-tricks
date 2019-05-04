## `<input type="number">` 不支持 `maxlength` 兼容方案

**1. 内联 JS**

```js
<input type="number"
  maxlength="4"
  oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);">
```

**2. 外部 JS**

```html
<input id="hoge" type="number" maxlength="4" />
```

```js
document.getElementById("hoge").addEventListener("input", function() {
  if (this.value.length > this.maxLength) {
    this.value = this.value.slice(0, this.maxLength);
  }
});
```

**3. H5 `pattern`**

```html
<input type="text" pattern="\d" maxlength="4" />
```
