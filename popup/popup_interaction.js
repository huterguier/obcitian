const BINPopup = ( function () {
	
	//references to parser objects
	const parser = BINBibtex;
	
	// function to send messages
	function sendMsg(message, handler) {
		let toFullfill = browser.runtime.sendMessage(message);
		toFullfill.then(handler, 
			function(error) {
				console.log(`Error: ${error}`);
			}
		);
	}
	
	
	function queryOptionalPermissions(message) {
        browser.permissions.contains({ origins: ['*://citation-needed.springer.com/*'] }).then( 
            function(allow) {
                allow = (allow == true);
                generalOptions.allowNatureSpringer = allow;
                sendMsg({ msgType: "update_options_background", options: { allowNatureSpringer: allow }}, doNothing);
            },
            doNothing
        );
        browser.permissions.contains({ permissions: ["clipboardWrite"] }).then( 
            function(enable) {
                enable = (enable == true);
                generalOptions["text_autocopy"] = (enable && (message.enableAutoCopy == true || generalOptions["text_autocopy_always"]));
                sendMsg({ msgType: "update_options_background", options: { text_autocopy: enable }}, doNothing);
                
            },
            doNothing
        );
    }
	

	// handle only parsed bib or error
	function handleMessage(request, sender, sendResponse) {
		switch(request.msgType) {
			case "background_bibdata_popup":
				
				//save data
				bibData = request;
				
				//link to data of individual bibfields
				bibFieldData = bibData.bibFields;
				if (bibFieldData == null || !(Array.isArray(bibFieldData)) || bibFieldData.length < 1) bibFieldData = null;
				
				
				//rebuild popup depending on which format
				rebuildPopup();
				
				//send acknowledgement response to avoid error messages
				sendResponse( { received: true } );
				break;
			case "background_notextractable_popup":
				console.log(request.msgType)
				break;
			case "background_clicking_citation_button_popup":
				console.log(request.msgType)
				break;
            case "background_load_abstract_page_popup":
                console.log(request.msgType)
				break;
		}
	}
	
	//ask for bibliography data
	function prepareParser(message) {
		//copy display options
		displayOptions = message.displayOptions;
		generalOptions = message.generalOptions;
		redirectionSchemes = message.redirectionSchemes;
		
        //query permission for springer
        queryOptionalPermissions(message);
        
		//instruct background system to load bibdata from currently active tab
		sendMsg({ msgType: "popup_retreive_bibdata_background" , clear: false }, doNothing);
	}

	
	// function to retreive options
	function retreiveContent(mess) {
		//reset bibData
		bibData = null; bibFieldData = null;
		//get options and bibfields from background, and then ask for bib data
		sendMsg({ msgType: "request_options_background" , getCitationFormats: true }, prepareParser);
	}
	
	// empty handler, do nothing
	function doNothing(message) {
		message = null;//blupp
	}
	
	//renew popup content
	function rebuildPopup(buildFormatSelector = false) {
		//parse mode specific abbreviation setting, needed later
		let abbrevs = false; 
		
		if (bibData != null && typeof(bibData) == 'object' && bibFieldData != null) {
						
			
			//parse bib data
			let contentString = "";
			contentString = parser.parse(abbrevs);

			if (contentString != null) {
                const regex = /doi\s*=\s*{([^}]+)}/;
                const match = contentString.match(regex);
                let _doi = null

                if (match) {
                _doi = match[1];
                } else {
                console.log('DOI not found');
                }
                contains(_doi)
                .then(result => {
                    if (!result) {
                        console.log(result)
                        write(contentString)
                    }
                })

            }

			
			//fill textArea depending on mode, and scroll to top
			const textArea = document.getElementById("textToCopy");
			textArea.value = contentString;
			textArea.scrollTop = 0;
			
			//select text area if option enabled
			markTextArea(textArea);
		}
	}
	
	async function write(string) {
		const url = "https://127.0.0.1:27124/vault/references/bibliography.md";
		const token = ""
	
		try {    
			const response = fetch(url, {
			method: 'POST',
			body: string,
			headers: {
				'Authorization': 'Bearer ' + token,
				'Content-Type': 'text/markdown'
			}
			});
			if (!response.ok) {
				throw new Error("Network response was not ok");
			} 
			return (await response).text();
		} catch (error) {
			console.error("Fetch error: ", error);
			throw error
		}
	}
	
	
	async function read(file) {
		const url = "https://127.0.0.1:27124/vault/" + file;
		const token = "";
		
		try {
		  const response = await fetch(url, {
			method: 'GET',
			headers: {
			  'Authorization': 'Bearer ' + token,
			}
		  });
	  
		  if (!response.ok) {
			throw new Error('Network response was not ok');
		  }
	  
		  return await response.text();
		} catch (error) {
		  console.error('Fetch Error: ', error);
		  throw error;
		}
	  }
	  
	  async function contains(string) {
		try {
		  const content = await read("references/bibliography.md");
		  console.log("Content: ", content)
		  console.log("String: ", string)
		  return content.includes(string);
		} catch (error) {
		  console.error('Contains Error:', error);
		  throw error;
		}
	  }

	// return retreiveContent, handleMessage
	return {
		retreiveContent : retreiveContent,
		handleMessage : handleMessage
	}; //end return
}());