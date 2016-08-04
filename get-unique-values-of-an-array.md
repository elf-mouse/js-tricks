# 6 ways to get unique values of an Array

```js
Array.prototype.unique1 = function()
{
  var n = [];
  for(var i = 0; i < this.length; i++)
  {
    if (n.indexOf(this[i]) == -1) n.push(this[i]);
  }
  return n;
};
```

```js
Array.prototype.unique2 = function()
{
  var n = {},r=[];
  for(var i = 0; i < this.length; i++)
  {
    if (!n[this[i]])
    {
      n[this[i]] = true;
      r.push(this[i]);
    }
  }
  return r;
};
```

```js
Array.prototype.unique3 = function()
{
  var n = [this[0]];
  for(var i = 1; i < this.length; i++)
  {
    if (this.indexOf(this[i]) == i) n.push(this[i]);
  }
  return n;
};
```

```js
Array.prototype.unique4 = function()
{
  this.sort();
  var re=[this[0]];
  for(var i = 1; i < this.length; i++)
  {
    if( this[i] !== re[re.length-1])
    {
      re.push(this[i]);
    }
  }
  return re;
};
```

```js
Array.prototype.unique5 = function(){
    var self = this;
    var _a = this.concat().sort();
    _a.sort(function(a,b){
        if(a == b){
            var n = self.indexOf(a);
            self.splice(n,1);
        }
    });
    return self;
};
```

```js
Array.prototype.unique6 = function()
{
  return this.reduce(function(p, c)
  {
    if (p.indexOf(c) < 0) p.push(c);
    return p;
  }, []);
};
```

Performance test: ( running with an array of 10000 random numbers )

- method 1 used 349ms
- method 2 used 5ms
- method 3 used 442ms
- method 4 used 15ms
- method 5 used 13ms
- method 6 used 424ms

So, the best idea to unique an array is to use a "hash map" to check if an item is repeated.
