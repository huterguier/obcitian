//always listen to messages
browser.runtime.onMessage.addListener(BINPopup.handleMessage);

/*-----------*/
/*Global data*/
/*-----------*/
/* Global variables are used here, because they only exist in the popup context, and since the Safari way of changing the popup is to directly access these variables */


//stores data obtained from background script
var bibData = null;

//link to array containing all the bibField data
var bibFieldData = null;

//link to json object storing display options, parseMode means 0 = Bibtex.
var displayOptions = null;
var generalOptions = null;
var redirectionSchemes = null;

/*----------------*/
/*Initialize popup*/
/*----------------*/

//initialize and get data, message only relevant for Safari
BINPopup.retreiveContent({name: "first" , message: ""});