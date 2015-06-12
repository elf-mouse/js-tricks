function showFileSize() {
  var input, file;

  // (Can't use `typeof FileReader === "function"` because apparently
  // it comes back as "object" on some browsers. So just see if it's there
  // at all.)
  if (!window.FileReader) {
    bodyAppend("p", "The file API isn't supported on this browser yet.");
    return;
  }

  input = document.getElementById('fileinput');
  if (!input) {
    bodyAppend("p", "Um, couldn't find the fileinput element.");
  } else if (!input.files) {
    bodyAppend("p", "This browser doesn't seem to support the `files` property of file inputs.");
  } else if (!input.files[0]) {
    bodyAppend("p", "Please select a file before clicking 'Load'");
  } else {
    file = input.files[0];
    bodyAppend("p", "File " + file.name + " is " + file.size + " bytes in size");
  }
}

function bodyAppend(tagName, innerHTML) {
  var elm;

  elm = document.createElement(tagName);
  elm.innerHTML = innerHTML;
  document.body.appendChild(elm);
}
