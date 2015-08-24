/* Stores current notes */
var _NOTES = {};

/* Function to populate the pop up with notes and title */
function set_notes (notes) {
	// Set the title 
	$("#title").append($("<h2>" + notes.title + "</h2>"));

	// Add the notes 
	for (var i = 0; i < notes.notes.length; i++) {
		$("#note-section").append($("<li>" + notes.notes[i] + "</li>"));
	}

	// Save 
	_NOTES.title = notes.title;
	if ('notes' in _NOTES) {
		for (var i = 0; i < notes.notes.length; i++) {
			_NOTES.notes.push(notes.notes[i]);
		}
	}
	else {
		_NOTES.notes = notes.notes;
	}
	
}

/* Number of total notes we have */
var num_notes;

/* 
	Once the DOM has loaded, query for the active tab and 
	send request for notes if the note thing is clicked on 
*/
window.addEventListener('DOMContentLoaded', function () {

	// User clicks to save a note 
	$("#save").click(function () {

		console.log(_NOTES);

		// Add note to local storage 
		var noteData = [];
		chrome.storage.local.get("data", function (d) {
			if ('data' in d && d.data.length > 0) {
				d.data.forEach(function (n) {
					noteData.push(n);
				});
			}

			// Format the note to just be a newline-separated string 
			// with the title as the first line 
			var notestring = _NOTES.title + "\n" + _NOTES.notes.join("\n");
			noteData.push(notestring);

			chrome.storage.local.set({"data": noteData}, function () {
				console.log("set notes");
			});
		});

	});

	// User clicks to view notes 
	$("#view").click(function () {
		// Open up a new page to display all the notes 

		chrome.storage.local.get("data", function (d) { 
			for (var i = 0; i < d.data.length; i++) {
				console.log("note #" + i);
				var n = d.data[i].split("\n");
				for (var j = 0; j < n.length; j++) {
					console.log("\t" + n[j]);
				}
			}
		});

	});

	// Query for notes 
	var query_info = {active: true, currentWindow: true};
	chrome.tabs.query(query_info, function (tabs) {
		// Send request for notes with callback to populate 
		chrome.tabs.sendMessage(tabs[0].id, {from: 'popup', subject: 'view-notes'}, set_notes);
	});
});
