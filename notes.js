/* Saves all notes */
var notes = [];

/* Function that (literally) highlights a note */
var highlight = function (range) {
  var new_node = document.createElement("div");
  new_node.setAttribute("style", "background-color:yellow; display:inline");
  range.surroundContents(new_node);
};

/* Function that grabs a note */
var note = function () {
  var text = '';
  var selection = window.getSelection();
  // If something has been highlighted 
  if (selection) {
    // Get the highlighted text 
    text = selection.toString();
    // Get where the highlighted text starts 
    highlight(selection.getRangeAt(0));
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
});

/* Listen for a message from the popup - when it pops up, display notes */
chrome.runtime.onMessage.addListener(function (msg, sender, response) {
	if (msg.from === 'popup' && msg.subject === 'view-notes') {
		// Respond to popup with the notes 
		response({notes: notes});
	}
});

// TO DO: actually highlight what is highlighted 
// color themes 
// save to file system 
// new note 
// history of notes 
// edit capability