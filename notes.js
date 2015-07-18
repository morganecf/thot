/* Saves all notes */
var notes = [];


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
	notes.push(text);

	console.log("highlighted:", text);

	// Send to the background script
	// chrome.runtime.sendMessage({note: text}, function (response) {
	// 	console.log(response.received);
	// });

});

/* Listen for a message from the popup - when it pops up, display notes */
chrome.runtime.onMessage.addListener(function (msg, sender, response) {
	if (msg.from === 'popup' && msg.subject === 'view-notes') {
		console.log("message received from popup");
		// respond to popup with the notes 
		response({notes: notes});
	}
});