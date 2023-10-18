const url = "https://127.0.0.1:27124/vault/README.md";
const token = ""

async function writeREADME() {
    const response = await fetch(url, {
        method: 'POST',
        body: 'Hello World!',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'text/markdown'
        }
    });
    console.log(response);
}

chrome.action.onClicked.addListener((tab) => {
    writeREADME();
});
