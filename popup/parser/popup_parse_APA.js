const BINApa = ( function () {
	
	//parse to APA format
	function parseToAPA(mode,abbrevs) {
		
		// empty return string
		let returnString = "";
		
		// book keeping variables
		let isThesis = false, dateLater = false, isPreprint = false;
		
		// get display options and citation type
		const options = displayOptions.optionArray[5];
		const citType = bibFieldData[0];
		
		//get mainTitle
		let mainTitle = bibFieldData[1];
        let collectionTitle = bibFieldData[71];
		
		// citType specific adjustments
		let publisher = bibFieldData[17];
		switch(citType) {
			case "article":
				publisher = bibFieldData[5];
				if (abbrevs) {
					//take care of dots in abbreviations
					
					publisher = options.abbrevDots ? bibFieldData[7] : bibFieldData[47];
					if (publisher == "") publisher = bibFieldData[5];			
				}
				break;
			case "phdthesis":
				isThesis = true;
		}
		
		//if journal or book title not available, spit out some excuse that APA is not available
		if (mainTitle != "") {
			
			//insert author list
			let separator = " ";
			let fieldValue = bibFieldData[3];
			let length = fieldValue.length;
			if (length > 0) {
				//differentiate between 1-7 and 8+ authors
				let numLines;
				if (length < 8) {
					numLines = length-1;
					separator = length > 1 ? "& " : "";
				} else {
					numLines = 6;
					separator = "...";
				}
				
				//temporarily save initials
				const initials = bibFieldData[28];
				
				//loop over all but the last author
				for (let i = 0; i<numLines; ++i) {
					
					//add surname
					let name = fieldValue[i];
					returnString += name[0];
					
					//add jr, sr if available
					if (name[1].length > 0) returnString += ", " + name[1];
					
					//add initials if available
					if (initials[i].length > 0) returnString += ", " + initials[i];
					
					//separate
					returnString += ", ";
				}
				
				//add separator for last author
				returnString += separator;
				
				//add surname for last author
				length--;
				fieldValue = fieldValue[length];
				returnString += fieldValue[0];
				
				//add jr, sr if available
				if (fieldValue[1].length > 0) returnString += " " + fieldValue[1];
				
				//add initials if available
				if (initials[length].length > 0) returnString += ", " + initials[length];
				
				//set separator for next steps
				separator = (returnString.search(/[\.\?\!]$/) == -1) ? ". " : " ";
			} else {
				dateLater = true;
				separator = "";
			}
			
			//get date
			let date = "";
			if ((fieldValue = bibFieldData[13]) != "") {
				
				//start with open bracket
				date += "(" + fieldValue;
				
				//add month and day if available and if citType is generic
				if (citType == "misc") {
					if (options.abbreviateMonth == true) {
						fieldValue = bibFieldData[14];
						if (fieldValue != "") {
							if (fieldValue == "Sep") {
								fieldValue += "t.";
							} else if (fieldValue != "May"){
								fieldValue += ".";
							}
						}
					} else {
						fieldValue = bibFieldData[35];
					}
					if (fieldValue != "") {
						date += ", " + fieldValue;
						if ((fieldValue = bibFieldData[22]) != "") {
							fieldValue = fieldValue.match(/([0-9]*)\/$/);
							if (fieldValue != null && fieldValue.length > 1 && (fieldValue = fieldValue[1]) != "") date += " " + fieldValue;
						}
					}
				}
				date += ")";
			}
			
			//add date if appropriate here
			if (!dateLater) {
				returnString += separator + date;
				separator = ". ";
			}
			
			//add main title
			returnString += separator + mainTitle + (mainTitle.search(/[\.!\?]$/) == -1 && !isThesis ? ". " : " ");
			if (isThesis) returnString += "(Dissertation). "
            
            //add collection title
            if (citType == "incollection" && collectionTitle != "") {
                returnString += collectionTitle + (collectionTitle.search(/[\.!\?]$/) == -1 ? ". " : " ");
            }
                
			//add date at the latest here
			if (dateLater) {
				returnString += date + ". ";
			}
			
			//add publisher if not thesis
			if (!isThesis) returnString += publisher;
			
			// for journal as publisher, add either preprint number, or volume and firstpage/issue if available
			if (citType == "article") {
				
				separator = ", ";
				if ((fieldValue = bibFieldData[20]) != "") {
					returnString += separator + fieldValue;
					isPreprint = true;
				} else {
					//volume
					if ((fieldValue = bibFieldData[9]) != "") {
						returnString += separator + fieldValue;
						separator = "";
					}
					
					//issue
					if ((fieldValue = bibFieldData[10]) != "") {
						returnString += separator + "(" + fieldValue + ")";
					}
					
					//pages
					if ((fieldValue = bibFieldData[23]) != "") {
						returnString += ", " + fieldValue;
						//add last page if available, use longer dash as required by APA style
						if ((fieldValue = bibFieldData[24]) != "") returnString += "\u2013" + fieldValue;
					}
				}
				
				//append period if necessary
				returnString += (returnString.search(/[\.!\?]$/) == -1 ? ". " : " ");
				

			} else if (citType == "book" || citType == "incollection" || (citType == "misc" && publisher != "") ){
				returnString += (publisher.search(/[\.!\?]$/) == -1 ? ". " : " ")
			}
			
			//add DOI/URL/Source if wanted or necessary
			if (!isPreprint && !isThesis && options.showDoi && (fieldValue = bibFieldData[15]) != "") {
				returnString += "doi: " + fieldValue;
			} else if (isThesis && publisher != "") {
				returnString += "Retrieved from " + publisher + (publisher.search(/[\.!\?]$/) == -1 ? "." : "");
			} else if ((options.showUrl || citType == "misc" || isThesis) && (fieldValue = bibFieldData[16]) != "") {
				returnString += "Retrieved from " + fieldValue;
			}
		}
		
		if (returnString == "") returnString = "Error: Insufficient data to construct APA style reference."
		
		//return
		return returnString.trim();
	}
	
	// function that returns parse mode info
	function getParserInfo(parseMode) {
		return { name: "APA" , fileExtension: "txt" , encoding: "utf8" };
	}
	
	// return
	return {
		parse : parseToAPA,
		getParserInfo: getParserInfo
	}; //end return
}());
