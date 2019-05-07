# How to strip HTML from a string (extract only text content) in Javascript

Normally in the server side you could use a series of PHP functions (such as `strip_tags`) and to remove HTML and ugly formatting. However, if you're unable to use the server (or you use Node.js) to achieve this task, then you can still use Javascript to do it. In this article, you will find 3 ways to strip the html tags from a string in Javascript.

## 1. Create a temporary DOM element and retrieve the text

```js
/**
 * Returns the text from a HTML string
 *
 * @param {html} String The html string
 */
function stripHtml(html) {
  // Create a new div element
  var temporalDivElement = document.createElement('div');
  // Set the HTML content with the providen
  temporalDivElement.innerHTML = html;
  // Retrieve the text property of the element (cross-browser support)
  return temporalDivElement.textContent || temporalDivElement.innerText || '';
}

var htmlString = "<div><h1>Hello World</h1>\n<p>It's me, Mario</p></div>";

//Hello World
//It's me, Mario
console.log(stripHtml(htmlString));
```

The only problem of this (and the advantage) is that the browser will handle the providen string as HTML, that means that if the HTML string contains some type of interpretable Javascript for the browser, then it will be executed:

```js
// This won't do anything but retrieve the text
stripHtml('<script>alert("Hello");</script>');

// But this ...
stripHtml(
  "<img onerror='alert(\"Oh Oh this is not good, i could do something evil with this javascript\")' src='inexistent-image-source'>"
);
```

Therefore, you should use this only if you trust the source of the HTML string.

## 2. If you are using jQuery

If you use jQuery you can simplificate the code from the first step. The following code will do the same that the code in the first step (the warnings apply too):

```js
var htmlString =
  '<div>\n <h1>Hello World</h1>\n <p>This is the text that we should get.</p>\n <p>Our Code World &#169; 2017</p>\n </div>';

var stripedHtml = $('<div>')
  .html(htmlString)
  .text();

// Hello World
// This is the text that we should get.
// Our Code World © 2017
console.log(stripedHtml);
```

## 3. With a regular expression

If you're working in a Node environment, where there's not either `document` or `createElement` method, then you can use a regular expression to replace all the HTML tags from a string:

```js
var htmlString = "<div><h1>Hello World</h1>\n<p>It's me, Mario</p></div>";

var stripedHtml = htmlString.replace(/<[^>]+>/g, '');

//Hello World
//It's me, Mario
console.log(stripedHtml);
```

This method will work perfectly, but it will only remove the less than and more than symbols (`<` and `>`), that means that the html entities aren't removed from the string as shown in the following example:

```js
var htmlString =
  '<div>\n <h1>Hello World</h1>\n <p>This is the text that we should get.</p>\n <p>Our Code World &#169; 2017</p>\n </div>';

var stripedHtml = htmlString.replace(/<[^>]+>/g, '');

// Hello World
// This is the text that we should get.
// Our Code World &#169; 2017
console.log(stripedHtml);
```

The `&#169;` entity should be translated as a copyright symbol, however it still there as an html entity. That's clearly a disadvantage if you compare it with the first method, but don't worry not everything is lost (not yet). You can use Javascript to decode the htmlentities into readable characters ([read this article to learn how to achieve it](https://ourcodeworld.com/articles/read/188/encode-and-decode-html-entities-using-pure-javascript)). The following example will strip all the html using the previous mentioned replace instruction and convert the htmlentities to human readable characters using [the he library](https://github.com/mathiasbynens/he):

```js
var htmlString =
  '<div>\n <h1>Hello World</h1>\n <p>This is the text that we should get.</p>\n <p>Our Code World &#169; 2017</p>\n </div>';

var stripedHtml = htmlString.replace(/<[^>]+>/g, '');
var decodedStripedHtml = he.decode(stripedHtml);

// Hello World
// This is the text that we should get.
// Our Code World &#169; 2017
console.log(stripedHtml);

// Hello World
// This is the text that we should get.
// Our Code World © 2017
console.log(decodedStripedHtml);
```

As you can see, using the he library we converted the remaining html entities into its readable value. Note that you don't need to use necessarily the he library because you can [create your own decode htmlentities function if you read this article](https://ourcodeworld.com/articles/read/188/encode-and-decode-html-entities-using-pure-javascript).
