## jQuery

```
$(document).ready(function() {
    // Your code here
});
```

Or, using the shorthand version

```
$(function() {
    // Your code here
});
```

## DOM Ready for Internet Explorer 9 and Above

Modern web browsers—including IE9 and above—provide an easy way to run scripts once DOM content is fully loaded:

```
document.addEventListener('DOMContentLoaded', function () {
    // Do stuff...
}, false);
```

Or, Better:

```
var domReady = function(callback) {
    document.readyState === "interactive" || document.readyState === "complete" ? callback() : document.addEventListener("DOMContentLoaded", callback);
};
```

We can use this `domReady()` function just like the jQuery `ready()` function.

```
domReady(function() {
    // Your code here
});
```

## DOM Ready for Internet Explorer 8 and Below

This method, while not nearly as simple as the first, provides the highest level of compatibility with browsers. It's based on the source code to version 1.11.3 of jQuery.

```
var domReady = function(callback) {
    var ready = false;

    var detach = function() {
        if(document.addEventListener) {
            document.removeEventListener("DOMContentLoaded", completed);
            window.removeEventListener("load", completed);
        } else {
            document.detachEvent("onreadystatechange", completed);
            window.detachEvent("onload", completed);
        }
    }
    var completed = function() {
        if(!ready && (document.addEventListener || event.type === "load" || document.readyState === "complete")) {
            ready = true;
            detach();
            callback();
        }
    };

    if(document.readyState === "complete") {
        callback();
    } else if(document.addEventListener) {
        document.addEventListener("DOMContentLoaded", completed);
        window.addEventListener("load", completed);
    } else {
        document.attachEvent("onreadystatechange", completed);
        window.attachEvent("onload", completed);

        var top = false;

        try {
            top = window.frameElement == null && document.documentElement;
        } catch(e) {}

        if(top && top.doScroll) {
            (function scrollCheck() {
                if(ready) return;

                try {
                    top.doScroll("left");
                } catch(e) {
                    return setTimeout(scrollCheck, 50);
                }

                ready = true;
                detach();
                callback();
            })();
        }
    }
};
```

We can use it just like the first method.

```
domReady(function() {
    // Your code here
});
```

And it supports the following browsers.

- [x] IE6+
- [x] Firefox 3.6+
- [x] Chrome
- [x] Safari 5.1+
- [x] Opera 11.6+
- [x] Android
