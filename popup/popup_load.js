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
var apiKey = null;
var views = null;


/*----------------*/
/*Initialize popup*/
/*----------------*/

views = {
    reference: document.getElementById("referenceView"),
    token: document.getElementById("tokenView"),
    settings: document.getElementById("settingsView"),
}
browser.storage.local.get().then((items) => {
    console.log(items)
    if (items.apiKey) {
        buildPopup(items.apiKey);
    } else {
        buildKeyInput(items.apiKey);
    }
});

function buildKeyInput(apiKey) {
    views.token.style.display = "block";

    button = document.getElementById("tokenButton");
    button.addEventListener("click", async function() {
        inputKey = document.getElementById("tokenInputField").value;
        views.token.style.display = "none";
        if (await BINPopup.registerKey(inputKey)){
            console.log("registered key")
            views.reference.style.display = "block";
            BINPopup.retreiveContent({name: "first" , message: ""});
        }
        else {
            console.log("key rejected")
            views.token.style.display = "block";
        }
    });
}

function buildPopup() {
    views.reference.style.display = "block";
    BINPopup.retreiveContent({name: "first" , message: ""});
}


//initialize and get data, message only relevant for Safari