
/* Function that grabs a note */
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

/* Get the click event */
$(document).mouseup(function () {
	var text = note();

	// Send to the background script
	chrome.runtime.sendMessage({note: text}, function (response) {
		console.log(response.received);
	});

});

