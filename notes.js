/* Stores the title of this article */
var title = 'Article Title';

/* Saves all notes for this article */
var notes = [];

/* Highlight values */
var filler = function (background, color) {
	return {background: "#" + background, color: "#" + color};
}
var highlighters = {
	mondrian: {title: filler('0404A0', 'FBFCF4'), note: filler('F70004', '1A1414')},
	lascaux: {title: filler('800933', 'F0E4D6'), note: filler('2C231E', 'fff')},
	bosch: {title: filler('DD5511', 'FFEEBB'), note: filler('FFCC33', '333')},
	warhol: {title: filler('35A8DE', '29032B'), note: filler('D690C3', '29032B')}
};
var title_highlighter = highlighters.lascaux.title;
var note_highlighter = highlighters.lascaux.note;

/* (Literally) highlights a note */
var highlight = function (range, highlighter) {
  var new_node = document.createElement("div");
  new_node.setAttribute("style", "background-color:" + highlighter.background + ";");
  new_node.setAttribute("style", "color: " + highlighter.color + ";");
  new_node.setAttribute("style", "display:inline; padding: 5px;");
  range.surroundContents(new_node);
};

var isTitle = function (k) { return k.toLowerCase() === 't'; };
var isNote = function (k) { return k.toLowerCase() === 'n'; }

/* Get the note-taking event */
$(document).keydown(function (event) {
	// Get the key pressed 
	var key = String.fromCharCode(event.keyCode || event.which);
	
	// See if there's a selection 
	var selection = window.getSelection();
	if (selection) {
		// Get the selected text 
    	text = selection.toString();

    	// If there's actually text 
    	if (text) {

    		// If it's a title
    		if (isTitle(key)) {
    			title = text;
    			highlight(selection.getRangeAt(0), title_highlighter);
    		}
    		else if (isNote(key)) {
    			notes.push(text);
    			highlight(selection.getRangeAt(0), note_highlighter);
    		}
    	}
	}
});


/* Listen for a message from the popup - when it pops up, display notes */
chrome.runtime.onMessage.addListener(function (msg, sender, response) {
	if (msg.from === 'popup' && msg.subject === 'view-notes') {
		// Respond to popup with the notes 
		response({notes: notes, title: title});
	}
});
