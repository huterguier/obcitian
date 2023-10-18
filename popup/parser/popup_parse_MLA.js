const BINMla = ( function () {
	
	//parse to APA format
	function parseToMLA(mode,abbrevs) {
		
		// empty return string
		let returnString = "";
		
		// book keeping variables
		let isThesis = false;
		
		// get display options and citation type
		const options = displayOptions.optionArray[mode];
		const citType = bibFieldData[0];
		
		//get mainTitle with period at the end
		let mainTitle = bibFieldData[1].replace(/[\s\.\u002E\u06D4\uFE52\uFE0E]*$/,"");
		if (mainTitle != "" && mainTitle.search(/[\!\?]$/) == -1) mainTitle += ".";
		
        //get chapter title
        let collectionTitle = "";
                
		// get shortened publisher, journal title, and shortened database
		let publisher = bibFieldData[40], journal = bibFieldData[5], database = bibFieldData[43];
        let publisherPlace = bibFieldData[74];
        publisherPlace = publisherPlace != null && publisherPlace != "" ? publisherPlace.replace(/[\s]*\,.*$/gi,"") : "";
		
		//adjustments for citation types
		switch(citType) {
			case "phdthesis":
				isThesis = true;
				journal = "";
				publisher = bibFieldData[41];
			case "misc":
				//same as article
			case "article":
				if (abbrevs) {
					//take care of dots in journal abbreviations
					journal = options.abbrevDots ? bibFieldData[7] : bibFieldData[47];
					if (journal == "") journal = bibFieldData[5];
				}
				if (mainTitle != "" && (journal != "" || isThesis || citType == "misc")) mainTitle = "\"" + mainTitle + "\"";
				if (!options.forcePublisher && !isThesis) publisher = "";
				break;
            case "incollection":
                collectionTitle = bibFieldData[71].replace(/[\s\.\u002E\u06D4\uFE52\uFE0E]*$/,"");
                if (collectionTitle != "" && collectionTitle.search(/[\!\?]$/) == -1) collectionTitle += ".";
			case "book":
				journal = "";
		}
		
		//if journal or book title not available, spit out some excuse that APA is not available
		if (mainTitle != "") {
			
			//insert author list
			let fieldValue = bibFieldData[3];
			let length = fieldValue.length;
			if (length > 0) {
				//add surname first
				let author = fieldValue[0];
				returnString += author[0];
				
				//add first name if available
				if (author[2].length > 0) returnString += ", " + author[2];
				
				//add jr, sr if available
				if (author[1].length > 0) returnString += ", " + author[1];
				
				//proceed with second author depending on number of authors
				if (length > 2) {
					returnString += ", et al."
				} else if (length == 2 && (author = fieldValue[1]) != null) {
					returnString += " and ";
					
					//add first name if available
					if (author[2].length > 0) returnString += author[2] + " ";
					
					//add surname
					returnString += author[0];
					
					//add jr, sr if available
					returnString += (author[1].length > 0) ? ", " + author[1] : ".";
					
				} else if (returnString.search(/[\s]*[\.]+$/) == -1) {
					 returnString += ".";
				}
			}
			
			//add chapter title if book chapter
			if (citType == "incollection" && collectionTitle != "") {
                returnString += " \"" + collectionTitle + "\"";
            }
			
			//add main title
			returnString += " " + mainTitle;
			
			//set separator for next data
			let separator = " ";
			
			//add either diss. keyword or journal info
			if (isThesis) {
				returnString += separator + "Dissertation";
				separator = ", ";
			} else if (journal != "") {
				returnString += separator + journal;
				separator = ", ";
				//add volume, number if available
				if ((fieldValue = bibFieldData[9]) != "") returnString += separator + "vol. " + fieldValue;
				if ((fieldValue = bibFieldData[10]) != "") returnString += separator + "no. " + fieldValue;
			}
			
			//add publisher
			if (publisher != "") {
                if (options.forceLocation && publisherPlace != "") {
                    returnString += separator + publisherPlace + ", " + publisher;
                } else {
                    returnString += separator + publisher;
                }
				separator = ", ";
			}
		
			//add date
			let month = "";
			if ((fieldValue = bibFieldData[13]) != "") {
				
				//add only year for book or thesis, or when wanted/necessary
				if (citType == "book" || citType == "phdthesis" || (month = bibFieldData[14]) == "") {
					returnString += separator + fieldValue;
					separator = ", ";
				} else if (month != "") {
					
					//modify abbreviated month
					switch (month) {
						case "Jun":
							month += "e ";
							break;
						case "Jul":
							month += "y ";
							break;
						case "Sep":
							month += "t. ";
							break;
						default:
							month += ". ";
					}
					
					//add year to string
					month += fieldValue;
					
					//add day if available
					if ((fieldValue = bibFieldData[22]) != "") {
						fieldValue = fieldValue.match(/([0-9]*)\/$/);
						if (fieldValue != null && fieldValue.length > 1 && (fieldValue = fieldValue[1]) != "") {
							fieldValue = fieldValue.replace(/^[0]+/,"") + " " + month;
						} else {
							fieldValue = month;
						}
					} else {
						fieldValue = month;
					}
					returnString += separator + fieldValue;
					separator = ", ";
				}
			}
			
			//add pages/location
			if ((fieldValue = bibFieldData[23]) != "") {
				let lastPage = bibFieldData[24];
				if (lastPage == "" || lastPage == fieldValue) {
					returnString += separator + "p. " + fieldValue;
				} else {
					returnString += separator + "pp. " + fieldValue + "-";
					
					//implement page shortening for last page in case only numbers are present, and all the requirements are fulfilled
					let val;
					if (fieldValue.search(/[^0-9]/) == -1 && lastPage.search(/[^0-9]/) == -1 && (val = parseInt(fieldValue)) > 100 && val%100 != 0 && (val = fieldValue.length) == lastPage.length) {
						//find first differing digit
						let digit;
						for (digit = 0; digit < val; ++digit) {
							if (fieldValue[digit] != lastPage[digit]) break;
						}
						//after having found differing digit, check again whether shortening is necessary
						if (digit > 0 && digit < val && (val < 4 || (val > 3 && digit > 1))) {
							lastPage = fieldValue.slice(0,digit).replace(/^.*?([0]*)$/, function (match, $1, offset, original) { return $1; }) + lastPage.slice(digit);
						}
					}
					//add lastpage
					returnString += lastPage;
				}
				separator = ", ";
			}
			
			//show database
			if (database != "" && (options.forceDatabase || isThesis)) {
				returnString += ". " + database;
			}
			
			//add DOI/URL/Source if wanted or necessary
			if (!isThesis && options.showDoi && (fieldValue = bibFieldData[15]) != "") {
				returnString += separator + "doi:" + fieldValue;
				separator = ". ";
			} else if ((options.showUrl || citType == "misc" || isThesis) && (fieldValue = bibFieldData[16]) != "") {
				returnString += separator + fieldValue.replace(/^[\s]*http[s\:]*[\/]+/i,"");
				separator = ". ";
			}
		
			//access date
			if (options.forceAccessDate) {
				returnString += separator + "Accessed " + bibFieldData[39] + " ";
				//format month abbreviation just as for citation date
				month = bibFieldData[37];
				//modify abbreviated month
				switch (month) {
					case "Jun":
						month += "e";
						break;
					case "Jul":
						month += "y";
						break;
					case "Sep":
						month += "t.";
						break;
					default:
						month += ".";
				}
				//finish adding access date
				returnString += month + " " + bibFieldData[36];
			}
			
			//finish
			if (returnString.search(/[\s]*[\.]+$/) == -1) returnString += ".";
		}
		
		if (returnString == "") returnString = "Error: Insufficient data to construct MLA style reference."
		
		//return
		return returnString.trim();
	}
	
	// function that returns parse mode info
	function getParserInfo(parseMode) {
		return { name: "MLA" , fileExtension: "txt" , encoding: "utf8" };
	}
	
	// return
	return {
		parse : parseToMLA,
		getParserInfo: getParserInfo
	}; //end return
}());
