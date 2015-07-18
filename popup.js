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
	var query_info = {active: true, currentWindow: true};
	chrome.tabs.query(query_info, function (tabs) {
		console.log("sending request for notes");
		// Send request for notes with callback to populate 
		chrome.tabs.sendMessage(tabs[0].id, {from: 'popup', subject: 'view-notes'}, set_notes);
	});
});