const BINRisEnd = ( function () {

	//parse bibdata to ris (mode == 1) or endnote (mode == 2)
	function parseToOther(mode,abbrevs) {
		
		//get display options
		const options = displayOptions.optionArray[mode];
		
		//set field numbers
		let fieldNumbers = [/*title*/1,/*journal*/5,/*journal_abbrev*/(options.abbrevDots ? 7 : 47),/*url*/16,/*volume*/9,/*number*/10,/*start_page*/23,/*end_page*/24,/*date*/22,/*doi*/15,/*publisher*/17,/*publisher address*/74,/*note*/25,/*school*/26,/*abstract*/33,/*language*/53];
		let fieldNames = ["T1  - ","JF  - ","JA  - ","UR  - ","VL  - ","IS  - ","SP  - ","EP  - ","Y1  - ","DO  - ","PB  - ","CY  - ","N1  - ","PB  - ","N2  - ","LA  - "];
		if (mode == 2) {
			fieldNumbers = [/*title*/1,/*journal*/5,/*dummy*/5,/*url*/16,/*volume*/9,/*number*/10,/*year*/13,/*date*/22,/*doi*/15,/*publisher*/17,/*publisher address*/74,/*note*/25,/*school*/26,/*abstract*/33,/*language*/53];
			fieldNames = ["%T ","%J ","%J","%U ","%V ","%N ","%D ", "%8 ","%R ","%I ","%C ","%Z ","%I ","%X ","%G "];
			if (abbrevs && bibFieldData[7] != "") {
				fieldNumbers[1] = options.abbrevDots ? 7 : 47;
			}
		}
		
		//create return string
		let returnString = "";
		
		//citation type
		let fieldValue = ["TY  - JOUR","TY  - BOOK","TY  - THES","TY  - CHAP","TY  - GEN"];
		if (mode == 2) fieldValue = ["%0 Journal Article","%0 Book","%0 Thesis","%0 Book Section","%0 Generic"];
		switch (bibFieldData[0]) {
			case "article":
				returnString += fieldValue[0];
				break;
			case "book":
				returnString += fieldValue[1];
				break;
			case "phdthesis":
				returnString += fieldValue[2];
				break;
			case "incollection":
				returnString += fieldValue[3];
				break;
			default:
				returnString += fieldValue[4];
				break;
		}
		returnString += "\n";
		
		//add bibkey as id
		if (options.addBibkey) {
			fieldValue = bibFieldData[45];
			if (fieldValue.length == 0) fieldValue = bibFieldData[21];
			if (fieldValue.length > 0) returnString += (mode == 1 ? "ID  - " : "%F ") + fieldValue + "\n";
		}
		
		//citation authors
		fieldValue = bibFieldData[3];
		let length = fieldValue.length;
		if (length > 0) {
			//author prefix
			let authorPrefix = mode == 1 ? "AU  - " : "%A ";
			
			//special for first author in ris!
			if (length > 1 && mode == 1) {
				returnString += "A1  - ";	
			} else {
				returnString += authorPrefix;
			}
			let author = fieldValue[0];
			returnString += author[0];
			if (author[1].length > 0) returnString += ", " + author[1];
			if (author[2].length > 0) returnString += ", " + author[2];
			returnString += "\n";
			for (let i = 1; i<length; ++i) {
				author = fieldValue[i];
				returnString += authorPrefix + author[0];
				if (author[1].length > 0) returnString += ", " + author[1];
				if (author[2].length > 0) returnString += ", " + author[2];
				returnString += "\n";
			}
		}
		
		//title and journal separately prior to abbreviations, since abbreviations special
		//fill title
		fieldValue = bibFieldData[fieldNumbers[0]];
		if (fieldValue != null && fieldValue != "") returnString += fieldNames[0] + fieldValue + "\n";
		
		//fill book title
		fieldValue = bibFieldData[71];
		if (fieldValue != "") {
			returnString += mode == 1 ? "BT  - " : "%B ";
			returnString += fieldValue + "\n";
		}
		   
		//fill journal/abbreviation
		fieldValue = bibFieldData[fieldNumbers[1]];
		if (fieldValue != null) {
			if (fieldValue != "") returnString += fieldNames[1] + fieldValue + "\n";
		}
		
		//fill journal abbreviation for RIS
		if (mode == 1) {
			fieldValue = bibFieldData[fieldNumbers[2]];
			if (fieldValue != null && fieldValue != "") returnString += fieldNames[2] + fieldValue + "\n";
		}
		
		//now fill issn/isbn
		fieldValue = bibFieldData[12];
		length = bibFieldData[44];
		if (fieldValue != "" && length != "") {
			fieldValue = fieldValue + ", " + length;
		} else {
			fieldValue += length;
		}
		if (fieldValue != "") {
			returnString += mode == 1 ? "SN  - " : "%@ ";
			returnString += fieldValue + "\n";
		}
		
		//fill url 
		length = "";
		fieldValue = (!options.doiLinkAsUrl || (length = bibFieldData[15]) == "") ? bibFieldData[16] : "https://doi.org/"+length;
		if (fieldValue != null && fieldValue != "") returnString += fieldNames[3] + fieldValue + "\n";
		
		//fill pages for endnote, modify double hyphen
		if (mode == 2) {
			length = "";
			fieldValue = bibFieldData[23];
			if (fieldValue != null && fieldValue != "") {
				returnString += "%P " + fieldValue;
				fieldValue = bibFieldData[24];
				if (fieldValue != null && fieldValue != "") {
					returnString += options.separator + fieldValue + "\n";
				} else {
					returnString += "\n";
				}
			}
		}
		   
		//now fill the rest except keyword
		length = fieldNames.length;
		for (let i = 4; i<length; ++i) {
			fieldValue = bibFieldData[fieldNumbers[i]];
			if (fieldValue != null && fieldValue != "") returnString += fieldNames[i] + fieldValue + "\n";
		}
		
		//modify language
		returnString = returnString.replace(/\n(LA[\s\-]+|%G[\s]+)([^\s\-])/,
			function(match, $1, $2, offset, original) {
				return "\n" + $1 + $2.toUpperCase();
			}
		);
		
		//now fill keywords
		fieldValue = bibFieldData[31];
		if (fieldValue != "") {
			if (mode == 1 && (fieldValue = fieldValue.split(/[\s]*[\,]+[\s]*/)) != null && (length = fieldValue.length) > 0) {
				for (let i = 0; i<length; ++i) {
					returnString += "KW  - " + fieldValue[i] + "\n";
				}
			} else {
				returnString += "%K " + fieldValue;
			}
		}
		
		//close
		if (mode == 1) {
			returnString += "ER  - ";
		} else {
			returnString = returnString.replace(/\n$/,"");
		}
		
		//return
		return returnString;
	}
	
	// function that returns parse mode info
	function getParserInfo(parseMode) {	
		const retObj = { encoding: "utf-8" };
		if (parseMode == 1) {
			retObj.name = "RIS";
			retObj.fileExtension = "ris";
		} else {
			retObj.name = "Endnote";
			retObj.fileExtension = "enw";
		}
		return retObj;
	}
	
	
	// return
	return {
		parse : parseToOther,
		getParserInfo: getParserInfo
	}; //end return
}());