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
	lascaux: {title: filler('800933', 'F0E4D6'), note: filler('2C231E', 'F0E4D6')},
	bosch: {title: filler('DD5511', 'FFEEBB'), note: filler('FFCC33', '333')},
	warhol: {title: filler('35A8DE', '29032B'), note: filler('D690C3', '29032B')}
};

/* 
Use default colors for now -- phased out the choice of colors 
  note background: black #333 
  note color: white #fff
  title background: #1E90FF dark blue 
  title color: white #fff
*/

var defaultHL = {title: filler('1E90FF', 'fff'), note: filler('333', 'fff')};

var title_highlighter = defaultHL.title;
var note_highlighter = defaultHL.note;

/* (Literally) highlights a note */
var highlight = function (range, highlighter) {
  var new_node = document.createElement("div");
  // The highlight style will have the given background color (highlight) and text color
  var style_str = "background-color:" + highlighter.background + "; color: " + highlighter.color + ";";
  // Will also be inline displayed to avoid creating a new line and thicken a bit
  style_str += "display:inline; padding-top: 2px; padding-bottom: 2px;";
  new_node.setAttribute("style", style_str);
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
