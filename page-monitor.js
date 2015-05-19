var pageId = 0;

(function() {
  var xhr, url = {
    loaded: '/statistics.php?type=loaded&id=' + escape(pageId),
    complete: '/statistics.php?type=complete&id=' + escape(pageId)
  };

  function ajax(url) {
    xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.send();
  }

  document.addEventListener('DOMContentLoaded', function(event) {
    ajax(url.loaded);
  });

  document.onreadystatechange = function() {
    if (document.readyState === 'complete') {
      ajax(url.complete);
    }
  };
})();
