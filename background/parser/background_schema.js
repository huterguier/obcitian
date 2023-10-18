const BINSchema = ( function () {
	
	//default values for sanitizer
	const parserDefaults = Object.freeze({ maxNumChars: 1024 , maxNumHits: 1 , allowHtmlTags: false , takeEverything: false });
	
	//bibfield-class specific default values for sanitizer 
	const classDefaults = 	Object.freeze([
					Object.freeze({}),
					Object.freeze({ maxNumChars: 20000 }),
					Object.freeze({ maxNumHits: 100 , takeEverything: true }),
					Object.freeze({ maxNumHits: 20 , takeEverything: true }),
					Object.freeze({ maxNumHits: 10000 }),
					Object.freeze({ maxNumHits: 20 })
				]); 
	//bibfield classes relevant for defining defaults for parsing
	const bibfieldClasses = Object.freeze({ citation_title: 0, citation_issue: 0 , citation_volume: 0 , citation_issn: 0 , citation_isbn: 0, citation_doi: 0 , citation_firstpage: 0, citation_lastpage: 0,  citation_journal_title: 0, citation_journal_abbrev: 0, citation_url: 0, citation_archive_id: 0, citation_publisher: 0, citation_date: 0, citation_url: 0 , citation_abstract: 1 , citation_misc: 2, citation_type: 3, citation_authors: 4, citation_keywords: 5});
	
	//in case the value of the property is another object, the parser needs to know which property to read
	const preferredPropertiesToRead = { person: Object.freeze([ Object.freeze(["familyName","givenName"]) , Object.freeze(["name"]), Object.freeze(["value"]) ]) , def: Object.freeze([ Object.freeze(["name"]), Object.freeze(["value"]) ]) };
	
	//function to determine schema of provided data
	function getSchema(dataSchema) {
		
		//get list of schemata
		const schemata = BINData.getSchemata();
		const length = schemata.length;
		
		//loop over all schema objects and determine if their schema strings are part of data schema string
		let schema = null;
		for (let i = 0; i<length; ++i) {
			schema = schemata[i];
			if (dataSchema.search(new RegExp("\"[\\s]*@type[\\s]*\"[\\s]*:[\\s]*\"" + schema.schema,"i")) != -1) {
				break;
			}
			schema = null;
		}
		return schema;
	}
	
	//function to sanitize
	function sanitize(input, maxNumChars, allowHtmlTags) {
		//early out
		if (input == null || typeof(input) != 'string' || input.length == 0) return "";
		//remove html tags   
		if (!allowHtmlTags) {
			input = input.replace(/<[^>]*?>/g, "");
		}
		// trim and enforce max size
		return input.trim().slice(0,maxNumChars).trim();
	}
	
	//function to read properties from json object
	function queryFromObject(query, object) {
		let returnString = "";
		
		//get properties to read
		let propsToRead = query.preferredPropertiesToRead;
		
		//if not specified in query, get from type or from default set
		if (propsToRead == null) {
			let type = object["@type"];
			if (type != null && typeof(type) == 'string' && type.length > 0) {
				propsToRead = preferredPropertiesToRead[type.toLowerCase()];
			}
			if (propsToRead == null) {
				propsToRead = preferredPropertiesToRead.def;
			}
		}
		
		//now read properties
		const numPropSets = propsToRead.length;
		for (let j = 0; j<numPropSets; ++j) {
			let propSet = propsToRead[j];
			const numProps = propSet.length;
			for (let k = 0; k<numProps; ++k) {
				let readProp = object[propSet[k]];
				//add only if elementary
				if (readProp != null) {
					
					//deal with case that read property is an array
					if (!Array.isArray(readProp)) readProp = [readProp];
					let numReadProps = readProp.length;
					for (let l = 0; l<numReadProps; ++l) {
						let curProp = readProp[l];
						let type = typeof(curProp);
						if (type == 'string' || type == 'number' || type == 'boolean') {
							curProp = "" + curProp; //stringify
							if (curProp.length > 0) {
								returnString += curProp + ", ";
							}
						}
					}
				}
			}
			returnString = returnString.replace(/[\,\s]*$/gi,"").trim();
			if (returnString.length > 0) {
				break;
			}
		}
		
		//return properties
		return returnString;
	}
	
	//bifield dependent parsing of data
	function parseToBibfield(data, queries, bibfield) {
		
		//early out
		let numQueries;
		if (queries == null || !Array.isArray(queries) || (numQueries = queries.length) == 0) {
			return "";
		}
		
		//get default parse instructions
		const instructions = { maxNumChars: parserDefaults.maxNumChars , maxNumHits: parserDefaults.maxNumHits , allowHtmlTags: parserDefaults.allowHtmlTags , takeEverything: parserDefaults.takeEverything };
		
		//overwrite by bibfield specific defaults
		const bibfieldClassDefaults = classDefaults[bibfieldClasses[bibfield]];
		Object.getOwnPropertyNames(bibfieldClassDefaults).forEach(function(property) {
			let value = bibfieldClassDefaults[property];
			if (value != null && value != "") {
				instructions[property] = value;
			}
		});
		
		//now loop over all queries in queries-array
		let returnString = "";
		for (let i = 0; i<numQueries; ++i) {
			
			//get query, overwrite instructions
			let query = queries[i];
			
			let numHits = query.maxNumHits, maxNumChars = query.maxNumChars, allowHtmlTags = query.allowHtmlTags;
			if (numHits == null) numHits = instructions.maxNumHits;
			if (maxNumChars == null) maxNumChars = instructions.maxNumChars;
			if (allowHtmlTags == null) allowHtmlTags = instructions.allowHtmlTags;

			//get property
			let prop = query.baseProperty;
			const numLevels = prop.length;
			let value = data;
			for (let j = 0; j<numLevels; ++j) {
				value = value[prop[j]];
				//if object, advance to next property, otherwise break
				if (value == null || (value != null && typeof(value) != 'object')) {
					break;
				}
			}
			
			//jump to next query if no value obtained
			if (value == null || value == "") {
				continue;
			}
			
			//now proceed depending on whether value is object, an array, or elementary (immutable)
			let toAdd = "";
			if (Array.isArray(value)) {
				let numVals = value.length;
				for (let j = 0; j<numVals && numHits > 0; ++j) {
					let val = value[j];
					if (val == null || val == "") {
						continue;
					}
					if (typeof(val) == 'object') {
						val = queryFromObject(query,val);
					}
					val = sanitize(val, maxNumChars, allowHtmlTags);
					if (val != null && val != "") {
						toAdd += val + " ; ";
						numHits--;
					}
				}
				toAdd = toAdd.replace(/[\;\s]*$/gi,"");
			} else if (typeof(value) == 'object') {
				toAdd = sanitize(queryFromObject(query,value), maxNumChars, allowHtmlTags);
			} else if (value != "") {
				toAdd = sanitize(value, maxNumChars, allowHtmlTags);
			}
			
			//add if valid
			if (toAdd != "") {
				returnString += toAdd;
				if (instructions.takeEverything) {
					returnString += " ; ";
				} else {
					break;
				}
			}
		}
		return returnString.replace(/[\;\s]*$/,"");
	}
	
	//function to parse data provided in json+ld format
	function parseJsonLD(data) {
		
		
		//early out
		if (data == null || typeof(data) != 'string' || data.length == 0) {
			return "";
		}
		
		//now split and search for matching schema
		data = data.match(/\{.*?\"[\s]*@context[\s]*\"[\s]*:.*?\}(?:[\s]+;|[\s]*$)/g);
		let length = 0, schema = null;
		if (data == null || (length = data.length) == 0) {
			data = "";
		} else {
			for (let i = 0; i<length; ++i) {
				//find valid schema
				schema = getSchema(data[i]);
				if (schema == null) continue;
				
// 				//remove unescaped single quotes
// 				let dataString = data[i], stage = true, index = -1;
// 				while ((index=dataString.indexOf("\"",index+1)) != -1) {
// 					let toAdd = 1;
// 					while (dataString.charAt(index-toAdd) == "\\") toAdd++;
// 					if (toAdd%2 == 0) continue;
// 					stage = !stage;
// 					
// 				}
				
				//if valid schema, try to parse to JSON
				let json = null;
				try {
					json = JSON.parse(data[i].replace(/[\s\;]*$/,""));
				} catch(exception) {
					//if it does not work, maybe it does so as an array
					try {
						json = "[" + data[i].replace(/[\s\;]*$/,"") + "]";
						json = JSON.parse(json);	
					} catch(exception) {
						json = null;
					}
				}
				//if not parseable, continue, otherwise assign parsed data to data and break
				if (json == null) {
					schema = null;
					continue;
				} else {
					if (Array.isArray(json)) json = json[0];
					data = json;
					break;
				}
			}
		}
		
		//early out if no schema found
		if (schema == null) return "";
		
		schema = schema.bibfields;
		//now loop over all bibfields and save into new object
		const returnObj = {};
		Object.getOwnPropertyNames(schema).forEach(function(bibfield) {
			let queries = schema[bibfield];
			returnObj[bibfield] = parseToBibfield(data, queries, bibfield);
		});
		
		//return
		return returnObj;
	}

	//return parser, here one could add several options telling the parser what to do and what not
	return Object.freeze({ parseJsonLD : parseJsonLD}); //end return
}());