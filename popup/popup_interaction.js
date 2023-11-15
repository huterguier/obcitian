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
				for (let view in views) {
					views[view].style.display = "none";
				}
				views.noReference.style.display = "block";
				console.log(request.msgType)
				sendResponse( { received: true } );
				break;
			case "background_clicking_citation_button_popup":
				console.log(request.msgType)
				sendResponse( { received: true } );
				break;
            case "background_load_abstract_page_popup":
                console.log(request.msgType)
				sendResponse( { received: true } );
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

			addProperties(BINParser.toJSON(contentString)[0])

			if (contentString != null) {
                exists(contentString)
                .then(result => {
                    if (!result) {
						contentString = contentString
                        write(contentString)
                    }
                })
            }
		}
	}

	
	async function write(string) {
		try {    
			const response = fetch(
				url + "/vault/" + bibtexPath, 
				{
					method: 'POST',
					body: string,
					headers: {
						'Authorization': 'Bearer ' + apiKey,
						'Content-Type': 'text/markdown'
					}
				}
			);
			return (await response).text();
		} catch (error) {
			console.error("Fetch error: ", error);
			throw error
		}
	}


	async function overwrite(string) {
		try {    
			const response = fetch(
				url + "/vault/" + bibtexPath, 
				{
					method: 'PUT',
					body: string,
					headers: {
						'Authorization': 'Bearer ' + apiKey,
						'Content-Type': 'text/markdown'
					}
				}
			);
			return (await response).text();
		} catch (error) {
			console.error("Fetch error: ", error);
			throw error
		}
	}
	
	
	async function read(file) {
		try {
		  const response = await fetch(
			url + "/vault/" + file,
			{
				method: 'GET',
				headers: {
				'Authorization': 'Bearer ' + apiKey,
				}
		  	}
		  );
		  return await response.text();
		} catch (error) {
		  console.error('Fetch Error: ', error);
		  throw error;
		}
	}
	

	function equals(ref1, ref2) {
		if (ref1["citationKey"] != null && ref2["citationKey"] != null) {
			if (ref1["citationKey"] == ref2["citationKey"])
				return true
		}
		if (ref1["doi"] != null && ref2["doi"] != null) {
			if (ref1["doi"] == ref2["doi"])
				return true
		}
		if (ref1["title"] != null && ref2["title"] != null) {
			if (ref1["title"] == ref2["title"])
				return true
		}
		return false
	}


	async function exists(string) {
		try {
			const content = await read(bibtexPath);
			var references = BINParser.toJSON(content);
			reference = BINParser.toJSON(string)[0];

			for (const ref of references) {
				if (equals(ref, reference)) {
					document.getElementById("referenceExists").style.display = "block";
					removeButton = document.getElementById("referenceRemove")
					removeButton.style.display = "block"
					removeButton.addEventListener("click", function() {
						const bibKey = reference["citationKey"]
						remove(bibKey);
					});

					return true
				}
			}

		  	return false
		} catch (error) {
			console.error('Contains Error:', error);
		  	throw error;
		}
	}

	function switchView(view) {
		for (let view in views) {
			views[view].style.display = "none";
		}
		loadView(view);
	}

	function loadView(view) {
		views[view].style.display = "block";
	}

	async function remove(bibKey) {
		try {
			const content = await read(bibtexPath);
			console.log("parsing content")
			var references = BINParser.toJSON(content);
			console.log("parsed content")

			references = references.filter(function( obj ) {
				return obj["citationKey"] !== bibKey;
			});
		} catch (error) {
			console.error('File Not Found:', error);
		}
		console.log("unparsing content")
		console.log(references)
		const newContent = BINParser.toBibtex(references);
		console.log("unparsed content")
		await overwrite(newContent);
		return;
	}

	async function update(bibKey, entry){

	}


	async function setKey(key) {
		await browser.storage.local.set({"apiKey": key})
	}

	async function verifyKey(key) {
		const url = "https://127.0.0.1:27124/";
		try {
		  const response = await fetch(url, {
			method: 'GET',
			headers: {
			  'Authorization': 'Bearer ' + key,
			}
		  });
	  
		  if (!response.ok) {
			return false
		  }
		  responseText = await response.text()
		  responseJSON = JSON.parse(responseText)
		  console.log(responseJSON)
		  console.log(responseJSON["authenticated"])
		  return responseJSON["authenticated"]
		} catch (error) {
		  console.error('Fetch Error: ', error);
		  return false
		}
	}

	async function registerKey(key) {
		if (await verifyKey(key)) {
			setKey(key)
			apiKey = key;
			browser.local.storage.set({"apiKey": key})
			return true
		}
		return false
	}

	function addProperties(object) {
		referenceProperties = document.getElementById("referenceProperties")
		referenceProperties.innerHTML = ""
		addProperty(referenceProperties, "citationKey", object["citationKey"], "text")
		entryTags = object["entryTags"]
		for (const [key, value] of Object.entries(entryTags)) {
			addProperty(referenceProperties, key, value, "text")
		}
		referenceAddProperty = document.getElementById("referenceAddProperty")
		referenceAddProperty.addEventListener("click", function() {
			addProperty(referenceProperties, "", "", "text")
		});
		referenceTitle = document.getElementById("referenceTitle")
		referenceTitle.innerHTML = "@" + object["citationKey"]
	}

	function addProperty(root, key, value, type) {
		svgPath = "../icons/lucide/alert-triangle.svg"
		property=
		`
		<div class="metadata-property"  tabindex="0" data-property-key="date" data-property-type="date">
			<div class="metadata-property-key">
				<span class="metadata-property-icon" aria-disabled="false">
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="svg-icon lucide-text"><path d="M17 6.1H3"></path><path d="M21 12.1H3"></path><path d="M15.1 18H3"></path></svg>
					</span><input id="metadata-key-${key}" class="metadata-property-key-input" type="text" value="${key}">
			</div>
			<div class="metadata-property-value">
				<div class="metadata-input-longtext mod-truncate" placeholder="Empty" contenteditable="true" tabindex="0">${value}</div><div class="metadata-link" style="display: none;"><div class="metadata-link-inner">${value}</div><div class="metadata-link-flair"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="svg-icon lucide-pencil"><line x1="18" y1="2" x2="22" y2="6"></line><path d="M7.5 20.5 19 9l-4-4L3.5 16.5 2 22z"></path></svg></div></div></div><div class="clickable-icon metadata-property-warning-icon" aria-label="Type mismatch, expected Text" style="display: none;"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="svg-icon lucide-alert-triangle"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
			</div>
		</div>
		`
		root.innerHTML += property
		metadataKeyInput = document.getElementById(`metadata-key-${key}`)
		metadataKeyInput.addEventListener("input", function() {
			console.log("change")
			if (metadataKeyInput.value != key) {
				console.log("change")
				updateButton = document.getElementById("updateButton")
				updateButton.style.display = "block"
			}
			else {
				updateButton = document.getElementById("updateButton")
				updateButton.style.display = "none"
			}
		})
	}

	// return retreiveContent, handleMessage
	return {
		retreiveContent : retreiveContent,
		handleMessage : handleMessage,
		registerKey : registerKey,
	}; //end return
}());