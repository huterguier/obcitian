

if (window.top == window) {
	
	// add event listener for data request if top level window
	browser.runtime.onMessage.addListener(handleMessage);
    
	// send current url back in message
	getTabInfo();
}


// this function is only here to make the base code more compatible with all browsers without too many browser specific adjustments

//function to get tab info
function getTabInfo() {

    let url = window.location.href;
    url = "" + url;

    
	// send current url
    return url;
}

function sendMsg(method,argument) {
	method(argument);
}


// simple function to send data to background upon request, different architecture on Safari
function handleMessage(request, sender, sendResponse) {
	
	switch(request.msgType) {
		case "background_request_bibdata_extractor":
            
            //extract data
            extractionResponse(request, sendResponse);
			
			return true;
		case "background_request_url_extractor":
			sendResponse([getTabInfo()]);
			return true;
		case "background_request_citation_download_extractor":
			//immediately respond if no download link available
			let link = request["citation_download"];
			if (link == null || link == "") {
				sendResponse(null);
				return true;
			}
			
			//otherwise, try web request for citation download
			try {
				downloadCitation(request, link, sendResponse);
			} catch(exception) {
				console.log(exception);
				sendResponse(null);
			}
			return true;
	}
}

function extractionResponse(request, sendResponse) {
    
    // create data object
    let bibData = { msgType: "extractor_send_bibtex_background" };
    
    //get pdf fall back url if wanted
    let enablePDFFallback = request.enablePDFFallback;
    enablePDFFallback = enablePDFFallback == null ? false : (enablePDFFallback == true);
    let pdfFallback = enablePDFFallback ? request.pdfFallback : null;
    
    //obtain html document of pdf fall back if requested
    if (pdfFallback == null || typeof(pdfFallback) != 'string' || pdfFallback.length == 0) {
        
        // extract data with prefselectors provided by background system, send data back to background
        extractData(bibData, request);
        sendResponse(bibData);
        
    } else {
        
        //try to get fall back document
        let fallbackDoc = new XMLHttpRequest();
        fallbackDoc.onreadystatechange = function() {
            //check for citiation-needed.springer
            if (this.readyState == 4) {

                //extract data depending on outcome
                if (this.status == 200 && this.responseXML != null) {
                    extractData(bibData, request, this.responseXML);
                } else {
                    extractData(bibData, request);
                }
                
                //send data object to background
                sendResponse(bibData);
            }
        };
        fallbackDoc.open("GET", pdfFallback, true);
        fallbackDoc.timeout = 5000;
        fallbackDoc.responseType = 'document';
        fallbackDoc.withCredentials = true;
        fallbackDoc.send();
    }
    
}

// function to find with context
function findWithContext(searchRegExp, stringToSearch, resultArray, spaceChars, beforeContext = true, afterContext = false) {	
	stringToSearch.replace(searchRegExp, 
		function(match, offset, original) {
			let groupToAdd = ["",sanitize(match.replace(/[\s]+/gi," ")),""];
			spaceChars = new RegExp("["+spaceChars+"]+","gi")
			//context after match
			let prevIdx, nextIdx;
			if (afterContext) {
				prevIdx = offset + match.length;
				nextIdx = stringToSearch.indexOf("\n",prevIdx);
				if (nextIdx == -1) {
					nextIdx = stringToSearch.length - 1;
				} else {
					let tempIdx;
					while ((tempIdx = stringToSearch.indexOf("\n",nextIdx+1)) != -1) {
						if (stringToSearch.substr(nextIdx,tempIdx-nextIdx).search(/[^\s]/i) != -1) {
							nextIdx = tempIdx;
							break;
						}
						nextIdx = tempIdx;
					}
					if (tempIdx == -1) nextIdx = stringToSearch.length - 1;
				}
				groupToAdd[2] = sanitize(stringToSearch.substr(prevIdx,nextIdx-prevIdx).replace(spaceChars," "),false,true);
			}
			
			//context before match
			if (beforeContext) {
				nextIdx = offset
				prevIdx = stringToSearch.slice(0,nextIdx).lastIndexOf("\n");
				if (prevIdx == -1) {
					prevIdx = 0;
				} else {
					prevIdx = stringToSearch.slice(0,prevIdx).replace(/[\s]*$/gi,"").lastIndexOf("\n");
					if (prevIdx == -1) prevIdx = 0;
				}
				if ((nextIdx -= prevIdx) > 0) {
					groupToAdd[0] = sanitize(stringToSearch.substr(prevIdx,nextIdx).replace(spaceChars," "),false,true);
				}
			}
			
			resultArray.push(groupToAdd);
			return match;
		}
	);
}

//CITATION DOWNLOADER: Get citation data via citation export web request in ris format!
function downloadCitation(request, link, sendResponse) {
	let citation = new XMLHttpRequest();
	citation.onreadystatechange = function() {
        //check for citiation-needed.springer
		if (this.readyState == 4) {
			let result = request; 
			if (this.status == 200) {
                let perm = result["citation_download"];
				result["citation_download"] = this.responseText.slice(0,200000);
				result["citation_download_status"] = result["citation_download"] != null && result["citation_download"] != "" ? 3 : 2; //signal whether the request has worked
			} else if (this.status == 0) {
                
				result["citation_download_status"] = -2; //signal that the request should be repeated from the global context, to circumvent a potential "mixed content" problem
			}
			
			//remove some properties. Necessary to allow background to access result object!
			delete result.citation_download_requestbody;
            delete result.citation_download_content_type;
            delete result.citation_download_cookie;
			
			//send data object to background
			sendMsg(sendResponse,result);
		}
	};
	citation.open(request["citation_download_method"], link, true);
	citation.timeout = request["citation_download_timeout"];
	citation.responseType = 'text';
	citation.withCredentials = true;
    
    //get content type
    let headerContent = request["citation_download_content_type"];
    if (headerContent != null && typeof(headerContent) == 'string' && headerContent.length > 0) {
        citation.setRequestHeader("Content-Type", headerContent);
    }
    
    //get cookie cookie policy
    headerContent = request["citation_download_cookie"];
    if (headerContent != null && typeof(headerContent) == 'string' && headerContent.length > 0) {
        citation.setRequestHeader("Content-Type", headerContent);
    }
    
    //send with or without request body
    if (request["citation_download_requestbody"] != "") {
        citation.send(request["citation_download_requestbody"]);
    } else {
        citation.send();
    }
}

//function to add custom queries
function addCustomQueries(prefselectors, queryArray, attributeArray, multipleLinePermissionArray, maximumLengths, htmlTagPermissionArray, maximumNumberOfHits = null, lineSeparatorArray = null, iframeQueries = null) {
	
	let numQueries = 0;
	if (prefselectors != null && (numQueries = prefselectors.length) > 0) {
		
		//add custom query and attribute if valid
		for (let i = numQueries - 1; i >= 0; --i) {
			
			//get selector
			let prefselector = prefselectors[i];
			if (prefselector == null) continue;
			if (!Array.isArray(prefselector) && typeof(prefselector) == 'object') {
				prefselector = [prefselector.query,prefselector.attribute,prefselector.allowMultipleLines,prefselector.maximumLength,prefselector.allowHtmlTags,prefselector.maximumNumberOfHits,prefselector.lineSeparator,prefselector.iframes]
			}
			
			//add selector only if at least required info is given
			if (prefselector.length < 2 || prefselector[0] == null || typeof(prefselector[0]) != 'string' || prefselector[0] === "" || prefselector[1] == null || typeof(prefselector[1]) != 'string' || prefselector[1] == "") continue;
			queryArray.unshift(prefselector[0]); attributeArray.unshift(prefselector[1]);
			
			//optionally add maximum number of chars, and switch to allow multiple-line queries and to allow html tags that are not already filtered by innerText,textContent and getAttribute
			multipleLinePermissionArray.unshift((prefselector.length > 2 && prefselector[2] === true));
			htmlTagPermissionArray.unshift((prefselector.length > 4 && prefselector[4] === true));
			let temp;
			maximumLengths.unshift(( (prefselector.length > 3 && typeof((temp = prefselector[3])) == 'number' && temp > 0) ? temp : 1024));
			
			//if array provided, add maximum number (default to just 1 hit if not specified!)
			if (maximumNumberOfHits != null) {
				maximumNumberOfHits.unshift(( (prefselector.length > 5 && typeof((temp = prefselector[5])) == 'number' && temp > 0) ? temp : -1));
			}
			
			//if line separator provided
			if (lineSeparatorArray != null) {
				lineSeparatorArray.unshift(( (prefselector.length > 6 && (temp = prefselector[6]) != null && typeof(temp) == 'string') ? temp : " "));
			}
			
			//if iframe query list provided
			if (iframeQueries != null) {
				iframeQueries.unshift(( (prefselector.length > 7 && (temp = prefselector[7]) != null && Array.isArray(temp)) ? temp : []));
			}
		}
	}
}

// META EXTRACTOR: Obtain bibtex data from meta tags!
function extractData(bibData, prefselectors, baseDoc = document) {
	
	//temporary variables
	let temp = null, tempTwo = null;
	
	//variables for storing and counting queries
	let numQueries = 0, numCustomQueries = 0, bibField = "", queries = null, attributes = null, attribute = "", allowMultipleLines = null, allowHtmlTags = null, maximumLengths = null, maxNumHits = null, lineSeparators = null, iframeQueries = null;
	
	//set bib fields and associate them with page queries, set a kernel of filters here, and then extend this with preferred selectors
	let bibFields = ["citation_title","citation_issue","citation_volume","citation_issn","citation_isbn","citation_doi","citation_firstpage","citation_lastpage","citation_journal_title","citation_journal_abbrev","citation_url","citation_archive_id","citation_publisher","citation_date","citation_abstract","citation_channel","citation_language","citation_collection_title","citation_chapter","citation_publisher_address"];
	const bibFieldQueries = [	
				["meta[name=\"citation_title\" i]","meta[property=\"citation_title\" i]","meta[name=\"DC.Title\" i]","meta[property=\"DC.Title\" i]","meta[name=\"og:title\" i]","meta[property=\"og:title\" i]","meta[itemprop=\"name\" i]","div.articleTitle","meta[property=\"og.title\" i]","meta[name=\"og.title\" i]","meta[name=\"bepress_citation_title\" i]","meta[property=\"bepress_citation_title\" i]"], /*citation_title*/
				["meta[name=\"citation_issue\" i]","meta[property=\"citation_issue\" i]","meta[name=\"prism.issue\" i]","meta[property=\"prism.issue\" i]","meta[name=\"prism.number\" i]","meta[property=\"prism.number\" i]","meta[name=\"bepress_citation_issue\" i]","meta[property=\"bepress_citation_issue\" i]","meta[name=\"DC.Issue\" i]","meta[property=\"DC.Issue\" i]"], /*citation_issue*/
				["meta[name=\"citation_volume\" i]","meta[property=\"citation_volume\" i]","meta[name=\"prism.volume\" i]","meta[property=\"prism.volume\" i]","meta[name=\"bepress_citation_volume\" i]","meta[property=\"bepress_citation_volume\" i]","meta[name=\"DC.Volume\" i]","meta[property=\"DC.Volume\" i]"], /*citation_volume*/
				["meta[name=\"citation_issn\" i]","meta[property=\"citation_issn\" i]","meta[name=\"prism.issn\" i]","meta[property=\"prism.issn\" i]","meta[name=\"og:issn\" i]","meta[property=\"og:issn\" i]"], /*citation_issn*/
				["meta[name=\"citation_isbn\" i]","meta[property=\"citation_isbn\" i]","meta[name=\"prism.isbn\" i]","meta[property=\"prism.isbn\" i]","meta[name=\"og:isbn\" i]","meta[property=\"og:isbn\" i]","meta[name=\"og:book:isbn\" i]","meta[property=\"og:book:isbn\" i]","meta[name=\"book:isbn\" i]","meta[property=\"book:isbn\" i]"], /*citation_isbn*/
				["meta[name=\"citation_doi\" i]","meta[property=\"citation_doi\" i]","meta[name=\"DC.Identifier\" i]","meta[property=\"DC.Identifier\" i]","meta[scheme=\"doi\" i]","meta[name=\"bepress_citation_doi\" i]","meta[property=\"bepress_citation_doi\" i]"], /*citation_doi*/
				["meta[name=\"citation_firstpage\" i]","meta[property=\"citation_firstpage\" i]","meta[name=\"prism.startingPage\" i]","meta[property=\"prism.startingPage\" i]","meta[name=\"bepress_citation_firstpage\" i]","meta[property=\"bepress_citation_firstpage\" i]","meta[name=\"DC.firstPage\" i]","meta[property=\"DC.firstPage\" i]"], /*citation_startingpage*/
				["meta[name=\"citation_lastpage\" i]","meta[property=\"citation_lastpage\" i]","meta[name=\"prism.endingPage\" i]","meta[property=\"prism.endingPage\" i]","meta[name=\"bepress_citation_lastpage\" i]","meta[property=\"bepress_citation_lastpage\" i]"], /*citation_endingPage*/
				["meta[name=\"citation_journal_title\" i]","meta[property=\"citation_journal_title\" i]","meta[name=\"og:site_name\" i]","meta[property=\"og:site_name\" i]","meta[name=\"prism.publicationName\" i]","meta[property=\"prism.publicationName\" i]","meta[name=\"bepress_citation_journal_title\" i]","meta[property=\"bepress_citation_journal_title\" i]"], /*citation_journal_title*/
				["meta[name=\"citation_journal_abbrev\" i]","meta[property=\"citation_journal_abbrev\" i]","meta[name=\"bepress_citation_journal_abbrev\" i]","meta[property=\"bepress_citation_journal_abbrev\" i]"], /*citation_journal_abbrev*/	/*["meta[name=\"citation_abstract_html_url\"]","meta[name=\"og:url\"]","meta[property=\"og:url\"]","meta[name=\"bepress_citation_abstract_html_url\"]","meta[name=\"citation_pdf_url\"]","meta[name=\"bepress_citation_pdf_url\"]"],*/
				[],/*citation_url, EMPTY by default due to security reasons!*/
				["meta[name=\"citation_arxiv_id\" i]","meta[property=\"citation_arxiv_id\" i]"], /*citation_archive_id*/	["meta[name=\"citation_publisher\" i]","meta[property=\"citation_publisher\" i]","meta[name=\"DC.Publisher\" i]","meta[property=\"DC.Publisher\" i]","meta[name=\"bepress_citation_publisher\" i]","meta[property=\"bepress_citation_publisher\" i]","div#header div#left_column a","meta[name=\"publisher\" i]","meta[property=\"publisher\" i]","meta[itemprop=\"publisher\" i]"], /*citation_publisher*/
				["meta[name=\"citation_publication_date\" i]","meta[property=\"citation_publication_date\" i]","meta[name=\"citation_date\" i]","meta[property=\"citation_date\" i]","meta[name^=\"DC.Date.Modified\" i]","meta[property^=\"DC.Date.Modified\" i]","meta[name^=\"DC.Date\" i]","meta[property^=\"DC.Date\" i]","meta[name=\"prism.publicationDate\" i]","meta[property=\"prism.publicationDate\" i]","meta[name=\"article:modified_time\" i]","meta[property=\"article:modified_time\" i]","meta[name=\"article:published_time\" i]","meta[property=\"article:published\" i]","meta[property=\"article:published_time\"]","meta[name=\"citation_online_date\" i]","meta[property=\"citation_online_date\" i]","div.pubdate-and-corrections time","meta[name=\"bepress_citation_date\" i]","meta[property=\"bepress_citation_date\" i]","meta[name=\"bepress_citation_online_date\" i]","meta[property=\"bepress_citation_online_date\" i]","meta[name=\"date\" i]","meta[property=\"date\" i]","meta[name=\"citation_year\" i]","meta[property=\"citation_year\" i]","meta[name=\"book:release_date\" i]","meta[property=\"book:release_date\" i]"],/*citation_date*/
				["meta[name=\"citation_abstract\" i]","meta[name=\"description\" i]","meta[property=\"og:description\" i]","meta[name=\"dc.description\" i]"],/*citation abstract*/
				[], /*citation channel, EMPTY by default since channel typically not available*/
				["meta[name=\"dc.language\" i]","meta[itemprop=\"inLanguage\" i]","html","meta[http-equiv=\"content-language\" i]"],/*citation_language*/
				["meta[name=\"citation_inbook_title\" i]"],/*citation_collection_title*/
				[],/*citation_chapter*/
				[]/*citation_publisher_address*/
				
	];
	const bibFieldQueryAttributes = [
					["content","content","content","content","content","content","content","innerText","content","content","content","content"], /*citation_title*/
					["content","content","content","content","content","content","content","content","content","content"], /*citation_issue*/
					["content","content","content","content","content","content","content","content"], /*citation_volume*/
					["content","content","content","content","content","content"], /*citation_issn*/
					["content","content","content","content","content","content","content","content","content","content"], /*citation_isbn*/
					["content","content","content","content","content","content","content"], /*citation_doi*/
					["content","content","content","content","content","content","content","content"], /*citation_startingpage*/
					["content","content","content","content","content","content"], /*citation_endingPage*/
					["content","content","content","content","content","content","content","content"], /*citation_journal_title*/
					["content","content","content","content"], /*citation_journal_abbrev*/
					/*["content","content","content","content","content","content"],*/
					[],/*citation_url, EMPTY by default due to security reasons*/
					["content","content"], /*citation_archive_id*/
					["content","content","content","content","content","content","title","content","content","content"], /*citation_publisher*/	["content","content","content","content","content","content","content","content","content","content","content","content","content","content","content","content","content","datetime","content","content","content","content","content","content","content","content","content","content"], /*citation_date*/
					["content","content","content","content"], /*citation abstract, EMPTY by default since big chunks of text only allowed on domains for which selectors have been implemented*/
					[], /*citation channel, EMPTY by default since channel typically not available*/
					["content","content","lang","content","content"],/*citation_language*/
					["content"],/*citation_collection_title*/
					[],/*citation_chapter*/
					[]/*citation_publisher_address*/
	]
	
	
	//object with query summary for preformatter
	const querySummary = {};
	
	// loop over initial, most common fields for which only first entry in source is needed; always start with preferred selectors sent by background
	let numFields = bibFields.length; //16 at the moment
	
	for (let i = 0; i < numFields; ++i) {
		
		//get bibfield and set to empty string in data object
		bibField = bibFields[i]; bibData[bibField] = "";
		
		//initialize query summary number
		querySummary[bibField] = 0;
		
		//get queries and attributes for bibfield, allow multiple lines for custom queries (=whitelisted domains)
		queries = bibFieldQueries[i]; attributes = bibFieldQueryAttributes[i];
		allowMultipleLines = [], allowHtmlTags = [], maximumLengths = [], lineSeparators = [], iframeQueries = [];
		
		//special treatment for abstract
		let defaultMaxLength = 1024; let defaultAllowMultipleLines = false;
		if (bibField == "citation_abstract") {
			defaultMaxLength = 20000; defaultAllowMultipleLines = true;
		}
		
		//add preferred selectors which may specify to allow multiple lines
		addCustomQueries(prefselectors[bibField], queries, attributes, allowMultipleLines, maximumLengths, allowHtmlTags, null, lineSeparators, iframeQueries);
		
		//determine number of valid custom queries added, and set query summary to this value
		numCustomQueries = allowMultipleLines.length; querySummary[bibField] = numCustomQueries;
		
		//now perform queries
		numQueries = queries.length;
		for (let j = 0; j < numQueries; ++j) {
			
			//query selector, advance specified iframes first. Iframes only work if they are local, since cross site scripting is not allowed
			let innerDoc = baseDoc; let iframes = iframeQueries[j];
			try {
				if (iframes != null && Array.isArray(iframes)) {
					let numIframeQueries = iframes.length;
					for (let k = 0; k<numIframeQueries; ++k) {
						let iframe = iframes[k];
						if (iframe == null || typeof(iframe) != 'string' || iframe.length < 1) break;
						iframe = innerDoc.getElementById(iframe);
						if (iframe == null) break;
						iframe = (iframe.contentDocument) ? iframe.contentDocument : iframe.contentWindow.document;
						if (iframe != null) innerDoc = iframe;
					}
				}
			} catch(error) {
				innerDoc = baseDoc;
			}
			let selectorResponse = innerDoc.querySelector(queries[j]);
			if (selectorResponse != null) {
				
				//determine whether multiple-line queries should be performed, html tags should be allowed, maxLength and line separator should be set for custom queries
				let allowMultipleLine = allowMultipleLines[j], allowHtml = allowHtmlTags[j], maxLength = maximumLengths[j], lineSeparator = lineSeparators[j];

				if (j < numCustomQueries) {
					allowMultipleLine = ((allowMultipleLine != null && allowMultipleLine == true) || defaultAllowMultipleLines);
					allowHtml = (allowHtml != null && allowHtml == true);
					maxLength = (maxLength != null && maxLength > 0) ? maxLength : defaultMaxLength;
					lineSeparator = (lineSeparator != null && typeof(lineSeparator) == 'string') ? lineSeparator : " ";
				} else {
					allowMultipleLine = defaultAllowMultipleLines; allowHtml = false; maxLength = defaultMaxLength; lineSeparator = " ";
				}
				
				//now check whether innerText,textContent or the specified attribute is available
				switch ((attribute = attributes[j])) {
					case "innerText":
						selectorResponse = sanitize(selectorResponse.innerText,allowHtml,allowMultipleLine,maxLength,lineSeparator);
						break;
					case "textContent":
						selectorResponse = sanitize(selectorResponse.textContent,allowHtml,allowMultipleLine,maxLength,lineSeparator);
						break;
					default:
						selectorResponse = sanitize(selectorResponse.getAttribute(attribute),allowHtml,allowMultipleLine,maxLength,lineSeparator);
				}
				
				//if sanitized query response not empty, feed into bibData object
				if (selectorResponse != "") {
					//set selectorResponse as data
					bibData[bibField] = selectorResponse;

					//signal which (custom) query was successful
					if (j < numCustomQueries) querySummary[bibField] = j + 1;
					break;
				}
			}
			querySummary[bibField]--;
		}
	}
	
	
	
	/*Misc, Type, Json, Authors and Keywords (fields with multiple positive hits)*/
	bibFields = ["citation_misc","citation_type","citation_json","citation_authors","citation_keywords"];
	//set queries and attributes
	queries = [
		[],["meta[name=\"citation_type\" i]","meta[property=\"citation_type\" i]","meta[name=\"DC.Type\" i]","meta[property=\"DC.Type\" i]","meta[property=\"og:type\" i]","meta[name=\"og:type\" i]"],
		[], /*citation_json*/
		["meta[name=\"citation_author\" i]","meta[property=\"citation_author\" i]","meta[name=\"DC.Contributor\" i]","meta[property=\"DC.Contributor\" i]","meta[name=\"DC.Creator\" i]","meta[property=\"DC.Creator\" i]","meta[name=\"bepress_citation_author\" i]","meta[property=\"bepress_citation_author\" i]","div#description_tab h3.product_biblio_author b","meta[name=\"author\" i]","meta[property=\"author\" i]","meta[property=\"og:book:author\" i]","meta[name=\"og:book:author\" i]"], ["meta[name=\"citation_keywords\" i]","meta[property=\"citation_keywords\" i]","meta[name=\"citation_keyword\" i]","meta[property=\"citation_keyword\" i]","meta[name=\"DC.Subject\" i]","meta[property=\"DC.Subject\" i]","meta[name=\"keywords\" i]","meta[property=\"keywords\" i]","meta[name=\"keywords\" i]"]
	];
	attributes = [
		[],
		["content","content","content","content","content","content"],
		[], /*citation_json*/
		["content","content","content","content","content","content","content","content","innerText","content","content","content","content"],
		["content","content","content","content","content","content","content","content","content"]
	];
	
	//special treatment for ld+json
	if ((temp = prefselectors["citation_json"]) != null && Array.isArray(temp)) {
		temp[temp.length] = ['script[type="application/ld+json" i]','textContent',true,20000];
	} else {
		prefselectors["citation_json"] = [ ['script[type="application/ld+json" i]','textContent',true,20000] ];
	}
	
	//do not allow more than 100 positive hits, to restrict content to be parsed (mostly to not get stuck parsing too many characters). Hyper authoring currently allowed, but anything more than 10000 must be specified by custom selector per URL
	const maxNumHitsDefaults = [100,20,10,10000,20]; 
	for (let k = 0; k<5; ++k) {
		
		//set bibfield
		bibField = bibFields[k];
		
		//get prefeselector
		temp = prefselectors[bibField];
		if (temp == null) temp = prefselectors[bibField.replace(/s$/,"")]; //to get rid of plural confusion
		
		//add preferred selectors for type and misc queries, including optional switch for multiple-line queries
		allowMultipleLines = [], allowHtmlTags = [], maximumLengths = [], maxNumHits = [], lineSeparators = [], iframeQueries = [];
		addCustomQueries(temp, queries[k], attributes[k], allowMultipleLines, maximumLengths, allowHtmlTags, maxNumHits, lineSeparators, iframeQueries);
		
		//determine number of valid custom queries added, and set query summary to this value for authors and keywords
		numCustomQueries = allowMultipleLines.length; querySummary[bibField] = k < 2 ? 0 : numCustomQueries;
		
		//perform queries
		tempTwo = "";
		numQueries = queries[k].length;
		for (let i = 0; i < numQueries; ++i) {
			
			//query all elements specified by selector, advance specified iframes first. Iframes only work if they are local, since cross site scripting is not allowed
			let innerDoc = baseDoc; let iframes = iframeQueries[i];
			try {
				if (iframes != null && Array.isArray(iframes)) {
					let numIframeQueries = iframes.length;
					for (let k = 0; k<numIframeQueries; ++k) {
						let iframe = iframes[k];
						if (iframe == null || typeof(iframe) != 'string' || iframe.length < 1) break;
						iframe = innerDoc.getElementById(iframe);
						if (iframe == null) break;
						iframe = (iframe.contentDocument) ? iframe.contentDocument : iframe.contentWindow.document;
						if (iframe != null) innerDoc = iframe;
					}
				}
			} catch(error) {
				innerDoc = baseDoc;
			}
			let selectorResponse = innerDoc.querySelectorAll(queries[k][i]);
			numFields = selectorResponse.length;
			
			//if there are elements, proceed querying attribute
			if (numFields > 0) {
				
				//restrict numFields by maximum number of hits
				let maxNum = maxNumHits[i];
				if (maxNum == null || maxNum == -1) maxNum = maxNumHitsDefaults[k];
				numFields = numFields < maxNum ? numFields : maxNum;
				
				//determine whether multiple-line queries should be performed, html tags should be allowed, maxLength and line separator should be set for custom queries
				let allowMultipleLine = allowMultipleLines[i], allowHtml = allowHtmlTags[i], maxLength = maximumLengths[i], lineSeparator = lineSeparators[i];

				if (i < numCustomQueries) {
					allowMultipleLine = (allowMultipleLine != null && allowMultipleLine == true);
					allowHtml = (allowHtml != null && allowHtml == true);
					maxLength = (maxLength != null && maxLength > 0) ? maxLength : 1024;
					lineSeparator = (lineSeparator != null && typeof(lineSeparator) == 'string') ? lineSeparator : " ";
				} else {
					allowMultipleLine = false; allowHtml = false; maxLength = 1024; lineSeparator = " ";
				}
				
				//now check whether innerText,textContent or the specified attribute is available. Implement special behavior for json linked data
				if (k == 2) {
					for (let j = 0; j < numFields; ++j) {
						tempTwo += "" + sanitize(selectorResponse[j].textContent, allowHtml, allowMultipleLine, maxLength).replace(/(?:^[^\{]*|[^\}]*$)/g,"") + " ; ";
					}
				} else {
					switch ((attribute = attributes[k][i])) {
						case "innerText":
							for (let j = 0; j < numFields; ++j) {
								tempTwo += "" + sanitize(selectorResponse[j].innerText, allowHtml, allowMultipleLine, maxLength,lineSeparator) + " ; ";
							}
							break;
						case "textContent":
							for (let j = 0; j < numFields; ++j) {
								tempTwo += "" + sanitize(selectorResponse[j].textContent, allowHtml, allowMultipleLine, maxLength,lineSeparator) + " ; ";
							}
							break;
						default:
							for (let j = 0; j < numFields; ++j) {
								tempTwo += "" + sanitize(selectorResponse[j].getAttribute(attribute), allowHtml, allowMultipleLine, maxLength,lineSeparator) + " ; ";
							}
					}
				}
				//For authors, json and keywords, take only first successful query!
				if (k > 1) {
					//signal which (custom) query was successful
					if (i < numCustomQueries) querySummary[bibField] = i + 1;
					break;
				}
			}
			if (k < 2) {
				querySummary[bibField]++;
			} else {
				querySummary[bibField]--;
			}
		}
		bibData[bibField] = tempTwo.replace(/[\ ]*;[\ ]*$/,"");
		tempTwo = "";
	}
	/*Dynamic Download*/
	
	//if "download citation" selector provided, obtain link
	bibData["citation_download"] = "";
	
	//start with empty request body, content type, cookie policy. Can be modified in preformatter
	bibData["citation_download_requestbody"] = "";
	bibData["citation_download_content_type"] = "";
    bibData["citation_download_cookie"] = "";
	
	//initialize query summary number
	querySummary["citation_download"] = 0;
	
	//get preferred selector
	temp = prefselectors["citation_download"];
	if (temp != null && (numQueries = temp.length) > 0) {
		
		for (let j = 0; j < numQueries; ++j) {
			
			//get selector
			tempTwo = temp[j];
			if (tempTwo == null) {
				//if preferred selector not valid, shift both j and numQueries to get correct querySummary number!
				j--; numQueries--;
				continue;
			}
			if (!Array.isArray(tempTwo) && typeof(tempTwo) == 'object') {
				tempTwo = [tempTwo.query,tempTwo.attribute,tempTwo.allowMultipleLines,tempTwo.maximumLength,tempTwo.allowHtmlTags,tempTwo.maximumNumberOfHits,tempTwo.lineSeparator,tempTwo.iframes]
			}
			
			//proceed only if valid
			if (tempTwo.length > 0) {
				if (tempTwo[0] == "BINURL") {
					//if query is "BINURL", take the url from the address bar
					bibData["citation_download"] = window.location.href;
					
					//signal successful query
					querySummary["citation_download"] = j + 1;
					
					break;
				} else if (tempTwo.length > 1 && tempTwo[0] != null && tempTwo[0] != "" && tempTwo[1] != null && tempTwo[1] != "") {
					
					//otherwise query the selector
					//determine iframe ids
					let iframes = tempTwo[7];
					iframes = (tempTwo.length > 7 && iframes != null && Array.isArray(iframes)) ? iframes : [];
					let innerDoc = baseDoc;
					try {
						let numIframeQueries = iframes.length;
						for (let k = 0; k<numIframeQueries; ++k) {
							let iframe = iframes[k];
							if (iframe == null || typeof(iframe) != 'string' || iframe.length < 1) break;
							iframe = innerDoc.getElementById(iframe);
							if (iframe == null) break;
							iframe = (iframe.contentDocument) ? iframe.contentDocument : iframe.contentWindow.document;
							if (iframe != null) innerDoc = iframe;
						}
					} catch(error) {
						innerDoc = baseDoc;
					}
					
					let selectorResponse = innerDoc.querySelector(tempTwo[0]);
					if (selectorResponse != null) {
						
						//determine whether multiple-line request should be allowed
						let allowMultipleLine = tempTwo[2];
						allowMultipleLine = (tempTwo.length > 2 && allowMultipleLine != null && allowMultipleLine == true);
						
						//determine maximum length
						let maxLength = tempTwo[3];
						maxLength = (tempTwo.length > 3 && maxLength != null && maxLength > 0) ? maxLength : 1024;
						
						//determine whether to allow html
						let allowHtml = tempTwo[4];
						allowHtml = (tempTwo.length > 4 && allowHtml != null && allowHtml == true);
						
						//determine line separator
						let lineSeparator = tempTwo[6];
						lineSeparator = (tempTwo.length > 6 && lineSeparator != null && typeof(lineSeparator) == 'string') ? lineSeparator : " ";
						
						//check if attribute is available
						switch ((attribute = tempTwo[1])) {
							case "innerText":
								selectorResponse = sanitize(selectorResponse.innerText, allowHtml, allowMultipleLine,maxLength,lineSeparator);
								break;
							case "textContent":
								selectorResponse = sanitize(selectorResponse.textContent, allowHtml, allowMultipleLine,maxLength,lineSeparator);
								break;
							default:
								selectorResponse = sanitize(selectorResponse.getAttribute(attribute), allowHtml, allowMultipleLine,maxLength,lineSeparator);
						}
						if (selectorResponse != "") {
							//if successful query, assign to data object
							bibData["citation_download"] = selectorResponse;
							
							//signal successful query
							querySummary["citation_download"] = j + 1;
							
							break;
						}
					}
				} else {
					//if preferred selector not valid, shift both j and numQueries to get correct querySummary number!
					j--; numQueries--;
				}
			} else {
				//if preferred selector not valid, shift both j and numQueries to get correct querySummary number!
				j--; numQueries--;
			}
		}
	}
	tempTwo = "";
	
	/*Others*/
	
	//set webpage title
	bibData["citation_webpage_title"] = document.title;
	
	//set current url as citation url if not available
	temp = bibData["citation_url"];
	if (bibFieldQueries[10] == "" || temp == "") {
		temp = window.location.href;
		if (temp.search(/^http[s]?:\/\/[^\/]+/) == -1) temp = "";
		querySummary["citation_url"] = 0;
	}
	
	//get url with and without path
	bibData["citation_url"] = temp;
	bibData["citation_url_nopath"] = window.location.href.replace(/(^http[s]?:\/\/[^\/]+).*$/,
		function(match, $1, offset, original) {
			return $1.trim();
		}
	);
	
	//save webpage date for note and misc type
	temp = document.lastModified;
	bibData["citation_webpage_date"] = "" + temp.split("/")[2].split(" ")[0] + "-" + temp.split("/")[0] + "-" + temp.split("/")[1];
	
	//if no date found try to extract date from the page
	let documentText = null;
	if (bibData["citation_date"] == "" && prefselectors["citation_date"] == null && bibData["citation_misc"] == "" && (bibData["citation_json"] == "" || prefselectors["citation_json"].length <= 1)) {
		
		//first check whether some info is given, to not extract date from any random website
		if (bibData["citation_journal_title"] != "" || bibData["citation_authors"] != "" || bibData["citation_type"] != "" || bibData["citation_abstract"] != "") {
			documentText = document.documentElement.innerText;
			let dateArray = [];
			let index;
			
			//find patters with month names
			const monthMatchKeywords = prefselectors.dateKeywords.monthsMatchRegExp;
			const spaceChars = "\\ \\t\\u00a0\\u1680\\u2000-\\u200a\\u2028\\u2029\\u202f\\u205f\\u3000\\ufeff";
			const yearScheme = "20[0-9][0-9]|[0-1][0-9][0-9][0-9]|[0-9][0-9]";
			const dayScheme = "[0]?[1-9]|[12][0-9]|3[01]";
			const dayNames = prefselectors.dateKeywords.dayKeywords;
			let datesNumbers = "(?:^|[^\\n0-9a-z]+)(?:(?:|(?:" + dayNames + ")[^\\n0-9a-z]+)(?:" + dayScheme + ")(?:st|th|nd|rd|)[" + spaceChars + "\\,\\.\\-]+(?:" + monthMatchKeywords + ")[" + spaceChars + "\\,\\.\\-]+(?:" + yearScheme + ")|(?:" + yearScheme + ")[" + spaceChars + "\\,\\.\\-]+(?:" + monthMatchKeywords + ")[" + spaceChars + "\\,\\.\\-]+(?:" + dayScheme + ")|(?:" + monthMatchKeywords + ")[" + spaceChars + "\\,\\.\\-]+(?:" + dayScheme + ")(?:st|th|nd|rd|)[" + spaceChars + "\\,\\.\\-]+(?:" + yearScheme + ")|(?:" + monthMatchKeywords + ")[" + spaceChars + "\\,\\.\\-]+(?:" + yearScheme + ")|(?:" + yearScheme + ")[" + spaceChars + "\\,\\.\\-]+(?:" + monthMatchKeywords + "))[^\\n]?";
			
			//find with context
			findWithContext(new RegExp(datesNumbers,"gi"),documentText,dateArray,spaceChars)
			
			//find numerical date schemes
			const monthScheme = "1[0-2]|[0]?[1-9]";
			datesNumbers = "[^\\n]?(?:(?:" + yearScheme + ")[" + spaceChars + "]*[\\-]+[" + spaceChars + "]*(?:(?:" + monthScheme + ")[" + spaceChars + "]*[\\-]+[" + spaceChars + "]*(?:" + dayScheme + ")|(?:|(?:" + dayNames + ")[^\\n0-9a-z]+)(?:" + dayScheme + ")[" + spaceChars + "]*[\\-]+[" + spaceChars + "]*(?:" + monthScheme + "))|(?:" + yearScheme + ")[" + spaceChars + "]*[\\.]+[" + spaceChars + "]*(?:(?:" + monthScheme + ")[" + spaceChars + "]*[\\.]+[" + spaceChars + "]*(?:" + dayScheme + ")|(?:|(?:" + dayNames + ")[^\\n0-9a-z]+)(?:" + dayScheme + ")[" + spaceChars + "]*[\\.]+[" + spaceChars + "]*(?:" + monthScheme + "))|(?:"
			+ yearScheme + ")[" + spaceChars + "]*[\\/]+[" + spaceChars + "]*(?:(?:" + monthScheme + ")[" + spaceChars + "]*[\\/]+[" + spaceChars + "]*(?:" + dayScheme + ")|(?:|(?:" + dayNames + ")[^\\n0-9a-z]+)(?:" + dayScheme + ")[" + spaceChars + "]*[\\/]+[" + spaceChars + "]*(?:" + monthScheme + "))|(?:(?:" + monthScheme + ")[" + spaceChars + "]*[\\-]+[" + spaceChars + "]*(?:" + dayScheme + ")|(?:|(?:" + dayNames + ")[^\\n0-9a-z]+)(?:" + dayScheme + ")[" + spaceChars + "]*[\\-]+[" + spaceChars + "]*(?:" + monthScheme + "))[" + spaceChars + "]*[\\-]+[" + spaceChars + "]*(?:" + yearScheme + ")|(?:(?:" + monthScheme + ")[" + spaceChars + "]*[\\.]+[" 
			+ spaceChars + "]*(?:" + dayScheme + ")|(?:|(?:" + dayNames + ")[^\\n0-9a-z]+)(?:" + dayScheme + ")[" + spaceChars + "]*[\\.]+[" + spaceChars + "]*(?:" + monthScheme + "))[" + spaceChars + "]*[\\.]+[" + spaceChars + "]*(?:" + yearScheme + ")|(?:(?:" + monthScheme + ")[" + spaceChars + "]*[\\/]+[" + spaceChars + "]*(?:" + dayScheme + ")|(?:|(?:" + dayNames + ")[^\\n0-9a-z]+)(?:" + dayScheme + ")[" + spaceChars + "]*[\\/]+[" + spaceChars + "]*(?:" + monthScheme + "))[" + spaceChars + "]*[\\/]+[" + spaceChars + "]*(?:" + yearScheme + "))[^\\n]?";
			
			//find with context
			findWithContext(new RegExp(datesNumbers,"gi"),documentText,dateArray,spaceChars)

			//get dates
			bibData["citation_date_content"] = dateArray;
		}
	}
	
	/*Finalize*/
	    
	//save query summary array into message
	bibData["query_summary"] = querySummary;
	
	//one may later manually assign separate "non-latex" (without math mode) versions to title and publisher, so we set the fields empty
	bibData["citation_title_nonlatex"] = ""; bibData["citation_publisher_nonlatex"] = "";
	
	//database info
	bibData["citation_database"] = "";
	
	//indicate if reverse date scheme (month in "strange, American" position)
	bibData["citation_date_reverse"] = false;
}

//format strings obtained from queries to prevent websites from feeding the extension with garbage or malicious code. by default, only allow one line, and enforce maximum number of characters, and remove HTML tags (to not allow <script> tags etc.)
function sanitize(inputString,allowHtmlTags = false,allowMultipleLines = false,maxSize = 1024,lineSeparator = " ") {
	
	//immediately return empty string if invalid input;
	if (inputString == null || inputString == undefined || inputString == "") return "";
	
	//remove control characters, invalid high-low surrogate pairs, and leading white space
	inputString = inputString.replace(/(?:[\x00-\x08\x0E-\x1F\x7F-\x9F]|[\uD800-\uDBFF][^\uDC00-\uDFFF])/g, "").trim()
	
	//if multiple lines allowed, replace newline by line separator, otherwise keep only one line
	inputString = allowMultipleLines ? inputString.replace(/\n[\s]*/g,lineSeparator).trim() : inputString.replace(/\n.*/g,"").trim();
	
	// remove html tags (not necessary if obtained from innerText or textContent!)
	if (!allowHtmlTags) inputString = inputString.replace(/<[^0-9][^>]*?>/g, "");
	
	// trim and enforce max size
	return inputString.trim().slice(0,maxSize).trim();
	
}
