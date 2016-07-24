```js
function foo(){
    this.seconds = ['5', '4', '3', '2', '1'];
}

foo.prototype.displayMessage = function displayMessage(msg){
    console.log(msg);
};

foo.prototype.countdown = function countdown(){
    var self = this;
    this.seconds.forEach(function loop(time){
        self.displayMessage(time + ' seconds until lift off!');
    });
};
```

In the example above, had I not used the reference variable `self` to store the outer scope's `this`, using `this.displayMessage` would have been undefined within the current context.

__this arguments__

```js
foo.prototype.countdown = function countdown(){
    this.seconds.forEach(function loop(time){
        this.displayMessage(time + ' seconds until lift off!');
    }, this);
};
```

__Binding Functions__

```js
foo.prototype.callServer = function callServer(){
    var _this = this;
    $.get('some/file.json').then(function onSuccess(data){
        _this.displayMessage(data);
    });
};
```

> The `bind()` method creates a new function that, when called, has its this keyword set to the provided value, with a given sequence of arguments preceding any provided when the new function is called.

```js
foo.prototype.callServer = function callServer(){
    $.get('some/file.json').then(function onSuccess(data){
        this.displayMessage(data);
    }.bind(this)); //bind the outer 'this' context
};
```
