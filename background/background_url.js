const BINURLMatcher = ( function () {
	
	//function called on load to ensure integrity of urlList (it is pulled from git repository, so it could contain incorrectly formatted elements), avoids redundant checks every time "getAdjusters" is called
	function checkURLList(urlList) {
		
		//array check helper-function with 
		function elemCheck(list,listEntry,idx) {
			let temp = "";
			
			//first check whether domain level is valid
			if (listEntry == null || typeof(listEntry) != 'object' || (temp = listEntry.scheme) == null || typeof(temp) != 'string' || temp.length == 0) {
				//if not a valid entry, remove from array and advance to next element
				return true;
			}
			
			//check that if preformatters/prefselectors are set, they contain valid strings. If not, remove
			if ((temp = listEntry.preformatter) == null || typeof(temp) != 'string' || temp.length == 0) {
				delete list[idx].preformatter;
			}
			if ((temp = listEntry.prefselector) == null || typeof(temp) != 'string' || temp.length == 0) {
				delete list[idx].prefselector;
			}
			//continue with same element
			return false;
		}
		
		//first check that it is an array
		if (urlList == null || !(Array.isArray(urlList))) {
			return false;
		}
		
		//now go through array and check each object
		let numElems = urlList.length;
		for (let i = 0; i<numElems; ++i) {
			let listEntry = urlList[i], temp = "", numTops = 0, numPaths = 0;
			
			//first check whether domain level is valid
			if (elemCheck(urlList,listEntry,i)) {
				//if not a valid entry, remove from array and advance to next element
				urlList.splice(i,1);
				i--; numElems--;
				continue;
			}
			
			//now check if top-level domain is valid
			let topList = listEntry.top;
			if (topList == null || ((temp = (typeof(topList) != 'string')) && !Array.isArray(topList)) || (numTops = topList.length) == 0) {
				//if not a valid entry, remove from array and advance to next element
				urlList.splice(i,1);
				i--; numElems--;
				continue;
			}
			
			//check array stored into top
			if (temp) {
				for (let j = 0; j<numTops; ++j) {
					let topEntry = topList[j], numPaths = 0;
					
					//first check whether top-domain level is valid
					if (elemCheck(topList,topEntry,j)) {
						//if not a valid entry, remove from array and advance to next element
						topList.splice(j,1);
						j--; numTops--;
						continue;
					}
					
					//now check if path is valid
					let pathList = topEntry.path;
					if (pathList != null) {
						if ( ((temp = (typeof(pathList) != 'string')) && !Array.isArray(pathList)) || (numPaths = pathList.length) == 0) {
							//if not a valid entry, remove entire top-level entry from array and advance to next element
							topList.splice(j,1);
							j--; numTops--;
							continue;
						}
						
						//check array stored into path
						if (temp) {
							//check each element
							for (let k = 0; k<numPaths; ++k) {
								if (elemCheck(pathList,pathList[k],k)) {
									//if not a valid entry, remove from array and advance to next element
									pathList.splice(k,1);
									k--; numPaths--;
								}
							}
							
							//remove entire top-element if path-array empty after checking
							if (pathList.length == 0) {
								topList.splice(j,1);
								j--; numTops--;
								continue;
							}
						}
					}
				}
				
				//remove entire element if top-array empty after checking
				if (topList.length == 0) {
					urlList.splice(i,1);
					i--; numElems--;
					continue;
				}
			}
			
			//finally check if path is valid
			let pathList = listEntry.path;
			if (pathList != null) {
				if (((temp = (typeof(pathList) != 'string')) && !Array.isArray(pathList)) || (numPaths = pathList.length) == 0) {
					//if not a valid entry, remove from array and advance to next element
					urlList.splice(i,1);
					i--; numElems--;
					continue;
				}
				
				//check array stored into path
				if (temp) {
					//check each element
					for (let k = 0; k<numPaths; ++k) {
						if (elemCheck(pathList,pathList[k],k)) {
							//if not a valid entry, remove from array and advance to next element
							pathList.splice(k,1);
							k--; numPaths--;
						}
					}
					
					//remove entire element if path-array empty after checking
					if (pathList.length == 0) {
						urlList.splice(i,1);
						i--; numElems--;
						continue;
					}
				}
			}
		}
		return true;
	}
	
	//function to match url
	function getAdjusters(url, list, prox = null, noReg = true , insens = false) {
		url = url.result;
		//return empty json object for invalid url
		if (url == null || (url = url.trim()) == "" || (url = url.replace(/[^\x00-\x7F]+/g,"")) == "" || url.search(/^http[s]?\:\/\//) == -1) {
			return null;
		} else {
			url = url.replace(/^http[s]?[\:\/]*(?:www|)[\.\-]*/,"").trim();
			if (url == "") return null;

		}
		
		//match variables keeping links to matched objects in url list
		let match = null, matchTop = null, matchPath = null;
		
		//separate url domain and path, replace all "/" in path by "-"
		const path = url.replace(/^[^\/]*[\/]+/,""); url = url.replace(/\/.*$/,"");
		
		//now take into account proxy settings
		if (prox != null && typeof(prox) == 'string' && prox != "") {
			
			//remove invalid characters from proxy
			prox = prox.toLowerCase().replace(/[^0-9a-z\-\.]/g,"").trim();
			
			if (prox != "") {
				//escape "." and "-" in proxy string if wanted
				if (noReg) prox = new RegExp(prox.replace(/[\-\.]/g,'\\$&'),"gi");
				
				//remove proxy part of url
				if (url.search(prox) != -1) {
					url = url.replace(prox,"");
					prox = true;
				} else {
					prox = false;
				}
			} else {
				prox = false;
			}
		} else {
			prox = false;
		}
		
		//trim url
		url = url.replace(/(?:^[\.\-\s]*|[\.\-\s]*$)/g,"");
		
		//set insensitivity to periods and hyphens
		insens = (prox === true && insens === true);
		
		//determine index starting from which top-level domain begins
		let num = url.lastIndexOf(".");
		if (insens) {
			prox = url.lastIndexOf("-");
			if (prox > num) num = prox;
		}
		
		//early out if no top-level or only top-level domain
		if (num < 1) return null;
		
		//separate full domain into domain and top-level domain, save top-level domain into prox variable
		prox = url.slice(num+1); url = url.slice(0,num);

		//now scan through url list until first scheme is found, make scheme insensitive to periods and hyphens if wanted
		num = list.length;
		if (insens) {
			url = url.replace(/\./g,"\-");
			for (let i = 0; i<num; ++i) {
				let listEntry = list[i];
				let scheme = listEntry.scheme.replace(/\\\./g,"\\-");
				if (url.search(new RegExp("^" + scheme + "$")) != -1) {
					match = listEntry;
					break;
				}
			}
		} else {
			for (let i = 0; i<num; ++i) {
				let listEntry = list[i];
				if (url.search(new RegExp("^" + listEntry.scheme + "$")) != -1) {
					match = listEntry;
					break;
				}
			}
		}

		//early out if no match
		if (match == null) return null;
		
		//next scan through possible top-level domains, save in list
		list = match.top;
        
		if (typeof(list) == 'string') {
			
			//if top level domain found, assign match
			if (prox.search(new RegExp("^" + list + "$","")) != -1) matchTop = list;
			
			//set flag showing whether matchTop should be taken into account or not
			list = false;
		} else {
			//go through array of top-level domains
			num = list.length;
			for (let i = 0; i<num; ++i) {
				let listEntry = list[i];
				if (prox.search(new RegExp("^" + listEntry.scheme + "$","")) != -1) {
					matchTop = listEntry;
					break;
				}
			}
			
			//set flag showing whether matchTop should be taken into account or not
			list = true;
		}
		
		//early out if no top-level match
		if (matchTop == null) return null;
        
		//finally check if path specified, save paths in insens
		insens = matchTop.path;
		if (!list || insens == null) insens = match.path;
		if (insens != null) {
			if (typeof(insens) == 'string') {
				//set matchPath if insens string is found
				if (path.search(new RegExp("^" + insens,"")) != -1) matchPath = insens;
				
				//set flag showing whether matchPath should be taken into account or not
				insens = false;
			} else {
				//go through array of top-level domains
				num = insens.length;
				for (let i = 0; i<num; ++i) {
					let listEntry = insens[i];
					if (path.search(new RegExp("^" + listEntry.scheme,"")) != -1) {
						matchPath = listEntry;
						break;
					}
				}
				
				//set flag showing whether matchPath should be taken into account or not
				insens = true;
			}
			
			//early out if no path match
			if (matchPath == null) return null;
		} else {
			//set flag showing whether matchPath should be taken into account or not
			insens = false;
		}
		
		//finally obtain preformatter and prefselector from all matches
		let preformatter = match.preformatter, prefselector = match.prefselector;
		if (preformatter == null) preformatter = ""; if (prefselector == null) prefselector = "";
		if (list) {
			let temp;
			if ((temp = matchTop.preformatter) != null) preformatter = temp;
			if ((temp = matchTop.prefselector) != null) prefselector = temp;
		}
		if (insens) {
			let temp;
			if ((temp = matchPath.preformatter) != null) preformatter = temp;
			if ((temp = matchPath.prefselector) != null) prefselector = temp;
		}
				
		//return 
		return { domain: url , top: prox , prefselector: prefselector , preformatter: preformatter };
		
	}
	
	//return adjuster function
	return Object.freeze( { getAdjusters : getAdjusters , checkURLList: checkURLList } );
}());
