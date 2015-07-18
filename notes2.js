var note = function () {
  var text = '';
  // If something has been highlighted 
  if (window.getSelection()) {
    // Get the highlighted text 
    text = window.getSelection().toString();
  }
  else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }
    return text;
};

function getCurrentTabUrl(callback) {
  // Query filter to be passed to chrome.tabs.query - see
  // https://developer.chrome.com/extensions/tabs#method-query
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
    // chrome.tabs.query invokes the callback with a list of tabs that match the
    // query. When the popup is opened, there is certainly a window and at least
    // one tab, so we can safely assume that |tabs| is a non-empty array.
    // A window can only have one active tab at a time, so the array consists of
    // exactly one tab.
    var tab = tabs[0];

    // A tab is a plain object that provides information about the tab.
    // See https://developer.chrome.com/extensions/tabs#type-Tab
    var url = tab.url;

    // tab.url is only available if the "activeTab" permission is declared.
    // If you want to see the URL of other tabs (e.g. after removing active:true
    // from |queryInfo|), then the "tabs" permission is required to see their
    // "url" properties.
    console.assert(typeof url == 'string', 'tab.url should be a string');

    callback(url);
  });
}

//document.addEventListener('DOMContentLoaded', function () {

// Get the click event 
$(document).mouseup(function () {
  getCurrentTabUrl(function (url) {
      var text = note();
      console.log(text);
      console.log($("#note-section"));
      console.log(document.getElementById('note-section'));
      $("#note-section").append($("<p>" + text + "</p>"));
  });
});

  // getCurrentTabUrl(function (url) {
  //   // Put the image URL in Google search.
  //   renderStatus('Performing Google Image search for ' + url);

  //   getImageUrl(url, function(imageUrl, width, height) {

  //     renderStatus('Search term: ' + url + '\n' +
  //         'Google image search result: ' + imageUrl);
  //     var imageResult = document.getElementById('image-result');
  //     // Explicitly set the width/height to minimize the number of reflows. For
  //     // a single image, this does not matter, but if you're going to embed
  //     // multiple external images in your page, then the absence of width/height
  //     // attributes causes the popup to resize multiple times.
  //     imageResult.width = width;
  //     imageResult.height = height;
  //     imageResult.src = imageUrl;
  //     imageResult.hidden = false;

  //   }, function(errorMessage) {
  //     renderStatus('Cannot display image. ' + errorMessage);
  //   });
  // });
//});


