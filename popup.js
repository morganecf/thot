/* Stores notes */
var notes = {};

/* Function to populate the pop up with notes */
function set_notes (notes) {
	for (var i = 0; i < notes.notes.length; i++) {
		$("#note-section").append($("<p>" + notes.notes[i] + "</p>"));
	}
}

/* 
	Once the DOM has loaded, query for the active tab and 
	send request for notes if the note thing is clicked on 
*/
window.addEventListener('DOMContentLoaded', function () {
	// Add new note button click functionality 
	$(".btn-info").click(function () {
		console.log("clicked on new note");
		$("#note-name-div").show();
	});
	$(".btn-success").click(function () {
		// Get what's in the note name field
		var note_name = $("#note-name").val();
		notes.note_name = [];

		$("#note-section").append($("<h4>" + note_name + "</h4>"));

		$("#note-name-div").hide();

		// TO DO : Error handling (ex: no note name), Save to file system 
	});

	// Query for notes 
	var query_info = {active: true, currentWindow: true};
	chrome.tabs.query(query_info, function (tabs) {
		// Send request for notes with callback to populate 
		chrome.tabs.sendMessage(tabs[0].id, {from: 'popup', subject: 'view-notes'}, set_notes);
	});
});