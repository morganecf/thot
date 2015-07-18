
// Called when the user clicks on the browser action.
// chrome.browserAction.onClicked.addListener (function (tab) {
//   // Send a message to the active tab
//   chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
//     var activeTab = tabs[0];
//     chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});
//   });
// });


// Listen for a note message 
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	sendResponse({received: request.note});

	// Add it to the popup 
});