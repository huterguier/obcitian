const BINParser = ( function () {
	
	//useful data for parsing, collected into object to pass to preformatter, 
	
	//corporate author signals, use "#BINCorpAuthor" in preformatter to force corporate author format
	const collaborationKeywords = Object.freeze(["collaborat[i]?on","association","community","foundation","society","group","corporation","project","consortium","contributor[s]?","editorial","news","online","nachrichten","zeitung","gmbh","#BINCorpAuthor","study","program","Vereinigung"]);
	const parser = Object.freeze({
		// abbreviations for months, English version always shown, but other languages also used for matching.
		monthAbbrevs : Object.freeze([["Jan","Ian","Jaa","Gen","Ene"],["Feb","Fev","Phe","Fév","Vee"],["Mar","Mär","Maa"],["Apr","Avr","Abr"],["May","Mai","Maj","Mag"],["Jun","Juin","Giu","Iun"],["Jul","Juil","Lug","Iul"],["Aug","Aoû","Ago"],["Sep","Sze","Set"],["Oct","Okt","Ott","Out"],["Nov","Noe"],["Dec","Dez","Det","Déc","Dek","Dic"]]),
		monthsFull : Object.freeze(["January","February","March","April","May","June","July","August","September","October","November","December"]),
				     
		monthsMatchRegExp : "Januar[iy]?|Gennaio|enero|Februar[iy]?|febrero|Febbraio|March|M[aä]rz[o]?|A[pvb]ril[e]?|M[ea][yji][o]?|Maggio|Jun[ei][o]?|Giugno|Jul[yi][o]?|Juillet|Luglio|August[i]?|août|Augustus|Agosto|September|Se[pt]t[i]?embre|O[ck]tober|o[ct]t[ou]bre|November|nov[i]?embre|De[cz]ember|d[éi]c[i]?embre|Jan|Ian|Jaa|Gen|Ene|Feb|Fev|Phe|Fév|Vee|Mar|Mär|Maa|Apr|Avr|Abr|May|Mai|Maj|Mag|Jun|Juin|Giu|Iun|Jul|Juil|Lug|Iul|Aug|Aoû|Ago|Sep|Sze|Set|Oct|Okt|Ott|Out|Nov|Noe|Dec|Dez|Det|Déc|Dek|Dic|mar[t]?s|maart",
		
		dayKeywords: "Mon|Tue|Wed|Thu|Fri|Sat|Sun|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday|Montag|Dienstag|Mittwoch|Donnerstag|Freitag|Samstag|Sonntag|Lundi|Mardi|Mercredi|Jeudi|Vendredi|Samedi|Dimanche|Lunes|Martes|Miércoles|Jueves|Viernes|Sábado|Domingo",

		// some special names that have more than one letter as initials TO BE EXTENDED
		specialAuthorNames : Object.freeze(["Yuli","Yaroslav"]),
		specialAuthorNamesInitials : Object.freeze(["Yu","Ya"]),
		
		//keywords used in determining language/country of publisher
		langKeywords :	Object.freeze([
					Object.freeze(["english","university","university[\\s]+press","universities","press","a|an|the","UP","U","P","U"]),
					Object.freeze(["french","université|l'université","presse[\\s]+universitaire","universités","presse","l[ea]|un[e]?","PU","U","P","U"]),
					Object.freeze(["spanish","universidad","prensa[\\s]+universitaria","universidades","prensa","un[a]?|el|l[ao]s","PU","U","P","U"]),
					Object.freeze(["portugese","universidade","jornal[\\s]+universitário","universidades","imprensa","[oa][s]?|um[a]?|uns|umas","JU","U","I","U"]),
					Object.freeze(["galician","universidade","prensa[\\s]+universitaria","universidades","prensa","[oa][s]?|un[s]?|unha[s]?","PU","U","P","U"]),
					Object.freeze(["catalan","universitat","premsa[\\s]+universitària","universitats","premsa","un[as]?|el[s]?|la|les|en|na","PU","U","P","U"]),
					Object.freeze(["basque","unibertsitate[a]?|unibertsitate[\\s]+bat","unibertsitateko[\\s]+prentsa","unibertsitate|unibertsitateak","prentsa|prentsa[\\s]+bat","a","UP","U","P","U"]),
					Object.freeze(["german","universität","universitätspresse","universitäten","presse","ein[e]?|der|die|das","UP","U","P","U"]),
					Object.freeze(["italian","università|l'università","stampa[\\s]+universitaria","università","stampa","l[eao]|un[ao']?|il|gli|i","SU","U","S","U"]),
					Object.freeze(["dutch","universiteit","universiteit[\\s]+pers","universiteiten","pers","de|een|het","UP","U","P","U"]),
					Object.freeze(["african","universiteit","universiteitspers","universiteite","pers","die|'n","UP","U","P","U"]),
					Object.freeze(["swedish","universitet|universitetet","universitets[\\s]+press","universitete[rn]","press|pressen","de[tn]?|en|ett","UP","U","P","U"]),
					Object.freeze(["norwegian","universitet|universitetet","universitetspressen","universiteter|universitetene","presse|pressen","e[nit]|det","UP","U","P","U"]),
					Object.freeze(["danish","universitet|universitetet","universitetspressen","universiteter|universiteterne","presse|pressen","[d]?en","UP","U","P","U"]),
					Object.freeze(["uzbekian","universitet","universitet[\\s]+matbuoti","universitetlar","matbuot","bir","UM","U","M","U"]),
					Object.freeze(["polish","uniwersytet","uniwersytecki[\\s]+dom[\\s]+wydawniczy","uniwersytety","prasa","","UDW","U","P","U"]),
					Object.freeze(["romanian","universitate[a]?","presa[\\s]+universitară","universități|universitatile","presa","un|o|niște","PU","U","P","U"]),
					Object.freeze(["latvian","universitāte","universitātes[\\s]+prese","universitātes","prese","","UP","U","P","U"]),
					Object.freeze(["lithuanian","universitetas","universiteto[\\s]+spauda","universitetai","spauda","","US","U","S","U"]),
					Object.freeze(["bosnian","univerzitet","univerzitetska[\\s]+štampa","univerziteti","štampe","","US","U","S","U"]),
					Object.freeze(["slovakian","univerzitnú|univerzita","univerzitný[\\s]+tlač","univerzít","lis","","UT","U","L","U"]),
					Object.freeze(["slovene","univerza","univerzitetni[\\s]+tisk","univerze","tisk","t[ea]|tista","UT","U","T","U"]),
					Object.freeze(["czech","univerzita","univerzitní[\\s]+tisk","univerzit|vysoké[\\s]+školy","lis","","UT","U","L","U"]),
					Object.freeze(["turkish","üniversite","üniversite[\\s]+basını","üniversiteler","basın","bir","UB","U","B","U"]),
					Object.freeze(["esperanto","universitato","universitato-gazetaro","universitatoj","gazetaro","la","UG","U","G","U"]),
					Object.freeze(["malaysian","universiti","akhbar[\\s]+universiti","universiti","akhbar","sebuah","AU","U","A","U"]),
					Object.freeze(["javanesian","universitas","universitas[\\s]+pers","universitas","pers","ing","UP","U","P","U"]),
					Object.freeze(["indonesian","universitas","pers[\\s]+universitas","universitas","pers","itu|sebuah","PU","U","P","U"]),
					Object.freeze(["sundanese","unipersitas","universitas[\\s]+pencét","universitas","pencét","ing","UP","U","P","U"])
				]),
		
		//words to be shortened for short publisher
		acronymPairs : Object.freeze([
						Object.freeze(["department","ept."]),
						Object.freeze(["departments","epts."]),
						Object.freeze(["edition","d."]),
						Object.freeze(["editions","ds."]),
						Object.freeze(["library","ib."]),
						Object.freeze(["libraries","ibs."])
					     ]),
		
		//acronyms to be removed from short publisher
		businessAcronyms : "ltd|corp|co|gmbh|\\&[\\s]co[\\s\\.]kg|inc|dept|abt|llc|hq",
		
		// signals for collaborations in author names
		collaborationSignals : ( function() {
						let regexp = "(?:";
						const length = collaborationKeywords.length;
						for (let i = 0; i<length; ++i) {
							let keyword = collaborationKeywords[i];
							regexp += "^[\\s]*" + keyword + "[\\s\\,]|[\\s]" + keyword + "[\\s]|[\\s]" + keyword + "[\\s]*$|";
						}
						return (new RegExp(regexp.replace(/\|$/,")"),"i"));
					}() ),
		collaborationSurnames : ( function() {
						let regexp = "(";
						const length = collaborationKeywords.length;
						for (let i = 0; i<length; ++i) {
							let keyword = collaborationKeywords[i];
							regexp += "^" + keyword + "|";
						}
						return (new RegExp(regexp.replace(/\|$/,")[\\s]*[\\,]+[\\s]*(.*)"),"i"));
					}() ),
		// words that signal beginning and end of surnames. Used for author name formatting, including the craziest name I have encountered in science :)
		surnameSignals : Object.freeze(['Willems\\ van', "von", "van", "de", "zu", "zur", "dal", "del", "do", "dos", "di", "al", "la" , "le" ,"ter", "da", "du" ]),
		surnameSuffixesSignals : Object.freeze([ "Jr", "Sr"]),
		surnameSuffixes : Object.freeze([ "Jr.", "Sr."]),
			
		// for RIS parsing, treat authors and keywords separately
		bibFields: Object.freeze(["citation_title","citation_journal_title","citation_journal_abbrev","citation_volume","citation_issue","citation_firstpage","citation_lastpage","citation_date","citation_issn","citation_doi","citation_url","citation_publisher","citation_misc","citation_abstract"]),
		risKeys: Object.freeze(["T1","JF","JA","VL","IS","SP","EP","Y1","SN","DO","UR","PB","N1"]),
		endNoteToRisKeys: Object.freeze(["VL","IS","SP","Y1","SN","DO","UR","PB","N1","N2"]),
		endNoteKeys: Object.freeze(["%V","%N","%P","%8","%@","%R","%U","%I","%Z","%X"]),
		medlineToRisKeys: Object.freeze(["VL","IS","SP","Y1","SN","DO","N2","PB"]),
		medlineKeys: Object.freeze(["VI","IP","PG","DP|DEP","IS","LID|AID","AB","CI"]),
		
		// function to parse from Endnote to Ris
		EndnoteToRis: function (input, fullJournal) {
			
			//TODO detect types
			
			//replace beginning title key and journal key depending on fullJournal
			input = input.replace(/%0.*/,"TY - JOUR").replace(/%T[\ ]*/,"T1 - ").replace(/%J[\ ]*/,(fullJournal ? "JF - " : "JA - "));
			
			//avoid constant dereferences
			fullJournal = parser.endNoteToRisKeys;
			let endNoteKeys = parser.endNoteKeys;
			
			// convert remaining fields
			for (let i = 0; i<10; ++i) {
				input = input.replace(new RegExp(endNoteKeys[i]+"[\ ]*",""),fullJournal[i] + " - ");
			}
			
			//replace authors and keywords key, and return
			return input.replace(/%A[\ ]*/g,"AU - ").replace(/%K[\ ]*/g,"KW - ") + "\nER -";			
		},
		
		// function to parse from Endnote to Ris
		MedlineToRis: function (input) {
			
			//type
			input = (input.search(/^PT[\s]+[\-]+[\s]+Journal[\s]+Article/i) != -1 ? "TY - JOUR\n" : "TY - MISC\n") + input;
			input = input.replace(/^[\s]*PT[\s]+[\-]+[\s]*/g,"BIB - ");
			
			//common fields
			let length = medlineKeys.length;
			for (let i = 0; i<length; ++i) {
				input = input.replace(new RegExp("^[\\s]*(?:"+ medlineKeys[i]+")[\\s]+[\\-]+[\\s]+","i"), "" + medlineToRisKeys[i] + " - ");
			}
			
			//author
			if (input.search(/^[\s]*FAU[\s]+[\-]+[\s]+/) != -1) {
				input = input.replace(/^[\s]*AU[\s]+[\-][\s]*/g,"BIB - ");
				input = input.replace(/^[\s]*FAU[\s]+[\-][\s]*/g,"AU - ");
			}
			
			//replace keywords and return
			return input.replace(/^[\s]*(?:OT|MH)[\s]+[\-]/g,"KW - ") + "\nER -";
		}
	});
	
	//function to get date keywords
	function getDateKeywords() {
		return { monthsMatchRegExp: parser.monthsMatchRegExp , dayKeywords: parser.dayKeywords };
	}
	
	//function to restore accents in journal abbreviations from full title
	function restoreAccents(name,abbrev) {
		//early out
		if (name == null || typeof(name) != 'string' || name.length == 0 || abbrev == null || typeof(abbrev) != 'string' || abbrev.length == 0) return abbrev;
		
		//split journal title into elements that could be abbreviated   
		name = name.match(/[^\s\:\/\,]+/g);
		let numWords;
		if (name == null || (numWords=name.length) < 1) return abbrev;
		   
		//convert title elements for matching
		let matchingWords = [], word = "";
		for (let i = 0; i<numWords; ++i) {
			
			//get element, check if its empty
			word = name[i];
			if (word == "") {
				matchingWords.push(word);
				continue;
			}
			
			//first capitalize
			word = word.slice(0,1).toUpperCase() + word.slice(1);
			
			//save
			name[i] = word;
			
			//get name element with special chars replaced for matching
			word = BINResources.convertSpecialChars(word,1);
			
			//if length different, then probably something wrong with matching, so as a fallback put original name. Otherwise, put name with replaced chars for matching
			matchingWords.push((word.length == name[i].length ? word : name[i]))
		}
		   
		//loop over abbrevs
		word = "", matchingAbbrev = "", matchingWord = "", matchingName = "", returnString = "";
		let index = 0;
		while((index = abbrev.search(/[\s\:\,\/]/)) != -1 || (index = abbrev.search(/[^\s]$/) + 1) > 0) {
			//get single abbrev
			word = abbrev.slice(0,index);
			
			//get the string that needs to be contained in title
			matchingAbbrev = word.replace(/[\.]+$/,"");
			
			if (matchingAbbrev != "") {
				
				// always make sure first letter is capitalized
				matchingAbbrev = matchingAbbrev.slice(0,1).toUpperCase() + matchingAbbrev.slice(1);
				
				//now check whether unconverted abbrev matches with substrings of any of the title elements. 
				for (let i = 0; i<numWords; i++) {
					
					//get name and word
					matchingWord = matchingWords[i]; matchingName = name[i];
					
					//early continue if title element and converted title element are equal
					if (matchingWord == matchingName) continue;
					
					//If match, all is fine. Truncate lists of title elements for next abbreviation
					if (matchingName.search(matchingAbbrev) == 0) {
						name.splice(0,i); matchingWords.splice(0,i);
						numWords = name.length;
						break;
					}
					
					//if no match, test if converted abbreviation matches with converted title elements. If it does, the abbreviation probably lacks an accent that should be taken by abbreviating the full title
					let convertedAbbrev = BINResources.convertSpecialChars(matchingAbbrev,1);
					if (convertedAbbrev != null && typeof(convertedAbbrev) == 'string' && convertedAbbrev.length == matchingAbbrev.length && matchingWord.search(matchingAbbrev) == 0) {
						
						//determine if dot needs to be added
						word = matchingName.substr(0,matchingAbbrev.length) + (matchingAbbrev.length != word.length ? "." : "");
						
						//truncate list of title elements for next abbreviation to be tested
						name.splice(0,i); matchingWords.splice(0,i);
						numWords = name.length;
						break;
					}
					
				}
			}
			
			//add potentially modified word and following non-letter chars to output
			returnString += word;
			abbrev = abbrev.slice(index).replace(/^[\s\:\,\/]*/,
				function(match, offset, original) {
					returnString += match;
					return "";
				}
			);
		}
		return returnString;
	}
	
	function standardizeJournalAbbreviation(name, abbrev) {
		
		//early out
		if (name == "" || abbrev == "") return abbrev;
		
		//early return of name if full name is fully included in abbreviation (which might happen) 
		if (abbrev.search(name) != -1) return name;
				   
		//split name into words that can in principle be abbreviated, 
		name = name.match(/[^\s\:\/\,]+/g);
		let numWords;
		if (name == null || (numWords=name.length) < 1) return abbrev;
		let firstWordIndex = 0;
		
		//go through abbreviation and check if words need to be corrected by adding a dot
		let index = 0, word = "", regexp = "", returnString = "";
		const escapeForRegExp = BINResources.escapeForRegExp;
		while((index = abbrev.search(/[\s\:\,\/]/)) != -1 || (index = abbrev.search(/[^\s]$/) + 1) > 0) {
			word = abbrev.slice(0,index).replace(/[\.]+$/,".");
			if (word != "") {
				let addToString = "";
				if (word.charAt(word.length-1) == ".") {
					addToString = " ";
					//be sure to escape all chars in word properly
					regexp = new RegExp("^" + escapeForRegExp(word.slice(0,word.length-1)),"i");
				} else if (word.length > 1 && (word.toUpperCase() == word || word.toLowerCase() == word)) {
					addToString = " ";
					regexp = "";
				} else {
					//be sure to escape all chars in word properly
					regexp = new RegExp("^" + escapeForRegExp(word) + "$","i");
				}
				// go through this in any case to advance firstWordIndex
				for (let i = firstWordIndex; i<numWords; ++i) {
					if (name[i].search(regexp) != -1) {
						firstWordIndex = i + 1;
						if (addToString == "") addToString = " ";
						break;
					}
				}
				
				// if word not EXACTLY in title, it must probably be abbreviated with a dot!
				if (addToString == "") {
					addToString = ". "; 
				}
				// if colon or comma at end, add to addToString;
				regexp = abbrev.charAt(index);
				if (regexp == ":" || regexp == ",") {
					addToString = addToString.replace(/[\ ]$/,regexp + " ");
				} else if (regexp == "/") {
					addToString = addToString.replace(/[\ ]$/,regexp);
				}
				
				//add to returnString and jump to next word in abbrev
				returnString += word + addToString;
			}
			abbrev = abbrev.slice(index).replace(/^[\s\:\,\/]*/,"");
		}
		return returnString.trim();
	}

	// function to separate author names properly. This does not always work, as surnames might sometimes consist of several names. But this is not worse than simply putting the names as they are
	function formatAuthorName(authorName, collaboration = false,journal = "", language = "") {
		
		// no early out, should be taken care of before!
		//references to parser data on surnames
		let surnameSignals = parser.surnameSignals, surnameSuffixesSignals = parser.surnameSuffixesSignals, surnameSuffixes = parser.surnameSuffixes;
		
		// remove multiple white spaces, replace non-standard hyphens, full stops and commas
		authorName = BINResources.asciiPunctuation(authorName.replace(/[\s]+/g," "),2);
		
		//remove comma at beginning and end of string
		authorName = authorName.replace(/(?:^[,\ ]+|[,\ ]+$)/,"");
		
		//perform simple checks for collaboration and then early out
		if (collaboration) {
			return authorName.replace(parser.collaborationSurnames,
				function(match, $1, $2, offset, original) {
					return $2.trim() + " " + $1.trim();
				}
			);
		}
		
		//journal or url is often in the author name
		if (journal != "") {
			try {
				journal = authorName.replace(new RegExp(BINResources.escapeForRegExp(journal),"gi"),"").replace(/(?:^[,\ ]+|[,\ ]+$)/,"").trim();
				//if empty, return journal name as organization
				if (journal == "") {
					return { authorName: authorName };
				} else {
					authorName = journal;
				}
			} catch (error) {
				//do nothing
				journal = "";
			}
		}
		
		//fix common "-.X" (the dot position interchanged with the single letter after hyphen) and ". -" (space between initials linked by hyphen) misprinta
		authorName = authorName.replace(/(-[\.]+[\ ]*|[\s]+-)/g,"-");
		
		//decapitalize name if deemed necessary
		if (authorName.search(/[a-z]/) == -1 || authorName.search(/[^a-z\.\ \-][^a-z\.\ \-][^a-z\.\ \-]+/) != -1) {
			authorName = authorName.replace(/[^\.\ \-\u2018\u2019,']+/g,
				function(match, offset, original) {
					return "" + match.slice(0,1) + match.slice(1).toLowerCase();
				}
			);
		}
		
		//search for surname suffixes (jr,sr,...)
		let jrSr = "", length = surnameSuffixes.length;
		
		for (let i = 0; i<length; ++i) {
			let regexp = new RegExp("[\ \,]+" + surnameSuffixesSignals[i] + "[\.]*(?:[\\s\,]|[\\s\,]*$)","");
			if (authorName.search(regexp) != -1) {
				authorName = authorName.replace(regexp,"");
				jrSr = surnameSuffixes[i];
				break;
			}
		}
		
		//flag indicating whether to capitalize first letter of surname
		let capitalize = true;
		
		//reformat if not already in comma separated format
		if (authorName.search(",") == -1) {
			
			// index where to split the word
			let splitIndex = -1;
			
			//first search for key words that signal last name
			length = surnameSignals.length;
			for (let i = 0; i<length; ++i) {
				if ((splitIndex = authorName.search(new RegExp("\ " + surnameSignals[i] + "\ ","i"))) != -1) {
					capitalize = false;
					break;
				}
			}
			
			//search for single letter abbreviations with small letters (e.g "v. Klitzing")
			if (splitIndex == -1) splitIndex = authorName.search(new RegExp("\ [a-z]\.\ "));
			
			//take last part of name as surname if index still not set
			if (splitIndex == -1) {
				if ((splitIndex = authorName.search(new RegExp("\ [^\ ]+$","i"))) == -1) {
					splitIndex = 0;
					capitalize = false;
				}
			}
			//save firstname and capitalize its first letter
			length = authorName.slice(0,splitIndex).trim();
			if (length != "") length = length.slice(0,1).toUpperCase() + length.slice(1);
			
			//add surname
			authorName = authorName.slice(splitIndex).trim();
			
			//if surname only one letter or only initials, and first name more than one, it's most likely they have been switched -> swap
			if (authorName.search(/[^\s\.\-][^\s\.\-]/g) == -1 && length.replace(/[\s\.\-]/g,"").length > 1) {
				splitIndex = authorName; 
				authorName = length; 
				length = splitIndex;
			}
			
			//add Jr/Sr if existant
			if(jrSr != "") authorName += ", " + jrSr;
		   
			//add first name if existant
			if(length != null && length.length > 0) authorName += ", " + length;
		} else {
			//properly format around commas, allow only one comma (since jr./sr. was already removed), capitalize first letter of first name
			authorName = authorName.replace(/[\s]*,[\s]*([^,]*).*$/g,
				function(match, $1, offset, original) {
					$1 = $1.trim();
					return ", " + $1.slice(0,1).toUpperCase() + $1.slice(1);
				}
			).trim();
			// add jrSr
			if(jrSr != "") authorName = authorName.replace(/,/,", " + jrSr + ", ");
			// check if at least a first name and/or surname with one letter exists, otherwise, give back empty string that will be filtered out in the next stage
			if (authorName.length <= 1) {
				return "";
			} else {
				//check if surname needs to be capitalized
				length = surnameSignals.length;
				for (let i = 0; i<length; ++i) {
					if ((splitIndex = authorName.search(new RegExp("^[\s]*" + surnameSignals[i] + "\ ","i"))) != -1) {
						capitalize = false;
						break;
					}
				}
			}
		}
		
		//find blocks of capital letters and split them
		jrSr = BINResources.getAllLetters();
		authorName = authorName.replace(new RegExp("[" + jrSr + "]{2,}","g"),
			function(match, offset, original) {
				if (match == match.toUpperCase()) {
					match = match.replace(/(.)/g,"$1\.");
				}
				return match;
			}
		);
		
		//split after dot
		authorName = authorName.replace(/\.[^\.\ \-,]/gi,
			function(match, offset, original) {
				return ". " + match.slice(1);
			}
		);
		
		//always add dot for a single letter in between space or hyphen
		while (authorName.search(new RegExp("[\\s\\-][" + jrSr + "][\\s\\-]","i")) != -1) {
			authorName = authorName.replace(new RegExp("([\\s\\-][" + jrSr + "])([\\s\\-])","i"),
				function(match, $1, $2, offset, original) {
					return "" + $1 + "." + $2;
				}
			);
		}
		//always add dot to single letter at the end that is following a space or hyphen
		authorName = authorName.replace(new RegExp("[\\s\\-][" + jrSr + "]$","i"),
			function(match, offset, original) {
				return "" + match + ".";
			}
		);
		
		//fix white spaces
		authorName = authorName.trim();
		
		//capitalize if necessary
		if (capitalize) authorName = authorName.slice(0,1).toUpperCase() + authorName.slice(1); 
		
		//return
		return authorName;
	}
	
	//function to find month abbreviation
	function findMonthAbbreviation(date) {
		const monthAbbrevs = parser.monthAbbrevs;
		for (let i = 0; i<12; ++i) {
			let length = monthAbbrevs[i].length;
			for (let j = 0; j<length; ++j) {
				let month = date.match(new RegExp("[^A-Za-z]*" + monthAbbrevs[i][j],"i"));
				if (month != null && month.length > 0) {
					return (i+1);
				}
			}
		}
		return 0;
	}
	
	function sortDate(date,mode,normalOrder) {
		
		//assign year and day depending on mode and date order (normalOrder == true means it is not in shitty American format)
		let year = 0, month = 0, day = 0;
		const length = date.length;
		if (length > 1) {
			if (mode == 1) {
				year = date[1]; 
				day = parseInt(date[(normalOrder ? length - 1 : 2)].replace(/[^0-9]+/g,""),10);
				month = parseInt(date[(normalOrder ? 2 : length - 1)].replace(/[^0-9]+/g,""),10);
			} else {
				year = date[length - 1];
				day = parseInt(date[(normalOrder ? 1 : 2)].replace(/[^0-9]+/g,""),10);
				month = parseInt(date[(normalOrder ? 2 : 1)].replace(/[^0-9]+/g,""),10);
			}
			month = month != NaN ? month : 0;
			day = (day != NaN && day < 32) ? day : 0;
			
			//sanity check for days vs. months. However, correct order should be taken care of by setting citation_date_reverse flag in preformatter
			if (month > 12 && day < 13) {
				let swap = month; month = day; day = swap;
			}
		}
		//return
		return [year,month,day];
	}
	
	//function to clean ISBN, and to convert to ISBN13
	function cleanISBN(input) {
		
		//early out
		if (input == null || typeof(input) != 'string' || input.length == 0) return { isbn: "" , territory: "" };
		
		//remove non valid characters
		input = BINResources.asciiPunctuation(input,0).replace(/[^0-9X\-]+/gi,"");
		
		//early out
		if (input.length == 0) return { isbn: "" , territory: "" };
		
		//return string
		let returnString = input.replace(/(?:^[^0-9]*|[^0-9]*$)/g,"");
		
		//remove hyphens from input to count number of digits
		input = input.replace(/[^0-9X]/g,"");
		
		//return empty output if invalid input
		if (returnString.length == 0 || (input = input.length) < 10 || input > 13) return { isbn: "" , territory: "" };
			
		//check if isbn 13 is given
		let digit = "", prefix = "";
		if (input > 10) {
			
			//if longer than 10 digits, but no 978/9 in the beginning, ISBN is not valid, so return empty string immediately
			if (returnString.search(/^97[89]/) == -1) return { isbn: "" , territory: "" };
			
			//separate leading 3 numbers and last digit with hyphen
			input = returnString.replace(/^(978|979)[\-]*/i,"");
			input = input.slice(0,input.length-1);
			returnString = returnString.replace(/^(978|979)[\-]*/, function(match, $1, offset, original) { return "" + $1 + "-"; } );
			returnString = returnString.replace(/[\-]*([0-9X])$/, function(match, $1, offset, original) { return "-" + $1; } );
		} else {
			
			//get first 9 digits
			returnString = returnString.slice(0,returnString.length-1).replace(/[\-]*$/,"");
			
			input = returnString.replace(/[^0-9]/g,"").split("");
			//compute check digit
			let digit = 38;
			for(let i = 0; i<8; ++i) {
				digit += parseInt(input[i])*3;
				++i;
				digit += parseInt(input[i]);
			}
			digit += parseInt(input[8])*3;
			digit = 10 - (digit % 10);
			digit = "-" + digit%10;
			
			//correctly define isbn13
			prefix = "978-";
			input = returnString;
		}
		
		//now determine territory if begins with 978
		if (prefix != "" || returnString.indexOf("978") == 0) {
			let territoryList = BINResources.getISBNTerritories();
			let length = territoryList.length, count = 0;
			for (count = 0; count<length; ++count) {
				if (input.indexOf(territoryList[count][0]) == 0) {
					input = territoryList[count][1];
					territoryList = territoryList[count][0];
					break;
				}
			}
			//add hyphen to isbn if necessary
			if (count == length) {
				input = "";
			} else {
				returnString = returnString.replace(new RegExp("^978\\-"+territoryList,"i"),"978-"+territoryList+"-").replace(/[\-]+/g,"-");
				
				//TODO: if territory English, try to reconstruct last hyphen
			}
		} else {
			input = "";
		}
		return { isbn: (prefix + returnString + digit) , territory: input };
	}
	
	//function to clean ISSN
	function cleanISSN(input) {
		
		//early out
		if (input == null || typeof(input) != 'string' || input.length == 0) return "";
		
		//return string
		input = BINResources.asciiPunctuation(input,0).replace(/[^0-9X]/g,"");
		if (input.length != 8) return "";
		
		//return final string
		return (input.slice(0,4) + "-" + input.slice(4));
	}
	
	//function that properly encodes utf8 iris. Uses punycode for the domain/hostname, and regular percentage encoding for all other parts!
	function encodeIRI(iri) {
		
		//early out for invalid input
		if (iri == null || typeof(iri) != 'string' || iri.length == 0) return iri;
		
		//separate iri
		let parts = BINResources.asciiPunctuation(iri,2).match(/^([a-zA-Z]+[a-zA-Z0-9\+\.\-]*:\/\/)([^\/]+)([\/]?.*)$/), length = 0;
		if (parts == null || parts.length < 3) {
			parts = iri.match(/^([^\/]+)([\/]?.*)$/);
			//early out for invalid ipnut
			if (parts == null || parts.length < 2) return iri;
			
			//set length for later, to know how subpaths have to be percentage encoded
			length = parts.length;
			
			//reset iri
			iri = "";
		} else {
			//set length for later, to know how subpaths have to be percentage encoded
			length = parts.length - 1;
			
			//begin iri with scheme
			iri = "" + parts[1].toLowerCase();
			
			//shift array
			parts.shift();
		}
		
		//separate authority part and port from domain. Domain should be "punycoded". All other parts are percentage encoded or kept as they are
		parts[0] = parts[1].search(/@/);
		if (parts[0] != -1) {
			let temp;
			try {
				temp = encodeURIComponent(parts[1].slice(0,parts[0])) + "@";
			} catch (exception) {
				temp = BINResources.convertToPunycode(parts[1].slice(0,parts[0])) + "@";
			}
			iri += temp;
			parts[1] = parts[1].slice(parts[0]+1);
		}
		parts[0] = parts[1].search(/:/);
		if (parts[0] != -1) {
			parts[3] = parts[1].slice(parts[0]); //use parts[3] as temporary for port
			parts[1] = parts[1].slice(0,parts[0]);
		}
		
		//punycode domain
		iri += parts[1].toLowerCase().replace(/[^@:\.]+/g,
			function(match, offset, original) {
				return BINResources.convertToPunycode(match);
			}
		);
		
		//add port if available
		if (parts[0] != -1) iri += parts[3];
		
		//finally percentage encode all the remaining bits of the IRI
		if (length == 3) {
			iri += parts[2].replace(/[^@:\,\&\=\+\$\#\/\?\%]+/g,
				function(match, offset, original) {
					try {
						offset = encodeURIComponent(match);
					} catch(exception) {
						offset = BINResources.convertToPunycode(match);
					}
					return offset;
				}
			);
		}
			
		return iri;
	}
	
	//function to parse citation obtained in RIS format
	function parseRIS(metaData, bibFields, risKeys) {
		
		//get RIS and reset in metaData
		let ris = metaData["citation_download"];
		metaData["citation_download"] = "";
		
		//early out
		if (ris == null || ris == "") return;
		
		//parse raw RIS text data
		let parsedRis = {}, length = bibFields.length, regexp = "";
		for (let i = 0; i<length; ++i) {
			parsedRis[bibFields[i]] = "";
			regexp = '[\\s]*' + risKeys[i] + '[\\t\\ ]+[\-]+[\\t\\ ]+';
			let match = ris.match(new RegExp('' + regexp + '[^\\n]*\\n',"i"));
			if (match != null && match.length > 0) {
				parsedRis[bibFields[i]] = match[0].replace(new RegExp(regexp,"i"),"").trim();
			}
		}
		
		//get collection title if type is chap
		if (ris.search(/(^|\n)TY[\t\ ]+[\-]+[\t\ ]+[E]?CHAP/i) != -1) {
			parsedRis["citation_collection_title"] = "";
			regexp = '[\\s]*' + "(?:BT|[TJ][23])" + '[\\t\\ ]+[\-]+[\\t\\ ]+';
			let match = ris.match(new RegExp('' + regexp + '[^\\n]*\\n',"i"));
			if (match != null && match.length > 0) {
				parsedRis["citation_collection_title"] = match[0].replace(new RegExp(regexp,"i"),"").trim();
			}
		}
		
		//perform extra parsing for authors and keywords. Match first author first, and then all others, then keywords
		parsedRis["citation_authors"] = ""; parsedRis["citation_keywords"] = ""
		risKeys = ["A1","AU","KW"];
		bibFields = ["citation_authors","citation_authors","citation_keywords"];
		for (let i = 0; i<3; ++i) {
			regexp = '[\\s]*' + risKeys[i] + '[\\t\\ ]+[\-]+[\\t\\ ]+';
			let match = ris.match(new RegExp('' + regexp + '[^\\n]*\\n',"gi"));
			length = 0;
			if (match != null) length = match.length;
			for (let j = 0; j<length; ++j) {
				parsedRis[bibFields[i]] += match[j].replace(new RegExp(regexp,"i"),"").trim() + " ; ";
			}
		}
		
		//finally parse abstract, allow multiple lines
		if ((length = ris.search(/N2[\t\ ]+[\-]+[\t\ ]+/)) != -1) {
			ris = ris.slice(length+2);
			if ((length = ris.search(/[A-Z0-9]{2}[\t\ ]+[\-]+[\t\ ]*/)) != -1) ris = ris.slice(0,length);
			parsedRis["citation_abstract"] = ris.replace(/^[\t\ ]+[\-]+/,"").replace(/[\r\v\f\n][\s]*/g," ").trim();
		}
		metaData["citation_download"] = parsedRis;
	}
	
	//function to replace HTML source data by downloaded meta data
	function mergeMetaData(metaData, parsedRis, parsedJson) {
		
		// loop over all properties of the parsedJson element, and replace metaData by parsed RIS if available (must be removed in preprocessing stage if data from HTML source should not be overwritten)
		let parsedObjects = [parsedJson, parsedRis];
		for (let i = 0; i<2; ++i) {
			let parsedData = parsedObjects[i];
			if (parsedData != null && typeof(parsedData) == 'object') {
				Object.getOwnPropertyNames(parsedData).forEach(function(property) {
					let value = parsedData[property];
					if (value != null && value != "" && (value.search(/[^\x00-\x2F\x3A-\x40\x5B-\x60\x7B-\x7F]/) != -1 || metaData[property].length == 0)) {
						value = BINResources.htmlDecode(value);
						if (value != "") value = value.replace(/<[^0-9\s][^>].*?>/gi,"");
						if (value != "") metaData[property] = value;
					}
				});
			}
		}
	}
	
	//function to abbreviate publisher/database. mode will be used to distinguish between publisher and database
	function shortenPublisher(input, mode = 0) {

		if (input == null || input == "") return "";
		
		//get resources from parser
		const langKeywords = parser.langKeywords, businessAcronyms = parser.businessAcronyms;
				     
		//remove business acronyms (not yet multilingual)
		const regExpr = "[\\s\\.\\u002E\\u06D4\\uFE52\\uFE0E\\,\\u002C\\uFE50\\uFF0C\\:\\-\\u002D\\uFF0D\\uFE63\\u207B\\u208B\\u00AD\\u058A\\u2010\\u2011\\u2043\\;]";
		input = input.replace(new RegExp("^" + regExpr + "*(?:" + businessAcronyms + ")" + regExpr + "+","i"),"").replace(new RegExp(regExpr + "+(?:" + businessAcronyms + ")" + regExpr + "*$","i"),"").replace(new RegExp("[\\s]+(?:" + businessAcronyms + ")[\\.\\u002E\\u06D4\\uFE52\\uFE0E\\,\\u002C\\uFE50\\uFF0C]+","gi"),"");
		
		//abbreviate common terms
		if (mode == 1) {
			const acronymPairs = parser.acronymPairs;
			const numAcronyms = acronymPairs.length;
			for (let i = 0; i<numAcronyms; ++i) {
				input = input.replace(new RegExp("(^[\\s]*|[\\s]+)(" + acronymPairs[i][0] + ")([\\.\\u002E\\u06D4\\uFE52\\uFE0E\\,\\u002C\\uFE50\\uFF0C]*)(?:[\\s\\,\\u002C\\uFE50\\uFF0C\\:\\-\\u002D\\uFF0D\\uFE63\\u207B\\u208B\\u00AD\\u058A\\u2010\\u2011\\u2043\\;]|$)","gi"),
					function (match, $1, $2, $3, offset, original) {
						let returnString = $1 + $2[0] + acronymPairs[i][1];
						if ($3 != "") returnString += " " + $3;
						return returnString;
					}
				);
			}
		}
		
		//replace university/press, rudimentary multilingual support
		
		//number of languages to check from
		let numLangs = langKeywords.length;
		
		//determine possible languages
		let langs = [], keys = [1,3,4,5], key = 0, pos = -1;
		for (key = 0; key<4; ++key) {
			for (let i = 0; i<numLangs; ++i) {
				if ((pos = langKeywords[i][keys[key]]) != "" && (pos = input.search(new RegExp('(?:' + regExpr + '+|^)(?:' + pos + ')(?:' + regExpr + '+|$)',"i"))) != -1) {
					langs.push([langKeywords[i],keys[key]]); //add to possible languages
				}
			}
			if (langs.length > 0) {
				key++
				break;
			}
		}
		
		//process remaining languages, reduce to either 0 or 1 language
		if ( (numLangs = langs.length) > 1) {
			const prefLangs = [];
			keys.push(2);
			for (key = key; key < 5; ++key) {
				for (let i = 0; i<numLangs; ++i) {					
					if ((pos = langs[i][0][keys[key]] ) != "" && (pos = input.search(new RegExp("(?:" + regExpr + "+|^)(?:" + pos + ")(?:" + regExpr + "+|$)" ,"i"))) != -1) {
						prefLangs.push(langs[i]);
					}
				}
			}
			if (prefLangs.length > 0) langs = prefLangs;
		}
		
		//pick first language in array of possible languages, ea
		if (langs.length < 1) return input;
		key = langs[0][1]
		langs = langs[0][0];
		
		//remove all articles at the beginning
		if ((pos = langs[5]) != "") input = input.replace(new RegExp("^(?:" + pos + ")([\\s]+|$)","gi"),"");
		
		//in publisher mode, only replace university/press if both "university" and "press" keywords are found
		if (mode == 0) {
			if (key > 3 || (key > 2 && input.search(new RegExp("(?:" + regExpr + "+|^)(?:" + langs[4] + ")(?:" + regExpr + "+|$)" ,"i")) == -1) || (key == 1 && input.search(new RegExp("(?:" + regExpr + "+|^)(?:" + langs[2] + "|" + langs[4] + ")(?:" + regExpr + "+|$)" ,"i")) == -1) ) {
				return input;
			}
		}
		
		//now replace university/press for chosen language
		keys = [2,1,4,3]; pos = 6; key = 0;
		let returnString = input;
		for (key = 0; key < 4; ++key) {
			if (langs[keys[key]] != "") {
				returnString = returnString.replace(new RegExp("(" + regExpr + "+|^)(?:" + langs[keys[key]] + ")(" + regExpr + "+|$)","gi"),
					function(match, $1, $2, offset, original) {
						return $1 + langs[pos] + $2;
					}
				);
			}
			pos++;
		}
		
		//finish, return publisher with University and Press removed only if return value contains more than U, P and space. Otherwise return string prior to removal of "university" and "press"
		if (returnString.search(/[^UP[\s]/i) == -1) returnString = input;
		return returnString;
	}
	
	//function to parse a BIN format string to a format array
	function parseFormatString(format,bibfieldsToNumbers,replaceChars = true,repeat = true) {
		
        //function to find valid bracket
        
        
		//function to parse bibfield string
		function parseInputStrings(bibfieldStringArray,bibfieldsToNumbers,repeat = true) {
						
			//early out for invalid data
			let numBibfields;
			let bibFieldArr;
			if (bibfieldStringArray == null || !Array.isArray(bibfieldStringArray) || (numBibfields = bibfieldStringArray.length) == 0 || (bibFieldArr = bibfieldStringArray[0]) == null || !Array.isArray(bibFieldArr) || bibFieldArr.length != 4 || typeof(bibFieldArr[0]) != 'string') return null;
			
			//variables storing bibfield list info and possible replacement regexps
			let formatString = "{";
			let required = false;
			
			//check if required
			if (bibFieldArr[0].indexOf("!") == 0) {
				required = true;
				formatString += "!";
			}
		      	
			// loop over all bibfield sequences
			bibFieldArr = [];
			for (let i = 0; i<numBibfields; ++i) {
				
				//early continue for invalid bibfield specifiers
				let bibfield = bibfieldStringArray[i]; let bibfieldNumber = null;
				if (bibfield == null || !Array.isArray(bibfield) || bibfield.length != 4) continue;
				for (let j = 0; j<4; ++j) {
					let bib = bibfield[j];
					if (bib == null || typeof(bib) != 'string') {
						bibfield = null;
						break;
					}
				}
				if (bibfield == null) continue;
		   
 				//get bibfield identifier + options, prefix, suffix, regexps
				let prefix = bibfield[1], suffix = bibfield[2], regexpString = bibfield[3];
				bibfield = bibfield[0]
				
				//check if option string available for bibfield
				let index = bibfield.indexOf("[");
				let end = bibfield.indexOf("]");
				
				//check whether bibfield content should actually be shown, or whether it should only be checked to be non-empty
				let hideBibfield = (bibfield.indexOf("?") != -1);
				
				//extract option string and bibfield if yes
				if (index != -1 && end >= index) {
					end = bibfield.slice(index+1,end).replace(/[^0-9\-\,]*/g,"");
					bibfield = bibfield.slice(0,index).replace(/[^a-z\_\-]*/g,"");
					index = end;
				} else {
					bibfield = bibfield.replace(/[^a-z\_\-]*/g,"");
				}
				
				//only add bibfield if at least valid bibfield available
				bibfieldNumber = bibfieldsToNumbers[bibfield];
				if (bibfield.length == 0 || bibfieldNumber == null) continue;
				
				//finally add bibfield if valid
				let toAdd = [bibfieldNumber];
				formatString += bibfield;
				
				//add any options
				if (index != -1 && index.search(/[0-9]/) != -1) {
					
					//open option list for format string
					formatString += "[";
					
					//check if there are more options
					end = index.indexOf(",");
					
					//parse option integers
					while(true) {
						if (end == -1) {
							index = parseInt(index);
							if (index != null && typeof(index) == 'number') {
								if (!repeat) toAdd.push(index);
								formatString += "" + index;
							}
							break;
						}
						let opt = index.slice(0,end);
						index = index.slice(end+1);
						end = index.indexOf(",");
						if (opt != null && opt.length > 0 && (opt = parseInt(opt)) != null && typeof(opt) == 'number') {
							if (!repeat) toAdd.push(opt);
							formatString += "" + opt + ",";
						}
						
					}
					
					//close option list
					formatString = formatString.replace(/[\,]*$/,"") + "]";
				}
				
				//add indicator whether bibfield should be hidden
				if (!repeat) toAdd.push(hideBibfield);
				if (hideBibfield) {
					formatString += "?";
				}
				
				//prepare regexp
				regexpString = regexpString.replace(/^[\/\s]*/gi,"");
				
				//add prefix/suffix
				if (!repeat) {
					toAdd.push(prefix); 
					toAdd.push(suffix);
				}
				if (prefix.length > 0) {
					formatString += "\\"+prefix+"\\";
					if (suffix.length > 0) {
						formatString += suffix+"\\";
					}
				} else if (suffix.length > 0) {
					formatString += "\\\\"+suffix+"\\";
				}
				
				//add replacementRegexps
				let replacementRegexps = [];
				if (regexpString != "") {
					
					//separate regexps
					let length = -1;
					while((length = regexpString.indexOf("/",length+1)) != -1) {
						let toSub = 1;
						while(length >= toSub && regexpString.charAt(length-toSub) == "\\") toSub++;
						if (toSub%2 == 1) {
							replacementRegexps.push(regexpString.slice(0,length));
							regexpString = regexpString.slice(length).replace(/^[\/]/,"");
							length = -1;
						}
					}
					
					//make sure number of regexps comes in multiples of 3
					length = replacementRegexps.length%3;
					for (let i = 0; i<length; i++) replacementRegexps.pop();
					
					//sanity checks for regexps
					length = replacementRegexps.length;
					for (let i = 0; i<length; i++) {
						let ind = i%3;
						
						//check expression
						let exp = replacementRegexps[i];
						if (ind == 1) {
							//check if string
							if (exp == null || typeof(exp) != 'string') replacementRegexps[i] = "";
						} else if (ind == 0) {
							
							//if regexp invalid, remove elements
							if (exp == null || typeof(exp) != 'string' || exp.length == 0) {
								replacementRegexps.splice(i,3);
								i--;
								length -= 3;
							} else {
								//test regexp
								try {
									exp = new RegExp(exp);
								} catch(error) {
									replacementRegexps.splice(i,3);
									i--;
									length -= 3;
								}
							}
						} else if (ind == 2) {
							replacementRegexps[i] = BINResources.recognizeRegExpFlags(exp);
						}
					}
					length = replacementRegexps.length;
					if (length > 0) {	
						//append sanitized regexp strings to format string, depending on prefix and suffix
						if (suffix.length == 0) {
							formatString += "\\";
							if (prefix.length == 0) {
								formatString += "\\\\";
							}
						}
						formatString += "/";
						for (let i = 0; i<length; i++) formatString += replacementRegexps[i] + "/";
					}
				}
				
				//push replacement regexps to bibfield array. Empty array if no replacement regexps
				if (!repeat) toAdd.push(replacementRegexps);
				
				//add bibfield + options + prefix,suffix to array
				bibFieldArr.push(toAdd);
				formatString += "||";
			}
			
			//early out if no bibfields
			if (bibFieldArr.length == 0) return null;
		   
			//remove last separator from format string
			formatString = formatString.replace(/[\|]*$/,"");
		   
			//return
			if (!repeat) {
				return { bibObj: { bibfields: bibFieldArr , req: required } , string: formatString.replace(/[\|]*$/,"") + "}" };
			} else {
				return { bibObj: null , string: formatString.replace(/[\|]*$/,"") + "}" };
			}
		}
		
		//early out if invalid string
		if (format == null || typeof(format) != 'string' || format.length == 0 || bibfieldsToNumbers == null || typeof(bibfieldsToNumbers) != 'object') return null;
		
		//remove invalid characters from string, and return if empty string afterwards
		if (replaceChars) {
			format = BINResources.convertSpecialChars(format,1).replace(/(?:[\x00-\x08\x0E-\x1F\x7F-\x9F]*|[^\x00-\x7F]*)/g,"").trim();
			if (format.length == 0) return null;
		}

		//now bite off string one by one and add to array
		let formatArr = [], formatString = "";
		let index = 0, mode = 0, toAdd = 1;
		while(format.length > 0) {
			if (mode == 0) {
				
				//mode 0 = outside of curly brackets, search for next one
				index = -1;
				while ((index = format.indexOf("{",index+1)) != -1) {
					toAdd = 1;
					while(format.charAt(index-toAdd) == "\\") toAdd++;
					if (toAdd%2 == 1) break;
				}

				//if no more curly bracket, simply add the rest as a fixed string, otherwise switch to mode 1
				if (index == -1) {
					if (format.length > 0) {
						if (!repeat) formatArr.push(format);
						formatString += format;
					}
					break;
				} else {
					//add string up to bracket
					if (index > 0) {
						let temp = format.slice(0,index);
						if (temp.length > 0) {
							if (!repeat) formatArr.push(temp);
							formatString += temp;
						}
					}
					//switch to "inside bracket" mode without/with regexp
					mode = 1;
				}
				
				//cut already parsed string and continue
				format = format.slice(index+1);
			} else {
				
				//first check whether curly bracket closed somewhere. If not, take as string and stop
				let indBrack = format.search(/[^0-9\,][\s]*\}/), indCon = format.indexOf("||");
				let indSep;
				if (indBrack == -1) {
					format = "{" + format;
					if (!repeat) formatArr.push(format);
					formatString += format;
					break;
				} else {
                    indBrack = format.indexOf("}",indBrack); 
                }
		   
				//proceed several stages
				let bibfieldStrings = ["","","",""];
				let bibfieldStringArray = [];
				for (let stage = 0; stage < 4; stage++) {
					
					switch(stage) {
						
						//fourth stage = regexp
						case 3:
                            
							//early out if "}" or "||" follows immediately
							if (indBrack == 0) {
								index = indBrack;
								
								//push to array
								bibfieldStringArray.push(bibfieldStrings);
								
								stage = 4;//break loop
								break;
							} else if (indCon == 0) {
								index = indCon+1;
								
								//push to array and reset
								bibfieldStringArray.push(bibfieldStrings);
								bibfieldStrings = ["","","",""];
								
								//repeat loop from beginning
								stage = -1;
								break;
							}
							
							//find first unescaped "||"
							while(indCon > 0) {
								toAdd = 1;
								while (format.charAt(indCon-toAdd) == "\\") toAdd++;
								if (toAdd%2 == 1) break;
								indCon = format.indexOf("||",indCon+1);
							}
							
							//if unescaped "||" prior to first "}", interpret everything up to connector as regular expression and start from beginning
							if (indCon > 0 && indBrack > indCon) {
								index = indCon;
								bibfieldStrings[3] = format.slice(0,index);
								index++; //shift because of double character
								
								//push to array and reset
								bibfieldStringArray.push(bibfieldStrings);
								bibfieldStrings = ["","","",""];
								
								//repeat loop from beginning
								stage = -1;
								break;
							}
							
							//find first unescaped "}"
							while (indBrack != -1) {
								toAdd = 1;
								while (format.charAt(indBrack-toAdd) == "\\") toAdd++;
								if (toAdd%2 == 1) break;
								indBrack = format.indexOf("}",indBrack+1);
							}

							//if no bracket found, interpret everything as regular expression and finish
							if (indBrack == -1) {
								bibfieldStrings[3] = format;
								bibfieldStringArray.push(bibfieldStrings);
								index = -1;
								stage = 4;
								break;
							}
							
							
							//if unescaped bracket before connector or if no connector, check for further brackets
							let numLeftBrackets = 1, numRightBrackets = 1, bracketToSearch = true;
								
							//get next position of current bracket
							let posLeft = 0, posRight = indBrack;
							while(posRight < indCon && ((bracketToSearch && (indSep = posLeft + 1 + format.substr(posLeft + 1).search(/\{[\s]*[^0-9\,\$]/)) > posLeft) || (!bracketToSearch && (indSep = posRight + 1 + format.substr(posRight + 1).search(/[^0-9\,][\s]*\}/)) > posRight)) && ((bracketToSearch && indSep < indBrack) || (!bracketToSearch && numLeftBrackets != numRightBrackets) )) {
								
								//save new position
								if (bracketToSearch) {
									posLeft = indSep;
								} else {
                                    indSep = format.indexOf("}",indSep);
									posRight = indSep;
								}

								//if not escaped, set new position and change bracket to search for
								toAdd = 1;
								while (format.charAt(indSep-toAdd) == "\\") toAdd++;
								if (toAdd%2 == 1) {
									if (bracketToSearch) {
										numLeftBrackets++;
										bracketToSearch = false;
									} else {
										numRightBrackets++;
										indBrack = indSep;
										bracketToSearch = true;
									}
								
								}
							}
							//if "}" after valid "||", interpret everything up to "||" as regular expression and start from beginning
							
							if (posRight > indCon && indCon > 0) {
								index = indCon;
								bibfieldStrings[3] = format.slice(0,index);
								index++; //shift because of double character
								
								//push to array and reset
								bibfieldStringArray.push(bibfieldStrings);
								bibfieldStrings = ["","","",""];
								
								//repeat loop from beginning
								stage = -1;
							} else {
								
								//if valid "}" before "||" or no "||", take everything up to "}" and finish loop
								index = indBrack;
								bibfieldStrings[3] = format.slice(0,index);
								
								//push to array
								bibfieldStringArray.push(bibfieldStrings);
								
								//finish loop
								stage = 4;
							}
							
							break;
							
						//default behavior for bibfield, prefix, suffix
						default:
							//get separator position
							indSep = format.indexOf("\\");
							
							//assume separator as index to cut
							index = indSep;
							if (indCon > -1 && indCon < indBrack && (index > indCon || index == -1)) {
								//if || connector appears before, add bibfield strings but continue loop
								index = indCon;
								bibfieldStrings[stage] = format.slice(0,index);
								index++; //shift because of double character
								
								//push to array and reset
								bibfieldStringArray.push(bibfieldStrings);
								bibfieldStrings = ["","","",""];
								
								//repeat loop from beginning
								stage = -1;
								break;
							} else if (index > indBrack || index == -1) {
								index = indBrack;
								
								//assume data up to this stage only, and completely break loop
								bibfieldStrings[stage] = format.slice(0,index);

								//push to array
								bibfieldStringArray.push(bibfieldStrings);
								
								//finish loop
								stage = 4;
								break;
								
							}
							//by default, simply set next entry in bibfieldString array with string up to "\" char
							bibfieldStrings[stage] = format.slice(0,index);
							break;
					}
					
					//cut already parsed string and continue
					format = format.slice(index+1);
					indBrack = format.search(/[^0-9\,][\s]*\}/);
                    indBrack = format.indexOf("}",indBrack);
					indCon = format.indexOf("||");
				}
				
				
				//parse bibfield and regexp string
				toAdd = parseInputStrings(bibfieldStringArray,bibfieldsToNumbers,repeat);
								
				//add to format array
				if (toAdd != null) {
					if (!repeat) formatArr.push(toAdd.bibObj);
					formatString += toAdd.string;
				}
				//switch back to mode 0
				mode = 0;
			}
		}
		
		// return either null or object with string and, after second pass, format array
		if (!repeat) {
			if (formatArr.length == 0) return null;
			return { array: formatArr , string: formatString };
		} else {
			if (formatString.length == 0) return null;
			return parseFormatString(formatString,bibfieldsToNumbers,replaceChars,false);
		}
	}
	
	//function to parse a BIN citation format source string
	function validateFormatSource(formatSource,numbersToBibfields,bibfieldsToNumbers) {
		//validate format source, first test JSON parse
		try {
			formatSource = JSON.parse(formatSource);
		} catch(error) {
			formatSource = null;
		}
		let formatArr = null;
		if (formatSource != null && Array.isArray(formatSource) && formatSource.length > 0) {
			
			//validate format source
			formatArr = [];
			formatSource = parseFormatArray(formatSource,formatArr,numbersToBibfields,bibfieldsToNumbers);
			if (formatSource == null) {
				formatArr = null;
			} else {
				//stringify back
				try {
					formatSource = JSON.stringify(formatArr,null, '\t');
				} catch(error) {
					formatSource = null;
					formatArr = null;
				}
			}
		}
		//return
		if (formatSource != null) formatSource = { formatSource: formatSource , array: formatArr };
		return formatSource;
	}
	
	//function to validate a BIN format array
	function parseFormatArray(array,formatArr,numbersToBibfields,bibfieldsToNumbers,parseString = false) {
		
		let length;
		parseString = (parseString == true);
		
		//early out for invalid or empty array
		if (array == null || !Array.isArray(array) || (length = array.length) == 0 || (formatArr == null && !parseString) || (!parseString && !Array.isArray(formatArr))) return null;
		
		//empty format array
		let formatString = "";
		if (formatArr == null) {
			formatArr = [];
		} else {
			formatArr.splice(0,formatArr.length);
		}
		
		//loop over all elements of provided array
		for (let i = 0; i<length; ++i) {
			let elem = array[i];
			
			//if array element not valid, trash entire data set from memory and keep default format
			if (elem == null) {
				continue;
			}
			
			//array element must be string or object, otherwise keep default format
			let type = typeof(elem);
			if (type == 'string') {
				
				//add fixed string to end of array and formatString
				formatArr.push(elem);
				if (parseString) formatString += elem;
		   
			} else if (type == 'object') {
				
                //check which type of object (for now, just distinguish between single and multiple bibfields)
                let multipleBibFields = (elem["bibfields"] != null);
                
				//part of formating string
				let stringToAdd = "{";
				let elemToAdd = multipleBibFields ? { req: false , bibfields: [] } : { req: false , bibfield: [] };

				//check if object has boolean req property, otherwise keep default "false"
				type = elem["req"];
				if (type != null && typeof(type) == "boolean" && type) {
					if (parseString) stringToAdd += "!";
					elemToAdd.req = true;
				}
				
				// check if bibfields property is given by an array. If not skip
				elem = multipleBibFields ? elem["bibfields"] : [elem["bibfield"]];
				let numFields = 0;
				if (elem != null && Array.isArray(elem) && (numFields = elem.length) > 0) {
					for (let j = 0; j<numFields; ++j) {
						let field = elem[j];
						
						//check if element is another array, with first element being a string/number specifying the bibfield or another format array, and possibly further integer elements
						let numSpecifiers, specifier;
                        let isArr = false;
						if (field == null || !Array.isArray(field) || (numSpecifiers = field.length-4) <= 0 || (specifier = field[0]) == null || (typeof(specifier) != 'number' && typeof(specifier) != 'string' && !(isArr = Array.isArray(specifier)))) {
							continue;
						}
						
						let specifierString;
						//if first element format array, parse recursively only if not empty and if not required to parse format string. Otherwise, assume a type specifier string.
						if (isArr) {
                            //if invalid array or if required to parse format string, ignore (since format strings are not compatible with format array in first argument)
                            if (parseString || specifier.length == 0) {
                                continue;
                            }
                            specifierString = [];
                            isArr = parseFormatArray(specifier,specifierString,numbersToBibfields,bibfieldsToNumbers,false);
                            if (isArr == null || !isArr) {
                                continue;
                            }
                        } else {
                            //only continue if there is a valid bibfield string for the number
                            if (typeof(specifier) == 'string') specifier = bibfieldsToNumbers[specifier];
                            if (specifier == null || typeof(specifier) != 'number') continue;
                            specifierString = numbersToBibfields["b"+specifier];
                            if (specifierString == null || specifierString == "") continue;
                        }

						//set bibfield string and check for further options. If invalid at any point, do not add bibfield
						let fieldToAdd = [specifierString];
						if (parseString) stringToAdd += (numSpecifiers > 1 ? specifierString + "[" : specifierString);
						for (let k = 1; k<numSpecifiers; ++k) {
							if ((specifier = field[k]) == null || typeof(specifier) != 'number') {
								fieldToAdd = null;
								break;
							}
							fieldToAdd.push(specifier);
							if (parseString) stringToAdd += specifier + ",";
						}
						
						//add bibfield and format string if valid after check
						if (fieldToAdd != null) {
							
							//close option sequence in string
							if (parseString) stringToAdd = stringToAdd.replace(/\,$/,"]");
							
							//check if bibfield should be hidden
							specifier = (field[numSpecifiers] == true);
							fieldToAdd.push(specifier);
							if (specifier) stringToAdd += "?";
							
							//add prefix and suffix. If prefix and suffix are arrays themselves, recursively validate
							let prefix = "", presufix = "";
							for (let k = 1; k<3; ++k) {
								presufix = field[numSpecifiers + k];
								if ( presufix == null || (typeof(presufix) != 'string' && !Array.isArray(presufix)) || Array.isArray(presufix) && parseString ) {
									presufix = "";
								} else if (Array.isArray(presufix) && !parseString) {
									let nextFormatArray = [];
									presufix = parseFormatArray(presufix,nextFormatArray,numbersToBibfields,bibfieldsToNumbers,parseString);
									if (presufix != null && presufix) {
										presufix = nextFormatArray;
									} else {
										presufix = "";
									}
								}
								fieldToAdd.push(presufix);
								if (k == 1) prefix = presufix;
							}
							if (parseString) {
								if (prefix.length > 0) {
									stringToAdd += "\\"+prefix+"\\";
									if (presufix.length > 0) {
										stringToAdd += presufix+"\\";
									}
								} else if (presufix.length > 0) {
									stringToAdd += "\\\\"+presufix+"\\";
								}
							}
							
							//add replacement regexps
							let regexps = field[numSpecifiers+3];
							let replacementRegexps = [];
							let numRegexps = 0;
							if (regexps != null && Array.isArray(regexps) && (numRegexps = regexps.length) > 0) {
								
								//first make sure regexps is multiples of 3
								numRegexps = numRegexps%3;
								for (let k = 0; k<numRegexps; ++k) regexps.pop();
								numRegexps = regexps.length;
								
								//now check regexps
								for (let k = 0; k<numRegexps; ++k) {
									
									//check if regexp has valid format
									let exp = regexps[k];
									let ind = k%3;
									if (ind == 1) {
										if (exp == null || typeof(exp) != 'string') exp = "";
										replacementRegexps.push(exp);
									} else if (ind == 0) {
										//if regexp invalid, remove elements
										if (exp == null || typeof(exp) != 'string' || exp == "") {
											regexps.splice(j,3);
											k--;
											numRegexps -= 3;
											continue;
										} else {
											//test regexp
											try {
												exp = new RegExp(exp);
											} catch(error) {
												regexps.splice(k,3);
												k--;
												numRegexps -= 3;
												continue;
											}
											replacementRegexps.push(regexps[k]);
										}
									} else if (ind == 2) {
										replacementRegexps.push(BINResources.recognizeRegExpFlags(exp));
									}
								}
								
								//continue string parsing if finite number of regexps
								if (parseString) {
									numRegexps = replacementRegexps.length;
									if (numRegexps > 0) {
										//append sanitized regexp strings to format string
										if (presufix.length == 0) {
											stringToAdd += "\\";
											if (prefix.length == 0) {
												stringToAdd += "\\\\";
											}
										}
										stringToAdd += "/";
										for (let k = 0; i<numRegexps; ++k) stringToAdd += replacementRegexps[k] + "/";
									}
								}
							}
							
							//push regexps, empty array if no regexps
							fieldToAdd.push(replacementRegexps);
							
							// add bibfield + options + prefix,suffix
                            if (multipleBibFields) {
                                elemToAdd.bibfields.push(fieldToAdd);
                                //append next string
                                if (parseString) stringToAdd += "||";
                            } else {
                                elemToAdd.bibfield = fieldToAdd;
                            }
						}
					}
					
					// if bibfields property valid, add all to format array
					if ((multipleBibFields && elemToAdd.bibfields.length > 0) || elemToAdd.bibfield.length > 0) {
						formatArr.push(elemToAdd);
						if (parseString) formatString += stringToAdd.replace(/[\|]+$/,"") + "}";
					}
				}
			}
		}
		
		// return either null or object with new array and string
		if (formatArr.length == 0) return null;
		if (!parseString) {
			return true;
		} else {
			return { array: formatArr , string: formatString };
		}
	}
	
	function applyFormat(format, parsedData, bibfieldsToNumbers = null) {
		
		//number of format and data elements
		let length = 0;
		let numDataElems = 0;
		
		//early out for invalid input
		if (format == null || !Array.isArray(format) || (length = format.length) == 0 || parsedData == null || !Array.isArray(parsedData) || (numDataElems = parsedData.length) == 0) return null;
		
		//loop over all format elements
		let returnString = "";
		
		for (let i = 0; i<length; ++i) {
			// format element
			let elem = format[i];
			
			//next element if invalid
			if (elem == null) continue;
			
			//simply add to returnString if string, or skip if not object, and continue with next elem
			let req = typeof(elem);
			if (req == 'string') {
				returnString += elem;
				continue;
			} else if (req != 'object') {
				continue;
			}			
			
			//check if bibfield(s) are required
			req = (elem.req == true);
			
			//get bibfields
			elem = (elem.bibfields != null) ? elem.bibfields : (elem.bibfield != null ? [elem.bibfield] : null);
			
			//skip if bibfields not array
			let numBibfields = 0;
			if (elem == null || !Array.isArray(elem) || (numBibfields = elem.length) == 0) continue;
			
			//loop over all bibfields
			for (let j = 0; j<numBibfields; ++j) {
				//get bibfield
				let bibfield = elem[j];
                
				//skip if not valid
				let numOptions = 0, data = -1;
                let isArr = false;
				if (bibfield == null || !Array.isArray(bibfield) || (numOptions = bibfield.length - 4) <= 0 || (data = bibfield[0]) == null || (typeof(data) != 'number' && typeof(data) != 'string' && !(isArr = Array.isArray(data)))) continue;
                   
                //if format array, apply format recursively. Otherwise obtain from parsed data
                if (isArr) {
                    data = applyFormat(data,parsedData,bibfieldsToNumbers);
                    if (data == null || typeof(data) != 'string' || data.length == 0) continue;
                } else {
                    if (typeof(data) == 'string') {
                        if (bibfieldsToNumbers == null || typeof(bibfieldsToNumbers) != 'object') continue;
                        data = bibfieldsToNumbers[data];
                        if (data == null || typeof(data) != 'number') continue;
                    }
                    if (data < 0 || data > numDataElems) continue;
		      
                    //read field number, skip if not valid
                    data = parsedData[data];
                }
				
				//now reduce data with more options
				for (let k = 1; k<numOptions; ++k) {
					
					//check if data valid
					let dataLength;
					if (data == null || (dataLength = data.length) == 0) break; 
					
					//get index
					let idx = bibfield[k];
					
					//skip if not valid
					if (idx == null || typeof(idx) != 'number') continue;
                   
					//reduce data depending on whether string or array, otherwise skip
					if (typeof(data) == 'string') {
						//if string, slice and finish reduction
						data = idx >= 0 ? data.slice(0,idx+1) : data.slice(idx);
						break;
					} else if (Array.isArray(data)) {
						//if array, take array element, continue reduction
                        
                        //allow negative indices to access array from the back
                        if (idx < 0) idx = dataLength + idx;
                        
                        //empty data on overflow
                        if (idx < 0 || idx >= dataLength) {
                            data = null;
                            break;
                        }
                        data = data[idx];
// 						data = idx >= 0 ? data[idx%dataLength] : data[dataLength-1 - ((-idx-1)%dataLength)];
					} else {
						//if nothing of both, set invalid and finish reduction
						data = null;
						break;
					}
				}
				
				//skip if reduced data not valid, allow for empty string at this point to allow matching against empty strings
                if (data == null || (typeof(data) != 'string' && !Array.isArray(data))) continue;
				try {
					data = String(data);
				} catch(error) {
					continue;
				}
				if (data == null || typeof(data) != 'string') continue;
				
				//if valid string, apply all valid replacement regexps to data string
				let numRegexps;
				let replacementRegexps = bibfield[bibfield.length-1];
				if (replacementRegexps != null && Array.isArray(replacementRegexps) && (numRegexps = replacementRegexps.length) > 0 && numRegexps%3 == 0) {
					for (let k = 0; k<numRegexps; k += 3) {
						let exp;
						if (replacementRegexps[k+2].search(/[e]/gi) != -1) {
							//replace if empty string, otherwise make empty
							if (data == "") {
								data = replacementRegexps[k+1].replace(/[\\]+/g, 
										function(match, name, original) {
											return match.slice(0,match.length/2);
										}
								);
							} else {
								data = "";
							}
						} else {
							try {
								exp = new RegExp(replacementRegexps[k],replacementRegexps[k+2]);
							} catch(error) {
								continue;
							}
							//account for escape characters and lower/upper case conversion
							data = data.replace(exp,
                                function() {
                                    //first check if \L{$0-9} or \U{$0-9} statements
                                    let original = arguments[0];
                                    let fullRepString = replacementRegexps[k+1];
                                    
                                    //early out for empty string
                                    if (fullRepString == null || fullRepString == "") return "";
                                    
                                    //divide replacement string
                                    let repStrings = fullRepString.split(/\\[LU]\{\$[1-9][0-9]*\}/);
                                    const numStrings = repStrings.length; const numStringsM = numStrings - 1;
                                    let returnString = "";
                                    for (let i = 0; i<numStrings; i++) {
                                        
                                        //check if upper/lower statement is escaped
                                        let repString = repStrings[i].replace(/[\\]+$/g,"");
                                        let isEscaped = (repStrings[i].length - repString.length) % 2 == 1;
                                        
                                        //get replacement string
                                        repString = repStrings[i].replace(/[\\]+/g, 
                                            function(match, offset, original) {
                                                return match.slice(0,match.length/2);
                                            }
                                        );
                                        returnString += original.replace(exp,repString);
                                        
                                        //now get upper case/lower case statement
                                        if (i < numStringsM) {  
                                            fullRepString = fullRepString.slice(repStrings[i].length);
                                            repString = fullRepString.slice(0,fullRepString.search(/\}/)+1);
                                            fullRepString = fullRepString.slice(repString.length);
                                            
                                            //to upper case or lower case depending on statement
                                            if (isEscaped) {
                                                    returnString += original.replace(exp,repString);
                                            } else {
                                                let upperLower = (repString.search(/L/) == -1);
                                                repString = repString.replace(/[^0-9\$]+/gi,"");
                                                repString = original.replace(exp,repString);
                                                returnString += upperLower ? repString.toUpperCase() : repString.toLowerCase();
                                            }
                                        }
                                        
                                    }
                                    return returnString;
                                }
                            );
						}
					}
				}
				
				//if empty string after replacement, switch to next field
				if (data.length == 0) continue;
				
				//add prefix,bibfield,suffix to returnString, with prefix and suffix potentially another format array. 
				let presuf = bibfield[numOptions+1];
				if (presuf == null) {
					presuf = "";
				} else if (Array.isArray(presuf)) {
					presuf = applyFormat(presuf,parsedData,bibfieldsToNumbers);
					if (presuf == null) presuf = "";
				}	
				returnString += presuf;
				if (bibfield[numOptions] == false) returnString += data;    
				presuf = bibfield[numOptions+2];
				if (presuf == null) {
					presuf = "";
				} else if (Array.isArray(presuf)) {
					presuf = applyFormat(presuf,parsedData,bibfieldsToNumbers);
					if (presuf == null) presuf = "";
				}	
				returnString += presuf;
				//Indicate success by flipping req, and stop bibfield data retreival
				req = false;
				break;
			}
			
			//if no bibfield data available but required, stop the whole procedure
			if (req) {
				returnString = "";
				break;
			}
		}
		
		//return null if invalid, otherwise returnString
		return (returnString.length == 0 ? null : returnString);
	}
	
	//function to parse redirection link
	function parseRedirectionLink(parsedData,format,whiteSpaceReplacement) {
				
		//early out if parsedData not available
		if (parsedData == null || typeof(parsedData) != 'object' || format == null || !Array.isArray(format)) return null;
		
		   
		//sanitize white space replace
		if (whiteSpaceReplacement == null || typeof(whiteSpaceReplacement) != 'string') {
			whiteSpaceReplacement = "+";
		} else if (whiteSpaceReplacement.length > 1) {
			whiteSpaceReplacement = whiteSpaceReplacement.slice(0,1);
		}
				
		//parse link
		parsedData = BINParser.applyFormat(format,parsedData);
		if (parsedData != null && parsedData.length > 0) {
			parsedData = encodeIRI(parsedData.replace(/[\s]+/gi,whiteSpaceReplacement));
		} else {
			parsedData = null;
		}
		
		//return link
		return parsedData;
	}
	
	//function to wrap firstname initials into \relax command
	function relaxFirstNameInitials(firstName) {
		//get converter and constant strings
		const convertSpecialChars = BINResources.convertSpecialChars;
		const relaxString = '{\\relax ', endString = '}.'
		
		//convert name and relax
		let fullName = "", fullNameMixed = "", fullNameRelaxed = "", charIndex = 0;
		while(charIndex != -1) {
			charIndex = firstName.search(/[^{}\.\s\-\\]{2,}\./);
			if (charIndex != -1) {
				let tempName = firstName.slice(0,charIndex);
				fullNameRelaxed += tempName + relaxString
				fullName += convertSpecialChars(tempName,0) + relaxString
				fullNameMixed += convertSpecialChars(tempName,0,false,false,true) + relaxString
				firstName = firstName.slice(charIndex);
				charIndex = firstName.search(/\./);
				tempName = firstName.slice(0,charIndex);
				fullNameRelaxed += tempName + endString;
				fullName += convertSpecialChars(tempName,0) + endString;
				fullNameMixed += convertSpecialChars(tempName,0,false,false,true) + endString;
				firstName = firstName.slice(charIndex+1);
				charIndex = 0;
			} else {
				fullName += convertSpecialChars(firstName,0);
				fullNameMixed += convertSpecialChars(firstName,0,false,false,true);
				fullNameRelaxed += firstName;
			}
		}
		
		//return all 3 variants (latex,mixed,normal)
		return [fullName,fullNameMixed,fullNameRelaxed]
	}
	
	//function to parse date
	function parseDate(dateString,normalOrder) {
		
		let mode = 1, year = "", month = 0, day = 0, length = 0;
		let returnDate = { year: "", month_abbrev: "" , month_full: "", month: "" , date: "///" , day: "" };
		
		//first remove day keywords
		dateString = dateString.replace(new RegExp("[\\s\\,]*(?:" + parser.dayKeywords + ")[\\s\\,]*","gi"),"").trim();
        //first check year-month-day format
		let temp = dateString.match(/([0-9]{4})[\s]*[\-\/\.]+[\s]*([0-9]{1,2})([\s]*[\-\/\.]+[\s]*[0-9]{1,2}|[^0-9]+)/);
        if (temp == null) temp = dateString.match(/([0-9]{4})[\s]*[\-\/\.]+[\s]*([0-9]{1,2})([\s]*[\-\/\.]+[\s]*[0-9]{1,2}|[^0-9]*)/);
		if (temp == null) {
            //test standard format
            temp = dateString.match(/([0-9]{1,2}[\s]*[\-\/\.]+[\s]*|[^0-9]+)([0-9]{1,2})[\s]*[\-\/\.]+[\s]*([0-9]{2,4})/);
            //test special sequence with date range and month keywords
            if (temp == null) temp = dateString.match(new RegExp("([0-9]{1,2}[\\s]*[\\-]+[\\s]*[0-9]{1,2})[\\s]*(" + parser.monthsMatchRegExp + ")[^0-9]*([0-9]{2,4})",""));
            //convert month abbreviation and fix day range, or test more relaxed
            if (temp != null) {
                day = parseInt(temp[1].replace(/[\s]*[\-]+[\s]*.*$/gi,""));
                month = findMonthAbbreviation(temp[2]);
                if (day != null && month != 0) {
                    temp[1] = "" + day; temp[2] = "" + month
                } else {
                    day = 0; month = 0;
                }
            } else {
                temp = dateString.match(/([0-9]{1,2}[\s]*[\-\/\.]+[\s]*|[^0-9]*)([0-9]{1,2})[\s]*[\-\/\.]+[\s]*([0-9]{2,4})/);
            }
			mode = 0; //switch to signal that order is reversed
		}
		if (temp != null && (length = temp.length) > 1) {

			//assign year, month and day depending on mode and on whether normal order is assumed
			temp = sortDate(temp,mode,normalOrder);
			year = temp[0]; month = temp[1]; day = temp[2];
			
			//check for month abbreviations if still necessary and reasonable
			if (month == 0 && (dateString = "" + temp[mode == 1 ? length - 1 : 1]).search(/[a-z]/i) != -1) {
				month = findMonthAbbreviation(dateString);
			}
			
		} else {
			
			//find month via abbreviations first, then delete all letters to find day and year
			month = findMonthAbbreviation(dateString);

			//replace all non numbers by single hyphens
			dateString = dateString.replace(/[^0-9]+/gi,"-");
			//if no month abbreviation, check for regular date pattern which could have emerged due to replacing all white spaces with "-", otherwise proceed finding by finding year and day
			if (month == 0) {
				mode = 1; //reset mode
				temp = dateString.match(/([0-9]{4})[\s]*[\-]+[\s]*([0-9]{1,2})([\s]*[\-]+[\s]*[0-9]{1,2}|[^0-9]*)/);
				if (temp == null) {
					temp = dateString.match(/([0-9]{1,2}[\s]*[\-]+[\s]*|[^0-9]*)([0-9]{1,2})[\s]*[\-]+[\s]*([0-9]{4})/);
					mode = 0; //switch to signal that order is reversed
				}
				if (temp != null && (length = temp.length) > 1) {
					
					//assign year, month and day depending on mode and on whether normal order is assumed
					temp = sortDate(temp,mode,normalOrder);
					year = temp[0]; month = temp[1]; day = temp[2];
						
					//if still no month available and day <= 12, it's more likely the above number is a month and not a day
					if (month == 0 && day < 13) {
						month = day; day = 0;
					}
				} else {
					//find year, avoid years starting with 0
					year = dateString.match(/[^0-9]*([1-9][0-9]{3})[^0-9]*/);
					year = (year != null && year.length > 1) ? year[1] : "";
				}
			} else {
				//find year, avoid years starting with 0
				year = dateString.match(/[^0-9]*([1-9][0-9]{3})[^0-9]*/);
				year = (year != null && year.length > 1) ? year[1] : "";
				
				//find day
				day = dateString.match(/(?:^[0-9]{1,2}[^0-9]+|[^0-9]+[0-9]{1,2}$|[^0-9]+[0-9]{1,2}[^0-9]+)/);
				day = (day != null && day.length > 0) ? parseInt(day[0].replace(/(?:^[0]+|[^0-9])/g,"").trim(),10) : 0;
				day = (day != NaN && day < 32) ? day : 0;
			}
		}
		//save year
		if (year.length == 2) year = ("" + (new Date()).getFullYear()).slice(0,2) + year;
		returnDate["year"] = year;
		temp = "" + year + "/";
		
		//save month, add if year was added
		if (year != "" && month > 0 && month < 13) {
			returnDate["month_abbrev"] = parser.monthAbbrevs[month - 1][0];
			returnDate["month_full"] = parser.monthsFull[month -1];
			returnDate["month"] = month;
			if (month < 10) temp += "0";
			temp += month;
			month = true;
		} else {
			month = false;
		}
		temp += "/";
		
		//if month added, also add day to date and save data
		
		if (month && day > 0 && day < 32) {
			returnDate["day"] = day;
			if (day < 10) temp += "0";
			temp += day;
		}
		temp += "/";
		returnDate["date"] = temp;
		
		return returnDate;
	}
	
	//return parser, here one could add several options telling the parser what to do and what not
	return Object.freeze({
		parseFormatArray: parseFormatArray,
		parseFormatString: parseFormatString,
		applyFormat: applyFormat,
		parseRedirectionLink: parseRedirectionLink,
		validateFormatSource: validateFormatSource,
		getDateKeywords: getDateKeywords,
		parseDate: parseDate,
		parseMetaData : function(metaData, parsedData) {
						
			//state variables
			let parseState = 0;
			const parseStateFinal = 3;
			
			//temporary variables
			let length = 0, temp = "", tempTwo = "";
			
			//references to parser and resorces
			const monthAbbrevs = parser.monthAbbrevs;
			const specialAuthorNames = parser.specialAuthorNames;
			const specialAuthorNamesInitials = parser.specialAuthorNamesInitials;
			const collaborationSignals = parser.collaborationSignals;
			const htmlDecode = BINResources.htmlDecode;
			const convertSpecialChars = BINResources.convertSpecialChars;
			const asciiPunctuation = BINResources.asciiPunctuation;
			const getIsoLanguage = BINResources.getIsoLanguage;
			
			//preformat raw data including RIS
			if (parsedData["preformatting"] && (temp = BINPreformatter) != null && typeof(temp) != 'undefined') {
			
				//parse downloaded RIS and/or json if possible
				if ( ((temp = metaData["citation_download"]) != null && temp != "") || ((temp = metaData["citation_json"]) != null && temp != "") ) {
					//preformat raw download/json data if necessary
					if ( (temp = BINPreformatter.preformatRawData) != null && typeof(temp) != 'undefined') {
						temp(metaData, parser);
					}
					//check if downloaded and preprocessed data contains RIS data. If not, set empty and indicate incompatible format
					temp = metaData["citation_download"].trim();
					if (temp != "") {
						let startIndex = temp.search(/TY[\t\ ]+[\-]+[\t\ ]+[^\n]*\n/);
						let endIndex = temp.search(/ER[\t\ ]+[\-]+/);
						
						if (startIndex >= 0 && endIndex > startIndex) {
							//assign available citation RIS to bibfields
							temp = temp.slice(startIndex,endIndex);
							metaData["citation_download"] = temp.length > 0 ? temp : "";
							parseRIS(metaData, parser.bibFields, parser.risKeys);
						} else {
							//indicate failed download
							metaData["citation_download"] = "";
							metaData["citation_download_status"] = 4;
							parsedData["citation_download_status"] = 4;
						}
					}
					
					//now attempt to parse json data if available
					metaData["citation_json"] = BINSchema.parseJsonLD(metaData["citation_json"]);
				}
				
				//preformat data with dynamically loaded script
				if ((temp = BINPreformatter.preformatData) != null && typeof(temp) != 'undefined') temp(metaData, parser);

				//replace elements in bibData by all elements in parsed RIS data that remain after preformatting, runs only if downloaded data available
				mergeMetaData(metaData,metaData["citation_download"],metaData["citation_json"]);
				
			} else if ((temp = metaData["citation_json"]) != null && temp != "") {
				
				//only attempt to parse json data if available
				metaData["citation_json"] = BINSchema.parseJsonLD(metaData["citation_json"]);
				
				//merge json with other static data, giving higher precedence to json
				mergeMetaData(metaData,null,metaData["citation_json"]);
			}
			
			//delete remaining content from citation download and citation json
			metaData["citation_download"] = ""; metaData["citation_json"] = "";
			
			//now only fill bibFields of parsedData
			parsedData = parsedData.bibFields;
			
			/*---------------*/
			/*VOL/ISS/DOI/URL*/
			/*---------------*/
			
			//obtain simple properties without need to change characters to latex style
			temp = ["citation_volume","citation_issue","citation_doi","citation_url"];
			tempTwo = [9,10,15,16];
			length = temp.length;
			for (let i = 0; i<length; ++i) parsedData[tempTwo[i]] = htmlDecode(metaData[temp[i]]);
			
			//remove unnecessary characters, and keyword "Volume" from volume, "issue" from issue
			parsedData[9] = asciiPunctuation(parsedData[9],2).replace(/(?:[^\x00-\x7E]+|[\{\}]+)/g,"").replace(/volume[\:\s]*/gi,"").trim();
			parsedData[10] = asciiPunctuation(parsedData[10],2).replace(/(?:[^\x00-\x7E]+|[\{\}]+)/g,"").replace(/issue[\:\s]*/gi,"").trim();

			//doi formatting, remove any kind of initial link structure, non-numerical prefixes, and any kind of whites spaces from DOI, check if correct format
			parsedData[15] = BINResources.cleanDOI(asciiPunctuation(parsedData[15],2));
			
			//check if valid iri. If yes, convert iri to uri
			temp = parsedData[16].replace(/[\/\s]*$/,"").trim();
			temp = encodeIRI(temp);
			
			//prepend https:// if necessary
			if (temp != "" && temp.search(/^http[s]?\:\/\//) == -1) temp = "https://" + temp.trim();
			parsedData[16] = temp;
			
            /*--------------*/
			/*DOMAIN COUNTRY*/
			/*--------------*/
            parsedData[78] = BINResources.getDomainCountry(metaData["citation_top_level_domain"]);
            
			/*---------*/
			/*ISSN/ISBN*/
			/*---------*/
			
			temp = ["citation_issn","citation_isbn"];
			tempTwo = [12,44];
			length = temp.length;
			for (let i = 0; i<length; ++i) parsedData[tempTwo[i]] = htmlDecode(metaData[temp[i]]);
			     
			// sanitize issn/isbn. Correct if isbn/issn was incorrectly saved in issn/isbn bibfield! (always possible, since ISSN is always distinguishable from ISBN! 
			temp = parsedData[12];
			tempTwo = parsedData[44];
			if (temp == "") {
				temp = cleanISSN(tempTwo);
				tempTwo = cleanISBN(tempTwo);
			} else if (tempTwo == "") {
				tempTwo = cleanISBN(temp);
				temp = cleanISSN(temp);
			} else {
				temp = cleanISSN(temp);
				tempTwo = cleanISBN(tempTwo);
			}
			//reassign ISBN
			parsedData[12] = temp;
			parsedData[44] = tempTwo.isbn;
			
			//ISBN territory
			parsedData[77] = tempTwo.territory;
			
			//add hyphen-less isbn if the latter available
			tempTwo = parsedData[44];
			parsedData[50] = tempTwo.replace(/[\-]+/gi,"");
			
			/*--------------*/
			/*LANGUAGE      */
			/*--------------*/
			
			parsedData[53] = ""; parsedData[54] = ""; parsedData[55] = ""; parsedData[56] = ""; parsedData[57] = "";
			temp = getIsoLanguage(asciiPunctuation(htmlDecode(metaData["citation_language"]),2));
			if (temp != null) {
				parsedData[53] = temp.full.toLowerCase(); parsedData[54] = temp.iso1; parsedData[55] = temp.iso2t; parsedData[56] = temp.iso2b; parsedData[57] = temp.iso3;
			}
			
			/*--------------*/
			/*JOURNAL TITLE */
			/*--------------*/
			
			//set journal name and abbreviation
			temp = htmlDecode(metaData["citation_journal_title"]).trim();
			tempTwo = "";
			//proceed further if not empty
			if (temp != "") {
				//remove "The" at the beginning, and trailing dot at the end. Corrects the name in the majority of the cases.
				temp = temp.replace(/(?:^The[\ ]+|\.$)/g,"");
				
				//adjust if journal is given by domain
				tempTwo = metaData["citation_domain"] + "." + metaData["citation_top_level_domain"];
				if (tempTwo == ".") tempTwo = parsedData[16].replace(/^http[s]\:\/\/[w\.]*/gi,"").replace(/\/.*$/gi,"").trim();
				
				if (temp.toLowerCase().search(tempTwo.toLowerCase()) != -1) {
					
					//remove dot
					temp = temp.replace(/\.[^\.]*$/i,"");
					
					//capitalize
					temp = temp.slice(0,1).toUpperCase() + temp.slice(1);
				}
				
				//lookup of abbreviation in local database
				tempTwo = BINResources.findJournalAbbreviation(temp);
				
				// if not successful, lookup of abbreviation in website, try to add dots. The parsed abbreviation should always come with dots, as undotting them is a trivial task that can be handled by the popup if wanted
				if (tempTwo == "") tempTwo = standardizeJournalAbbreviation(temp,htmlDecode(metaData["citation_journal_abbrev"]));
			     
				//proper accentuation cannot be trusted, neither from the website nor from the local database
				tempTwo = restoreAccents(temp,tempTwo);
			}
			
			//set journal title, replace special characters for bibtex
			parsedData[5] = temp; parsedData[6] = convertSpecialChars(temp,0);
			parsedData[66] = convertSpecialChars(temp,0,false,false,true);
			//set journal abbreviation if available, replace special characters for bibtex
			parsedData[7] = tempTwo; parsedData[8] = convertSpecialChars(tempTwo,0);
			parsedData[67] = convertSpecialChars(tempTwo,0,false,false,true);
			//set journal abbreviation without dots
			tempTwo = tempTwo.replace(/(?:\.[\ ]+|\.$)/g," ").trim();
			parsedData[47] = tempTwo; parsedData[48] = convertSpecialChars(tempTwo,0);
			parsedData[68] = convertSpecialChars(tempTwo,0,false,false,true);
			
			/*--------------*/
			/*AUTHOR PARSING*/
			/*--------------*/
			
			//parse authors and initials for authors
			temp = htmlDecode(metaData["citation_authors"]);
			//first remove any "and"s that are likely to separate authors or first name from surname
			while (temp.search(/(?:[\;]+[\s]+and[\s]+[\;]*|[\;]*[\s]+and[\s]+[\;]+)/) != -1) {
				temp = temp.replace(/(?:[\;]+[\s]+and[\s]+[\;]*|[\;]*[\s]+and[\s]+[\;]+)/g," ; ");
			}
			while (temp.search(/(?:[\,]+[\s]+and[\s]+[\,]*|[\,]*[\s]+and[\s]+[\,]+)/) != -1) {
				temp = temp.replace(/(?:[\,]+[\s]+and[\s]+[\,]*|[\,]*[\s]+and[\s]+[\,]+)/g,", ");
			}
			temp = temp.replace(/[\s]*\;[\s\;]*\;[\s]*/g," ; ").replace(/(?:^[\s]*;[\s]*|[\s]*;[\s]*$)/g,"").trim();
			
			//now split and format each author name
			if (temp != "") {
				
				//array containing eventually the final author names
				
				temp = temp.split(/[\s]*[\;]+[\s]*/);
				//array containing final author names in bibtex format
				tempTwo = []; tempThree = []; tempFour = [];
				
				//arrays for initials
				let initials = [], initials_latex = [], initials_mixed = [], initials_relaxed = [];
				
				//loop over all array elements
				length = temp.length;
				for (let i = 0; i<length; ++i) {
					
// 					//get formatted author name, check whether collaboration
					let collaboration = (temp[i].search(collaborationSignals) != -1);
					let fullName = formatAuthorName(temp[i].replace(/[\s]*#BINCorpAuthor[\s]*/g,""),collaboration,parsedData[5],parsedData[53]);
					//if author name empty string, remove from temp and advance right away to next iteration. If object, assume collaboration
					if (fullName != null && typeof(fullName) == 'object') {
						fullName = fullName.authorName;
						collaboration = true;
					} else if (fullName.length == 0) {
						//remove element from author array if empty string
						temp.splice(i,1); 
						length--; i--;
						continue;
					}
					
					//otherwise continue with this iteration
					
					//now depending on whether collaboration, modify name for latex and extract initials
					if (collaboration) {
						temp[i] = [fullName,"",""];
						tempTwo.push(["{" + convertSpecialChars(fullName,0) +"}","",""]);
						tempThree.push(["{" + convertSpecialChars(fullName,0,false,false,true) +"}","",""]);
						tempFour.push([fullName,"",""]);
						initials.push(""); initials_latex.push(""); initials_mixed.push("");
						initials_relaxed.push("");
					} else {
						
						//split first name, surname, jr/sr
						let nameVar = fullName.split(", "), nameVarTex = [], nameVarMixed = [], nameVarRelaxed = [];
						let nameVarLength = nameVar.length;
						
						//replace special characters of surname
						nameVarTex[0] = convertSpecialChars(nameVar[0],0);
						nameVarMixed[0] = convertSpecialChars(nameVar[0],0,false,false,true);
						nameVarRelaxed[0] = nameVar[0];
						
						//continue processing if more than last name exists, otherwise put empty first name and jr/sr
						if (nameVarLength > 1) {
							
							//get first name
							let firstName = nameVar[nameVarLength - 1], charIndex = 0;
							
							//if jr, sr not available, fill up array with middle section
							if (nameVarLength < 3) {
								nameVar.push(firstName);
								nameVar[1] = "";
								nameVarLength++;
							}
							nameVarTex[1] = nameVar[1]; nameVarMixed[1] = nameVar[1]; nameVarRelaxed[1] = nameVar[1];
							
							//format first name for latex = relax initials with more than one letter, replace special characters
							fullName = relaxFirstNameInitials(firstName);
							
							nameVarTex[nameVarLength-1] = fullName[0];
							nameVarMixed[nameVarLength-1] = fullName[1];
							nameVarRelaxed[nameVarLength-1] = fullName[2];
							
							//find/generate initials from first name
							fullName = nameVar[nameVarLength-1].replace(/([^\.\s\-]+)([\.\s\-]?)/gi,
								function(match, name, lastChar, offset, original) {
									
									//if already in initial form, return immediately
									if (lastChar == ".") return match;
									
									//construct special initials for special names, or, otherwise, one letter initials
									let names = specialAuthorNames;
									let length = names.length;
									for(let j = 0; j<=length; ++j) {
										if (name == names[j]) {
											name = specialAuthorNamesInitials[j];
											break;
										} else if (j == length) {
											name = name.slice(0,1);
											break;
										}
									}
									return ("" + name + "." + lastChar);
								}
							);
							initials.push(fullName);
							
							//get initials with {\relax } command
							fullName = relaxFirstNameInitials(fullName);
							initials_latex.push(fullName[0]);
							initials_mixed.push(fullName[1]);
							initials_relaxed.push(fullName[2]);
							
						} else {
							//fill up with empty strings
							nameVar.push(""); nameVar.push("");
							nameVarTex.push(""); nameVarTex.push("");
							nameVarMixed.push(""); nameVarMixed.push("");
							nameVarRelaxed.push(""); nameVarRelaxed.push("");
							
							//empty initials
							initials.push(""); initials_latex.push(""); initials_mixed.push("");
							initials_relaxed.push("");
						}

						temp[i] = nameVar;
						tempTwo.push(nameVarTex);
						tempThree.push(nameVarMixed);
						tempFour.push(nameVarRelaxed);
					}
				}
				parsedData[3] = temp; parsedData[4] = tempTwo; parsedData[58] = tempThree; parsedData[69] = tempFour;
				parsedData[28] = initials; parsedData[29] = initials_latex; parsedData[59] = initials_mixed;
				parsedData[60] = ""; parsedData[61] = "";
				parsedData[70] = initials_relaxed;
			} else {
				parsedData[3] = []; parsedData[4] = []; parsedData[58] = []; parsedData[69] = [];
				parsedData[28] = []; parsedData[29] = []; parsedData[59] = [];
				parsedData[60] = ""; parsedData[61] = ""; parsedData[70] = [];
			}
			
			/*---------------*/
			/*TITLE/PUBLISHER*/
			/*---------------*/
			
			//obtain title. If not available, take website title convert special chars for bibtex
			temp = htmlDecode(metaData["citation_title"]);
			if (temp == "") temp = htmlDecode(metaData["citation_webpage_title"]);    
			//reduce multiple white spaces to one
			if (temp != "") temp = temp.replace(/[\ ]+/g," ");
			//replace special chars for bibtex
			parsedData[1] = temp; parsedData[2] = convertSpecialChars(temp,0,true);
			parsedData[62] = convertSpecialChars(temp,0,true,false,true);
			//check if non latex-version of title (without math mode instructions) is available. If yes, replace
			if ((temp = htmlDecode(metaData["citation_title_nonlatex"])) != "") parsedData[1] = temp;
			
			//obtain collection title
			temp = htmlDecode(metaData["citation_collection_title"]);
			//reduce multiple white spaces to one
			if (temp != "") temp = temp.replace(/[\ ]+/g," ");
			//replace special chars for bibtex, look for math mode strings
			parsedData[71] = temp; parsedData[72] = convertSpecialChars(temp,0,true);
			parsedData[73] = convertSpecialChars(temp,0,true,false,true);
			
			//obtain publisher
			temp = htmlDecode(metaData["citation_publisher"]);
			//reduce multiple white spaces to one, and remove leading "by" as well as some regular unwanted strings (copyright, registered, trademark) from publisher
			if (temp != "") temp = temp.replace(/[\ ]+/g," ").replace(/[\u00A9\u00AE\u2122]/gi,"").replace(/[^a-z0-9]*(?:all[\ ]+rights[\ ]+reserved|copyright[\ 0-9]*|published[\ ]+by|^publisher[\:]+[\s]*)[^a-z0-9]*/gi,"").replace(/^[\s]*by[\s]*/gi,"").trim();
			//replace special chars for bibtex and find shortened publisher later, after implementation of address
			parsedData[17] = temp;
			
			
			/*---------------*/
			/*KEYWORDS       */
			/*---------------*/
			
			temp = htmlDecode(metaData["citation_keywords"]);
			//trim and separate keyword list properly
			if (temp != "") temp = temp.replace(/(?:^[\s\,;]*|[\s\,;]*$)/g,"").replace(/[\s\,;]*[\,;]+[\s\,;]*/g,", ").replace(/[\s]+/g," ").trim();
			// assign to result object and replace special chars for bibtex
			parsedData[31] = temp; parsedData[32] = convertSpecialChars(temp,0);
			parsedData[64] = convertSpecialChars(temp,0,false,false,true);
			
			/*---------------*/
			/*ABSTRACT       */
			/*---------------*/
			
			// remove new lines from abstract and replace special chars for bibtex. Preserve latex math mode
			temp = htmlDecode(metaData["citation_abstract"]).trim();
			// remove "abstract/summary" from beginning
			temp = temp.replace(/^[^a-zA-Z]*(?:[Aa][Bb][Ss][Tt][Rr][Aa][Cc][Tt]|[Ss][Uu][Mm][Mm][Aa][Rr][Yy])([\.\:\;\s\-]+[A-Za-z]|[A-Z])/g,
				function(match, name, lastChar, offset, original) {
					return name.replace(/^[\.\:\;\s\-]+/gi,"").toUpperCase();
				}
			).replace(/^[\.\:\;\s\-]+/gi,"").trim();
            //remove outer brackets
            while ((tempTwo = BINResources.removeOuterBrackets(temp,"(",")")) != temp) temp = tempTwo;
			while ((tempTwo = BINResources.removeOuterBrackets(temp,"[","]")) != temp) temp = tempTwo;
            parsedData[33] = temp; parsedData[34] = convertSpecialChars(temp,0,true);
			parsedData[65] = convertSpecialChars(temp,0,true,false,true);
			
			
			
			/*---------------------*/
			/*OPEN ACCESS ARCHIVES */
			/*---------------------*/
			
			parsedData[19] = ""; //obsolete
			parsedData[20] = htmlDecode(metaData["citation_archive_id"]).trim();
			
			/*--------------*/
			/*DATABASE INFO */
			/*--------------*/
			
			parsedData[42] = htmlDecode(metaData["citation_database"]).trim();
			parsedData[43] = shortenPublisher(parsedData[42],1);
			
			/*--------*/
			/*CHANNEL */
			/*--------*/
			
			//online channel (Youtube etc.)
			parsedData[49] = htmlDecode(metaData["citation_channel"]).trim();
			
			/*------------*/
			/*ACCESS DATE */
			/*------------*/
			temp = new Date();
			parsedData[39] = temp.getDate(); //access day
			parsedData[36] = temp.getFullYear(); //access year
			
			//iso access date
			parsedData[52] = "" + temp.getFullYear() + "-";
			if ((tempTwo = (temp.getMonth() + 1)) < 10) {
				parsedData[52] += "0";
			}
			parsedData[52] += "" + tempTwo + "-";
			if ((tempTwo = temp.getDate()) < 10) {
				parsedData[52] += "0";
			}
			parsedData[52] += "" + tempTwo;
			
			
			temp = temp.getMonth();
			parsedData[38] = temp+1 //access month
			parsedData[37] = monthAbbrevs[temp][0]; //access month, abbreviation
			
			/*--------------*/
			/*DATE PARSER   */
			/*--------------*/
			
			//extract and format date
			parsedData[22] = "///";
			
			//remove hour
			temp = asciiPunctuation(htmlDecode(metaData["citation_date"]),2).replace(/^[\s\:]*/,"").replace(/(?:[\s]*[0-9]*[\s]*:[\s]*[0-9]+[\s]*|[\s]*[0-9]+[\s]*:[\s]*[0-9]*[\s]*)/g,"").trim();
			if (temp == "") { //if no date available, check if dates extracted from content are available
				temp = metaData["citation_date_content"];
				let finalDate = { year: "", month_abbrev: "", month_full: "" , month: "", date: "///" , day: "" };
				if (temp != null && Array.isArray(temp)) {
					length = temp.length;
					//check for each entry whether precontext contains key words like (published, date, last modified, and whether the date is in the past
					for (let i = 0; i<length; ++i) {
						tempTwo = temp[i];
						
						//remove possible day strings from context
						let precontext = new RegExp("[\\s\\.\\,\\:\\;\\/]+(?:" + parser.dayKeywords + ")[\\s\\.\\,\\:\\;\\/]+","i");
						precontext = asciiPunctuation(htmlDecode(tempTwo[0]),2).replace(precontext,"");
						if (precontext == "") continue;
						if (precontext.search(/(?:^|[\s\-\,\.\:\;]+)(?:published|modified|date|update[d]?|veröffentlicht|aktualisiert|datum)[\s]*(?:|on|at|am)[\s\:\.]*$/i) == -1) continue;
						tempTwo = asciiPunctuation(htmlDecode(tempTwo[1]),2).replace(/^[\s\:]*/,"").trim();
						if (tempTwo == "") continue;
						tempTwo = parseDate(tempTwo,!(metaData["citation_date_reverse"] == true));
						if (parseInt(tempTwo.year) > parseInt(parsedData[36]) || parseInt(tempTwo.month) > parseInt(parsedData[38]) || parseInt(tempTwo.day) > parseInt(new Date().getDate())) continue;
						finalDate = tempTwo;
						
						break;
					}
				}
				temp = finalDate;
			} else {
				temp = parseDate(temp,!(metaData["citation_date_reverse"] == true));
			}
			
			parsedData[13] = temp.year;
			parsedData[14] = temp.month_abbrev;
			parsedData[35] = temp.month_full;
			parsedData[46] = "" + temp.month;
			parsedData[22] = temp.date;
			
			/*--------------*/
			/*PAGES         */
			/*--------------*/
			
			//extract pages, remove n/a from first and last page
			temp = asciiPunctuation(htmlDecode(metaData["citation_firstpage"]),2).replace(/(?:n[\/]*[ao]|[\s]+|[^\x00-\x7E]+|[\{\}]+)/gi,"");
			if (temp != "") {
				let lastPage = asciiPunctuation(htmlDecode(metaData["citation_lastpage"]),2).replace(/(?:n[\/]*[ao]|[\s]+|[^\x00-\x7E]+|[\{\}]+)/gi,"");
				if (lastPage != "") {
					parsedData[11] = "" + temp;
					if (lastPage != temp) parsedData[11] += "--" + lastPage; 
					parsedData[23] = temp;
					parsedData[24] = lastPage;
				} else {
					//find if a page range is given
					lastPage = temp.match(/([0-9]+)[\-]+([0-9]+)/);
					if (lastPage != null && lastPage.length == 3) {
						parsedData[11] = "" + lastPage[1];
						parsedData[23] = lastPage[1];
						if (lastPage[1] != (lastPage = lastPage[2])) parsedData[11] += "--" + lastPage;
						parsedData[24] = lastPage;
					} else {
						parsedData[11] = temp;
						parsedData[23] = temp;
					}
				}
			}
			
			/*--------------*/
			/*MISC          */
			/*--------------*/
			
			//if not available, extract volume, issue, pages from misc. Used for scopus, sciencedirect (a bit of voodoo and hope here)
			temp = htmlDecode(metaData["citation_misc"]).trim();
			if (temp != "") {
				//get volume, issue, pages
				let bibField = 9;
				const keyPhrases = ["volume[s]*","issue[s]*","page[s]*"];
				for (let i = 0; i<3; ++i) {
					let keyPhrase = keyPhrases[i];
					if (parsedData[bibField] == "") {
						let match = temp.match(new RegExp("" + keyPhrase + "[^,;]*","i"));
						if (match != null && match.length > 0) {
							match = match[0].replace(new RegExp("(?:[\s]+|" + keyPhrase + "[^0-9]*)","gi"),"").replace(/[^A-Za-z0-9]/,"--");
							if (match.search("--") != -1) match = match.replace(/[^0-9\-]/g,"");
							parsedData[bibField] = match.replace(/[\-]*$/,"");
						}
					}
					bibField++;
				}
				// split pages into start page and end page if possible
				temp = parsedData[11];
				if (temp != "") {
					temp = temp.split("--");
					let length = 0;
					if (temp != null && (length = temp.length) > 0) {
						parsedData[23] = temp[0].trim();
						if (length > 1) {
							if ((temp = temp[1].trim()) == parsedData[23]) {
								parsedData[11] = parsedData[11].replace(/[\s]*--.*$/,"");
							}
							parsedData[24] = temp;
						}
					}
				}
			}
			
			/*--------------*/
			/*CITATION TYPE */
			/*--------------*/

			//obtain citation type
			temp = htmlDecode(metaData["citation_type"]).trim();
			if ( temp == "#BINMiscType") {
				//force misc/online
				parsedData[0] = "misc";
			} else if ( temp.search(/book/i) != -1 || parsedData[71] != "") {
				parsedData[0] = parsedData[71] == "" ? "book" : "incollection";
			} else if ( temp.search(/thesis/i) != -1 ) {
				parsedData[0] = "phdthesis";
			} else if ( parsedData[1] != "" && parsedData[3].length > 0 && (parsedData[5] != "" || parsedData[17] != "") && (parsedData[13] != "" || parsedData[15] != "") ) {
				//if ISBN available, guess book. Otherwise guess article
				parsedData[0] = (parsedData[44] != "" && parsedData[0].search(/article/i) == -1) ? "book" : "article";
			} else {
				parsedData[0] = "misc";
			}

			
			/*------------------------*/
			/*PUBLISHER-ADDRESS COMBI */
			/*------------------------*/
			
			//get latex and non-latex version of publisher
			if ((temp = htmlDecode(metaData["citation_publisher_nonlatex"])) != "") {
				temp = temp.replace(/[\ ]+/g," ").replace(/[\u00A9\u00AE\u2122]/gi,"").replace(/[^a-z0-9]*(?:all[\ ]+rights[\ ]+reserved|copyright[\ 0-9]*|published[\ ]+by|^publisher[\:]+[\s]*)[^a-z0-9]*/gi,"").replace(/^[\s]*by[\s]*/gi,"").trim();
				tempTwo = temp != "" ? temp : parsedData[17];
			} else {
				tempTwo = parsedData[17];
			}

			//for any type except article and misc, try to determine publisher address if publisher available
			if (parsedData[17] != "" && parsedData[0] != "misc" && parsedData[0] != "article") {
				
				//get address-publisher combination using several information sources
				temp = htmlDecode(metaData["citation_publisher_address"]).replace(/[\s]+/," ").trim();
				temp = BINResources.findPublisherAddressCombination(temp,parsedData[17],tempTwo,parsedData[77],metaData["citation_top_level_domain"] == "com" ? "USA" : parsedData[78]);
				
				//assign publisher
				parsedData[17] = temp.publisherNonLatex;
				tempTwo = temp.city != temp.country ? "" + temp.city + (temp.city != "" ? ", " : "") + temp.country : temp.city;
				parsedData[74] = tempTwo; parsedData[75] = convertSpecialChars(tempTwo,0,true);
				parsedData[76] = convertSpecialChars(tempTwo,0,true,false,true);
				tempTwo = temp.publisherNonLatex;
				temp = temp.publisher;
			} else {
				parsedData[74] = ""; parsedData[75] = ""; parsedData[76] = "";
				temp = parsedData[17];
			}
			
			//determine shortened form of publisher for MLA style
			parsedData[40] = shortenPublisher(tempTwo);
			
			//finally replace characters for publisher
			parsedData[18] = convertSpecialChars(temp,0,true);
			parsedData[63] = convertSpecialChars(temp,0,true,false,true);
			
			/*------------------------*/
			/*TYPE SPECIFICS          */
			/*------------------------*/
			
			//type specific rules: replace publisher by school and journal by publisher if thesis, remove pages if book (not necessary, since the whole book is cited), and website date for misc if not available otherwise
			switch (parsedData[0]) {
				case "phdthesis":
					//set publisher as school, journal as publisher, and journal as well as abbreviation empty 
					parsedData[26] = parsedData[17];
					parsedData[17] = parsedData[5];
					parsedData[5] = ""; parsedData[7] = ""; parsedData[47] = "";
					
					//repeat process for bibtex
					parsedData[27] = parsedData[18];
					parsedData[18] = parsedData[6];
					parsedData[6] = ""; parsedData[8] = ""; parsedData[48] = "";
					parsedData[60] = parsedData[63];
					parsedData[63] = parsedData[66];
					parsedData[66] = ""; parsedData[67] = ""; parsedData[68] = "";
					
					//set short form of publisher for school in MLA style
					parsedData[41] = parsedData[40];
					break;
				case "book":

					//set pages to empty
					parsedData[11] = ""; parsedData[23] = ""; parsedData[24] = "";
					break;
				case "article":
					//if date not available, guess website date as article date
					if (parsedData[13] == "") parsedData[13] = htmlDecode(metaData["citation_webpage_date"]).split("-")[0];
					//set publisher as journal if the latter not available
					if (parsedData[5] == "") {
						parsedData[5] = parsedData[17];
						parsedData[6] = parsedData[18];
						parsedData[66] = parsedData[63];
					}
					
					//set container title and abbreviation for CSL compatibility
					parsedData[80] = parsedData[5];
                    parsedData[81] = parsedData[6];
					
					break;
                case "incollection":
                    //set collection title as container title
                    parsedData[80] = parsedData[71];
                    parsedData[81] = parsedData[71];
                    break;
				case "misc":
					//if no date available
					let date;
					if (parsedData[13] == "") {
						//set year and month
						date = htmlDecode(metaData["citation_webpage_date"]).split("-");
						parsedData[13] = date[0];
						temp = parseInt(date[1]);
						parsedData[14] = monthAbbrevs[temp-1][0];
						parsedData[35] = parser.monthsFull[temp-1];
						parsedData[46] = temp;
						
						//set full date
						parsedData[22] = "" + date[0] + "/" + date[1] + "/" + date[2] + "/";
					}
					
					//set note with access date, abbreviate month
					date = "[Online; accessed " + parsedData[39] + ". " + parsedData[37];
					if (parsedData[37] != "May") date += ".";
					parsedData[25] = date + " " + parsedData[36] + "]";
					break;
			}
			
			/*--------------*/
			/*ISO_DATE      */
			/*--------------*/
			parsedData[51] = parsedData[22].replace(/\//gi,"-").replace(/(?:^[\-]*|[\-]*$)/gi,"");
			
			
			/*--------------*/
			/*BIB KEY       */
			/*--------------*/
			
			//generate default bibkey
			if((temp = parsedData[3]).length > 0) {
				if (temp[0][0].search(/\,/) != -1) {
					temp = temp[0][0].split(", ")[0].split(" ");
					temp = temp[temp.length - 1].replace(/[\s]+/g,"");
				} else {
					temp = temp[0][0].replace(/[\s]+/g,"");
				}
			} else {
				temp = "BibEntry";
			}
			//notoriously get rid of all non-ascii characters, using punycode if necessary, and restrict length
			parsedData[21] = convertSpecialChars(temp,1).slice(0,50) + parsedData[13] + parsedData[14];
			
			/*--------------*/
			/*QUERY SUMMARY */
			/*--------------*/
			parsedData[30] = metaData["query_summary"];
            
            /*--------------------*/
            /*EDITORTRANSLATORFLAG*/
            /*--------------------*/
            
            //set if editor and translator are the same, TODO currently a dummy
            parsedData[79] = "";
            
			//finish
			return;
		}
	}); //end return
}());
