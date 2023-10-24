const BINBibtex = ( function () {
	
	//parse bibdata to bibtex format
	function parseToBibtex(abbrevs) {
		
		//set fieldNumbers and fieldNames depending on abbreviation mode
		const fieldNumbers = [/*0title*/2,/*1journal*/6,/*2volume*/9,/*3number*/10,/*4pages*/11,/*5year*/13,/*6month*/14,/*7date*/51,/*8urldate*/52,/*9issn*/12,/*10isbn*/44,/*11publisher*/18,/*12address*/75,/*13language*/53,/*14hyphenation (same as language)*/53,/*15eprint*/20,/*16note*/25,/*17school*/27,/*18booktitle*/72];
		const fieldNames = ["title","journal","volume","number","pages","year","month","date","urldate","issn","isbn","publisher","address","language","hyphenation","eprint","note","school","booktitle"];
		
		// get display options
		const options = displayOptions.optionArray[0];
		

		// change fieldNumbers depending on utf8 mode
		if (options.utfMode == 1) {
			fieldNumbers[0] = 62; fieldNumbers[1] = 66; fieldNumbers[11] = 63; fieldNumbers[12] = 76; fieldNumbers[17] = 60; fieldNumbers[18] = 73;
		} else if (options.utfMode == 2) {
			fieldNumbers[0] = 1; fieldNumbers[1] = 5; fieldNumbers[11] = 17; fieldNumbers[12] = 74; fieldNumbers[17] = 26; fieldNumbers[18] = 71;
		}
		
		// get indentation string
		let indentBy = "\n";
		indentBy += "\t".repeat(options.numTabs);
		indentBy += " ".repeat(options.numSpaces);
		   
		//create return string
		let returnString = "";
		
		//disable abbreviations in any case if no abbreviations available
		if (bibFieldData[8] == "") abbrevs = false;
		//change field number if abbrevs available and wanted
		if (abbrevs && !options.biblatexStyle) {
			let numberOne = 8, numberTwo = 48;
			if (options.utfMode == 1) {
				numberOne = 67; numberTwo = 68;
			} else if (options.utfMode == 2) {
				numberOne = 7; numberTwo = 47;
			}
			if (options.abbrevDots) {
				fieldNumbers[1] = numberOne;
			} else {
				fieldNumbers[1] = numberTwo;
			}
		}
		// change month source depending on whether numbered mode
		if (options.monthNumber) fieldNumbers[6] = 46;
		//temporary variable
		let fieldValue = "";
		
		//citation type
		returnString += "@" + (bibFieldData[0] == "misc" && options.onlineDefaultType ? "online" : bibFieldData[0]);
		
		//bibkey, prefer custom if available
		fieldValue = bibFieldData[45];
		if (fieldValue.length == 0) fieldValue = bibFieldData[21];
		returnString += "{" + fieldValue;
		
		//check if archive, change title field number depending on that
		fieldNumbers[0] = bibFieldData[19] != "" ? 1 : fieldNumbers[0];
		
		//insert possibly truncated author list with initials if wanted
		let initNumOne = 4, initNumTwo = 58, initNumThree = 69;
		fieldValue = bibFieldData[initNumOne];
		if (options.utfMode == 1) {
			fieldValue = bibFieldData[initNumTwo];
		} else if (options.utfMode == 2) {
			fieldValue = bibFieldData[initNumThree];
		}
		
		let numLines = 0, length = fieldValue.length;
		initNumOne = 29; initNumTwo = 59; initNumThree = 70;
		let initials = bibFieldData[initNumOne];
		const forceInitials = options.forceInitials;
		if (options.utfMode == 1) {
			initials = bibFieldData[initNumTwo];
		} else if (options.utfMode == 2) {
			initials = bibFieldData[initNumThree];
		}
		
		if (length > 0) {
			numLines = length;
			if (options["forceMaxNumAuthors"]) {
				numLines = options["maxNumAuthors"];
				numLines = (length <= numLines) ? length : numLines;
			}
			if (numLines > 0) {
				returnString += "," + indentBy + "author = {";
				let lineBreaks = 1, lineLength = options.lineLength;
				for (let i = 0; i<numLines; ++i) {
					if (options.lineBreaks && returnString.length > lineLength*lineBreaks) {
						returnString += indentBy;
						lineBreaks++;
					}
					let author = fieldValue[i];
					returnString += author[0];
					if (author[1].length > 0) returnString += ", " + author[1];
					if (forceInitials && initials[i].length > 0) {
						let toAdd = initials[i];
						if (!options.relaxInitials) {
							toAdd = toAdd.replace(/\{\\relax\ ([^\s]+)\}\./g,"$1\.");
						}
						returnString += ", " + toAdd;
					} else if (author[2].length > 0) {
						let toAdd = author[2];
						if (!options.relaxInitials) {
							toAdd = toAdd.replace(/\{\\relax\ ([^\s]+)\}\./g,"$1\.");
						}
						returnString += ", " + toAdd;
					}
					returnString += " and ";
				}
				if (numLines < length) {
					returnString += "others}";
				} else {
					returnString = returnString.replace(/[\n]*[\t\x0a]*\ and\ $/,"}");
				}
				numLines = 1;
			}
		}
		
		//from here on, numLines keeps track of total lines of bibtex entry, takes into account special behavior if nothing was added
		
		//insert title and book/collection title
		{
			//check if to be shown
            let titles = [[options.title,0],[options.booktitle,18]];
            
            //decide whether to escape with two brackets
            let openBracket = "{", closeBracket = "}";
            if (options.escapeTitle) {
                openBracket += "{"; closeBracket += "}";
            }
            
            //set field
			for (let i = 0; i<titles.length; ++i) {
				if (titles[i][0] == true) {
					let idx = titles[i][1];
					fieldValue = bibFieldData[fieldNumbers[idx]];
					if (fieldValue != null && fieldValue != "") {
						//add line breaks
						if (options.lineBreaks) {
							fieldValue = fieldValue.replace(new RegExp("(.{" + options.lineLength + ",}?)[\ ]","gi"), function(match, $1, offset, original) {
									return ""+$1+indentBy;
								}
							);
						}
						numLines++;
						returnString += "," + indentBy + fieldNames[idx] + " = " + openBracket + fieldValue + closeBracket;
					}
				}
			}
		}
		
		//insert journal separately if biblatex style, or replace by organization if wanted
		let startingField = 1;
		let setOrg = (options.journalAsOrg && bibFieldData[0] == "misc");
		if (options.biblatexStyle) {
			startingField++;
			if (options[fieldNames[1]]) {
				let fieldNumbersJournal = [fieldNumbers[1]];
				let fieldNamesJournal = [!setOrg ? "journaltitle" : "organization"];
				if (abbrevs) {
					let numberOne = 8, numberTwo = 48;
					if (options.utfMode == 1) {
						numberOne = 67; numberTwo = 68;
					} else if (options.utfMode == 2) {
						numberOne = 7; numberTwo = 47;
					}
					if (!setOrg) {
						fieldNumbersJournal[1] = options.abbrevDots ? numberOne : numberTwo;
						fieldNamesJournal[1] = "shortjournal";
					}
				}
				for (let i = 0; i<fieldNumbersJournal.length; ++i) {
					fieldValue = bibFieldData[fieldNumbersJournal[i]];
					if (fieldValue != null && fieldValue != "") {
						numLines++;
						returnString += "," + indentBy + fieldNamesJournal[i] + " = {" + fieldValue + "}";
					}
				}
			}
		} else if (setOrg) {
			fieldValue = bibFieldData[fieldNumbers[1]];
			if (fieldValue != null && fieldValue != "") {
				numLines++;
				returnString += "," + indentBy + "organization" + " = {" + fieldValue + "}";
			}
			startingField++;
		}

		//now fill in the rest
		length = fieldNames.length-1;
		for (let i = startingField; i<length; ++i) {
			if (options[fieldNames[i]]) {
				fieldValue = bibFieldData[fieldNumbers[i]];
				if (fieldValue != null && fieldValue != "") {
					numLines++;
					returnString += "," + indentBy + fieldNames[i] + " = {" + fieldValue + "}";
				}
			}
		}
		
		//dol and/or url.
		fieldValue = bibFieldData[15];
		length = (options.doi && (!options.hideDoiForPreprint || (options.hideDoiForPreprint && bibFieldData[20] == ""))) ? fieldValue : ""; //save doi in length if eprint not available
		if (options.url) {
			fieldValue = (fieldValue == "" || !options.doiLinkAsUrl) ? bibFieldData[16] : "https://doi.org/" + fieldValue;
			if (fieldValue != "" && (options.urlMode == 1 || length == "")) {
				if (bibFieldData[0] != "book" || !options.noUrlForBooks) {
					numLines++;
					returnString += "," + indentBy + "url" + " = {" + fieldValue + "}";
				}
			}
		}

		//pdf
		returnString += "," + indentBy + "pdf" + " = {" + bibFieldData[79] + "}";
		
		//avoid doi for open access archive/eprint if wanted
		if (length != "") {
			numLines++;
			returnString += "," + indentBy + "doi" + " = {" + length + "}";
		}
		
		//insert keywords if wanted
		let numberOne = 32;
		if (options.utfMode == 1) {
			numberOne = 64;
		} else if (options.utfMode == 2) {
			numberOne = 31;
		}
		if (options.keywords && (fieldValue = bibFieldData[numberOne]) != "") {
			
			//add line breaks
			if (options.lineBreaks) {
				fieldValue = fieldValue.replace(new RegExp("(.{" + options.lineLength + ",}?),[\ ]","gi"), function(match, $1, offset, original) {
						return ""+$1+"," + indentBy;
					}
				);
			}
			numLines++;
			returnString += "," + indentBy + "keywords" + " = {" + fieldValue + "}";
		}
		
		//insert abstract if wanted
		numberOne = 34;
		if (options.utfMode == 1) {
			numberOne = 65;
		} else if (options.utfMode == 2) {
			numberOne = 33;
		}
		if (options.abstract && (fieldValue = bibFieldData[numberOne]) != "") {
			
            //decide whether to escape with two brackets
            let openBracket = "{", closeBracket = "}";
            if (options.escapeAbstract) {
                openBracket += "{"; closeBracket += "}";
            }
            
			//add line breaks
			if (options.lineBreaks) {
				fieldValue = fieldValue.replace(new RegExp("(.{" + options.lineLength + ",}?)[\ ]","gi"), function(match, $1, offset, original) {
						return ""+$1 + indentBy;
					}
				);
			}
			numLines++;
			returnString += "," + indentBy + "abstract" + " = " + openBracket + fieldValue + closeBracket;
		}
		
		//special behavior if nothing was added
		if (numLines == 0) {
			returnString += ",";
		}
		
		//closing bracket
		returnString += "\n}";
		
		//dotless compatibility
		if (options.dotlessMode && options.utfMode == 0) returnString = returnString.replace(/\\([`'^"~=u])\{\\([ij])\}/g,
			function(match, $1, $2, offset, original) {
				return "\\"+$1+"{"+$2+"}";
			}
		);
		
		//remove math-text mode if statements depending on setting
		if (options.utfMode != 2 && options.preferLatexMode) {
			returnString = returnString.replace(/\\ifmmode(.+?)\\else(.+?)\\fi/gi,(options.latexMode == 0 ? "$2" : "$1"));
		}
		
		//return
		return returnString;
	}
	
	// function that returns parse mode info
	function getParserInfo(parseMode) {
		return { name: "Bibtex" , fileExtension: "bib" , encoding: "us-ascii" };
	}
	
	// return
	return {
		parse : parseToBibtex,
		getParserInfo: getParserInfo
	}; //end return
}());
