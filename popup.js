/* Stores notes */
var notes = {};

/* Function to populate the pop up with notes and title */
function set_notes (notes) {
	// Set the title 
	$("#title").append($("<h2>" + notes.title + "</h2>"));

	// Add the notes 
	for (var i = 0; i < notes.notes.length; i++) {
		$("#note-section").append($("<li>" + notes.notes[i] + "</li>"));
	}
}

/* 
	Once the DOM has loaded, query for the active tab and 
	send request for notes if the note thing is clicked on 
*/
window.addEventListener('DOMContentLoaded', function () {
	// Add listener to determine if a new highlight color has been selected
	$(".highlighter").click(function () {
		console.log(this);
	});

	// Query for notes 
	var query_info = {active: true, currentWindow: true};
	chrome.tabs.query(query_info, function (tabs) {
		// Send request for notes with callback to populate 
		chrome.tabs.sendMessage(tabs[0].id, {from: 'popup', subject: 'view-notes'}, set_notes);
	});
});