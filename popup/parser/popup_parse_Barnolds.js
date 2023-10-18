const BINBarnoldS = ( function () {
	
	//parse to Arnold-S format
	function parseToArnoldS(mode,abbrevs) {
		
		// empty return string
		let returnString = "";
		
		// book keeping (haha)
		let isBook = false;
		
		// get display options and citation type
		const options = displayOptions.optionArray[mode];
		const arnoldShould = displayOptions.optionArray[mode];
		const citType = bibFieldData[0];
		
		// mode and abbreviation dependent field values
		const fieldNumbers = [/*journal title_abbrev*/7,/*journal title*/5,/*title_book*/1,/*author_list*/3,/*initials*/28,/*article title*/1,/*journal title_abbrev_nodot*/47];
		if (mode == 4) {
			fieldNumbers[0] = 8; fieldNumbers[1] = 6; fieldNumbers[2] = 2; fieldNumbers[3] = 4;  fieldNumbers[4] = 29; fieldNumbers[5] = 2; fieldNumbers[6] = 48;
			if (arnoldShould.utfMode == 1) {
				fieldNumbers[0] = 67; fieldNumbers[1] = 66; fieldNumbers[2] = 62; fieldNumbers[3] = 58;  fieldNumbers[4] = 59; fieldNumbers[5] = 62; fieldNumbers[6] = 68;
			} else if (arnoldShould.utfMode == 2) {
				fieldNumbers[0] = 7; fieldNumbers[1] = 5; fieldNumbers[2] = 1; fieldNumbers[3] = 69;  fieldNumbers[4] = 70; fieldNumbers[5] = 1; fieldNumbers[6] = 47;
			}
		}
		
		// check if (abbreviated) journal name or book title available
		let mainTitle;
		if (citType == "book") {
			mainTitle = bibFieldData[fieldNumbers[2]];
			isBook = true;
		} else if(citType == "phdthesis") {
			mainTitle = bibFieldData[fieldNumbers[2]];
		} else {
			if (abbrevs) {
				//take care of dots in abbreviations
				mainTitle = options.abbrevDots ? bibFieldData[fieldNumbers[0]] : bibFieldData[fieldNumbers[6]];
				if (mainTitle == "") mainTitle = bibFieldData[fieldNumbers[1]];			
			} else {
				mainTitle = bibFieldData[fieldNumbers[1]];
			}		
		}
		
		//if journal or book title not available, only spit out webpage title and date
		if (mainTitle != "") {
			
			//insert possibly truncated author list
			let separator = " ";
			let fieldValue = bibFieldData[fieldNumbers[3]];
			let length = fieldValue.length;
			if (length > 0) {
				let numLines = length;
				if (options["forceMaxNumAuthors"]) {
					numLines = options["maxNumAuthors"];
					numLines = (length <= numLines) ? length : numLines;
				}
				
				//implement et al mode here
				if (options["etAlMode"]) {
					let etAlAuthor = options["etAlAuthor"];
					if (etAlAuthor > numLines) etAlAuthor = numLines;
					numLines = (length > options["etAlNumAuthors"]) ? etAlAuthor : numLines;
				}
				
				if (numLines > 0) {
					//temporarily save initials
					const initials = bibFieldData[fieldNumbers[4]];
					
					//get options for showing author names
					const firstNames = arnoldShould.showFirstNames, forceInitials = arnoldShould.forceInitials, invertNameOrder = arnoldShould.invertNameOrder;
					
					//take into account whether or not order first/surname should be reversed
					const nameComponents = ["",""], nameIdx = [0,1];
					let authorSep = ", ";
					if (invertNameOrder) {
						nameIdx[0] = 1; nameIdx[1] = 0;
						if (firstNames) authorSep = " and ";
					}
					
					//loop over authors
					for (let i = 0; i<numLines; ++i) {
						
						//get name components
						let name = fieldValue[i];
						
						//set first name
						let partSep = invertNameOrder ? ", " : " ";
						if (firstNames && name[2].length > 0) {
							nameComponents[nameIdx[0]] = (forceInitials && initials[i].length > 0) ? initials[i] : name[2];
						} else {
							nameComponents[nameIdx[0]] = "";
							partSep = "";
						}
						
						//set surname + jr,sr if available
						nameComponents[nameIdx[1]] = name[0]
						if (name[1].length > 0) nameComponents[nameIdx[1]] += " " + name[1];
						
						//add author to return string, remove relax command if necessary
						name = nameComponents[0] + partSep + nameComponents[1];
						if (mode == 4) {
							name = name.replace(/(^[\s]*\{[\s]*|[\s]*\}[\s]*$)/g,"");
							if (!arnoldShould.relaxInitials) name = name.replace(/\{\\relax\ ([^\s]+)\}\./g,"$1\.");
						}
						returnString += name + authorSep;

					}
					
					//add "et al." to end if necessary, and finish with colon
					returnString = returnString.replace(/[\ ]*(?:,|and)\ $/,(numLines < length ? " et al." : ""));
					separator = ": ";
				}
			}
			
			//add article/chapter title
			if (arnoldShould.showTitle && citType != "phdthesis") {
				let title = bibFieldData[fieldNumbers[5]];
				if (title != "") {
					returnString += separator + title;
					if (title.search(/[\.!\?]$/) == -1) returnString += ".";
					separator = " ";
				}
			}
			
			//now add journal title or book title
			if (arnoldShould.showJournalTitle) {
				returnString += separator + mainTitle;
				separator = " ";
			}
			
			// for journal add volume and firstpage/issue if available
			if (!isBook) {
				if ((fieldValue = bibFieldData[9]) != "" && arnoldShould.showVolume) {
					
					//mode dependent emphasis of volume
					mainTitle = length = "";
					if (mode == 4) {
						mainTitle = '\\textbf{'; length = '}';
					}
					returnString += separator + mainTitle + fieldValue + length;
					if (arnoldShould.showIssue) {
						if ((fieldValue = bibFieldData[11]) != "" && (fieldValue.search(/[a-z]/i) == -1 || bibFieldData[10] == "")) {
							returnString += ", " + fieldValue.replace(/--.*$/,"");
						} else if ((fieldValue = bibFieldData[10]) != "") {
							returnString += ", " + fieldValue;
						}
					}
				} else if ((fieldValue = bibFieldData[20]) != "" && arnoldShould.showVolume) {
					returnString += separator + fieldValue;
				} else if (arnoldShould.showIssue) {
					if ((fieldValue = bibFieldData[11]) != "" && (fieldValue.search(/[a-z]/i) == -1 || bibFieldData[10] == "")) {
						returnString += separator + fieldValue.replace(/--.*$/,"");
					} else if ((fieldValue = bibFieldData[10]) != "") {
						returnString += separator + fieldValue;
					}
				}
			}
			
			//if arxiv in short form, adjust
			returnString = returnString.replace(/arXiv\ /,"arXiv:").trim();
			
			//add year
			if ((fieldValue = bibFieldData[13]) != "" && arnoldShould.showYear) {
				if (arnoldShould.showYearInCentury) fieldValue = fieldValue.slice(-2);
				returnString += (returnString != "") ? " (" + fieldValue + ")" : fieldValue;
			}
			
		} else {
			if (arnoldShould.showJournalTitle) returnString += bibFieldData[fieldNumbers[2]];
			if (arnoldShould.showYear) {
				let date = bibFieldData[22].replace(/\//g,"-").replace(/[\-]*$/,"");
				if (arnoldShould.showYearInCentury) date = date.slice(2);
				returnString += (returnString != "") ? " (" + date + ")" : date;
			}
		}
		
		//dotless mode
		if (mode != 3 && arnoldShould.dotlessMode && arnoldShould.utfMode == 0) returnString = returnString.replace(/\\([`'^"~=u])\{\\([ij])\}/g,
			function(match, $1, $2, offset, original) {
				return "\\"+$1+"{"+$2+"}";
			}
		);
		
		//remove math-text mode if statements depending on setting
		if (arnoldShould.utfMode != 2 && arnoldShould.preferLatexMode) {
			returnString = returnString.replace(/\\ifmmode(.+?)\\else(.+?)\\fi/gi,(arnoldShould.latexMode == 0 ? "$2" : "$1"));
		}
		
		if (returnString == "") returnString = "Come on, Cohagen! You got what you want! Give seeze people aiaa!"
		
		//return
		return returnString.trim();
	}
	
	// function that returns parse mode info
	function getParserInfo(parseMode) {
		const retObj = { fileExtension: "txt" };
		if (parseMode == 3) {
			retObj.name = "Arnold S.";
			retObj.encoding = "utf-8";
		} else {
			retObj.name = "Barnold S.";
			retObj.encoding = "us-ascii";
		}
		return retObj;
	}
	
	// return
	return {
		parse : parseToArnoldS,
		getParserInfo: getParserInfo
	}; //end return
}());