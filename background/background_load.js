const BINData = ( function () {
	
	//json object to store all format dependent options, parseMode means 0 = Bibtex, 1 = RIS, 2 = Endnote, 3 = Arnold S., 4 = Barnold S, 5 = APA, 6 = MLA
	var displayOptions = { 	
		parseMode: 0 , 
		optionArray: [
			{ abbrevs: true , abbrevDots: true , maxNumAuthors: 10 , forceMaxNumAuthors: false , abstract: false , keywords: false , title: true , booktitle: true, chapter: true, journal: true , volume: true , number: true , pages: true , year: true , month: true , issn: true , isbn: true , publisher: true , eprint: true , note: true , school: true, doi: true , url: true , urlMode: 0 , noUrlForBooks: false , hideDoiForPreprint: false , doiLinkAsUrl: false , lineBreaks: false , lineLength: 512, monthNumber: false, biblatexStyle: false, dotlessMode: false, forceInitials: false, onlineDefaultType: false, date: false, urldate: false, address: true, language: false, hyphenation: false, numTabs: 1 , numSpaces: 0, utfMode: 0, relaxInitials: true, preferLatexMode: false, latexMode: 0, journalAsOrg: false, escapeTitle: true , escapeAbstract: true },
			{ abbrevs: true , abbrevDots: true , maxNumAuthors: 10 , forceMaxNumAuthors: false , doiLinkAsUrl: false, addBibkey: true },
			{ abbrevs: true , abbrevDots: true , maxNumAuthors: 10 , forceMaxNumAuthors: false , doiLinkAsUrl: false , separator: "\u2013" , addBibkey: true }, 
			{ abbrevs: true , abbrevDots: true , maxNumAuthors: 1 , forceMaxNumAuthors: true , showJournalTitle: true , showTitle: false, showVolume: true , showIssue: true, showYear: true , showYearInCentury: false , showFirstNames: true , forceInitials: true , invertNameOrder: false , etAlMode: false , etAlNumAuthors: 2, etAlAuthor: 1 },
			{ abbrevs: true , abbrevDots: true , maxNumAuthors: 1 , forceMaxNumAuthors: true , showJournalTitle: true , showTitle: false, showVolume: true , showIssue: true, showYear: true , showYearInCentury: false , showFirstNames: true , forceInitials: true , invertNameOrder: false, dotlessMode: false, etAlMode: false , etAlNumAuthors: 2, etAlAuthor: 1, utfMode: 0, relaxInitials: false, preferLatexMode: false, latexMode: 0 },
			{ abbrevs: true , abbrevDots: true , maxNumAuthors: 10 , forceMaxNumAuthors: false , showDoi: true , showUrl: true , abbreviateMonth: false },
			{ abbrevs: true , abbrevDots: true , maxNumAuthors: 10 , forceMaxNumAuthors: false , showDoi: true , showUrl: true , forcePublisher: false , forceDatabase: false, forceAccessDate: false , forceLocation: false}
		] 
	};
	
	//json object used internally for format strings
	const bibfieldsToNumbers = Object.freeze({type: 0, title: 1, title_latex: 2, authors: 3, authors_latex: 4, journal: 5, journal_latex: 6, journal_abbrev: 7, journal_abbrev_latex: 8, volume: 9, issue: 10, page_range: 11, issn: 12, year: 13, month_abbrev: 14, doi: 15, url: 16, publisher: 17, publisher_latex: 18, eprint: 20 , bibkey_default: 21, date: 22, start_page: 23, end_page: 24, note: 25,  school: 26, author_initials: 28, keywords: 31, keywords_latex: 32, abstract: 33, abstract_latex: 34, month_full: 35, access_year: 36,access_month_abbrev: 37, access_month_number: 38, access_day: 39, publisher_short: 40,database: 42, database_short: 43, isbn: 44, month_number: 46, journal_abbrev_nodot: 47, channel: 49, isbn_nodash: 50, date_iso: 51 , urldate: 52, lang_full: 53, lang_iso1: 54, lang_iso2t: 55, lang_iso2b: 56, lang_iso3: 57, authors_mixed: 58, title_mixed: 62, publisher_mixed: 63, keywords_mixed: 64, abstract_mixed: 65, journal_mixed: 66, journal_abbrev_mixed: 67 , collection_title: 71, publisher_address: 74 , publisher_address_latex: 75, publisher_address_mixed: 76, isbn_territory: 77, domain_country: 78, editorIsTranslator: 79 , container_title: 80, container_title_abbrev: 81 });
	
	const numbersToBibfields = Object.freeze({b0: "type", b1: "title", b2: "title_latex", b3: "authors", b4: "authors_latex", b5: "journal", b6: "journal_latex", b7: "journal_abbrev", b8: "journal_abbrev_latex", b9: "volume", b10: "issue", b11: "page_range", b12: "issn", b13: "year", b14: "month_abbrev", b15: "doi", b16: "url", b17: "publisher", b18: "publisher_latex", b20: "eprint" , b21: "bibkey_default", b22: "date", b23: "start_page", b24: "end_page", b25: "note", b26: "school", b28: "author_initials", b31: "keywords", b32: "keywords_latex", b33: "abstract", b34: "abstract_latex", b35: "month_full", b36: "access_year", b37: "access_month_abbrev" , b38: "access_month_number", b39: "access_day", b40: "publisher_short", b42: "database" , b43: "database_short" , b44: "isbn", b46: "month_number", b47: "journal_abbrev_nodot", b49: "channel", b50: "isbn_nodash", b51: "date_iso" , b52: "urldate", b53: "lang_full", b54: "lang_iso1", b55: "lang_iso2t", b56: "lang_iso2b", b57: "lang_iso3", b58: "authors_mixed", b62: "title_mixed", b63: "publisher_mixed", b64: "keywords_mixed", b65: "abstract_mixed", b66: "journal_mixed", b67: "journal_abbrev_mixed", b71: "collection_title", b74: "publisher_address" , b75: "publisher_address_latex", b76: "publisher_address_mixed", b77: "isbn_territory", b78: "domain_country", b79: "editorIsTranslator", b80: "container_title", b81: "container_title_abbrev"});
	
	//json object to store general extension options
	var generalOptions = { dyn_download: true , dyn_download_timeout: 5000 , text_autofocus: true , text_autocopy: false, text_autocopy_always: false, text_autocopy_link: false, text_autocopy_link_on_change: false, copy_button_link: false, text_autocopy_visual: true, hide_copy_option_link: false , hide_custom_format_link: false , hide_redirection_scheme_link: false , set_focus_color: false , focus_color: "#a1e9ff" , focus_text_color: "#000000", backNavigation: true , urlCorrection: false , urlCorrectionScheme: "" , urlCorrectionInsensitive: false , suppressUrl: false , bibkeyFormatting: false , bibkeyFormatString:  "{!authors[0,0]}{year||access_year}{month_abbrev}" , bibkeyWhiteSpace: "" , bobbels: false, allowNatureSpringer: false , showNatureSpringerMessage: true , pdfFallback: true , pdfFallbackAutomatic: true };
	
	//bibkey formatting object, used for general settings dialogue
	var bibkeyFormat = [{ bibfields: [[3,0,0,false,"",""]], req: true }, { bibfields: [[13,false,"",""],[36,false,"",""]], req: true }, { bibfields: [[14,false,"",""]], req: true }];
	
	//json array to store custom redirection schemes, currentScheme -1 = default, hardcoded DOI/URL scheme!
	var redirectionSchemes = { schemes: [] , currentScheme: -2 };
	const redirectionSchemeTemplate = Object.freeze([['name','string'],['tooltip','string'],['showAsTooltip','boolean'],['whiteSpaceReplacement','string']]);
	
	//arrays of format strings and format arrays for redirection schemes
	var schemeFormats = [];
	var schemeFormatStrings = [];
	
	//json array to store custom citation formats
	var citationFormats = { formats: [] , currentFormat: -1 };
	
	//define a state variable that needs to reach the final state 5 before popup can load (increase this if more objects need to be preloaded before the popup is activated!
	var backgroundState = 0;
	const backgroundStateFinal = 10;
	
	// references to XML/JSON resources
	var specialCharList = null;
	var journalAbbrevList = null;
	var urlSpecificAdjusterList = null;
	var publisherAddressList = null;
	var cityList = null;
	var cityRegExpString = null;
	var schemata = null;
	
	// function to initialize display options. Only replace EXISTANT value from storage, to guarantee that no option is undefined at any point
	var displayOptionsInitialized = false;
	function initializeDisplayOptions(options) {
		
		// proceed only if possible and necessary
		if (displayOptionsInitialized || options == null || options == undefined) return;
		displayOptionsInitialized = true;
		 
		// parse mode
		let option = options.parseMode;
		if (option >= 0) {
			displayOptions.parseMode = option;
		}
		
		//option array
		options = options.optionArray;
		if (option == null || options == undefined) return;
		
		// fill display option array if available in storage
		let optionArray = displayOptions.optionArray;
		let length = optionArray.length;
		let temp = "", value = "";
		for (let i = 0; i<length; ++i) {
			if (typeof(temp = options[i]) === 'object') {
				for (option in optionArray[i]) {
					if (temp.hasOwnProperty(option) && (value = temp[option]) != null && value != undefined) {
						optionArray[i][option] = value;
					}
				}
			}
		}
	}
	
	// function to initialize general options. Only replace EXISTANT value from storage, to guarantee that no option is undefined at any point
	var generalOptionsInitialized = false;
	function initializeGeneralOptions(options) {

		// proceed only if possible and necessary
		if (generalOptionsInitialized || options == null || options == undefined) return;
		
		// fill general option object if available in storage
		if (typeof(options) === 'object') {
			
			generalOptionsInitialized = true;
			let value = null;
			for (let option in generalOptions) {
				if (generalOptions.hasOwnProperty(option) && (value = options[option]) != null && value != undefined) {
					//if bibkeyFormat option, only change if reparsed successfully (to prevent corruption in future updates of option object)
					if (option != "bibkeyFormatString") {
						generalOptions[option] = value;
					} else if (typeof(value) == 'string') {
						let format = BINParser.parseFormatString(value,bibfieldsToNumbers);
						if (format != null)  {
							bibkeyFormat = format.array;
							generalOptions["bibkeyFormatString"] = format.string;
						}
					}
				}
			}
		}
	}
	
	// function to initialize redirection scheme array
	var redirectionSchemesInitialized = false;
	function initializeRedirectionSchemes(schemes) {
		
		//early out
		if (redirectionSchemesInitialized) return;
		
		// proceed only if possible and necessary, otherwise reset
		if (schemes == null || typeof(schemes) != 'object' || schemeFormatStrings == null || !Array.isArray(schemeFormatStrings) ) {
			schemeFormatStrings = [];
			return;
		}
		
		//indicate successful initialization
		redirectionSchemesInitialized = true;
		
		//get current scheme
		let currentScheme = schemes.currentScheme;
		if (currentScheme == null || typeof(currentScheme) != 'number' || currentScheme < -1) currentScheme = -2;
		 
		//get array of schemes in memory, check if format string array same size, otherwise reset
		schemes = schemes.schemes;
		let length = 0;
		if (schemes == null || !Array.isArray(schemes) || (length = schemes.length) != schemeFormatStrings.length) {
			schemeFormatStrings = [];
			length = 0;
			currentScheme = -2;
		}
		
		// fill schemes array with valid schemes, and scheme format string array with valid format string		
		for (let i = 0; i<length; ++i) {
			//get scheme from memory, set to a default value if invalid
			let temp = schemes[i], scheme = { name: "", tooltip: "", whiteSpaceReplacement: "+" }, value = null;
			if (temp == null || typeof(temp) != 'object') {
				//set default
				scheme = { name: "Custom" , tooltip: "Custom tooltip" , showAsTooltip: false , whiteSpaceReplacement: "+" };
			} else {
				//read properties from memory
				for (let option in scheme) {
					if (temp.hasOwnProperty(option) && (value = temp[option]) != null && value != undefined && typeof(value) == 'string') {
						scheme[option] = value;
					}
				}
				scheme["showAsTooltip"] = (temp.hasOwnProperty("showAsTooltip") && (value = temp.showAsTooltip) != null && value == true);
				
				//reset name if empty string
				if (scheme.name.length < 1) scheme.name = "Custom";
				
			}
			
			//add to scheme array
			redirectionSchemes.schemes.push(scheme);
			
			//get format array and add it to array of format arrays, also reparse format string
			value = BINParser.parseFormatString(schemeFormatStrings[i],bibfieldsToNumbers);
			if (value != null) {
				schemeFormatStrings[i] = value.string;
				schemeFormats.push(value.array);
			} else {
				//indicate that redirection scheme does not work
				schemeFormatStrings[i] = "";
				schemeFormats.push([""]);
			}
		}
		
		//adjust and set currentScheme
		schemes = redirectionSchemes.schemes;
		if (currentScheme > schemes.length - 1) currentScheme = -2;
		redirectionSchemes.currentScheme = currentScheme;
	}
	
	// function to initalize string of all cities in simplified format
	function initializeCityRegExpString() {
		let length;
		if (cityList == null || !Array.isArray(cityList) || (length = cityList.length) == 0 || cityRegExpString != null) return;
		cityRegExpString = "(?:";
		for (let i = 0; i<length; ++i) cityRegExpString += cityList[i][0].replace(/[\s]+/g,"\\ ") + "|";
		cityRegExpString += ")";
	}
	
	// function to initialize citation format array
	var citationFormatsInitialized = false;
	function initializeCitationFormats(formats) {
		
		//early out
		if (citationFormatsInitialized) return;
		
		// proceed only if possible and necessary, otherwise reset
		if (formats == null || typeof(formats) != 'object' ) {
			return;
		}
		
		//indicate successful initialization
		citationFormatsInitialized = true;
		
		//get current scheme
		let currentFormat = formats.currentFormat;
		if (currentFormat == null || typeof(currentFormat) != 'number' || currentFormat < -1) currentFormat = -1;
		 
		//get array of formats in memory, check if format string array same size, otherwise reset
		formats = formats.formats;
		if (formats == null || !Array.isArray(formats)) {
			length = 0;
			currentFormat = -1;
		}
		
		// fill formats array with valid formats, and scheme format string array with valid format string		
		let length = formats.length;
		for (let i = 0; i<length; ++i) {
			//get scheme from memory, set to a default value if invalid
			let temp = formats[i], format = { name: "Custom format" , extension: "txt" , encoding: "utf8" , formatArray: [] }, value = [];
			if (temp != null && typeof(temp) == 'object') {
				//assign name
				if (temp.name != null && typeof(temp.name) == 'string') format.name = temp.name;
				
				//assign extension
				if (temp.extension != null && typeof(temp.extension) == 'string') format.extension = temp.extension;
				
				//assign encoding
				if (temp.encoding != null && typeof(temp.encoding) == 'string') format.encoding = temp.encoding;
		 
				//get format array and add it to array of format arrays if validated
				if (temp.formatArray != null && Array.isArray(temp.formatArray)) {
					temp = BINParser.parseFormatArray(temp.formatArray,value,numbersToBibfields,bibfieldsToNumbers);
				}
				//proceed if valid
				if (temp != null && value != null && Array.isArray(value) && value.length > 0) {
					//update format array
					format.formatArray = value;
					
					//add to citation format array
					citationFormats.formats.push(format);
				}
			}
		}
		
		//adjust and set currentFormat
		formats = citationFormats.formats;
		if (currentFormat > formats.length - 1) currentFormat = -1;
		citationFormats.currentFormat = currentFormat;
	}
	
	//return setters and getters
	return Object.freeze({
		isReady : function() {
			return (backgroundState == backgroundStateFinal);
		},
		increaseBackgroundState : function() {
			if (backgroundState < backgroundStateFinal) backgroundState++;
		},
		setSpecialCharList : function(list) {
			if (specialCharList == null) specialCharList = Object.freeze(list); //constant object should always be freezed!
		},
		getSpecialCharList : function() {
			if (specialCharList != null) {
				return specialCharList;
			}
			return null;
		},
		setJournalAbbrevList : function(list) {
			if (journalAbbrevList == null) journalAbbrevList = Object.freeze(list); //constant object should always be freezed!
		},
		getJournalAbbrevList : function() {
			if (journalAbbrevList != null) {
				return journalAbbrevList;
			}
			return null;
		},
		setUrlSpecificAdjusterList : function(list) {
			if (urlSpecificAdjusterList == null) urlSpecificAdjusterList = Object.freeze(list); //constant object should always be freezed!
		},
		getUrlSpecificAdjusterList : function() {
			if (urlSpecificAdjusterList != null) {
				return urlSpecificAdjusterList;
			}
			return null;
		},
		setPublisherAddressList : function(list) {
			if (publisherAddressList == null) {
				
				//set publisher address list
				let length = list.length;
				publisherAddressList = [];
				for (let i = 0; i<length; ++i) {
					publisherAddressList.push(Object.freeze(list[i]));
				}
				publisherAddressList = Object.freeze(publisherAddressList);
			}
		},
		setCityList : function(list) {
			if (cityList == null) {
				
				//set city list
				length = list.length;
				cityList = [];
				for (let i = 0; i<length; ++i) {
					cityList.push(Object.freeze(list[i]));
				}
				cityList = Object.freeze(cityList);
				
				//initialize city reg exp string
				initializeCityRegExpString();
			}
		},
		getPublisherAddressList : function() {
			if (publisherAddressList != null) {
				return publisherAddressList;
			}
			return null;
		},
		getCityList : function() {
			if (cityList != null) {
				return cityList;
			}
			return null;
		},
		getCityRegExpString : function() {
			if (cityRegExpString != null) {
				return cityRegExpString;
			}
			return null;
		},
		setSchemata : function(list) {
			if (schemata == null) schemata = Object.freeze(list); //constant object should always be freezed!
		},
		getSchemata : function() {
			if (schemata != null) {
				return schemata;
			}
			return null;
		},
		setDisplayOptions : function(list,mode = 0) {
			if (mode != 0) {
				initializeDisplayOptions(list);
			} else {
				//quick method
				displayOptions = list;
			}
			//make sure the message always reaches background system
			displayOptions["msgType"] = "popup_save_display_options_background";
			return null;
		},
		getDisplayOptions : function() {
			if (displayOptions != null) {
				return displayOptions; //this can be updated from background, here is only storage
			}
			return null;
		},
		setGeneralOptions : function(list,mode = 0) {
			if (mode != 0) {
				initializeGeneralOptions(list);
			} else {
				//quick method
				generalOptions = list;
			}
			generalOptions["msgType"] = "optionpage_save_options_background";
			return null;
		},
		getGeneralOptions : function() {
			if (generalOptions != null) {
				return generalOptions; //this can be updated from background, here is only storage
			}
			return null;
		},
		setRedirectionSchemes : function(list,mode = 0) {
			if (mode != 0) {
				initializeRedirectionSchemes(list);
			} else {
				//quick method
				redirectionSchemes = list;
			}
			redirectionSchemes["msgType"] = "optionpage_save_schemes_background";
			return null;
		},
		getRedirectionSchemes : function() {
			if (redirectionSchemes != null) {
				return redirectionSchemes; //this can be updated from background, here is only storage
			}
			return null;
		},
		setRedirectionFormats : function(format) {
			if (format != null && Array.isArray(format) && format.length >= 0) {
				schemeFormats = format;
			}
		},
		setRedirectionFormatStrings : function(format,mode) {
			if (format != null && Array.isArray(format) && format.length >= 0) {
				schemeFormatStrings = format;
			}
		},
		getRedirectionFormats : function() {
			if (redirectionSchemes != null && schemeFormats != null) {
				return schemeFormats;
			}
			return null;
		},
		getRedirectionFormatStrings : function() {
			if (redirectionSchemes != null && schemeFormatStrings != null) {
				return schemeFormatStrings;
			}
			return null;
		},
		getCurrentRedirectionFormat : function() {
			if (redirectionSchemes != null && schemeFormats != null && redirectionSchemes.currentScheme > -1) {
				return schemeFormats[redirectionSchemes.currentScheme];
			}
			return null;
		},
		getCurrentRedirectionFormatString : function() {
			if (redirectionSchemes != null && schemeFormatStrings != null && redirectionSchemes.currentScheme > -1) {
				return schemeFormatStrings[redirectionSchemes.currentScheme];
			}
			return null;
		},
		getCurrentRedirectionScheme : function() {
			if (redirectionSchemes != null && redirectionSchemes.currentScheme != null) {
				return redirectionSchemes.currentScheme;
			}
			return -2;
		},
		getRedirectionSchemeTemplate : function() {
			if (redirectionSchemeTemplate != null) {
				return redirectionSchemeTemplate;
			}
			return null;
		},
		getCitationFormats : function() {
			if (citationFormats != null) {
				return citationFormats;
			}
			return null;
		},
		setCitationFormats : function(list,mode = 0) {
			if (mode != 0) {
				initializeCitationFormats(list);
			} else {
				//quick method
				citationFormats = list;
			}
			citationFormats["msgType"] = "optionpage_save_citation_formats_background";
			return null;
		},
		getCurrentCitationFormat : function() {
			if (citationFormats != null && citationFormats.currentFormat > -1 && Array.isArray(citationFormats.formats) && citationFormats.formats.length > 0) {
				return citationFormats.formats[citationFormats.currentFormat];
			}
			return null;
		},
		setBibkeyFormat : function(format) {
			if (format != null && Array.isArray(format) && format.length > 0) {
				bibkeyFormat = format;
			}
		},
		getBibkeyFormat : function() {
			if (generalOptions != null && bibkeyFormat != null) {
				return bibkeyFormat;
			}
			return null;
		},
		setBibkeyFormatString : function(formatString) {
			if (formatString != null && typeof(formatString) == 'string') {
				generalOptions.bibkeyFormatString = formatString;
			}
		},
		getBibkeyFormatString : function() {
			if (generalOptions != null && generalOptions.bibkeyFormatString != null) {
				return generalOptions.bibkeyFormatString;
			}
			return null;
		},
		getBibfieldStrings : function() {
			return numbersToBibfields;
		},
		getBibfieldNumbers : function() {
			return bibfieldsToNumbers;
		}
	});
}());


( function () {
	
	// load xml for special chars, journal abbrevs and adjusters, this is, for some reason, different in Safari
	let specialCharList = new XMLHttpRequest();
	specialCharList.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			BINData.setSpecialCharList(this.responseXML);
			BINData.increaseBackgroundState();
			
			//once special chars available, fetch generalOptions, redirection schemes and citationFormats from local storage and update them here
			const requests = [ ["generalOptions",BINData.setGeneralOptions], ["redirectionSchemeFormatStrings",BINData.setRedirectionFormatStrings],["redirectionSchemes",BINData.setRedirectionSchemes],["citationFormats",BINData.setCitationFormats] ];
			for (let i = 0; i<requests.length; ++i) {
				let reqString = requests[i][0];
				let request = browser.storage.local.get(reqString);
				request.then(
					function (options) {
						if (options != null && (options = options[reqString]) != null) {
							requests[i][1](options,1);
						}
						
						//increase background state
						BINData.increaseBackgroundState();
					}, 
					function (error) {
						//log error
						BINData.increaseBackgroundState();
						console.log(`Error: ${error}`);
					}
				);
			}
		}
	};
	specialCharList.open("GET", "/nameResources/charTable.xml", true);
	specialCharList.responseType = 'document';
	specialCharList.send();
	
	//fetch displayOptions from local storage and update them here
	let displayOptionRequest = browser.storage.local.get("displayOptions");
	displayOptionRequest.then(
		function (options) {
			if (options != null && (options = options.displayOptions) != null) {
				BINData.setDisplayOptions(options,1);
			}
			
			//increase background state
			BINData.increaseBackgroundState();
		}, 
		function (error) {
			//log error
			BINData.increaseBackgroundState();
			console.log(`Error: ${error}`);
		}
	);	
	

	//load xml for journal abbreviations 
	let journalAbbrevList = new XMLHttpRequest();
	journalAbbrevList.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			BINData.setJournalAbbrevList(this.responseXML);
			BINData.increaseBackgroundState();
		}
	};
	journalAbbrevList.open("GET", "/nameResources/journalAbbrevs.xml", true);
	journalAbbrevList.responseType = 'document';
	journalAbbrevList.send();
	
	//load json for url matching
	let urlSpecificAdjusterList = new XMLHttpRequest();
	urlSpecificAdjusterList.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			//try parse to json
			let success = true, json = [];
			try {
				json = JSON.parse(this.responseText);
			} catch(exception) {
				json =  [];
				success = false;
			}
			//if successful, check list integrity
			if (success && !(BINURLMatcher.checkURLList(json))) {
				json = [];
			}
			BINData.setUrlSpecificAdjusterList(json);
			BINData.increaseBackgroundState();
		}
	};
	urlSpecificAdjusterList.open("GET", "/nameResources/urlSpecificAdjusterList.json", true);
	urlSpecificAdjusterList.responseType = 'text';
	urlSpecificAdjusterList.send();
	
	//load json for publisher address info
	let publisherAddressList = new XMLHttpRequest();
	publisherAddressList.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			//try parse to json
			let json = [[],[]];
			try {
				json = JSON.parse(this.responseText);
			} catch(exception) {
				json =  [[],[]];
			}
			BINData.setPublisherAddressList(json[0]);
			BINData.setCityList(json[1]);
			BINData.increaseBackgroundState();
		}
	};
	publisherAddressList.open("GET", "/nameResources/publisherInfo.json", true);
	publisherAddressList.responseType = 'text';
	publisherAddressList.send();
	
	//load schemata
	let schemata = new XMLHttpRequest();
	schemata.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			//try parse to json
			let json = [];
			try {
				json = JSON.parse(this.responseText);
			} catch(exception) {
				json =  [];
			}
			//TODO integrity check
			BINData.setSchemata(json);
			BINData.increaseBackgroundState();
		}
	};
	schemata.open("GET", "/nameResources/schemata.json", true);
	schemata.responseType = 'text';
	schemata.send();
}());
