const BINResources = ( function () {
	
	
	//language object
	var languageCodes = Object.freeze({
		abkhazian : Object.freeze({ full: "Abkhazian" , iso1: "ab" , iso2t: "abk" , iso2b: "abk" , iso3: "abk" }),
		ab : Object.freeze({ full: "Abkhazian" , iso1: "ab" , iso2t: "abk" , iso2b: "abk" , iso3: "abk" }),
		abk : Object.freeze({ full: "Abkhazian" , iso1: "ab" , iso2t: "abk" , iso2b: "abk" , iso3: "abk" }),
		afar : Object.freeze({ full: "Afar" , iso1: "aa" , iso2t: "aar" , iso2b: "aar" , iso3: "aar" }),
		aa : Object.freeze({ full: "Afar" , iso1: "aa" , iso2t: "aar" , iso2b: "aar" , iso3: "aar" }),
		aar : Object.freeze({ full: "Afar" , iso1: "aa" , iso2t: "aar" , iso2b: "aar" , iso3: "aar" }),
		afrikaans : Object.freeze({ full: "Afrikaans" , iso1: "af" , iso2t: "afr" , iso2b: "afr" , iso3: "afr" }),
		af : Object.freeze({ full: "Afrikaans" , iso1: "af" , iso2t: "afr" , iso2b: "afr" , iso3: "afr" }),
		afr : Object.freeze({ full: "Afrikaans" , iso1: "af" , iso2t: "afr" , iso2b: "afr" , iso3: "afr" }),
		akan : Object.freeze({ full: "Akan" , iso1: "ak" , iso2t: "aka" , iso2b: "aka" , iso3: "aka+2" }),
		ak : Object.freeze({ full: "Akan" , iso1: "ak" , iso2t: "aka" , iso2b: "aka" , iso3: "aka+2" }),
		aka : Object.freeze({ full: "Akan" , iso1: "ak" , iso2t: "aka" , iso2b: "aka" , iso3: "aka+2" }),
		albanian : Object.freeze({ full: "Albanian" , iso1: "sq" , iso2t: "sqi" , iso2b: "alb" , iso3: "sqi+4" }),
		sq : Object.freeze({ full: "Albanian" , iso1: "sq" , iso2t: "sqi" , iso2b: "alb" , iso3: "sqi+4" }),
		sqi : Object.freeze({ full: "Albanian" , iso1: "sq" , iso2t: "sqi" , iso2b: "alb" , iso3: "sqi+4" }),
		alb: Object.freeze({ full: "Albanian" , iso1: "sq" , iso2t: "sqi" , iso2b: "alb" , iso3: "sqi+4" }),
		amharic : Object.freeze({ full: "Amharic" , iso1: "am" , iso2t: "amh" , iso2b: "amh" , iso3: "amh" }),
		am : Object.freeze({ full: "Amharic" , iso1: "am" , iso2t: "amh" , iso2b: "amh" , iso3: "amh" }),
		amh : Object.freeze({ full: "Amharic" , iso1: "am" , iso2t: "amh" , iso2b: "amh" , iso3: "amh" }),
		arabic : Object.freeze({ full: "Arabic" , iso1: "ar" , iso2t: "ara" , iso2b: "ara" , iso3: "ara+29" }),
		ar : Object.freeze({ full: "Arabic" , iso1: "ar" , iso2t: "ara" , iso2b: "ara" , iso3: "ara+29" }),
		ara : Object.freeze({ full: "Arabic" , iso1: "ar" , iso2t: "ara" , iso2b: "ara" , iso3: "ara+29" }),
		aragonese : Object.freeze({ full: "Aragonese" , iso1: "an" , iso2t: "arg" , iso2b: "arg" , iso3: "arg" }),
		an : Object.freeze({ full: "Aragonese" , iso1: "an" , iso2t: "arg" , iso2b: "arg" , iso3: "arg" }),
		arg : Object.freeze({ full: "Aragonese" , iso1: "an" , iso2t: "arg" , iso2b: "arg" , iso3: "arg" }),
		armenian : Object.freeze({ full: "Armenian" , iso1: "hy" , iso2t: "hye" , iso2b: "arm" , iso3: "hye" }),
		hy : Object.freeze({ full: "Armenian" , iso1: "hy" , iso2t: "hye" , iso2b: "arm" , iso3: "hye" }),
		hye : Object.freeze({ full: "Armenian" , iso1: "hy" , iso2t: "hye" , iso2b: "arm" , iso3: "hye" }),
		arm: Object.freeze({ full: "Armenian" , iso1: "hy" , iso2t: "hye" , iso2b: "arm" , iso3: "hye" }),
		assamese : Object.freeze({ full: "Assamese" , iso1: "as" , iso2t: "asm" , iso2b: "asm" , iso3: "asm" }),
		as : Object.freeze({ full: "Assamese" , iso1: "as" , iso2t: "asm" , iso2b: "asm" , iso3: "asm" }),
		asm : Object.freeze({ full: "Assamese" , iso1: "as" , iso2t: "asm" , iso2b: "asm" , iso3: "asm" }),
		avaric : Object.freeze({ full: "Avaric" , iso1: "av" , iso2t: "ava" , iso2b: "ava" , iso3: "ava" }),
		av : Object.freeze({ full: "Avaric" , iso1: "av" , iso2t: "ava" , iso2b: "ava" , iso3: "ava" }),
		ava : Object.freeze({ full: "Avaric" , iso1: "av" , iso2t: "ava" , iso2b: "ava" , iso3: "ava" }),
		avestan : Object.freeze({ full: "Avestan" , iso1: "ae" , iso2t: "ave" , iso2b: "ave" , iso3: "ave" }),
		ae : Object.freeze({ full: "Avestan" , iso1: "ae" , iso2t: "ave" , iso2b: "ave" , iso3: "ave" }),
		ave : Object.freeze({ full: "Avestan" , iso1: "ae" , iso2t: "ave" , iso2b: "ave" , iso3: "ave" }),
		aymara : Object.freeze({ full: "Aymara" , iso1: "ay" , iso2t: "aym" , iso2b: "aym" , iso3: "aym+2" }),
		ay : Object.freeze({ full: "Aymara" , iso1: "ay" , iso2t: "aym" , iso2b: "aym" , iso3: "aym+2" }),
		aym : Object.freeze({ full: "Aymara" , iso1: "ay" , iso2t: "aym" , iso2b: "aym" , iso3: "aym+2" }),
		azerbaijani : Object.freeze({ full: "Azerbaijani" , iso1: "az" , iso2t: "aze" , iso2b: "aze" , iso3: "aze+2" }),
		az : Object.freeze({ full: "Azerbaijani" , iso1: "az" , iso2t: "aze" , iso2b: "aze" , iso3: "aze+2" }),
		aze : Object.freeze({ full: "Azerbaijani" , iso1: "az" , iso2t: "aze" , iso2b: "aze" , iso3: "aze+2" }),
		bambara : Object.freeze({ full: "Bambara" , iso1: "bm" , iso2t: "bam" , iso2b: "bam" , iso3: "bam" }),
		bm : Object.freeze({ full: "Bambara" , iso1: "bm" , iso2t: "bam" , iso2b: "bam" , iso3: "bam" }),
		bam : Object.freeze({ full: "Bambara" , iso1: "bm" , iso2t: "bam" , iso2b: "bam" , iso3: "bam" }),
		bashkir : Object.freeze({ full: "Bashkir" , iso1: "ba" , iso2t: "bak" , iso2b: "bak" , iso3: "bak" }),
		ba : Object.freeze({ full: "Bashkir" , iso1: "ba" , iso2t: "bak" , iso2b: "bak" , iso3: "bak" }),
		bak : Object.freeze({ full: "Bashkir" , iso1: "ba" , iso2t: "bak" , iso2b: "bak" , iso3: "bak" }),
		basque : Object.freeze({ full: "Basque" , iso1: "eu" , iso2t: "eus" , iso2b: "baq" , iso3: "eus" }),
		eu : Object.freeze({ full: "Basque" , iso1: "eu" , iso2t: "eus" , iso2b: "baq" , iso3: "eus" }),
		eus : Object.freeze({ full: "Basque" , iso1: "eu" , iso2t: "eus" , iso2b: "baq" , iso3: "eus" }),
		baq: Object.freeze({ full: "Basque" , iso1: "eu" , iso2t: "eus" , iso2b: "baq" , iso3: "eus" }),
		belarusian : Object.freeze({ full: "Belarusian" , iso1: "be" , iso2t: "bel" , iso2b: "bel" , iso3: "bel" }),
		be : Object.freeze({ full: "Belarusian" , iso1: "be" , iso2t: "bel" , iso2b: "bel" , iso3: "bel" }),
		bel : Object.freeze({ full: "Belarusian" , iso1: "be" , iso2t: "bel" , iso2b: "bel" , iso3: "bel" }),
		bengali : Object.freeze({ full: "Bengali" , iso1: "bn" , iso2t: "ben" , iso2b: "ben" , iso3: "ben" }),
		bn : Object.freeze({ full: "Bengali" , iso1: "bn" , iso2t: "ben" , iso2b: "ben" , iso3: "ben" }),
		ben : Object.freeze({ full: "Bengali" , iso1: "bn" , iso2t: "ben" , iso2b: "ben" , iso3: "ben" }),
		bihari: Object.freeze({ full: "Bihari languages" , iso1: "bh" , iso2t: "bih" , iso2b: "bih" , iso3: "" }),
		bh : Object.freeze({ full: "Bihari languages" , iso1: "bh" , iso2t: "bih" , iso2b: "bih" , iso3: "" }),
		bih : Object.freeze({ full: "Bihari languages" , iso1: "bh" , iso2t: "bih" , iso2b: "bih" , iso3: "" }),
		bislama : Object.freeze({ full: "Bislama" , iso1: "bi" , iso2t: "bis" , iso2b: "bis" , iso3: "bis" }),
		bi : Object.freeze({ full: "Bislama" , iso1: "bi" , iso2t: "bis" , iso2b: "bis" , iso3: "bis" }),
		bis : Object.freeze({ full: "Bislama" , iso1: "bi" , iso2t: "bis" , iso2b: "bis" , iso3: "bis" }),
		bosnian : Object.freeze({ full: "Bosnian" , iso1: "bs" , iso2t: "bos" , iso2b: "bos" , iso3: "bos" }),
		bs : Object.freeze({ full: "Bosnian" , iso1: "bs" , iso2t: "bos" , iso2b: "bos" , iso3: "bos" }),
		bos : Object.freeze({ full: "Bosnian" , iso1: "bs" , iso2t: "bos" , iso2b: "bos" , iso3: "bos" }),
		breton : Object.freeze({ full: "Breton" , iso1: "br" , iso2t: "bre" , iso2b: "bre" , iso3: "bre" }),
		br : Object.freeze({ full: "Breton" , iso1: "br" , iso2t: "bre" , iso2b: "bre" , iso3: "bre" }),
		bre : Object.freeze({ full: "Breton" , iso1: "br" , iso2t: "bre" , iso2b: "bre" , iso3: "bre" }),
		bulgarian : Object.freeze({ full: "Bulgarian" , iso1: "bg" , iso2t: "bul" , iso2b: "bul" , iso3: "bul" }),
		bg : Object.freeze({ full: "Bulgarian" , iso1: "bg" , iso2t: "bul" , iso2b: "bul" , iso3: "bul" }),
		bul : Object.freeze({ full: "Bulgarian" , iso1: "bg" , iso2t: "bul" , iso2b: "bul" , iso3: "bul" }),
		burmese : Object.freeze({ full: "Burmese" , iso1: "my" , iso2t: "mya" , iso2b: "bur" , iso3: "mya" }),
		my : Object.freeze({ full: "Burmese" , iso1: "my" , iso2t: "mya" , iso2b: "bur" , iso3: "mya" }),
		mya : Object.freeze({ full: "Burmese" , iso1: "my" , iso2t: "mya" , iso2b: "bur" , iso3: "mya" }),
		bur: Object.freeze({ full: "Burmese" , iso1: "my" , iso2t: "mya" , iso2b: "bur" , iso3: "mya" }),
		catalan : Object.freeze({ full: "Catalan" , iso1: "ca" , iso2t: "cat" , iso2b: "cat" , iso3: "cat" }),
		valencian : Object.freeze({ full: "Valencian" , iso1: "ca" , iso2t: "cat" , iso2b: "cat" , iso3: "cat" }),
		ca : Object.freeze({ full: "Catalan" , iso1: "ca" , iso2t: "cat" , iso2b: "cat" , iso3: "cat" }),
		cat : Object.freeze({ full: "Catalan" , iso1: "ca" , iso2t: "cat" , iso2b: "cat" , iso3: "cat" }),
		chamorro : Object.freeze({ full: "Chamorro" , iso1: "ch" , iso2t: "cha" , iso2b: "cha" , iso3: "cha" }),
		ch : Object.freeze({ full: "Chamorro" , iso1: "ch" , iso2t: "cha" , iso2b: "cha" , iso3: "cha" }),
		cha : Object.freeze({ full: "Chamorro" , iso1: "ch" , iso2t: "cha" , iso2b: "cha" , iso3: "cha" }),
		chechen : Object.freeze({ full: "Chechen" , iso1: "ce" , iso2t: "che" , iso2b: "che" , iso3: "che" }),
		ce : Object.freeze({ full: "Chechen" , iso1: "ce" , iso2t: "che" , iso2b: "che" , iso3: "che" }),
		che : Object.freeze({ full: "Chechen" , iso1: "ce" , iso2t: "che" , iso2b: "che" , iso3: "che" }),
		chichewa : Object.freeze({ full: "Chichewa" , iso1: "ny" , iso2t: "nya" , iso2b: "nya" , iso3: "nya" }),
		chewa : Object.freeze({ full: "Chewa" , iso1: "ny" , iso2t: "nya" , iso2b: "nya" , iso3: "nya" }),
		nyanja : Object.freeze({ full: "Nyanja" , iso1: "ny" , iso2t: "nya" , iso2b: "nya" , iso3: "nya" }),
		ny : Object.freeze({ full: "Nyanja" , iso1: "ny" , iso2t: "nya" , iso2b: "nya" , iso3: "nya" }),
		nya : Object.freeze({ full: "Nyanja" , iso1: "ny" , iso2t: "nya" , iso2b: "nya" , iso3: "nya" }),
		chinese : Object.freeze({ full: "Chinese" , iso1: "zh" , iso2t: "zho" , iso2b: "chi" , iso3: "zho+16" }),
		zh : Object.freeze({ full: "Chinese" , iso1: "zh" , iso2t: "zho" , iso2b: "chi" , iso3: "zho+16" }),
		zho : Object.freeze({ full: "Chinese" , iso1: "zh" , iso2t: "zho" , iso2b: "chi" , iso3: "zho+16" }),
		chi: Object.freeze({ full: "Chinese" , iso1: "zh" , iso2t: "zho" , iso2b: "chi" , iso3: "zho+16" }),
		chuvash : Object.freeze({ full: "Chuvash" , iso1: "cv" , iso2t: "chv" , iso2b: "chv" , iso3: "chv" }),
		cv : Object.freeze({ full: "Chuvash" , iso1: "cv" , iso2t: "chv" , iso2b: "chv" , iso3: "chv" }),
		chv : Object.freeze({ full: "Chuvash" , iso1: "cv" , iso2t: "chv" , iso2b: "chv" , iso3: "chv" }),
		cornish : Object.freeze({ full: "Cornish" , iso1: "kw" , iso2t: "cor" , iso2b: "cor" , iso3: "cor" }),
		kw : Object.freeze({ full: "Cornish" , iso1: "kw" , iso2t: "cor" , iso2b: "cor" , iso3: "cor" }),
		cor : Object.freeze({ full: "Cornish" , iso1: "kw" , iso2t: "cor" , iso2b: "cor" , iso3: "cor" }),
		corsican : Object.freeze({ full: "Corsican" , iso1: "co" , iso2t: "cos" , iso2b: "cos" , iso3: "cos" }),
		co : Object.freeze({ full: "Corsican" , iso1: "co" , iso2t: "cos" , iso2b: "cos" , iso3: "cos" }),
		cos : Object.freeze({ full: "Corsican" , iso1: "co" , iso2t: "cos" , iso2b: "cos" , iso3: "cos" }),
		cree : Object.freeze({ full: "Cree" , iso1: "cr" , iso2t: "cre" , iso2b: "cre" , iso3: "cre+6" }),
		cr : Object.freeze({ full: "Cree" , iso1: "cr" , iso2t: "cre" , iso2b: "cre" , iso3: "cre+6" }),
		cre : Object.freeze({ full: "Cree" , iso1: "cr" , iso2t: "cre" , iso2b: "cre" , iso3: "cre+6" }),
		croatian : Object.freeze({ full: "Croatian" , iso1: "hr" , iso2t: "hrv" , iso2b: "hrv" , iso3: "hrv" }),
		hr : Object.freeze({ full: "Croatian" , iso1: "hr" , iso2t: "hrv" , iso2b: "hrv" , iso3: "hrv" }),
		hrv : Object.freeze({ full: "Croatian" , iso1: "hr" , iso2t: "hrv" , iso2b: "hrv" , iso3: "hrv" }),
		czech : Object.freeze({ full: "Czech" , iso1: "cs" , iso2t: "ces" , iso2b: "cze" , iso3: "ces" }),
		cs : Object.freeze({ full: "Czech" , iso1: "cs" , iso2t: "ces" , iso2b: "cze" , iso3: "ces" }),
		ces : Object.freeze({ full: "Czech" , iso1: "cs" , iso2t: "ces" , iso2b: "cze" , iso3: "ces" }),
		cze: Object.freeze({ full: "Czech" , iso1: "cs" , iso2t: "ces" , iso2b: "cze" , iso3: "ces" }),
		danish : Object.freeze({ full: "Danish" , iso1: "da" , iso2t: "dan" , iso2b: "dan" , iso3: "dan" }),
		da : Object.freeze({ full: "Danish" , iso1: "da" , iso2t: "dan" , iso2b: "dan" , iso3: "dan" }),
		dan : Object.freeze({ full: "Danish" , iso1: "da" , iso2t: "dan" , iso2b: "dan" , iso3: "dan" }),
		divehi : Object.freeze({ full: "Divehi" , iso1: "div" , iso2t: "div" , iso2b: "div" , iso3: "" }),
		dhivehi : Object.freeze({ full: "Dhivehi" , iso1: "div" , iso2t: "div" , iso2b: "div" , iso3: "" }),
		maldivian : Object.freeze({ full: "Maldivian" , iso1: "div" , iso2t: "div" , iso2b: "div" , iso3: "" }),
		div : Object.freeze({ full: "Divehi" , iso1: "div" , iso2t: "div" , iso2b: "div" , iso3: "" }),
		div : Object.freeze({ full: "Divehi" , iso1: "div" , iso2t: "div" , iso2b: "div" , iso3: "" }),
		dutch : Object.freeze({ full: "Dutch" , iso1: "nl" , iso2t: "nld" , iso2b: "dut" , iso3: "nld" }),
		flemish : Object.freeze({ full: "Flemish" , iso1: "nl" , iso2t: "nld" , iso2b: "dut" , iso3: "nld" }),
		nl : Object.freeze({ full: "Dutch" , iso1: "nl" , iso2t: "nld" , iso2b: "dut" , iso3: "nld" }),
		nld : Object.freeze({ full: "Dutch" , iso1: "nl" , iso2t: "nld" , iso2b: "dut" , iso3: "nld" }),
		dut: Object.freeze({ full: "Dutch" , iso1: "nl" , iso2t: "nld" , iso2b: "dut" , iso3: "nld" }),
		dzongkha : Object.freeze({ full: "Dzongkha" , iso1: "dz" , iso2t: "dzo" , iso2b: "dzo" , iso3: "dzo" }),
		dz : Object.freeze({ full: "Dzongkha" , iso1: "dz" , iso2t: "dzo" , iso2b: "dzo" , iso3: "dzo" }),
		dzo : Object.freeze({ full: "Dzongkha" , iso1: "dz" , iso2t: "dzo" , iso2b: "dzo" , iso3: "dzo" }),
		english : Object.freeze({ full: "English" , iso1: "en" , iso2t: "eng" , iso2b: "eng" , iso3: "eng" }),
		en : Object.freeze({ full: "English" , iso1: "en" , iso2t: "eng" , iso2b: "eng" , iso3: "eng" }),
		eng : Object.freeze({ full: "English" , iso1: "en" , iso2t: "eng" , iso2b: "eng" , iso3: "eng" }),
		esperanto : Object.freeze({ full: "Esperanto" , iso1: "eo" , iso2t: "epo" , iso2b: "epo" , iso3: "epo" }),
		eo : Object.freeze({ full: "Esperanto" , iso1: "eo" , iso2t: "epo" , iso2b: "epo" , iso3: "epo" }),
		epo : Object.freeze({ full: "Esperanto" , iso1: "eo" , iso2t: "epo" , iso2b: "epo" , iso3: "epo" }),
		estonian : Object.freeze({ full: "Estonian" , iso1: "et" , iso2t: "est" , iso2b: "est" , iso3: "est+2" }),
		et : Object.freeze({ full: "Estonian" , iso1: "et" , iso2t: "est" , iso2b: "est" , iso3: "est+2" }),
		est : Object.freeze({ full: "Estonian" , iso1: "et" , iso2t: "est" , iso2b: "est" , iso3: "est+2" }),
		ewe : Object.freeze({ full: "Ewe" , iso1: "ee" , iso2t: "ewe" , iso2b: "ewe" , iso3: "ewe" }),
		ee : Object.freeze({ full: "Ewe" , iso1: "ee" , iso2t: "ewe" , iso2b: "ewe" , iso3: "ewe" }),
		ewe : Object.freeze({ full: "Ewe" , iso1: "ee" , iso2t: "ewe" , iso2b: "ewe" , iso3: "ewe" }),
		faroese : Object.freeze({ full: "Faroese" , iso1: "fo" , iso2t: "fao" , iso2b: "fao" , iso3: "fao" }),
		fo : Object.freeze({ full: "Faroese" , iso1: "fo" , iso2t: "fao" , iso2b: "fao" , iso3: "fao" }),
		fao : Object.freeze({ full: "Faroese" , iso1: "fo" , iso2t: "fao" , iso2b: "fao" , iso3: "fao" }),
		fijian : Object.freeze({ full: "Fijian" , iso1: "fj" , iso2t: "fij" , iso2b: "fij" , iso3: "fij" }),
		fj : Object.freeze({ full: "Fijian" , iso1: "fj" , iso2t: "fij" , iso2b: "fij" , iso3: "fij" }),
		fij : Object.freeze({ full: "Fijian" , iso1: "fj" , iso2t: "fij" , iso2b: "fij" , iso3: "fij" }),
		finnish : Object.freeze({ full: "Finnish" , iso1: "fi" , iso2t: "fin" , iso2b: "fin" , iso3: "fin" }),
		fi : Object.freeze({ full: "Finnish" , iso1: "fi" , iso2t: "fin" , iso2b: "fin" , iso3: "fin" }),
		fin : Object.freeze({ full: "Finnish" , iso1: "fi" , iso2t: "fin" , iso2b: "fin" , iso3: "fin" }),
		french : Object.freeze({ full: "French" , iso1: "fr" , iso2t: "fra" , iso2b: "fre" , iso3: "fra" }),
		fr : Object.freeze({ full: "French" , iso1: "fr" , iso2t: "fra" , iso2b: "fre" , iso3: "fra" }),
		fra : Object.freeze({ full: "French" , iso1: "fr" , iso2t: "fra" , iso2b: "fre" , iso3: "fra" }),
		fre: Object.freeze({ full: "French" , iso1: "fr" , iso2t: "fra" , iso2b: "fre" , iso3: "fra" }),
		fulah : Object.freeze({ full: "Fulah" , iso1: "ff" , iso2t: "ful" , iso2b: "ful" , iso3: "ful+9" }),
		ff : Object.freeze({ full: "Fulah" , iso1: "ff" , iso2t: "ful" , iso2b: "ful" , iso3: "ful+9" }),
		ful : Object.freeze({ full: "Fulah" , iso1: "ff" , iso2t: "ful" , iso2b: "ful" , iso3: "ful+9" }),
		galician : Object.freeze({ full: "Galician" , iso1: "gl" , iso2t: "glg" , iso2b: "glg" , iso3: "glg" }),
		gl : Object.freeze({ full: "Galician" , iso1: "gl" , iso2t: "glg" , iso2b: "glg" , iso3: "glg" }),
		glg : Object.freeze({ full: "Galician" , iso1: "gl" , iso2t: "glg" , iso2b: "glg" , iso3: "glg" }),
		georgian : Object.freeze({ full: "Georgian" , iso1: "ka" , iso2t: "kat" , iso2b: "geo" , iso3: "kat" }),
		ka : Object.freeze({ full: "Georgian" , iso1: "ka" , iso2t: "kat" , iso2b: "geo" , iso3: "kat" }),
		kat : Object.freeze({ full: "Georgian" , iso1: "ka" , iso2t: "kat" , iso2b: "geo" , iso3: "kat" }),
		geo: Object.freeze({ full: "Georgian" , iso1: "ka" , iso2t: "kat" , iso2b: "geo" , iso3: "kat" }),
		german : Object.freeze({ full: "German" , iso1: "de" , iso2t: "deu" , iso2b: "ger" , iso3: "deu" }),
		de : Object.freeze({ full: "German" , iso1: "de" , iso2t: "deu" , iso2b: "ger" , iso3: "deu" }),
		deu : Object.freeze({ full: "German" , iso1: "de" , iso2t: "deu" , iso2b: "ger" , iso3: "deu" }),
		ger: Object.freeze({ full: "German" , iso1: "de" , iso2t: "deu" , iso2b: "ger" , iso3: "deu" }),
		greek : Object.freeze({ full: "Greek" , iso1: "el" , iso2t: "ell" , iso2b: "gre" , iso3: "ell" }),
		el : Object.freeze({ full: "Greek" , iso1: "el" , iso2t: "ell" , iso2b: "gre" , iso3: "ell" }),
		ell : Object.freeze({ full: "Greek" , iso1: "el" , iso2t: "ell" , iso2b: "gre" , iso3: "ell" }),
		gre: Object.freeze({ full: "Greek" , iso1: "el" , iso2t: "ell" , iso2b: "gre" , iso3: "ell" }),
		guarani : Object.freeze({ full: "Guarani" , iso1: "gn" , iso2t: "grn" , iso2b: "grn" , iso3: "grn+5" }),
		gn : Object.freeze({ full: "Guarani" , iso1: "gn" , iso2t: "grn" , iso2b: "grn" , iso3: "grn+5" }),
		grn : Object.freeze({ full: "Guarani" , iso1: "gn" , iso2t: "grn" , iso2b: "grn" , iso3: "grn+5" }),
		gujarati : Object.freeze({ full: "Gujarati" , iso1: "gu" , iso2t: "guj" , iso2b: "guj" , iso3: "guj" }),
		gu : Object.freeze({ full: "Gujarati" , iso1: "gu" , iso2t: "guj" , iso2b: "guj" , iso3: "guj" }),
		guj : Object.freeze({ full: "Gujarati" , iso1: "gu" , iso2t: "guj" , iso2b: "guj" , iso3: "guj" }),
		haitian : Object.freeze({ full: "Haitian" , iso1: "ht" , iso2t: "hat" , iso2b: "hat" , iso3: "hat" }),
		haitiancreole : Object.freeze({ full: "Haitian Creole" , iso1: "ht" , iso2t: "hat" , iso2b: "hat" , iso3: "hat" }),
		ht : Object.freeze({ full: "Haitian" , iso1: "ht" , iso2t: "hat" , iso2b: "hat" , iso3: "hat" }),
		hat : Object.freeze({ full: "Haitian" , iso1: "ht" , iso2t: "hat" , iso2b: "hat" , iso3: "hat" }),
		hausa : Object.freeze({ full: "Hausa" , iso1: "ha" , iso2t: "hau" , iso2b: "hau" , iso3: "hau" }),
		ha : Object.freeze({ full: "Hausa" , iso1: "ha" , iso2t: "hau" , iso2b: "hau" , iso3: "hau" }),
		hau : Object.freeze({ full: "Hausa" , iso1: "ha" , iso2t: "hau" , iso2b: "hau" , iso3: "hau" }),
		hebrew : Object.freeze({ full: "Hebrew" , iso1: "he" , iso2t: "heb" , iso2b: "heb" , iso3: "heb" }),
		he : Object.freeze({ full: "Hebrew" , iso1: "he" , iso2t: "heb" , iso2b: "heb" , iso3: "heb" }),
		heb : Object.freeze({ full: "Hebrew" , iso1: "he" , iso2t: "heb" , iso2b: "heb" , iso3: "heb" }),
		herero : Object.freeze({ full: "Herero" , iso1: "hz" , iso2t: "her" , iso2b: "her" , iso3: "her" }),
		hz : Object.freeze({ full: "Herero" , iso1: "hz" , iso2t: "her" , iso2b: "her" , iso3: "her" }),
		her : Object.freeze({ full: "Herero" , iso1: "hz" , iso2t: "her" , iso2b: "her" , iso3: "her" }),
		hindi : Object.freeze({ full: "Hindi" , iso1: "hi" , iso2t: "hin" , iso2b: "hin" , iso3: "hin" }),
		hi : Object.freeze({ full: "Hindi" , iso1: "hi" , iso2t: "hin" , iso2b: "hin" , iso3: "hin" }),
		hin : Object.freeze({ full: "Hindi" , iso1: "hi" , iso2t: "hin" , iso2b: "hin" , iso3: "hin" }),
		hirimotu : Object.freeze({ full: "Hiri Motu" , iso1: "ho" , iso2t: "hmo" , iso2b: "hmo" , iso3: "hmo" }),
		ho : Object.freeze({ full: "Hiri Motu" , iso1: "ho" , iso2t: "hmo" , iso2b: "hmo" , iso3: "hmo" }),
		hmo : Object.freeze({ full: "Hiri Motu" , iso1: "ho" , iso2t: "hmo" , iso2b: "hmo" , iso3: "hmo" }),
		hungarian : Object.freeze({ full: "Hungarian" , iso1: "hu" , iso2t: "hun" , iso2b: "hun" , iso3: "hun" }),
		hu : Object.freeze({ full: "Hungarian" , iso1: "hu" , iso2t: "hun" , iso2b: "hun" , iso3: "hun" }),
		hun : Object.freeze({ full: "Hungarian" , iso1: "hu" , iso2t: "hun" , iso2b: "hun" , iso3: "hun" }),
		interlingua : Object.freeze({ full: "Interlingua" , iso1: "ia" , iso2t: "ina" , iso2b: "ina" , iso3: "ina" }),
		ia : Object.freeze({ full: "Interlingua" , iso1: "ia" , iso2t: "ina" , iso2b: "ina" , iso3: "ina" }),
		ina : Object.freeze({ full: "Interlingua" , iso1: "ia" , iso2t: "ina" , iso2b: "ina" , iso3: "ina" }),
		indonesian : Object.freeze({ full: "Indonesian" , iso1: "id" , iso2t: "ind" , iso2b: "ind" , iso3: "ind" }),
		id : Object.freeze({ full: "Indonesian" , iso1: "id" , iso2t: "ind" , iso2b: "ind" , iso3: "ind" }),
		ind : Object.freeze({ full: "Indonesian" , iso1: "id" , iso2t: "ind" , iso2b: "ind" , iso3: "ind" }),
		interlingue : Object.freeze({ full: "Interlingue" , iso1: "ie" , iso2t: "ile" , iso2b: "ile" , iso3: "ile" }),
		occidental : Object.freeze({ full: "Occidental" , iso1: "ie" , iso2t: "ile" , iso2b: "ile" , iso3: "ile" }),
		ie : Object.freeze({ full: "Interlingue" , iso1: "ie" , iso2t: "ile" , iso2b: "ile" , iso3: "ile" }),
		ile : Object.freeze({ full: "Interlingue" , iso1: "ie" , iso2t: "ile" , iso2b: "ile" , iso3: "ile" }),
		irish : Object.freeze({ full: "Irish" , iso1: "ga" , iso2t: "gle" , iso2b: "gle" , iso3: "gle" }),
		ga : Object.freeze({ full: "Irish" , iso1: "ga" , iso2t: "gle" , iso2b: "gle" , iso3: "gle" }),
		gle : Object.freeze({ full: "Irish" , iso1: "ga" , iso2t: "gle" , iso2b: "gle" , iso3: "gle" }),
		igbo : Object.freeze({ full: "Igbo" , iso1: "ig" , iso2t: "ibo" , iso2b: "ibo" , iso3: "ibo" }),
		ig : Object.freeze({ full: "Igbo" , iso1: "ig" , iso2t: "ibo" , iso2b: "ibo" , iso3: "ibo" }),
		ibo : Object.freeze({ full: "Igbo" , iso1: "ig" , iso2t: "ibo" , iso2b: "ibo" , iso3: "ibo" }),
		inupiaq : Object.freeze({ full: "Inupiaq" , iso1: "ik" , iso2t: "ipk" , iso2b: "ipk" , iso3: "ipk+2" }),
		ik : Object.freeze({ full: "Inupiaq" , iso1: "ik" , iso2t: "ipk" , iso2b: "ipk" , iso3: "ipk+2" }),
		ipk : Object.freeze({ full: "Inupiaq" , iso1: "ik" , iso2t: "ipk" , iso2b: "ipk" , iso3: "ipk+2" }),
		ido : Object.freeze({ full: "Ido" , iso1: "io" , iso2t: "ido" , iso2b: "ido" , iso3: "ido" }),
		io : Object.freeze({ full: "Ido" , iso1: "io" , iso2t: "ido" , iso2b: "ido" , iso3: "ido" }),
		ido : Object.freeze({ full: "Ido" , iso1: "io" , iso2t: "ido" , iso2b: "ido" , iso3: "ido" }),
		icelandic : Object.freeze({ full: "Icelandic" , iso1: "is" , iso2t: "isl" , iso2b: "ice" , iso3: "isl" }),
		is : Object.freeze({ full: "Icelandic" , iso1: "is" , iso2t: "isl" , iso2b: "ice" , iso3: "isl" }),
		isl : Object.freeze({ full: "Icelandic" , iso1: "is" , iso2t: "isl" , iso2b: "ice" , iso3: "isl" }),
		ice: Object.freeze({ full: "Icelandic" , iso1: "is" , iso2t: "isl" , iso2b: "ice" , iso3: "isl" }),
		italian : Object.freeze({ full: "Italian" , iso1: "it" , iso2t: "ita" , iso2b: "ita" , iso3: "ita" }),
		it : Object.freeze({ full: "Italian" , iso1: "it" , iso2t: "ita" , iso2b: "ita" , iso3: "ita" }),
		ita : Object.freeze({ full: "Italian" , iso1: "it" , iso2t: "ita" , iso2b: "ita" , iso3: "ita" }),
		inuktitut : Object.freeze({ full: "Inuktitut" , iso1: "iu" , iso2t: "iku" , iso2b: "iku" , iso3: "iku+2" }),
		iu : Object.freeze({ full: "Inuktitut" , iso1: "iu" , iso2t: "iku" , iso2b: "iku" , iso3: "iku+2" }),
		iku : Object.freeze({ full: "Inuktitut" , iso1: "iu" , iso2t: "iku" , iso2b: "iku" , iso3: "iku+2" }),
		japanese : Object.freeze({ full: "Japanese" , iso1: "ja" , iso2t: "jpn" , iso2b: "jpn" , iso3: "jpn" }),
		ja : Object.freeze({ full: "Japanese" , iso1: "ja" , iso2t: "jpn" , iso2b: "jpn" , iso3: "jpn" }),
		jpn : Object.freeze({ full: "Japanese" , iso1: "ja" , iso2t: "jpn" , iso2b: "jpn" , iso3: "jpn" }),
		javanese : Object.freeze({ full: "Javanese" , iso1: "jv" , iso2t: "jav" , iso2b: "jav" , iso3: "jav" }),
		jv : Object.freeze({ full: "Javanese" , iso1: "jv" , iso2t: "jav" , iso2b: "jav" , iso3: "jav" }),
		jav : Object.freeze({ full: "Javanese" , iso1: "jv" , iso2t: "jav" , iso2b: "jav" , iso3: "jav" }),
		kalaallisut : Object.freeze({ full: "Kalaallisut" , iso1: "kl" , iso2t: "kal" , iso2b: "kal" , iso3: "kal" }),
		greenlandic : Object.freeze({ full: "Greenlandic" , iso1: "kl" , iso2t: "kal" , iso2b: "kal" , iso3: "kal" }),
		kl : Object.freeze({ full: "Kalaallisut" , iso1: "kl" , iso2t: "kal" , iso2b: "kal" , iso3: "kal" }),
		kal : Object.freeze({ full: "Kalaallisut" , iso1: "kl" , iso2t: "kal" , iso2b: "kal" , iso3: "kal" }),
		kannada : Object.freeze({ full: "Kannada" , iso1: "kn" , iso2t: "kan" , iso2b: "kan" , iso3: "kan" }),
		kn : Object.freeze({ full: "Kannada" , iso1: "kn" , iso2t: "kan" , iso2b: "kan" , iso3: "kan" }),
		kan : Object.freeze({ full: "Kannada" , iso1: "kn" , iso2t: "kan" , iso2b: "kan" , iso3: "kan" }),
		kanuri : Object.freeze({ full: "Kanuri" , iso1: "kr" , iso2t: "kau" , iso2b: "kau" , iso3: "kau+3" }),
		kr : Object.freeze({ full: "Kanuri" , iso1: "kr" , iso2t: "kau" , iso2b: "kau" , iso3: "kau+3" }),
		kau : Object.freeze({ full: "Kanuri" , iso1: "kr" , iso2t: "kau" , iso2b: "kau" , iso3: "kau+3" }),
		kashmiri : Object.freeze({ full: "Kashmiri" , iso1: "ks" , iso2t: "kas" , iso2b: "kas" , iso3: "kas" }),
		ks : Object.freeze({ full: "Kashmiri" , iso1: "ks" , iso2t: "kas" , iso2b: "kas" , iso3: "kas" }),
		kas : Object.freeze({ full: "Kashmiri" , iso1: "ks" , iso2t: "kas" , iso2b: "kas" , iso3: "kas" }),
		kazakh : Object.freeze({ full: "Kazakh" , iso1: "kk" , iso2t: "kaz" , iso2b: "kaz" , iso3: "kaz" }),
		kk : Object.freeze({ full: "Kazakh" , iso1: "kk" , iso2t: "kaz" , iso2b: "kaz" , iso3: "kaz" }),
		kaz : Object.freeze({ full: "Kazakh" , iso1: "kk" , iso2t: "kaz" , iso2b: "kaz" , iso3: "kaz" }),
		centralkhmer : Object.freeze({ full: "Central Khmer" , iso1: "km" , iso2t: "khm" , iso2b: "khm" , iso3: "khm" }),
		km : Object.freeze({ full: "Central Khmer" , iso1: "km" , iso2t: "khm" , iso2b: "khm" , iso3: "khm" }),
		khm : Object.freeze({ full: "Central Khmer" , iso1: "km" , iso2t: "khm" , iso2b: "khm" , iso3: "khm" }),
		kikuyu : Object.freeze({ full: "Kikuyu" , iso1: "ki" , iso2t: "kik" , iso2b: "kik" , iso3: "kik" }),
		gikuyu : Object.freeze({ full: "Gikuyu" , iso1: "ki" , iso2t: "kik" , iso2b: "kik" , iso3: "kik" }),
		ki : Object.freeze({ full: "Kikuyu" , iso1: "ki" , iso2t: "kik" , iso2b: "kik" , iso3: "kik" }),
		kik : Object.freeze({ full: "Kikuyu" , iso1: "ki" , iso2t: "kik" , iso2b: "kik" , iso3: "kik" }),
		kinyarwanda : Object.freeze({ full: "Kinyarwanda" , iso1: "rw" , iso2t: "kin" , iso2b: "kin" , iso3: "kin" }),
		rw : Object.freeze({ full: "Kinyarwanda" , iso1: "rw" , iso2t: "kin" , iso2b: "kin" , iso3: "kin" }),
		kin : Object.freeze({ full: "Kinyarwanda" , iso1: "rw" , iso2t: "kin" , iso2b: "kin" , iso3: "kin" }),
		kirghiz : Object.freeze({ full: "Kirghiz" , iso1: "ky" , iso2t: "kir" , iso2b: "kir" , iso3: "kir" }),
		kyrgyz : Object.freeze({ full: "Kyrgyz" , iso1: "ky" , iso2t: "kir" , iso2b: "kir" , iso3: "kir" }),
		ky : Object.freeze({ full: "Kyrgyz" , iso1: "ky" , iso2t: "kir" , iso2b: "kir" , iso3: "kir" }),
		kir : Object.freeze({ full: "Kirghiz" , iso1: "ky" , iso2t: "kir" , iso2b: "kir" , iso3: "kir" }),
		komi : Object.freeze({ full: "Komi" , iso1: "kv" , iso2t: "kom" , iso2b: "kom" , iso3: "kom+2" }),
		kv : Object.freeze({ full: "Komi" , iso1: "kv" , iso2t: "kom" , iso2b: "kom" , iso3: "kom+2" }),
		kom : Object.freeze({ full: "Komi" , iso1: "kv" , iso2t: "kom" , iso2b: "kom" , iso3: "kom+2" }),
		kongo : Object.freeze({ full: "Kongo" , iso1: "kg" , iso2t: "kon" , iso2b: "kon" , iso3: "kon+3" }),
		kg : Object.freeze({ full: "Kongo" , iso1: "kg" , iso2t: "kon" , iso2b: "kon" , iso3: "kon+3" }),
		kon : Object.freeze({ full: "Kongo" , iso1: "kg" , iso2t: "kon" , iso2b: "kon" , iso3: "kon+3" }),
		korean : Object.freeze({ full: "Korean" , iso1: "ko" , iso2t: "kor" , iso2b: "kor" , iso3: "kor" }),
		ko : Object.freeze({ full: "Korean" , iso1: "ko" , iso2t: "kor" , iso2b: "kor" , iso3: "kor" }),
		kor : Object.freeze({ full: "Korean" , iso1: "ko" , iso2t: "kor" , iso2b: "kor" , iso3: "kor" }),
		kurdish : Object.freeze({ full: "Kurdish" , iso1: "ku" , iso2t: "kur" , iso2b: "kur" , iso3: "kur+3" }),
		ku : Object.freeze({ full: "Kurdish" , iso1: "ku" , iso2t: "kur" , iso2b: "kur" , iso3: "kur+3" }),
		kur : Object.freeze({ full: "Kurdish" , iso1: "ku" , iso2t: "kur" , iso2b: "kur" , iso3: "kur+3" }),
		kuanyama : Object.freeze({ full: "Kuanyama" , iso1: "kj" , iso2t: "kua" , iso2b: "kua" , iso3: "kua" }),
		kwanyama : Object.freeze({ full: "Kwanyama" , iso1: "kj" , iso2t: "kua" , iso2b: "kua" , iso3: "kua" }),
		kj : Object.freeze({ full: "Kuanyama" , iso1: "kj" , iso2t: "kua" , iso2b: "kua" , iso3: "kua" }),
		kua : Object.freeze({ full: "Kuanyama" , iso1: "kj" , iso2t: "kua" , iso2b: "kua" , iso3: "kua" }),
		latin : Object.freeze({ full: "Latin" , iso1: "la" , iso2t: "lat" , iso2b: "lat" , iso3: "lat" }),
		la : Object.freeze({ full: "Latin" , iso1: "la" , iso2t: "lat" , iso2b: "lat" , iso3: "lat" }),
		lat : Object.freeze({ full: "Latin" , iso1: "la" , iso2t: "lat" , iso2b: "lat" , iso3: "lat" }),
		luxembourgish : Object.freeze({ full: "Luxembourgish" , iso1: "lb" , iso2t: "ltz" , iso2b: "ltz" , iso3: "ltz" }),
		letzeburgesch : Object.freeze({ full: "Letzeburgesch" , iso1: "lb" , iso2t: "ltz" , iso2b: "ltz" , iso3: "ltz" }),
		lb : Object.freeze({ full: "Luxembourgish" , iso1: "lb" , iso2t: "ltz" , iso2b: "ltz" , iso3: "ltz" }),
		ltz : Object.freeze({ full: "Letzeburgesch" , iso1: "lb" , iso2t: "ltz" , iso2b: "ltz" , iso3: "ltz" }),
		ganda : Object.freeze({ full: "Ganda" , iso1: "lg" , iso2t: "lug" , iso2b: "lug" , iso3: "lug" }),
		lg : Object.freeze({ full: "Ganda" , iso1: "lg" , iso2t: "lug" , iso2b: "lug" , iso3: "lug" }),
		lug : Object.freeze({ full: "Ganda" , iso1: "lg" , iso2t: "lug" , iso2b: "lug" , iso3: "lug" }),
		limburgan : Object.freeze({ full: "Limburgan" , iso1: "li" , iso2t: "lim" , iso2b: "lim" , iso3: "lim" }),
		limburger : Object.freeze({ full: "Limburger" , iso1: "li" , iso2t: "lim" , iso2b: "lim" , iso3: "lim" }),
		limburgish : Object.freeze({ full: "Limburgish" , iso1: "li" , iso2t: "lim" , iso2b: "lim" , iso3: "lim" }),
		li : Object.freeze({ full: "Limburgan" , iso1: "li" , iso2t: "lim" , iso2b: "lim" , iso3: "lim" }),
		lim : Object.freeze({ full: "Limburgan" , iso1: "li" , iso2t: "lim" , iso2b: "lim" , iso3: "lim" }),
		lingala : Object.freeze({ full: "Lingala" , iso1: "ln" , iso2t: "lin" , iso2b: "lin" , iso3: "lin" }),
		ln : Object.freeze({ full: "Lingala" , iso1: "ln" , iso2t: "lin" , iso2b: "lin" , iso3: "lin" }),
		lin : Object.freeze({ full: "Lingala" , iso1: "ln" , iso2t: "lin" , iso2b: "lin" , iso3: "lin" }),
		lao : Object.freeze({ full: "Lao" , iso1: "lo" , iso2t: "lao" , iso2b: "lao" , iso3: "lao" }),
		lo : Object.freeze({ full: "Lao" , iso1: "lo" , iso2t: "lao" , iso2b: "lao" , iso3: "lao" }),
		lao : Object.freeze({ full: "Lao" , iso1: "lo" , iso2t: "lao" , iso2b: "lao" , iso3: "lao" }),
		lithuanian : Object.freeze({ full: "Lithuanian" , iso1: "lt" , iso2t: "lit" , iso2b: "lit" , iso3: "lit" }),
		lt : Object.freeze({ full: "Lithuanian" , iso1: "lt" , iso2t: "lit" , iso2b: "lit" , iso3: "lit" }),
		lit : Object.freeze({ full: "Lithuanian" , iso1: "lt" , iso2t: "lit" , iso2b: "lit" , iso3: "lit" }),
		lubakatanga : Object.freeze({ full: "Luba-Katanga" , iso1: "lu" , iso2t: "lub" , iso2b: "lub" , iso3: "lub" }),
		lu : Object.freeze({ full: "Luba-Katanga" , iso1: "lu" , iso2t: "lub" , iso2b: "lub" , iso3: "lub" }),
		lub : Object.freeze({ full: "Luba-Katanga" , iso1: "lu" , iso2t: "lub" , iso2b: "lub" , iso3: "lub" }),
		latvian : Object.freeze({ full: "Latvian" , iso1: "lv" , iso2t: "lav" , iso2b: "lav" , iso3: "lav+2" }),
		lv : Object.freeze({ full: "Latvian" , iso1: "lv" , iso2t: "lav" , iso2b: "lav" , iso3: "lav+2" }),
		lav : Object.freeze({ full: "Latvian" , iso1: "lv" , iso2t: "lav" , iso2b: "lav" , iso3: "lav+2" }),
		manx : Object.freeze({ full: "Manx" , iso1: "gv" , iso2t: "glv" , iso2b: "glv" , iso3: "glv" }),
		gv : Object.freeze({ full: "Manx" , iso1: "gv" , iso2t: "glv" , iso2b: "glv" , iso3: "glv" }),
		glv : Object.freeze({ full: "Manx" , iso1: "gv" , iso2t: "glv" , iso2b: "glv" , iso3: "glv" }),
		macedonian : Object.freeze({ full: "Macedonian" , iso1: "mk" , iso2t: "mkd" , iso2b: "mac" , iso3: "mkd" }),
		mk : Object.freeze({ full: "Macedonian" , iso1: "mk" , iso2t: "mkd" , iso2b: "mac" , iso3: "mkd" }),
		mkd : Object.freeze({ full: "Macedonian" , iso1: "mk" , iso2t: "mkd" , iso2b: "mac" , iso3: "mkd" }),
		mac: Object.freeze({ full: "Macedonian" , iso1: "mk" , iso2t: "mkd" , iso2b: "mac" , iso3: "mkd" }),
		malagasy : Object.freeze({ full: "Malagasy" , iso1: "mg" , iso2t: "mlg" , iso2b: "mlg" , iso3: "mlg+11" }),
		mg : Object.freeze({ full: "Malagasy" , iso1: "mg" , iso2t: "mlg" , iso2b: "mlg" , iso3: "mlg+11" }),
		mlg : Object.freeze({ full: "Malagasy" , iso1: "mg" , iso2t: "mlg" , iso2b: "mlg" , iso3: "mlg+11" }),
		malay : Object.freeze({ full: "Malay" , iso1: "ms" , iso2t: "msa" , iso2b: "may" , iso3: "msa+36" }),
		ms : Object.freeze({ full: "Malay" , iso1: "ms" , iso2t: "msa" , iso2b: "may" , iso3: "msa+36" }),
		msa : Object.freeze({ full: "Malay" , iso1: "ms" , iso2t: "msa" , iso2b: "may" , iso3: "msa+36" }),
		may: Object.freeze({ full: "Malay" , iso1: "ms" , iso2t: "msa" , iso2b: "may" , iso3: "msa+36" }),
		malayalam : Object.freeze({ full: "Malayalam" , iso1: "ml" , iso2t: "mal" , iso2b: "mal" , iso3: "mal" }),
		ml : Object.freeze({ full: "Malayalam" , iso1: "ml" , iso2t: "mal" , iso2b: "mal" , iso3: "mal" }),
		mal : Object.freeze({ full: "Malayalam" , iso1: "ml" , iso2t: "mal" , iso2b: "mal" , iso3: "mal" }),
		maltese : Object.freeze({ full: "Maltese" , iso1: "mt" , iso2t: "mlt" , iso2b: "mlt" , iso3: "mlt" }),
		mt : Object.freeze({ full: "Maltese" , iso1: "mt" , iso2t: "mlt" , iso2b: "mlt" , iso3: "mlt" }),
		mlt : Object.freeze({ full: "Maltese" , iso1: "mt" , iso2t: "mlt" , iso2b: "mlt" , iso3: "mlt" }),
		maori : Object.freeze({ full: "Maori" , iso1: "mi" , iso2t: "mri" , iso2b: "mao" , iso3: "mri" }),
		mi : Object.freeze({ full: "Maori" , iso1: "mi" , iso2t: "mri" , iso2b: "mao" , iso3: "mri" }),
		mri : Object.freeze({ full: "Maori" , iso1: "mi" , iso2t: "mri" , iso2b: "mao" , iso3: "mri" }),
		mao: Object.freeze({ full: "Maori" , iso1: "mi" , iso2t: "mri" , iso2b: "mao" , iso3: "mri" }),
		marathi : Object.freeze({ full: "Marathi" , iso1: "mr" , iso2t: "mar" , iso2b: "mar" , iso3: "mar" }),
		mr : Object.freeze({ full: "Marathi" , iso1: "mr" , iso2t: "mar" , iso2b: "mar" , iso3: "mar" }),
		mar : Object.freeze({ full: "Marathi" , iso1: "mr" , iso2t: "mar" , iso2b: "mar" , iso3: "mar" }),
		marshallese : Object.freeze({ full: "Marshallese" , iso1: "mh" , iso2t: "mah" , iso2b: "mah" , iso3: "mah" }),
		mh : Object.freeze({ full: "Marshallese" , iso1: "mh" , iso2t: "mah" , iso2b: "mah" , iso3: "mah" }),
		mah : Object.freeze({ full: "Marshallese" , iso1: "mh" , iso2t: "mah" , iso2b: "mah" , iso3: "mah" }),
		mongolian : Object.freeze({ full: "Mongolian" , iso1: "mn" , iso2t: "mon" , iso2b: "mon" , iso3: "mon+2" }),
		mn : Object.freeze({ full: "Mongolian" , iso1: "mn" , iso2t: "mon" , iso2b: "mon" , iso3: "mon+2" }),
		mon : Object.freeze({ full: "Mongolian" , iso1: "mn" , iso2t: "mon" , iso2b: "mon" , iso3: "mon+2" }),
		nauru : Object.freeze({ full: "Nauru" , iso1: "na" , iso2t: "nau" , iso2b: "nau" , iso3: "nau" }),
		na : Object.freeze({ full: "Nauru" , iso1: "na" , iso2t: "nau" , iso2b: "nau" , iso3: "nau" }),
		nau : Object.freeze({ full: "Nauru" , iso1: "na" , iso2t: "nau" , iso2b: "nau" , iso3: "nau" }),
		navajo : Object.freeze({ full: "Navajo" , iso1: "nv" , iso2t: "nav" , iso2b: "nav" , iso3: "nav" }),
		navaho : Object.freeze({ full: "Navaho" , iso1: "nv" , iso2t: "nav" , iso2b: "nav" , iso3: "nav" }),
		nv : Object.freeze({ full: "Navajo" , iso1: "nv" , iso2t: "nav" , iso2b: "nav" , iso3: "nav" }),
		nav : Object.freeze({ full: "Navajo" , iso1: "nv" , iso2t: "nav" , iso2b: "nav" , iso3: "nav" }),
		northndebele : Object.freeze({ full: "North Ndebele" , iso1: "nd" , iso2t: "nde" , iso2b: "nde" , iso3: "nde" }),
		nd : Object.freeze({ full: "North Ndebele" , iso1: "nd" , iso2t: "nde" , iso2b: "nde" , iso3: "nde" }),
		nde : Object.freeze({ full: "North Ndebele" , iso1: "nd" , iso2t: "nde" , iso2b: "nde" , iso3: "nde" }),
		nepali : Object.freeze({ full: "Nepali" , iso1: "ne" , iso2t: "nep" , iso2b: "nep" , iso3: "nep+2" }),
		ne : Object.freeze({ full: "Nepali" , iso1: "ne" , iso2t: "nep" , iso2b: "nep" , iso3: "nep+2" }),
		nep : Object.freeze({ full: "Nepali" , iso1: "ne" , iso2t: "nep" , iso2b: "nep" , iso3: "nep+2" }),
		ndonga : Object.freeze({ full: "Ndonga" , iso1: "ng" , iso2t: "ndo" , iso2b: "ndo" , iso3: "ndo" }),
		ng : Object.freeze({ full: "Ndonga" , iso1: "ng" , iso2t: "ndo" , iso2b: "ndo" , iso3: "ndo" }),
		ndo : Object.freeze({ full: "Ndonga" , iso1: "ng" , iso2t: "ndo" , iso2b: "ndo" , iso3: "ndo" }),
		norwegianbokmal : Object.freeze({ full: "Norwegian Bokmål" , iso1: "nb" , iso2t: "nob" , iso2b: "nob" , iso3: "nob" }),
		nb : Object.freeze({ full: "Norwegian Bokmål" , iso1: "nb" , iso2t: "nob" , iso2b: "nob" , iso3: "nob" }),
		nob : Object.freeze({ full: "Norwegian Bokmål" , iso1: "nb" , iso2t: "nob" , iso2b: "nob" , iso3: "nob" }),
		norwegiannynorsk : Object.freeze({ full: "Norwegian Nynorsk" , iso1: "nn" , iso2t: "nno" , iso2b: "nno" , iso3: "nno" }),
		nn : Object.freeze({ full: "Norwegian Nynorsk" , iso1: "nn" , iso2t: "nno" , iso2b: "nno" , iso3: "nno" }),
		nno : Object.freeze({ full: "Norwegian Nynorsk" , iso1: "nn" , iso2t: "nno" , iso2b: "nno" , iso3: "nno" }),
		norwegian : Object.freeze({ full: "Norwegian" , iso1: "no" , iso2t: "nor" , iso2b: "nor" , iso3: "nor+2" }),
		no : Object.freeze({ full: "Norwegian" , iso1: "no" , iso2t: "nor" , iso2b: "nor" , iso3: "nor+2" }),
		nor : Object.freeze({ full: "Norwegian" , iso1: "no" , iso2t: "nor" , iso2b: "nor" , iso3: "nor+2" }),
		sichuanyi : Object.freeze({ full: "Sichuan Yi" , iso1: "ii" , iso2t: "iii" , iso2b: "iii" , iso3: "iii" }),
		nuosu : Object.freeze({ full: "Nuosu" , iso1: "ii" , iso2t: "iii" , iso2b: "iii" , iso3: "iii" }),
		ii : Object.freeze({ full: "Sichuan Yi" , iso1: "ii" , iso2t: "iii" , iso2b: "iii" , iso3: "iii" }),
		iii : Object.freeze({ full: "Sichuan Yi" , iso1: "ii" , iso2t: "iii" , iso2b: "iii" , iso3: "iii" }),
		southndebele : Object.freeze({ full: "South Ndebele" , iso1: "nr" , iso2t: "nbl" , iso2b: "nbl" , iso3: "nbl" }),
		nr : Object.freeze({ full: "South Ndebele" , iso1: "nr" , iso2t: "nbl" , iso2b: "nbl" , iso3: "nbl" }),
		nbl : Object.freeze({ full: "South Ndebele" , iso1: "nr" , iso2t: "nbl" , iso2b: "nbl" , iso3: "nbl" }),
		occitan : Object.freeze({ full: "Occitan" , iso1: "oc" , iso2t: "oci" , iso2b: "oci" , iso3: "oci" }),
		oc : Object.freeze({ full: "Occitan" , iso1: "oc" , iso2t: "oci" , iso2b: "oci" , iso3: "oci" }),
		oci : Object.freeze({ full: "Occitan" , iso1: "oc" , iso2t: "oci" , iso2b: "oci" , iso3: "oci" }),
		ojibwa : Object.freeze({ full: "Ojibwa" , iso1: "oj" , iso2t: "oji" , iso2b: "oji" , iso3: "oji+7" }),
		oj : Object.freeze({ full: "Ojibwa" , iso1: "oj" , iso2t: "oji" , iso2b: "oji" , iso3: "oji+7" }),
		oji : Object.freeze({ full: "Ojibwa" , iso1: "oj" , iso2t: "oji" , iso2b: "oji" , iso3: "oji+7" }),
		churchslavic : Object.freeze({ full: "Church Slavic" , iso1: "cu" , iso2t: "chu" , iso2b: "chu" , iso3: "chu" }),
		oldslavonic : Object.freeze({ full: "Old Slavonic" , iso1: "cu" , iso2t: "chu" , iso2b: "chu" , iso3: "chu" }),
		churchslavonic : Object.freeze({ full: "Church Slavonic" , iso1: "cu" , iso2t: "chu" , iso2b: "chu" , iso3: "chu" }),
		oldbulgarian : Object.freeze({ full: "Old Bulgarian" , iso1: "cu" , iso2t: "chu" , iso2b: "chu" , iso3: "chu" }),
		oldchurchslavonic : Object.freeze({ full: "Old Church Slavonic" , iso1: "cu" , iso2t: "chu" , iso2b: "chu" , iso3: "chu" }),
		cu : Object.freeze({ full: "Church Slavic" , iso1: "cu" , iso2t: "chu" , iso2b: "chu" , iso3: "chu" }),
		chu : Object.freeze({ full: "Church Slavic" , iso1: "cu" , iso2t: "chu" , iso2b: "chu" , iso3: "chu" }),
		oromo : Object.freeze({ full: "Oromo" , iso1: "om" , iso2t: "orm" , iso2b: "orm" , iso3: "orm+4" }),
		om : Object.freeze({ full: "Oromo" , iso1: "om" , iso2t: "orm" , iso2b: "orm" , iso3: "orm+4" }),
		orm : Object.freeze({ full: "Oromo" , iso1: "om" , iso2t: "orm" , iso2b: "orm" , iso3: "orm+4" }),
		oriya : Object.freeze({ full: "Oriya" , iso1: "or" , iso2t: "ori" , iso2b: "ori" , iso3: "ori+2" }),
		or : Object.freeze({ full: "Oriya" , iso1: "or" , iso2t: "ori" , iso2b: "ori" , iso3: "ori+2" }),
		ori : Object.freeze({ full: "Oriya" , iso1: "or" , iso2t: "ori" , iso2b: "ori" , iso3: "ori+2" }),
		ossetian : Object.freeze({ full: "Ossetian" , iso1: "os" , iso2t: "oss" , iso2b: "oss" , iso3: "oss" }),
		ossetic : Object.freeze({ full: "Ossetic" , iso1: "os" , iso2t: "oss" , iso2b: "oss" , iso3: "oss" }),
		os : Object.freeze({ full: "Ossetian" , iso1: "os" , iso2t: "oss" , iso2b: "oss" , iso3: "oss" }),
		oss : Object.freeze({ full: "Ossetian" , iso1: "os" , iso2t: "oss" , iso2b: "oss" , iso3: "oss" }),
		punjabi : Object.freeze({ full: "Punjabi" , iso1: "pa" , iso2t: "pan" , iso2b: "pan" , iso3: "pan" }),
		panjabi : Object.freeze({ full: "Panjabi" , iso1: "pa" , iso2t: "pan" , iso2b: "pan" , iso3: "pan" }),
		pa : Object.freeze({ full: "Panjabi" , iso1: "pa" , iso2t: "pan" , iso2b: "pan" , iso3: "pan" }),
		pan : Object.freeze({ full: "Panjabi" , iso1: "pa" , iso2t: "pan" , iso2b: "pan" , iso3: "pan" }),
		pali : Object.freeze({ full: "Pali" , iso1: "pi" , iso2t: "pli" , iso2b: "pli" , iso3: "pli" }),
		pi : Object.freeze({ full: "Pali" , iso1: "pi" , iso2t: "pli" , iso2b: "pli" , iso3: "pli" }),
		pli : Object.freeze({ full: "Pali" , iso1: "pi" , iso2t: "pli" , iso2b: "pli" , iso3: "pli" }),
		persian : Object.freeze({ full: "Persian" , iso1: "fa" , iso2t: "fas" , iso2b: "per" , iso3: "fas+2" }),
		farsi : Object.freeze({ full: "Farsi" , iso1: "fa" , iso2t: "fas" , iso2b: "per" , iso3: "fas+2" }),
		fa : Object.freeze({ full: "Farsi" , iso1: "fa" , iso2t: "fas" , iso2b: "per" , iso3: "fas+2" }),
		fas : Object.freeze({ full: "Farsi" , iso1: "fa" , iso2t: "fas" , iso2b: "per" , iso3: "fas+2" }),
		per : Object.freeze({ full: "Persian" , iso1: "fa" , iso2t: "fas" , iso2b: "per" , iso3: "fas+2" }),
		polish : Object.freeze({ full: "Polish" , iso1: "pl" , iso2t: "pol" , iso2b: "pol" , iso3: "pol" }),
		pl : Object.freeze({ full: "Polish" , iso1: "pl" , iso2t: "pol" , iso2b: "pol" , iso3: "pol" }),
		pol : Object.freeze({ full: "Polish" , iso1: "pl" , iso2t: "pol" , iso2b: "pol" , iso3: "pol" }),
		pashto : Object.freeze({ full: "Pashto" , iso1: "ps" , iso2t: "pus" , iso2b: "pus" , iso3: "pus+3" }),
		pushto : Object.freeze({ full: "Pushto" , iso1: "ps" , iso2t: "pus" , iso2b: "pus" , iso3: "pus+3" }),
		ps : Object.freeze({ full: "Pushto" , iso1: "ps" , iso2t: "pus" , iso2b: "pus" , iso3: "pus+3" }),
		pus : Object.freeze({ full: "Pushto" , iso1: "ps" , iso2t: "pus" , iso2b: "pus" , iso3: "pus+3" }),
		pus : Object.freeze({ full: "Pushto" , iso1: "pus" , iso2t: "pus" , iso2b: "pus+3" , iso3: "macrolanguage" }),
		portuguese : Object.freeze({ full: "Portuguese" , iso1: "pt" , iso2t: "por" , iso2b: "por" , iso3: "por" }),
		pt : Object.freeze({ full: "Portuguese" , iso1: "pt" , iso2t: "por" , iso2b: "por" , iso3: "por" }),
		por : Object.freeze({ full: "Portuguese" , iso1: "pt" , iso2t: "por" , iso2b: "por" , iso3: "por" }),
		quechua : Object.freeze({ full: "Quechua" , iso1: "qu" , iso2t: "que" , iso2b: "que" , iso3: "que+43" }),
		qu : Object.freeze({ full: "Quechua" , iso1: "qu" , iso2t: "que" , iso2b: "que" , iso3: "que+43" }),
		que : Object.freeze({ full: "Quechua" , iso1: "qu" , iso2t: "que" , iso2b: "que" , iso3: "que+43" }),
		romansh : Object.freeze({ full: "Romansh" , iso1: "rm" , iso2t: "roh" , iso2b: "roh" , iso3: "roh" }),
		rm : Object.freeze({ full: "Romansh" , iso1: "rm" , iso2t: "roh" , iso2b: "roh" , iso3: "roh" }),
		roh : Object.freeze({ full: "Romansh" , iso1: "rm" , iso2t: "roh" , iso2b: "roh" , iso3: "roh" }),
		rundi : Object.freeze({ full: "Rundi" , iso1: "rn" , iso2t: "run" , iso2b: "run" , iso3: "run" }),
		rn : Object.freeze({ full: "Rundi" , iso1: "rn" , iso2t: "run" , iso2b: "run" , iso3: "run" }),
		run : Object.freeze({ full: "Rundi" , iso1: "rn" , iso2t: "run" , iso2b: "run" , iso3: "run" }),
		romanian : Object.freeze({ full: "Romanian" , iso1: "ro" , iso2t: "ron" , iso2b: "rum" , iso3: "ron" }),
		moldavian : Object.freeze({ full: "Moldavian" , iso1: "ro" , iso2t: "ron" , iso2b: "rum" , iso3: "ron" }),
		moldovan : Object.freeze({ full: "Moldovan" , iso1: "ro" , iso2t: "ron" , iso2b: "rum" , iso3: "ron" }),
		ro : Object.freeze({ full: "Romanian" , iso1: "ro" , iso2t: "ron" , iso2b: "rum" , iso3: "ron" }),
		ron : Object.freeze({ full: "Romanian" , iso1: "ro" , iso2t: "ron" , iso2b: "rum" , iso3: "ron" }),
		rum: Object.freeze({ full: "Romanian" , iso1: "ro" , iso2t: "ron" , iso2b: "rum" , iso3: "ron" }),
		russian : Object.freeze({ full: "Russian" , iso1: "ru" , iso2t: "rus" , iso2b: "rus" , iso3: "rus" }),
		ru : Object.freeze({ full: "Russian" , iso1: "ru" , iso2t: "rus" , iso2b: "rus" , iso3: "rus" }),
		rus : Object.freeze({ full: "Russian" , iso1: "ru" , iso2t: "rus" , iso2b: "rus" , iso3: "rus" }),
		sanskrit : Object.freeze({ full: "Sanskrit" , iso1: "sa" , iso2t: "san" , iso2b: "san" , iso3: "san" }),
		sa : Object.freeze({ full: "Sanskrit" , iso1: "sa" , iso2t: "san" , iso2b: "san" , iso3: "san" }),
		san : Object.freeze({ full: "Sanskrit" , iso1: "sa" , iso2t: "san" , iso2b: "san" , iso3: "san" }),
		sardinian : Object.freeze({ full: "Sardinian" , iso1: "sc" , iso2t: "srd" , iso2b: "srd" , iso3: "srd+4" }),
		sc : Object.freeze({ full: "Sardinian" , iso1: "sc" , iso2t: "srd" , iso2b: "srd" , iso3: "srd+4" }),
		srd : Object.freeze({ full: "Sardinian" , iso1: "sc" , iso2t: "srd" , iso2b: "srd" , iso3: "srd+4" }),
		sindhi : Object.freeze({ full: "Sindhi" , iso1: "sd" , iso2t: "snd" , iso2b: "snd" , iso3: "snd" }),
		sd : Object.freeze({ full: "Sindhi" , iso1: "sd" , iso2t: "snd" , iso2b: "snd" , iso3: "snd" }),
		snd : Object.freeze({ full: "Sindhi" , iso1: "sd" , iso2t: "snd" , iso2b: "snd" , iso3: "snd" }),
		northernsami : Object.freeze({ full: "Northern Sami" , iso1: "se" , iso2t: "sme" , iso2b: "sme" , iso3: "sme" }),
		se : Object.freeze({ full: "Northern Sami" , iso1: "se" , iso2t: "sme" , iso2b: "sme" , iso3: "sme" }),
		sme : Object.freeze({ full: "Northern Sami" , iso1: "se" , iso2t: "sme" , iso2b: "sme" , iso3: "sme" }),
		samoan : Object.freeze({ full: "Samoan" , iso1: "sm" , iso2t: "smo" , iso2b: "smo" , iso3: "smo" }),
		sm : Object.freeze({ full: "Samoan" , iso1: "sm" , iso2t: "smo" , iso2b: "smo" , iso3: "smo" }),
		smo : Object.freeze({ full: "Samoan" , iso1: "sm" , iso2t: "smo" , iso2b: "smo" , iso3: "smo" }),
		sango : Object.freeze({ full: "Sango" , iso1: "sg" , iso2t: "sag" , iso2b: "sag" , iso3: "sag" }),
		sg : Object.freeze({ full: "Sango" , iso1: "sg" , iso2t: "sag" , iso2b: "sag" , iso3: "sag" }),
		sag : Object.freeze({ full: "Sango" , iso1: "sg" , iso2t: "sag" , iso2b: "sag" , iso3: "sag" }),
		serbian : Object.freeze({ full: "Serbian" , iso1: "sr" , iso2t: "srp" , iso2b: "srp" , iso3: "srp" }),
		sr : Object.freeze({ full: "Serbian" , iso1: "sr" , iso2t: "srp" , iso2b: "srp" , iso3: "srp" }),
		srp : Object.freeze({ full: "Serbian" , iso1: "sr" , iso2t: "srp" , iso2b: "srp" , iso3: "srp" }),
		gaelic : Object.freeze({ full: "Gaelic" , iso1: "gd" , iso2t: "gla" , iso2b: "gla" , iso3: "gla" }),
		scottishgaelic : Object.freeze({ full: "Scottish Gaelic" , iso1: "gd" , iso2t: "gla" , iso2b: "gla" , iso3: "gla" }),
		gd : Object.freeze({ full: "Gaelic" , iso1: "gd" , iso2t: "gla" , iso2b: "gla" , iso3: "gla" }),
		gla : Object.freeze({ full: "Gaelic" , iso1: "gd" , iso2t: "gla" , iso2b: "gla" , iso3: "gla" }),
		shona : Object.freeze({ full: "Shona" , iso1: "sn" , iso2t: "sna" , iso2b: "sna" , iso3: "sna" }),
		sn : Object.freeze({ full: "Shona" , iso1: "sn" , iso2t: "sna" , iso2b: "sna" , iso3: "sna" }),
		sna : Object.freeze({ full: "Shona" , iso1: "sn" , iso2t: "sna" , iso2b: "sna" , iso3: "sna" }),
		sinhala : Object.freeze({ full: "Sinhala" , iso1: "si" , iso2t: "sin" , iso2b: "sin" , iso3: "sin" }),
		sinhalese : Object.freeze({ full: "Sinhalese" , iso1: "si" , iso2t: "sin" , iso2b: "sin" , iso3: "sin" }),
		si : Object.freeze({ full: "Sinhala" , iso1: "si" , iso2t: "sin" , iso2b: "sin" , iso3: "sin" }),
		sin : Object.freeze({ full: "Sinhala" , iso1: "si" , iso2t: "sin" , iso2b: "sin" , iso3: "sin" }),
		slovak : Object.freeze({ full: "Slovak" , iso1: "sk" , iso2t: "slk" , iso2b: "slo" , iso3: "slk" }),
		sk : Object.freeze({ full: "Slovak" , iso1: "sk" , iso2t: "slk" , iso2b: "slo" , iso3: "slk" }),
		slk : Object.freeze({ full: "Slovak" , iso1: "sk" , iso2t: "slk" , iso2b: "slo" , iso3: "slk" }),
		slo: Object.freeze({ full: "Slovak" , iso1: "sk" , iso2t: "slk" , iso2b: "slo" , iso3: "slk" }),
		slovenian : Object.freeze({ full: "Slovenian" , iso1: "sl" , iso2t: "slv" , iso2b: "slv" , iso3: "slv" }),
		sl : Object.freeze({ full: "Slovenian" , iso1: "sl" , iso2t: "slv" , iso2b: "slv" , iso3: "slv" }),
		slv : Object.freeze({ full: "Slovenian" , iso1: "sl" , iso2t: "slv" , iso2b: "slv" , iso3: "slv" }),
		somali : Object.freeze({ full: "Somali" , iso1: "so" , iso2t: "som" , iso2b: "som" , iso3: "som" }),
		so : Object.freeze({ full: "Somali" , iso1: "so" , iso2t: "som" , iso2b: "som" , iso3: "som" }),
		som : Object.freeze({ full: "Somali" , iso1: "so" , iso2t: "som" , iso2b: "som" , iso3: "som" }),
		southernsotho : Object.freeze({ full: "Southern Sotho" , iso1: "st" , iso2t: "sot" , iso2b: "sot" , iso3: "sot" }),
		st : Object.freeze({ full: "Southern Sotho" , iso1: "st" , iso2t: "sot" , iso2b: "sot" , iso3: "sot" }),
		sot : Object.freeze({ full: "Southern Sotho" , iso1: "st" , iso2t: "sot" , iso2b: "sot" , iso3: "sot" }),
		spanish : Object.freeze({ full: "Spanish" , iso1: "es" , iso2t: "spa" , iso2b: "spa" , iso3: "spa" }),
		castilian : Object.freeze({ full: "Castilian" , iso1: "es" , iso2t: "spa" , iso2b: "spa" , iso3: "spa" }),
		es : Object.freeze({ full: "Spanish" , iso1: "es" , iso2t: "spa" , iso2b: "spa" , iso3: "spa" }),
		spa : Object.freeze({ full: "Spanish" , iso1: "es" , iso2t: "spa" , iso2b: "spa" , iso3: "spa" }),
		sundanese : Object.freeze({ full: "Sundanese" , iso1: "su" , iso2t: "sun" , iso2b: "sun" , iso3: "sun" }),
		su : Object.freeze({ full: "Sundanese" , iso1: "su" , iso2t: "sun" , iso2b: "sun" , iso3: "sun" }),
		sun : Object.freeze({ full: "Sundanese" , iso1: "su" , iso2t: "sun" , iso2b: "sun" , iso3: "sun" }),
		swahili : Object.freeze({ full: "Swahili" , iso1: "sw" , iso2t: "swa" , iso2b: "swa" , iso3: "swa+2" }),
		sw : Object.freeze({ full: "Swahili" , iso1: "sw" , iso2t: "swa" , iso2b: "swa" , iso3: "swa+2" }),
		swa : Object.freeze({ full: "Swahili" , iso1: "sw" , iso2t: "swa" , iso2b: "swa" , iso3: "swa+2" }),
		swati : Object.freeze({ full: "Swati" , iso1: "ss" , iso2t: "ssw" , iso2b: "ssw" , iso3: "ssw" }),
		ss : Object.freeze({ full: "Swati" , iso1: "ss" , iso2t: "ssw" , iso2b: "ssw" , iso3: "ssw" }),
		ssw : Object.freeze({ full: "Swati" , iso1: "ss" , iso2t: "ssw" , iso2b: "ssw" , iso3: "ssw" }),
		swedish : Object.freeze({ full: "Swedish" , iso1: "sv" , iso2t: "swe" , iso2b: "swe" , iso3: "swe" }),
		sv : Object.freeze({ full: "Swedish" , iso1: "sv" , iso2t: "swe" , iso2b: "swe" , iso3: "swe" }),
		swe : Object.freeze({ full: "Swedish" , iso1: "sv" , iso2t: "swe" , iso2b: "swe" , iso3: "swe" }),
		tamil : Object.freeze({ full: "Tamil" , iso1: "ta" , iso2t: "tam" , iso2b: "tam" , iso3: "tam" }),
		ta : Object.freeze({ full: "Tamil" , iso1: "ta" , iso2t: "tam" , iso2b: "tam" , iso3: "tam" }),
		tam : Object.freeze({ full: "Tamil" , iso1: "ta" , iso2t: "tam" , iso2b: "tam" , iso3: "tam" }),
		telugu : Object.freeze({ full: "Telugu" , iso1: "te" , iso2t: "tel" , iso2b: "tel" , iso3: "tel" }),
		te : Object.freeze({ full: "Telugu" , iso1: "te" , iso2t: "tel" , iso2b: "tel" , iso3: "tel" }),
		tel : Object.freeze({ full: "Telugu" , iso1: "te" , iso2t: "tel" , iso2b: "tel" , iso3: "tel" }),
		tajik : Object.freeze({ full: "Tajik" , iso1: "tg" , iso2t: "tgk" , iso2b: "tgk" , iso3: "tgk" }),
		tg : Object.freeze({ full: "Tajik" , iso1: "tg" , iso2t: "tgk" , iso2b: "tgk" , iso3: "tgk" }),
		tgk : Object.freeze({ full: "Tajik" , iso1: "tg" , iso2t: "tgk" , iso2b: "tgk" , iso3: "tgk" }),
		thai : Object.freeze({ full: "Thai" , iso1: "th" , iso2t: "tha" , iso2b: "tha" , iso3: "tha" }),
		th : Object.freeze({ full: "Thai" , iso1: "th" , iso2t: "tha" , iso2b: "tha" , iso3: "tha" }),
		tha : Object.freeze({ full: "Thai" , iso1: "th" , iso2t: "tha" , iso2b: "tha" , iso3: "tha" }),
		tigrinya : Object.freeze({ full: "Tigrinya" , iso1: "ti" , iso2t: "tir" , iso2b: "tir" , iso3: "tir" }),
		ti : Object.freeze({ full: "Tigrinya" , iso1: "ti" , iso2t: "tir" , iso2b: "tir" , iso3: "tir" }),
		tir : Object.freeze({ full: "Tigrinya" , iso1: "ti" , iso2t: "tir" , iso2b: "tir" , iso3: "tir" }),
		tibetan : Object.freeze({ full: "Tibetan" , iso1: "bo" , iso2t: "bod" , iso2b: "tib" , iso3: "bod" }),
		bo : Object.freeze({ full: "Tibetan" , iso1: "bo" , iso2t: "bod" , iso2b: "tib" , iso3: "bod" }),
		bod : Object.freeze({ full: "Tibetan" , iso1: "bo" , iso2t: "bod" , iso2b: "tib" , iso3: "bod" }),
		tib: Object.freeze({ full: "Tibetan" , iso1: "bo" , iso2t: "bod" , iso2b: "tib" , iso3: "bod" }),
		turkmen : Object.freeze({ full: "Turkmen" , iso1: "tk" , iso2t: "tuk" , iso2b: "tuk" , iso3: "tuk" }),
		tk : Object.freeze({ full: "Turkmen" , iso1: "tk" , iso2t: "tuk" , iso2b: "tuk" , iso3: "tuk" }),
		tuk : Object.freeze({ full: "Turkmen" , iso1: "tk" , iso2t: "tuk" , iso2b: "tuk" , iso3: "tuk" }),
		tagalog : Object.freeze({ full: "Tagalog" , iso1: "tl" , iso2t: "tgl" , iso2b: "tgl" , iso3: "tgl" }),
		tl : Object.freeze({ full: "Tagalog" , iso1: "tl" , iso2t: "tgl" , iso2b: "tgl" , iso3: "tgl" }),
		tgl : Object.freeze({ full: "Tagalog" , iso1: "tl" , iso2t: "tgl" , iso2b: "tgl" , iso3: "tgl" }),
		tswana : Object.freeze({ full: "Tswana" , iso1: "tn" , iso2t: "tsn" , iso2b: "tsn" , iso3: "tsn" }),
		tn : Object.freeze({ full: "Tswana" , iso1: "tn" , iso2t: "tsn" , iso2b: "tsn" , iso3: "tsn" }),
		tsn : Object.freeze({ full: "Tswana" , iso1: "tn" , iso2t: "tsn" , iso2b: "tsn" , iso3: "tsn" }),
		tonga : Object.freeze({ full: "Tonga" , iso1: "to" , iso2t: "ton" , iso2b: "ton" , iso3: "ton" }),
		to : Object.freeze({ full: "Tonga" , iso1: "to" , iso2t: "ton" , iso2b: "ton" , iso3: "ton" }),
		ton : Object.freeze({ full: "Tonga" , iso1: "to" , iso2t: "ton" , iso2b: "ton" , iso3: "ton" }),
		turkish : Object.freeze({ full: "Turkish" , iso1: "tr" , iso2t: "tur" , iso2b: "tur" , iso3: "tur" }),
		tr : Object.freeze({ full: "Turkish" , iso1: "tr" , iso2t: "tur" , iso2b: "tur" , iso3: "tur" }),
		tur : Object.freeze({ full: "Turkish" , iso1: "tr" , iso2t: "tur" , iso2b: "tur" , iso3: "tur" }),
		tsonga : Object.freeze({ full: "Tsonga" , iso1: "ts" , iso2t: "tso" , iso2b: "tso" , iso3: "tso" }),
		ts : Object.freeze({ full: "Tsonga" , iso1: "ts" , iso2t: "tso" , iso2b: "tso" , iso3: "tso" }),
		tso : Object.freeze({ full: "Tsonga" , iso1: "ts" , iso2t: "tso" , iso2b: "tso" , iso3: "tso" }),
		tatar : Object.freeze({ full: "Tatar" , iso1: "tt" , iso2t: "tat" , iso2b: "tat" , iso3: "tat" }),
		tt : Object.freeze({ full: "Tatar" , iso1: "tt" , iso2t: "tat" , iso2b: "tat" , iso3: "tat" }),
		tat : Object.freeze({ full: "Tatar" , iso1: "tt" , iso2t: "tat" , iso2b: "tat" , iso3: "tat" }),
		twi : Object.freeze({ full: "Twi" , iso1: "tw" , iso2t: "twi" , iso2b: "twi" , iso3: "twi" }),
		tw : Object.freeze({ full: "Twi" , iso1: "tw" , iso2t: "twi" , iso2b: "twi" , iso3: "twi" }),
		twi : Object.freeze({ full: "Twi" , iso1: "tw" , iso2t: "twi" , iso2b: "twi" , iso3: "twi" }),
		tahitian : Object.freeze({ full: "Tahitian" , iso1: "ty" , iso2t: "tah" , iso2b: "tah" , iso3: "tah" }),
		ty : Object.freeze({ full: "Tahitian" , iso1: "ty" , iso2t: "tah" , iso2b: "tah" , iso3: "tah" }),
		tah : Object.freeze({ full: "Tahitian" , iso1: "ty" , iso2t: "tah" , iso2b: "tah" , iso3: "tah" }),
		uighur : Object.freeze({ full: "Uighur" , iso1: "ug" , iso2t: "uig" , iso2b: "uig" , iso3: "uig" }),
		uyghur : Object.freeze({ full: "Uyghur" , iso1: "ug" , iso2t: "uig" , iso2b: "uig" , iso3: "uig" }),
		ug : Object.freeze({ full: "Uighur" , iso1: "ug" , iso2t: "uig" , iso2b: "uig" , iso3: "uig" }),
		uig : Object.freeze({ full: "Uighur" , iso1: "ug" , iso2t: "uig" , iso2b: "uig" , iso3: "uig" }),
		ukrainian : Object.freeze({ full: "Ukrainian" , iso1: "uk" , iso2t: "ukr" , iso2b: "ukr" , iso3: "ukr" }),
		uk : Object.freeze({ full: "Ukrainian" , iso1: "uk" , iso2t: "ukr" , iso2b: "ukr" , iso3: "ukr" }),
		ukr : Object.freeze({ full: "Ukrainian" , iso1: "uk" , iso2t: "ukr" , iso2b: "ukr" , iso3: "ukr" }),
		urdu : Object.freeze({ full: "Urdu" , iso1: "urd" , iso2t: "urd" , iso2b: "urd" , iso3: "" }),
		urd : Object.freeze({ full: "Urdu" , iso1: "urd" , iso2t: "urd" , iso2b: "urd" , iso3: "" }),
		urd : Object.freeze({ full: "Urdu" , iso1: "urd" , iso2t: "urd" , iso2b: "urd" , iso3: "" }),
		uzbek : Object.freeze({ full: "Uzbek" , iso1: "uz" , iso2t: "uzb" , iso2b: "uzb" , iso3: "uzb+2" }),
		uz : Object.freeze({ full: "Uzbek" , iso1: "uz" , iso2t: "uzb" , iso2b: "uzb" , iso3: "uzb+2" }),
		uzb : Object.freeze({ full: "Uzbek" , iso1: "uz" , iso2t: "uzb" , iso2b: "uzb" , iso3: "uzb+2" }),
		venda : Object.freeze({ full: "Venda" , iso1: "ve" , iso2t: "ven" , iso2b: "ven" , iso3: "ven" }),
		ve : Object.freeze({ full: "Venda" , iso1: "ve" , iso2t: "ven" , iso2b: "ven" , iso3: "ven" }),
		ven : Object.freeze({ full: "Venda" , iso1: "ve" , iso2t: "ven" , iso2b: "ven" , iso3: "ven" }),
		vietnamese : Object.freeze({ full: "Vietnamese" , iso1: "vi" , iso2t: "vie" , iso2b: "vie" , iso3: "vie" }),
		vi : Object.freeze({ full: "Vietnamese" , iso1: "vi" , iso2t: "vie" , iso2b: "vie" , iso3: "vie" }),
		vie : Object.freeze({ full: "Vietnamese" , iso1: "vi" , iso2t: "vie" , iso2b: "vie" , iso3: "vie" }),
		volapük : Object.freeze({ full: "Volapük" , iso1: "vo" , iso2t: "vol" , iso2b: "vol" , iso3: "vol" }),
		vo : Object.freeze({ full: "Volapük" , iso1: "vo" , iso2t: "vol" , iso2b: "vol" , iso3: "vol" }),
		vol : Object.freeze({ full: "Volapük" , iso1: "vo" , iso2t: "vol" , iso2b: "vol" , iso3: "vol" }),
		walloon : Object.freeze({ full: "Walloon" , iso1: "wa" , iso2t: "wln" , iso2b: "wln" , iso3: "wln" }),
		wa : Object.freeze({ full: "Walloon" , iso1: "wa" , iso2t: "wln" , iso2b: "wln" , iso3: "wln" }),
		wln : Object.freeze({ full: "Walloon" , iso1: "wa" , iso2t: "wln" , iso2b: "wln" , iso3: "wln" }),
		welsh : Object.freeze({ full: "Welsh" , iso1: "cy" , iso2t: "cym" , iso2b: "wel" , iso3: "cym" }),
		cy : Object.freeze({ full: "Welsh" , iso1: "cy" , iso2t: "cym" , iso2b: "wel" , iso3: "cym" }),
		cym : Object.freeze({ full: "Welsh" , iso1: "cy" , iso2t: "cym" , iso2b: "wel" , iso3: "cym" }),
		wel: Object.freeze({ full: "Welsh" , iso1: "cy" , iso2t: "cym" , iso2b: "wel" , iso3: "cym" }),
		wolof : Object.freeze({ full: "Wolof" , iso1: "wo" , iso2t: "wol" , iso2b: "wol" , iso3: "wol" }),
		wo : Object.freeze({ full: "Wolof" , iso1: "wo" , iso2t: "wol" , iso2b: "wol" , iso3: "wol" }),
		wol : Object.freeze({ full: "Wolof" , iso1: "wo" , iso2t: "wol" , iso2b: "wol" , iso3: "wol" }),
		westernfrisian : Object.freeze({ full: "Western Frisian" , iso1: "fy" , iso2t: "fry" , iso2b: "fry" , iso3: "fry" }),
		fy : Object.freeze({ full: "Western Frisian" , iso1: "fy" , iso2t: "fry" , iso2b: "fry" , iso3: "fry" }),
		fry : Object.freeze({ full: "Western Frisian" , iso1: "fy" , iso2t: "fry" , iso2b: "fry" , iso3: "fry" }),
		xhosa : Object.freeze({ full: "Xhosa" , iso1: "xh" , iso2t: "xho" , iso2b: "xho" , iso3: "xho" }),
		xh : Object.freeze({ full: "Xhosa" , iso1: "xh" , iso2t: "xho" , iso2b: "xho" , iso3: "xho" }),
		xho : Object.freeze({ full: "Xhosa" , iso1: "xh" , iso2t: "xho" , iso2b: "xho" , iso3: "xho" }),
		yiddish : Object.freeze({ full: "Yiddish" , iso1: "yi" , iso2t: "yid" , iso2b: "yid" , iso3: "yid+2" }),
		yi : Object.freeze({ full: "Yiddish" , iso1: "yi" , iso2t: "yid" , iso2b: "yid" , iso3: "yid+2" }),
		yid : Object.freeze({ full: "Yiddish" , iso1: "yi" , iso2t: "yid" , iso2b: "yid" , iso3: "yid+2" }),
		yoruba : Object.freeze({ full: "Yoruba" , iso1: "yo" , iso2t: "yor" , iso2b: "yor" , iso3: "yor" }),
		yo : Object.freeze({ full: "Yoruba" , iso1: "yo" , iso2t: "yor" , iso2b: "yor" , iso3: "yor" }),
		yor : Object.freeze({ full: "Yoruba" , iso1: "yo" , iso2t: "yor" , iso2b: "yor" , iso3: "yor" }),
		zhuang : Object.freeze({ full: "Zhuang" , iso1: "za" , iso2t: "zha" , iso2b: "zha" , iso3: "zha+16" }),
		chuang : Object.freeze({ full: "Chuang" , iso1: "za" , iso2t: "zha" , iso2b: "zha" , iso3: "zha+16" }),
		za : Object.freeze({ full: "Zhuang" , iso1: "za" , iso2t: "zha" , iso2b: "zha" , iso3: "zha+16" }),
		zha : Object.freeze({ full: "Zhuang" , iso1: "za" , iso2t: "zha" , iso2b: "zha" , iso3: "zha+16" })
	})
	
    var domainCountries = Object.freeze({
        'ac': 'Ascension Island',
        'ad': 'Andorra',
        'ae': 'United Arab Emirates',
        'af': 'Afghanistan',
        'ag': 'Antigua and Barbuda',
        'ai': 'Anguilla',
        'al': 'Albania',
        'am': 'Armenia',
        'ao': 'Angola',
        'aq': 'Antarctica',
        'ar': 'Argentina',
        'as': 'American Samoa',
        'at': 'Austria',
        'au': 'Australia',
        'aw': 'Aruba',
        'ax': 'Åland',
        'az': 'Azerbaijan',
        'ba': 'Bosnia and Herzegovina',
        'bb': 'Barbados',
        'bd': 'Bangladesh',
        'be': 'Belgium',
        'bf': 'Burkina Faso',
        'bg': 'Bulgaria',
        'bh': 'Bahrain',
        'bi': 'Burundi',
        'bj': 'Benin',
        'bm': 'Bermuda',
        'bn': 'Brunei',
        'bo': 'Bolivia',
        'bq': 'Caribbean Netherlands',
        'br': 'Brazil',
        'bs': 'Bahamas',
        'bt': 'Bhutan',
        'bw': 'Botswana',
        'by': 'Belarus',
        'bz': 'Belize',
        'ca': 'Canada',
        'cc': 'Cocos Islands',
        'cd': 'Democratic Republic of the Congo',
        'cf': 'Central African Republic',
        'cg': 'Republic of the Congo',
        'ch': 'Switzerland',
        'ci': 'Ivory Coast',
        'ck': 'Cook Islands',
        'cl': 'Chile',
        'cm': 'Cameroon',
        'cn': 'China',
        'co': 'Colombia',
        'cr': 'Costa Rica',
        'cu': 'Cuba',
        'cv': 'Cape Verde',
        'cw': 'Curaçao',
        'cx': 'Christmas Island',
        'cy': 'Cyprus',
        'cz': 'Czech Republic',
        'de': 'Germany',
        'dj': 'Djibouti',
        'dk': 'Denmark',
        'dm': 'Dominica',
        'do': 'Dominican Republic',
        'dz': 'Algeria',
        'ec': 'Ecuador',
        'ee': 'Estonia',
        'eg': 'Egypt',
        'eh': 'Western Sahara',
        'er': 'Eritrea',
        'es': 'Spain',
        'et': 'Ethiopia',
        'eu': 'European Union',
        'fi': 'Finland',
        'fj': 'Fiji',
        'fk': 'Falkland Islands',
        'fm': 'Federated States of Micronesia',
        'fo': 'Faroe Islands',
        'fr': 'France',
        'ga': 'Gabon',
        'gd': 'Grenada',
        'ge': 'Georgia',
        'gf': 'French Guiana',
        'gg': 'Guernsey',
        'gh': 'Ghana',
        'gi': 'Gibraltar',
        'gl': 'Greenland',
        'gm': 'The Gambia',
        'gn': 'Guinea',
        'gp': 'Guadeloupe',
        'gq': 'Equatorial Guinea',
        'gr': 'Greece',
        'gs': 'South Georgia and the South Sandwich Islands',
        'gt': 'Guatemala',
        'gu': 'Guam',
        'gw': 'Guinea-Bissau',
        'gy': 'Guyana',
        'hk': 'Hong Kong',
        'hm': 'Heard Island and McDonald Islands',
        'hn': 'Honduras',
        'hr': 'Croatia',
        'ht': 'Haiti',
        'hu': 'Hungary',
        'id': 'Indonesia',
        'ie': 'Ireland',
        'il': 'Israel',
        'im': 'Isle of Man',
        'in': 'India',
        'io': 'British Indian Ocean Territory',
        'iq': 'Iraq',
        'ir': 'Iran',
        'is': 'Iceland',
        'it': 'Italy',
        'je': 'Jersey',
        'jm': 'Jamaica',
        'jo': 'Jordan',
        'jp': 'Japan',
        'ke': 'Kenya',
        'kg': 'Kyrgyzstan',
        'kh': 'Cambodia',
        'ki': 'Kiribati',
        'km': 'Comoros',
        'kn': 'Saint Kitts and Nevis',
        'kp': 'North Korea',
        'kr': 'South Korea',
        'kw': 'Kuwait',
        'ky': 'Cayman Islands',
        'kz': 'Kazakhstan',
        'la': 'Laos',
        'lb': 'Lebanon',
        'lc': 'Saint Lucia',
        'li': 'Liechtenstein',
        'lk': 'Sri Lanka',
        'lr': 'Liberia',
        'ls': 'Lesotho',
        'lt': 'Lithuania',
        'lu': 'Luxembourg',
        'lv': 'Latvia',
        'ly': 'Libya',
        'ma': 'Morocco',
        'mc': 'Monaco',
        'md': 'Moldova',
        'me': 'Montenegro',
        'mg': 'Madagascar',
        'mh': 'Marshall Islands',
        'mk': 'North Macedonia',
        'ml': 'Mali',
        'mm': 'Myanmar',
        'mn': 'Mongolia',
        'mo': 'Macau',
        'mp': 'Northern Mariana Islands',
        'mq': 'Martinique',
        'mr': 'Mauritania',
        'ms': 'Montserrat',
        'mt': 'Malta',
        'mu': 'Mauritius',
        'mv': 'Maldives',
        'mw': 'Malawi',
        'mx': 'Mexico',
        'my': 'Malaysia',
        'mz': 'Mozambique',
        'na': 'Namibia',
        'nc': 'New Caledonia',
        'ne': 'Niger',
        'nf': 'Norfolk Island',
        'ng': 'Nigeria',
        'ni': 'Nicaragua',
        'nl': 'Netherlands',
        'no': 'Norway',
        'np': 'Nepal',
        'nr': 'Nauru',
        'nu': 'Niue',
        'nz': 'New Zealand',
        'om': 'Oman',
        'pa': 'Panama',
        'pe': 'Peru',
        'pf': 'French Polynesia',
        'pg': 'Papua New Guinea',
        'ph': 'Philippines',
        'pk': 'Pakistan',
        'pl': 'Poland',
        'pm': 'Saint-Pierre and Miquelon',
        'pn': 'Pitcairn Islands',
        'pr': 'Puerto Rico',
        'ps': 'Palestine',
        'pt': 'Portugal',
        'pw': 'Palau',
        'py': 'Paraguay',
        'qa': 'Qatar',
        're': 'Réunion',
        'ro': 'Romania',
        'rs': 'Serbia',
        'ru': 'Russia',
        'rw': 'Rwanda',
        'sa': 'Saudi Arabia',
        'sb': 'Solomon Islands',
        'sc': 'Seychelles',
        'sd': 'Sudan',
        'se': 'Sweden',
        'sg': 'Singapore',
        'sh': 'Saint Helena',
        'si': 'Slovenia',
        'sk': 'Slovakia',
        'sl': 'Sierra Leone',
        'sm': 'San Marino',
        'sn': 'Senegal',
        'so': 'Somalia',
        'sr': 'Suriname',
        'ss': 'South Sudan',
        'st': 'São Tomé and Príncipe',
        'su': 'Soviet Union',
        'sv': 'El Salvador',
        'sx': 'Sint Maarten',
        'sy': 'Syria',
        'sz': 'Eswatini',
        'tc': 'Turks and Caicos Islands',
        'td': 'Chad',
        'tf': 'French Southern and Antarctic Lands',
        'tg': 'Togo',
        'th': 'Thailand',
        'tj': 'Tajikistan',
        'tk': 'Tokelau',
        'tl': 'East Timor',
        'tm': 'Turkmenistan',
        'tn': 'Tunisia',
        'to': 'Tonga',
        'tr': 'Turkey',
        'tt': 'Trinidad and Tobago',
        'tv': 'Tuvalu',
        'tw': 'Taiwan',
        'tz': 'Tanzania',
        'ua': 'Ukraine',
        'ug': 'Uganda',
        'uk': 'United Kingdom',
        'us': 'United States of America',
        'uy': 'Uruguay',
        'uz': 'Uzbekistan',
        'va': 'Vatican City',
        'vc': 'Saint Vincent and the Grenadines',
        've': 'Venezuela',
        'vg': 'British Virgin Islands',
        'vi': 'United States Virgin Islands',
        'vn': 'Vietnam',
        'vu': 'Vanuatu',
        'wf': 'Wallis and Futuna',
        'ws': 'Samoa',
        'ye': 'Yemen',
        'yt': 'Mayotte',
        'za': 'South Africa',
        'zm': 'Zambia',
        'zw': 'Zimbabwe'
    });
    
	//list of all html letter html entities, needed for decoding
	var htmlEnts = Object.freeze({
		'&Tab;': 9,
		'&NewLine;': 10,
		'&excl;': 33,
		'&quot;': 34,
		'&QUOT;': 34,
		'&num;': 35,
		'&dollar;': 36,
		'&percnt;': 37,
		'&AMP;': 38,
		'&amp;': 38,
		'&apos;': 39,
		'&lpar;': 40,
		'&rpar;': 41,
		'&ast;': 42,
		'&midast;': 42,
		'&plus;': 43,
		'&comma;': 44,
		'&period;': 46,
		'&sol;': 47,
		'&colon;': 58,
		'&semi;': 59,
		'&lt;': 60,
		'&LT;': 60,
		'&equals;': 61,
		'&gt;': 62,
		'&GT;': 62,
		'&quest;': 63,
		'&commat;': 64,
		'&lsqb;': 91,
		'&lbrack;': 91,
		'&bsol;': 92,
		'&rsqb;': 93,
		'&rbrack;': 93,
		'&Hat;': 94,
		'&lowbar;': 95,
		'&grave;': 96,
		'&DiacriticalGrave;': 96,
		'&lcub;': 123,
		'&lbrace;': 123,
		'&verbar;': 124,
		'&vert;': 124,
		'&VerticalLine;': 124,
		'&rcub;': 125,
		'&rbrace;': 125,
		'&nbsp;': 160,
		'&NonBreakingSpace;': 160,
		'&iexcl;': 161,
		'&cent;': 162,
		'&pound;': 163,
		'&curren;': 164,
		'&yen;': 165,
		'&brvbar;': 166,
		'&sect;': 167,
		'&Dot;': 168,
		'&die;': 168,
		'&DoubleDot;': 168,
		'&uml;': 168,
		'&copy;': 169,
		'&COPY;': 169,
		'&ordf;': 170,
		'&laquo;': 171,
		'&not;': 172,
		'&shy;': 173,
		'&reg;': 174,
		'&circledR;': 174,
		'&REG;': 174,
		'&macr;': 175,
		'&OverBar;': 175,
		'&strns;': 175,
		'&deg;': 176,
		'&plusmn;': 177,
		'&pm;': 177,
		'&PlusMinus;': 177,
		'&sup2;': 178,
		'&sup3;': 179,
		'&acute;': 180,
		'&DiacriticalAcute;': 180,
		'&micro;': 181,
		'&para;': 182,
		'&middot;': 183,
		'&centerdot;': 183,
		'&CenterDot;': 183,
		'&cedil;': 184,
		'&Cedilla;': 184,
		'&sup1;': 185,
		'&ordm;': 186,
		'&raquo;': 187,
		'&frac14;': 188,
		'&frac12;': 189,
		'&half;': 189,
		'&frac34;': 190,
		'&iquest;': 191,
		'&Agrave;': 192,
		'&Aacute;': 193,
		'&Acirc;': 194,
		'&Atilde;': 195,
		'&Auml;': 196,
		'&Aring;': 197,
		'&AElig;': 198,
		'&Ccedil;': 199,
		'&Egrave;': 200,
		'&Eacute;': 201,
		'&Ecirc;': 202,
		'&Euml;': 203,
		'&Igrave;': 204,
		'&Iacute;': 205,
		'&Icirc;': 206,
		'&Iuml;': 207,
		'&ETH;': 208,
		'&Ntilde;': 209,
		'&Ograve;': 210,
		'&Oacute;': 211,
		'&Ocirc;': 212,
		'&Otilde;': 213,
		'&Ouml;': 214,
		'&times;': 215,
		'&Oslash;': 216,
		'&Ugrave;': 217,
		'&Uacute;': 218,
		'&Ucirc;': 219,
		'&Uuml;': 220,
		'&Yacute;': 221,
		'&THORN;': 222,
		'&szlig;': 223,
		'&agrave;': 224,
		'&aacute;': 225,
		'&acirc;': 226,
		'&atilde;': 227,
		'&auml;': 228,
		'&aring;': 229,
		'&aelig;': 230,
		'&ccedil;': 231,
		'&egrave;': 232,
		'&eacute;': 233,
		'&ecirc;': 234,
		'&euml;': 235,
		'&igrave;': 236,
		'&iacute;': 237,
		'&icirc;': 238,
		'&iuml;': 239,
		'&eth;': 240,
		'&ntilde;': 241,
		'&ograve;': 242,
		'&oacute;': 243,
		'&ocirc;': 244,
		'&otilde;': 245,
		'&ouml;': 246,
		'&divide;': 247,
		'&div;': 247,
		'&oslash;': 248,
		'&ugrave;': 249,
		'&uacute;': 250,
		'&ucirc;': 251,
		'&uuml;': 252,
		'&yacute;': 253,
		'&thorn;': 254,
		'&yuml;': 255,
		'&Amacr;': 256,
		'&amacr;': 257,
		'&Abreve;': 258,
		'&abreve;': 259,
		'&Aogon;': 260,
		'&aogon;': 261,
		'&Cacute;': 262,
		'&cacute;': 263,
		'&Ccirc;': 264,
		'&ccirc;': 265,
		'&Cdot;': 266,
		'&cdot;': 267,
		'&Ccaron;': 268,
		'&ccaron;': 269,
		'&Dcaron;': 270,
		'&dcaron;': 271,
		'&Dstrok;': 272,
		'&dstrok;': 273,
		'&Emacr;': 274,
		'&emacr;': 275,
		'&Edot;': 278,
		'&edot;': 279,
		'&Eogon;': 280,
		'&eogon;': 281,
		'&Ecaron;': 282,
		'&ecaron;': 283,
		'&Gcirc;': 284,
		'&gcirc;': 285,
		'&Gbreve;': 286,
		'&gbreve;': 287,
		'&Gdot;': 288,
		'&gdot;': 289,
		'&Gcedil;': 290,
		'&Hcirc;': 292,
		'&hcirc;': 293,
		'&Hstrok;': 294,
		'&hstrok;': 295,
		'&Itilde;': 296,
		'&itilde;': 297,
		'&Imacr;': 298,
		'&imacr;': 299,
		'&Iogon;': 302,
		'&iogon;': 303,
		'&Idot;': 304,
		'&imath;': 305,
		'&inodot;': 305,
		'&IJlig;': 306,
		'&ijlig;': 307,
		'&Jcirc;': 308,
		'&jcirc;': 309,
		'&Kcedil;': 310,
		'&kcedil;': 311,
		'&kgreen;': 312,
		'&Lacute;': 313,
		'&lacute;': 314,
		'&Lcedil;': 315,
		'&lcedil;': 316,
		'&Lcaron;': 317,
		'&lcaron;': 318,
		'&Lmidot;': 319,
		'&lmidot;': 320,
		'&Lstrok;': 321,
		'&lstrok;': 322,
		'&Nacute;': 323,
		'&nacute;': 324,
		'&Ncedil;': 325,
		'&ncedil;': 326,
		'&Ncaron;': 327,
		'&ncaron;': 328,
		'&napos;': 329,
		'&ENG;': 330,
		'&eng;': 331,
		'&Omacr;': 332,
		'&omacr;': 333,
		'&Odblac;': 336,
		'&odblac;': 337,
		'&OElig;': 338,
		'&oelig;': 339,
		'&Racute;': 340,
		'&racute;': 341,
		'&Rcedil;': 342,
		'&rcedil;': 343,
		'&Rcaron;': 344,
		'&rcaron;': 345,
		'&Sacute;': 346,
		'&sacute;': 347,
		'&Scirc;': 348,
		'&scirc;': 349,
		'&Scedil;': 350,
		'&scedil;': 351,
		'&Scaron;': 352,
		'&scaron;': 353,
		'&Tcedil;': 354,
		'&tcedil;': 355,
		'&Tcaron;': 356,
		'&tcaron;': 357,
		'&Tstrok;': 358,
		'&tstrok;': 359,
		'&Utilde;': 360,
		'&utilde;': 361,
		'&Umacr;': 362,
		'&umacr;': 363,
		'&Ubreve;': 364,
		'&ubreve;': 365,
		'&Uring;': 366,
		'&uring;': 367,
		'&Udblac;': 368,
		'&udblac;': 369,
		'&Uogon;': 370,
		'&uogon;': 371,
		'&Wcirc;': 372,
		'&wcirc;': 373,
		'&Ycirc;': 374,
		'&ycirc;': 375,
		'&Yuml;': 376,
		'&Zacute;': 377,
		'&zacute;': 378,
		'&Zdot;': 379,
		'&zdot;': 380,
		'&Zcaron;': 381,
		'&zcaron;': 382,
		'&fnof;': 402,
		'&imped;': 437,
		'&gacute;': 501,
		'&jmath;': 567,
		'&circ;': 710,
		'&caron;': 711,
		'&Hacek;': 711,
		'&breve;': 728,
		'&Breve;': 728,
		'&dot;': 729,
		'&DiacriticalDot;': 729,
		'&ring;': 730,
		'&ogon;': 731,
		'&tilde;': 732,
		'&DiacriticalTilde;': 732,
		'&dblac;': 733,
		'&DiacriticalDoubleAcute;': 733,
		'&DownBreve;': 785,
		'&UnderBar;': 818,
		'&Alpha;': 913,
		'&Beta;': 914,
		'&Gamma;': 915,
		'&Delta;': 916,
		'&Epsilon;': 917,
		'&Zeta;': 918,
		'&Eta;': 919,
		'&Theta;': 920,
		'&Iota;': 921,
		'&Kappa;': 922,
		'&Lambda;': 923,
		'&Mu;': 924,
		'&Nu;': 925,
		'&Xi;': 926,
		'&Omicron;': 927,
		'&Pi;': 928,
		'&Rho;': 929,
		'&Sigma;': 931,
		'&Tau;': 932,
		'&Upsilon;': 933,
		'&Phi;': 934,
		'&Chi;': 935,
		'&Psi;': 936,
		'&Omega;': 937,
		'&alpha;': 945,
		'&beta;': 946,
		'&gamma;': 947,
		'&delta;': 948,
		'&epsiv;': 949,
		'&varepsilon;': 949,
		'&epsilon;': 949,
		'&zeta;': 950,
		'&eta;': 951,
		'&theta;': 952,
		'&iota;': 953,
		'&kappa;': 954,
		'&lambda;': 955,
		'&mu;': 956,
		'&nu;': 957,
		'&xi;': 958,
		'&omicron;': 959,
		'&pi;': 960,
		'&rho;': 961,
		'&sigmav;': 962,
		'&varsigma;': 962,
		'&sigmaf;': 962,
		'&sigma;': 963,
		'&tau;': 964,
		'&upsi;': 965,
		'&upsilon;': 965,
		'&phi;': 966,
		'&phiv;': 966,
		'&varphi;': 966,
		'&chi;': 967,
		'&psi;': 968,
		'&omega;': 969,
		'&thetav;': 977,
		'&vartheta;': 977,
		'&thetasym;': 977,
		'&Upsi;': 978,
		'&upsih;': 978,
		'&straightphi;': 981,
		'&piv;': 982,
		'&varpi;': 982,
		'&Gammad;': 988,
		'&gammad;': 989,
		'&digamma;': 989,
		'&kappav;': 1008,
		'&varkappa;': 1008,
		'&rhov;': 1009,
		'&varrho;': 1009,
		'&epsi;': 1013,
		'&straightepsilon;': 1013,
		'&bepsi;': 1014,
		'&backepsilon;': 1014,
		'&IOcy;': 1025,
		'&DJcy;': 1026,
		'&GJcy;': 1027,
		'&Jukcy;': 1028,
		'&DScy;': 1029,
		'&Iukcy;': 1030,
		'&YIcy;': 1031,
		'&Jsercy;': 1032,
		'&LJcy;': 1033,
		'&NJcy;': 1034,
		'&TSHcy;': 1035,
		'&KJcy;': 1036,
		'&Ubrcy;': 1038,
		'&DZcy;': 1039,
		'&Acy;': 1040,
		'&Bcy;': 1041,
		'&Vcy;': 1042,
		'&Gcy;': 1043,
		'&Dcy;': 1044,
		'&IEcy;': 1045,
		'&ZHcy;': 1046,
		'&Zcy;': 1047,
		'&Icy;': 1048,
		'&Jcy;': 1049,
		'&Kcy;': 1050,
		'&Lcy;': 1051,
		'&Mcy;': 1052,
		'&Ncy;': 1053,
		'&Ocy;': 1054,
		'&Pcy;': 1055,
		'&Rcy;': 1056,
		'&Scy;': 1057,
		'&Tcy;': 1058,
		'&Ucy;': 1059,
		'&Fcy;': 1060,
		'&KHcy;': 1061,
		'&TScy;': 1062,
		'&CHcy;': 1063,
		'&SHcy;': 1064,
		'&SHCHcy;': 1065,
		'&HARDcy;': 1066,
		'&Ycy;': 1067,
		'&SOFTcy;': 1068,
		'&Ecy;': 1069,
		'&YUcy;': 1070,
		'&YAcy;': 1071,
		'&acy;': 1072,
		'&bcy;': 1073,
		'&vcy;': 1074,
		'&gcy;': 1075,
		'&dcy;': 1076,
		'&iecy;': 1077,
		'&zhcy;': 1078,
		'&zcy;': 1079,
		'&icy;': 1080,
		'&jcy;': 1081,
		'&kcy;': 1082,
		'&lcy;': 1083,
		'&mcy;': 1084,
		'&ncy;': 1085,
		'&ocy;': 1086,
		'&pcy;': 1087,
		'&rcy;': 1088,
		'&scy;': 1089,
		'&tcy;': 1090,
		'&ucy;': 1091,
		'&fcy;': 1092,
		'&khcy;': 1093,
		'&tscy;': 1094,
		'&chcy;': 1095,
		'&shcy;': 1096,
		'&shchcy;': 1097,
		'&hardcy;': 1098,
		'&ycy;': 1099,
		'&softcy;': 1100,
		'&ecy;': 1101,
		'&yucy;': 1102,
		'&yacy;': 1103,
		'&iocy;': 1105,
		'&djcy;': 1106,
		'&gjcy;': 1107,
		'&jukcy;': 1108,
		'&dscy;': 1109,
		'&iukcy;': 1110,
		'&yicy;': 1111,
		'&jsercy;': 1112,
		'&ljcy;': 1113,
		'&njcy;': 1114,
		'&tshcy;': 1115,
		'&kjcy;': 1116,
		'&ubrcy;': 1118,
		'&dzcy;': 1119,
		'&ensp;': 8194,
		'&emsp;': 8195,
		'&emsp13;': 8196,
		'&emsp14;': 8197,
		'&numsp;': 8199,
		'&puncsp;': 8200,
		'&thinsp;': 8201,
		'&ThinSpace;': 8201,
		'&hairsp;': 8202,
		'&VeryThinSpace;': 8202,
		'&ZeroWidthSpace;': 8203,
		'&NegativeVeryThinSpace;': 8203,
		'&NegativeThinSpace;': 8203,
		'&NegativeMediumSpace;': 8203,
		'&NegativeThickSpace;': 8203,
		'&zwnj;': 8204,
		'&zwj;': 8205,
		'&lrm;': 8206,
		'&rlm;': 8207,
		'&hyphen;': 8208,
		'&dash;': 8208,
		'&ndash;': 8211,
		'&mdash;': 8212,
		'&horbar;': 8213,
		'&Verbar;': 8214,
		'&Vert;': 8214,
		'&lsquo;': 8216,
		'&OpenCurlyQuote;': 8216,
		'&rsquo;': 8217,
		'&rsquor;': 8217,
		'&CloseCurlyQuote;': 8217,
		'&lsquor;': 8218,
		'&sbquo;': 8218,
		'&ldquo;': 8220,
		'&OpenCurlyDoubleQuote;': 8220,
		'&rdquo;': 8221,
		'&rdquor;': 8221,
		'&CloseCurlyDoubleQuote;': 8221,
		'&ldquor;': 8222,
		'&bdquo;': 8222,
		'&dagger;': 8224,
		'&Dagger;': 8225,
		'&ddagger;': 8225,
		'&bull;': 8226,
		'&bullet;': 8226,
		'&nldr;': 8229,
		'&hellip;': 8230,
		'&mldr;': 8230,
		'&permil;': 8240,
		'&pertenk;': 8241,
		'&prime;': 8242,
		'&Prime;': 8243,
		'&tprime;': 8244,
		'&bprime;': 8245,
		'&backprime;': 8245,
		'&lsaquo;': 8249,
		'&rsaquo;': 8250,
		'&oline;': 8254,
		'&caret;': 8257,
		'&hybull;': 8259,
		'&frasl;': 8260,
		'&bsemi;': 8271,
		'&qprime;': 8279,
		'&MediumSpace;': 8287,
		'&NoBreak;': 8288,
		'&ApplyFunction;': 8289,
		'&af;': 8289,
		'&InvisibleTimes;': 8290,
		'&it;': 8290,
		'&InvisibleComma;': 8291,
		'&ic;': 8291,
		'&euro;': 8364,
		'&tdot;': 8411,
		'&TripleDot;': 8411,
		'&DotDot;': 8412,
		'&Copf;': 8450,
		'&complexes;': 8450,
		'&incare;': 8453,
		'&gscr;': 8458,
		'&hamilt;': 8459,
		'&HilbertSpace;': 8459,
		'&Hscr;': 8459,
		'&Hfr;': 8460,
		'&Poincareplane;': 8460,
		'&quaternions;': 8461,
		'&Hopf;': 8461,
		'&planckh;': 8462,
		'&planck;': 8463,
		'&hbar;': 8463,
		'&plankv;': 8463,
		'&hslash;': 8463,
		'&Iscr;': 8464,
		'&imagline;': 8464,
		'&image;': 8465,
		'&Im;': 8465,
		'&imagpart;': 8465,
		'&Ifr;': 8465,
		'&Lscr;': 8466,
		'&lagran;': 8466,
		'&Laplacetrf;': 8466,
		'&ell;': 8467,
		'&Nopf;': 8469,
		'&naturals;': 8469,
		'&numero;': 8470,
		'&copysr;': 8471,
		'&weierp;': 8472,
		'&wp;': 8472,
		'&Popf;': 8473,
		'&primes;': 8473,
		'&rationals;': 8474,
		'&Qopf;': 8474,
		'&Rscr;': 8475,
		'&realine;': 8475,
		'&real;': 8476,
		'&Re;': 8476,
		'&realpart;': 8476,
		'&Rfr;': 8476,
		'&reals;': 8477,
		'&Ropf;': 8477,
		'&rx;': 8478,
		'&trade;': 8482,
		'&TRADE;': 8482,
		'&integers;': 8484,
		'&Zopf;': 8484,
		'&ohm;': 8486,
		'&mho;': 8487,
		'&Zfr;': 8488,
		'&zeetrf;': 8488,
		'&iiota;': 8489,
		'&angst;': 8491,
		'&bernou;': 8492,
		'&Bernoullis;': 8492,
		'&Bscr;': 8492,
		'&Cfr;': 8493,
		'&Cayleys;': 8493,
		'&escr;': 8495,
		'&Escr;': 8496,
		'&expectation;': 8496,
		'&Fscr;': 8497,
		'&Fouriertrf;': 8497,
		'&phmmat;': 8499,
		'&Mellintrf;': 8499,
		'&Mscr;': 8499,
		'&order;': 8500,
		'&orderof;': 8500,
		'&oscr;': 8500,
		'&alefsym;': 8501,
		'&aleph;': 8501,
		'&beth;': 8502,
		'&gimel;': 8503,
		'&daleth;': 8504,
		'&CapitalDifferentialD;': 8517,
		'&DD;': 8517,
		'&DifferentialD;': 8518,
		'&dd;': 8518,
		'&ExponentialE;': 8519,
		'&exponentiale;': 8519,
		'&ee;': 8519,
		'&ImaginaryI;': 8520,
		'&ii;': 8520,
		'&frac13;': 8531,
		'&frac23;': 8532,
		'&frac15;': 8533,
		'&frac25;': 8534,
		'&frac35;': 8535,
		'&frac45;': 8536,
		'&frac16;': 8537,
		'&frac56;': 8538,
		'&frac18;': 8539,
		'&frac38;': 8540,
		'&frac58;': 8541,
		'&frac78;': 8542,
		'&larr;': 8592,
		'&leftarrow;': 8592,
		'&LeftArrow;': 8592,
		'&slarr;': 8592,
		'&ShortLeftArrow;': 8592,
		'&uarr;': 8593,
		'&uparrow;': 8593,
		'&UpArrow;': 8593,
		'&ShortUpArrow;': 8593,
		'&rarr;': 8594,
		'&rightarrow;': 8594,
		'&RightArrow;': 8594,
		'&srarr;': 8594,
		'&ShortRightArrow;': 8594,
		'&darr;': 8595,
		'&downarrow;': 8595,
		'&DownArrow;': 8595,
		'&ShortDownArrow;': 8595,
		'&harr;': 8596,
		'&leftrightarrow;': 8596,
		'&LeftRightArrow;': 8596,
		'&varr;': 8597,
		'&updownarrow;': 8597,
		'&UpDownArrow;': 8597,
		'&nwarr;': 8598,
		'&UpperLeftArrow;': 8598,
		'&nwarrow;': 8598,
		'&nearr;': 8599,
		'&UpperRightArrow;': 8599,
		'&nearrow;': 8599,
		'&searr;': 8600,
		'&searrow;': 8600,
		'&LowerRightArrow;': 8600,
		'&swarr;': 8601,
		'&swarrow;': 8601,
		'&LowerLeftArrow;': 8601,
		'&nlarr;': 8602,
		'&nleftarrow;': 8602,
		'&nrarr;': 8603,
		'&nrightarrow;': 8603,
		'&rarrw;': 8605,
		'&rightsquigarrow;': 8605,
		'&Larr;': 8606,
		'&twoheadleftarrow;': 8606,
		'&Uarr;': 8607,
		'&Rarr;': 8608,
		'&twoheadrightarrow;': 8608,
		'&Darr;': 8609,
		'&larrtl;': 8610,
		'&leftarrowtail;': 8610,
		'&rarrtl;': 8611,
		'&rightarrowtail;': 8611,
		'&LeftTeeArrow;': 8612,
		'&mapstoleft;': 8612,
		'&UpTeeArrow;': 8613,
		'&mapstoup;': 8613,
		'&map;': 8614,
		'&RightTeeArrow;': 8614,
		'&mapsto;': 8614,
		'&DownTeeArrow;': 8615,
		'&mapstodown;': 8615,
		'&larrhk;': 8617,
		'&hookleftarrow;': 8617,
		'&rarrhk;': 8618,
		'&hookrightarrow;': 8618,
		'&larrlp;': 8619,
		'&looparrowleft;': 8619,
		'&rarrlp;': 8620,
		'&looparrowright;': 8620,
		'&harrw;': 8621,
		'&leftrightsquigarrow;': 8621,
		'&nharr;': 8622,
		'&nleftrightarrow;': 8622,
		'&lsh;': 8624,
		'&Lsh;': 8624,
		'&rsh;': 8625,
		'&Rsh;': 8625,
		'&ldsh;': 8626,
		'&rdsh;': 8627,
		'&crarr;': 8629,
		'&cularr;': 8630,
		'&curvearrowleft;': 8630,
		'&curarr;': 8631,
		'&curvearrowright;': 8631,
		'&olarr;': 8634,
		'&circlearrowleft;': 8634,
		'&orarr;': 8635,
		'&circlearrowright;': 8635,
		'&lharu;': 8636,
		'&LeftVector;': 8636,
		'&leftharpoonup;': 8636,
		'&lhard;': 8637,
		'&leftharpoondown;': 8637,
		'&DownLeftVector;': 8637,
		'&uharr;': 8638,
		'&upharpoonright;': 8638,
		'&RightUpVector;': 8638,
		'&uharl;': 8639,
		'&upharpoonleft;': 8639,
		'&LeftUpVector;': 8639,
		'&rharu;': 8640,
		'&RightVector;': 8640,
		'&rightharpoonup;': 8640,
		'&rhard;': 8641,
		'&rightharpoondown;': 8641,
		'&DownRightVector;': 8641,
		'&dharr;': 8642,
		'&RightDownVector;': 8642,
		'&downharpoonright;': 8642,
		'&dharl;': 8643,
		'&LeftDownVector;': 8643,
		'&downharpoonleft;': 8643,
		'&rlarr;': 8644,
		'&rightleftarrows;': 8644,
		'&RightArrowLeftArrow;': 8644,
		'&udarr;': 8645,
		'&UpArrowDownArrow;': 8645,
		'&lrarr;': 8646,
		'&leftrightarrows;': 8646,
		'&LeftArrowRightArrow;': 8646,
		'&llarr;': 8647,
		'&leftleftarrows;': 8647,
		'&uuarr;': 8648,
		'&upuparrows;': 8648,
		'&rrarr;': 8649,
		'&rightrightarrows;': 8649,
		'&ddarr;': 8650,
		'&downdownarrows;': 8650,
		'&lrhar;': 8651,
		'&ReverseEquilibrium;': 8651,
		'&leftrightharpoons;': 8651,
		'&rlhar;': 8652,
		'&rightleftharpoons;': 8652,
		'&Equilibrium;': 8652,
		'&nlArr;': 8653,
		'&nLeftarrow;': 8653,
		'&nhArr;': 8654,
		'&nLeftrightarrow;': 8654,
		'&nrArr;': 8655,
		'&nRightarrow;': 8655,
		'&lArr;': 8656,
		'&Leftarrow;': 8656,
		'&DoubleLeftArrow;': 8656,
		'&uArr;': 8657,
		'&Uparrow;': 8657,
		'&DoubleUpArrow;': 8657,
		'&rArr;': 8658,
		'&Rightarrow;': 8658,
		'&Implies;': 8658,
		'&DoubleRightArrow;': 8658,
		'&dArr;': 8659,
		'&Downarrow;': 8659,
		'&DoubleDownArrow;': 8659,
		'&hArr;': 8660,
		'&Leftrightarrow;': 8660,
		'&DoubleLeftRightArrow;': 8660,
		'&iff;': 8660,
		'&vArr;': 8661,
		'&Updownarrow;': 8661,
		'&DoubleUpDownArrow;': 8661,
		'&nwArr;': 8662,
		'&neArr;': 8663,
		'&seArr;': 8664,
		'&swArr;': 8665,
		'&lAarr;': 8666,
		'&Lleftarrow;': 8666,
		'&rAarr;': 8667,
		'&Rrightarrow;': 8667,
		'&zigrarr;': 8669,
		'&larrb;': 8676,
		'&LeftArrowBar;': 8676,
		'&rarrb;': 8677,
		'&RightArrowBar;': 8677,
		'&duarr;': 8693,
		'&DownArrowUpArrow;': 8693,
		'&loarr;': 8701,
		'&roarr;': 8702,
		'&hoarr;': 8703,
		'&forall;': 8704,
		'&ForAll;': 8704,
		'&comp;': 8705,
		'&complement;': 8705,
		'&part;': 8706,
		'&PartialD;': 8706,
		'&exist;': 8707,
		'&Exists;': 8707,
		'&nexist;': 8708,
		'&NotExists;': 8708,
		'&nexists;': 8708,
		'&empty;': 8709,
		'&emptyset;': 8709,
		'&emptyv;': 8709,
		'&varnothing;': 8709,
		'&nabla;': 8711,
		'&Del;': 8711,
		'&isin;': 8712,
		'&isinv;': 8712,
		'&Element;': 8712,
		'&in;': 8712,
		'&notin;': 8713,
		'&NotElement;': 8713,
		'&notinva;': 8713,
		'&niv;': 8715,
		'&ReverseElement;': 8715,
		'&ni;': 8715,
		'&SuchThat;': 8715,
		'&notni;': 8716,
		'&notniva;': 8716,
		'&NotReverseElement;': 8716,
		'&prod;': 8719,
		'&Product;': 8719,
		'&coprod;': 8720,
		'&Coproduct;': 8720,
		'&sum;': 8721,
		'&Sum;': 8721,
		'&minus;': 8722,
		'&mnplus;': 8723,
		'&mp;': 8723,
		'&MinusPlus;': 8723,
		'&plusdo;': 8724,
		'&dotplus;': 8724,
		'&setmn;': 8726,
		'&setminus;': 8726,
		'&Backslash;': 8726,
		'&ssetmn;': 8726,
		'&smallsetminus;': 8726,
		'&lowast;': 8727,
		'&compfn;': 8728,
		'&SmallCircle;': 8728,
		'&radic;': 8730,
		'&Sqrt;': 8730,
		'&prop;': 8733,
		'&propto;': 8733,
		'&Proportional;': 8733,
		'&vprop;': 8733,
		'&varpropto;': 8733,
		'&infin;': 8734,
		'&angrt;': 8735,
		'&ang;': 8736,
		'&angle;': 8736,
		'&angmsd;': 8737,
		'&measuredangle;': 8737,
		'&angsph;': 8738,
		'&mid;': 8739,
		'&VerticalBar;': 8739,
		'&smid;': 8739,
		'&shortmid;': 8739,
		'&nmid;': 8740,
		'&NotVerticalBar;': 8740,
		'&nsmid;': 8740,
		'&nshortmid;': 8740,
		'&par;': 8741,
		'&parallel;': 8741,
		'&DoubleVerticalBar;': 8741,
		'&spar;': 8741,
		'&shortparallel;': 8741,
		'&npar;': 8742,
		'&nparallel;': 8742,
		'&NotDoubleVerticalBar;': 8742,
		'&nspar;': 8742,
		'&nshortparallel;': 8742,
		'&and;': 8743,
		'&wedge;': 8743,
		'&or;': 8744,
		'&vee;': 8744,
		'&cap;': 8745,
		'&cup;': 8746,
		'&int;': 8747,
		'&Integral;': 8747,
		'&Int;': 8748,
		'&tint;': 8749,
		'&iiint;': 8749,
		'&conint;': 8750,
		'&oint;': 8750,
		'&ContourIntegral;': 8750,
		'&Conint;': 8751,
		'&DoubleContourIntegral;': 8751,
		'&Cconint;': 8752,
		'&cwint;': 8753,
		'&cwconint;': 8754,
		'&ClockwiseContourIntegral;': 8754,
		'&awconint;': 8755,
		'&CounterClockwiseContourIntegral;': 8755,
		'&there4;': 8756,
		'&therefore;': 8756,
		'&Therefore;': 8756,
		'&becaus;': 8757,
		'&because;': 8757,
		'&Because;': 8757,
		'&ratio;': 8758,
		'&Colon;': 8759,
		'&Proportion;': 8759,
		'&minusd;': 8760,
		'&dotminus;': 8760,
		'&mDDot;': 8762,
		'&homtht;': 8763,
		'&sim;': 8764,
		'&Tilde;': 8764,
		'&thksim;': 8764,
		'&thicksim;': 8764,
		'&bsim;': 8765,
		'&backsim;': 8765,
		'&ac;': 8766,
		'&mstpos;': 8766,
		'&acd;': 8767,
		'&wreath;': 8768,
		'&VerticalTilde;': 8768,
		'&wr;': 8768,
		'&nsim;': 8769,
		'&NotTilde;': 8769,
		'&esim;': 8770,
		'&EqualTilde;': 8770,
		'&eqsim;': 8770,
		'&sime;': 8771,
		'&TildeEqual;': 8771,
		'&simeq;': 8771,
		'&nsime;': 8772,
		'&nsimeq;': 8772,
		'&NotTildeEqual;': 8772,
		'&cong;': 8773,
		'&TildeFullEqual;': 8773,
		'&simne;': 8774,
		'&ncong;': 8775,
		'&NotTildeFullEqual;': 8775,
		'&asymp;': 8776,
		'&ap;': 8776,
		'&TildeTilde;': 8776,
		'&approx;': 8776,
		'&thkap;': 8776,
		'&thickapprox;': 8776,
		'&nap;': 8777,
		'&NotTildeTilde;': 8777,
		'&napprox;': 8777,
		'&ape;': 8778,
		'&approxeq;': 8778,
		'&apid;': 8779,
		'&bcong;': 8780,
		'&backcong;': 8780,
		'&asympeq;': 8781,
		'&CupCap;': 8781,
		'&bump;': 8782,
		'&HumpDownHump;': 8782,
		'&Bumpeq;': 8782,
		'&bumpe;': 8783,
		'&HumpEqual;': 8783,
		'&bumpeq;': 8783,
		'&esdot;': 8784,
		'&DotEqual;': 8784,
		'&doteq;': 8784,
		'&eDot;': 8785,
		'&doteqdot;': 8785,
		'&efDot;': 8786,
		'&fallingdotseq;': 8786,
		'&erDot;': 8787,
		'&risingdotseq;': 8787,
		'&colone;': 8788,
		'&coloneq;': 8788,
		'&Assign;': 8788,
		'&ecolon;': 8789,
		'&eqcolon;': 8789,
		'&ecir;': 8790,
		'&eqcirc;': 8790,
		'&cire;': 8791,
		'&circeq;': 8791,
		'&wedgeq;': 8793,
		'&veeeq;': 8794,
		'&trie;': 8796,
		'&triangleq;': 8796,
		'&equest;': 8799,
		'&questeq;': 8799,
		'&ne;': 8800,
		'&NotEqual;': 8800,
		'&equiv;': 8801,
		'&Congruent;': 8801,
		'&nequiv;': 8802,
		'&NotCongruent;': 8802,
		'&le;': 8804,
		'&leq;': 8804,
		'&ge;': 8805,
		'&GreaterEqual;': 8805,
		'&geq;': 8805,
		'&lE;': 8806,
		'&LessFullEqual;': 8806,
		'&leqq;': 8806,
		'&gE;': 8807,
		'&GreaterFullEqual;': 8807,
		'&geqq;': 8807,
		'&lnE;': 8808,
		'&lneqq;': 8808,
		'&gnE;': 8809,
		'&gneqq;': 8809,
		'&Lt;': 8810,
		'&NestedLessLess;': 8810,
		'&ll;': 8810,
		'&Gt;': 8811,
		'&NestedGreaterGreater;': 8811,
		'&gg;': 8811,
		'&twixt;': 8812,
		'&between;': 8812,
		'&NotCupCap;': 8813,
		'&nlt;': 8814,
		'&NotLess;': 8814,
		'&nless;': 8814,
		'&ngt;': 8815,
		'&NotGreater;': 8815,
		'&ngtr;': 8815,
		'&nle;': 8816,
		'&NotLessEqual;': 8816,
		'&nleq;': 8816,
		'&nge;': 8817,
		'&NotGreaterEqual;': 8817,
		'&ngeq;': 8817,
		'&lsim;': 8818,
		'&LessTilde;': 8818,
		'&lesssim;': 8818,
		'&gsim;': 8819,
		'&gtrsim;': 8819,
		'&GreaterTilde;': 8819,
		'&nlsim;': 8820,
		'&NotLessTilde;': 8820,
		'&ngsim;': 8821,
		'&NotGreaterTilde;': 8821,
		'&lg;': 8822,
		'&lessgtr;': 8822,
		'&LessGreater;': 8822,
		'&gl;': 8823,
		'&gtrless;': 8823,
		'&GreaterLess;': 8823,
		'&ntlg;': 8824,
		'&NotLessGreater;': 8824,
		'&ntgl;': 8825,
		'&NotGreaterLess;': 8825,
		'&pr;': 8826,
		'&Precedes;': 8826,
		'&prec;': 8826,
		'&sc;': 8827,
		'&Succeeds;': 8827,
		'&succ;': 8827,
		'&prcue;': 8828,
		'&PrecedesSlantEqual;': 8828,
		'&preccurlyeq;': 8828,
		'&sccue;': 8829,
		'&SucceedsSlantEqual;': 8829,
		'&succcurlyeq;': 8829,
		'&prsim;': 8830,
		'&precsim;': 8830,
		'&PrecedesTilde;': 8830,
		'&scsim;': 8831,
		'&succsim;': 8831,
		'&SucceedsTilde;': 8831,
		'&npr;': 8832,
		'&nprec;': 8832,
		'&NotPrecedes;': 8832,
		'&nsc;': 8833,
		'&nsucc;': 8833,
		'&NotSucceeds;': 8833,
		'&sub;': 8834,
		'&subset;': 8834,
		'&sup;': 8835,
		'&supset;': 8835,
		'&Superset;': 8835,
		'&nsub;': 8836,
		'&nsup;': 8837,
		'&sube;': 8838,
		'&SubsetEqual;': 8838,
		'&subseteq;': 8838,
		'&supe;': 8839,
		'&supseteq;': 8839,
		'&SupersetEqual;': 8839,
		'&nsube;': 8840,
		'&nsubseteq;': 8840,
		'&NotSubsetEqual;': 8840,
		'&nsupe;': 8841,
		'&nsupseteq;': 8841,
		'&NotSupersetEqual;': 8841,
		'&subne;': 8842,
		'&subsetneq;': 8842,
		'&supne;': 8843,
		'&supsetneq;': 8843,
		'&cupdot;': 8845,
		'&uplus;': 8846,
		'&UnionPlus;': 8846,
		'&sqsub;': 8847,
		'&SquareSubset;': 8847,
		'&sqsubset;': 8847,
		'&sqsup;': 8848,
		'&SquareSuperset;': 8848,
		'&sqsupset;': 8848,
		'&sqsube;': 8849,
		'&SquareSubsetEqual;': 8849,
		'&sqsubseteq;': 8849,
		'&sqsupe;': 8850,
		'&SquareSupersetEqual;': 8850,
		'&sqsupseteq;': 8850,
		'&sqcap;': 8851,
		'&SquareIntersection;': 8851,
		'&sqcup;': 8852,
		'&SquareUnion;': 8852,
		'&oplus;': 8853,
		'&CirclePlus;': 8853,
		'&ominus;': 8854,
		'&CircleMinus;': 8854,
		'&otimes;': 8855,
		'&CircleTimes;': 8855,
		'&osol;': 8856,
		'&odot;': 8857,
		'&CircleDot;': 8857,
		'&ocir;': 8858,
		'&circledcirc;': 8858,
		'&oast;': 8859,
		'&circledast;': 8859,
		'&odash;': 8861,
		'&circleddash;': 8861,
		'&plusb;': 8862,
		'&boxplus;': 8862,
		'&minusb;': 8863,
		'&boxminus;': 8863,
		'&timesb;': 8864,
		'&boxtimes;': 8864,
		'&sdotb;': 8865,
		'&dotsquare;': 8865,
		'&vdash;': 8866,
		'&RightTee;': 8866,
		'&dashv;': 8867,
		'&LeftTee;': 8867,
		'&top;': 8868,
		'&DownTee;': 8868,
		'&bottom;': 8869,
		'&bot;': 8869,
		'&perp;': 8869,
		'&UpTee;': 8869,
		'&models;': 8871,
		'&vDash;': 8872,
		'&DoubleRightTee;': 8872,
		'&Vdash;': 8873,
		'&Vvdash;': 8874,
		'&VDash;': 8875,
		'&nvdash;': 8876,
		'&nvDash;': 8877,
		'&nVdash;': 8878,
		'&nVDash;': 8879,
		'&prurel;': 8880,
		'&vltri;': 8882,
		'&vartriangleleft;': 8882,
		'&LeftTriangle;': 8882,
		'&vrtri;': 8883,
		'&vartriangleright;': 8883,
		'&RightTriangle;': 8883,
		'&ltrie;': 8884,
		'&trianglelefteq;': 8884,
		'&LeftTriangleEqual;': 8884,
		'&rtrie;': 8885,
		'&trianglerighteq;': 8885,
		'&RightTriangleEqual;': 8885,
		'&origof;': 8886,
		'&imof;': 8887,
		'&mumap;': 8888,
		'&multimap;': 8888,
		'&hercon;': 8889,
		'&intcal;': 8890,
		'&intercal;': 8890,
		'&veebar;': 8891,
		'&barvee;': 8893,
		'&angrtvb;': 8894,
		'&lrtri;': 8895,
		'&xwedge;': 8896,
		'&Wedge;': 8896,
		'&bigwedge;': 8896,
		'&xvee;': 8897,
		'&Vee;': 8897,
		'&bigvee;': 8897,
		'&xcap;': 8898,
		'&Intersection;': 8898,
		'&bigcap;': 8898,
		'&xcup;': 8899,
		'&Union;': 8899,
		'&bigcup;': 8899,
		'&diam;': 8900,
		'&diamond;': 8900,
		'&Diamond;': 8900,
		'&sdot;': 8901,
		'&sstarf;': 8902,
		'&Star;': 8902,
		'&divonx;': 8903,
		'&divideontimes;': 8903,
		'&bowtie;': 8904,
		'&ltimes;': 8905,
		'&rtimes;': 8906,
		'&lthree;': 8907,
		'&leftthreetimes;': 8907,
		'&rthree;': 8908,
		'&rightthreetimes;': 8908,
		'&bsime;': 8909,
		'&backsimeq;': 8909,
		'&cuvee;': 8910,
		'&curlyvee;': 8910,
		'&cuwed;': 8911,
		'&curlywedge;': 8911,
		'&Sub;': 8912,
		'&Subset;': 8912,
		'&Sup;': 8913,
		'&Supset;': 8913,
		'&Cap;': 8914,
		'&Cup;': 8915,
		'&fork;': 8916,
		'&pitchfork;': 8916,
		'&epar;': 8917,
		'&ltdot;': 8918,
		'&lessdot;': 8918,
		'&gtdot;': 8919,
		'&gtrdot;': 8919,
		'&Ll;': 8920,
		'&Gg;': 8921,
		'&ggg;': 8921,
		'&leg;': 8922,
		'&LessEqualGreater;': 8922,
		'&lesseqgtr;': 8922,
		'&gel;': 8923,
		'&gtreqless;': 8923,
		'&GreaterEqualLess;': 8923,
		'&cuepr;': 8926,
		'&curlyeqprec;': 8926,
		'&cuesc;': 8927,
		'&curlyeqsucc;': 8927,
		'&nprcue;': 8928,
		'&NotPrecedesSlantEqual;': 8928,
		'&nsccue;': 8929,
		'&NotSucceedsSlantEqual;': 8929,
		'&nsqsube;': 8930,
		'&NotSquareSubsetEqual;': 8930,
		'&nsqsupe;': 8931,
		'&NotSquareSupersetEqual;': 8931,
		'&lnsim;': 8934,
		'&gnsim;': 8935,
		'&prnsim;': 8936,
		'&precnsim;': 8936,
		'&scnsim;': 8937,
		'&succnsim;': 8937,
		'&nltri;': 8938,
		'&ntriangleleft;': 8938,
		'&NotLeftTriangle;': 8938,
		'&nrtri;': 8939,
		'&ntriangleright;': 8939,
		'&NotRightTriangle;': 8939,
		'&nltrie;': 8940,
		'&ntrianglelefteq;': 8940,
		'&NotLeftTriangleEqual;': 8940,
		'&nrtrie;': 8941,
		'&ntrianglerighteq;': 8941,
		'&NotRightTriangleEqual;': 8941,
		'&vellip;': 8942,
		'&ctdot;': 8943,
		'&utdot;': 8944,
		'&dtdot;': 8945,
		'&disin;': 8946,
		'&isinsv;': 8947,
		'&isins;': 8948,
		'&isindot;': 8949,
		'&notinvc;': 8950,
		'&notinvb;': 8951,
		'&isinE;': 8953,
		'&nisd;': 8954,
		'&xnis;': 8955,
		'&nis;': 8956,
		'&notnivc;': 8957,
		'&notnivb;': 8958,
		'&barwed;': 8965,
		'&barwedge;': 8965,
		'&Barwed;': 8966,
		'&doublebarwedge;': 8966,
		'&lceil;': 8968,
		'&LeftCeiling;': 8968,
		'&rceil;': 8969,
		'&RightCeiling;': 8969,
		'&lfloor;': 8970,
		'&LeftFloor;': 8970,
		'&rfloor;': 8971,
		'&RightFloor;': 8971,
		'&drcrop;': 8972,
		'&dlcrop;': 8973,
		'&urcrop;': 8974,
		'&ulcrop;': 8975,
		'&bnot;': 8976,
		'&profline;': 8978,
		'&profsurf;': 8979,
		'&telrec;': 8981,
		'&target;': 8982,
		'&ulcorn;': 8988,
		'&ulcorner;': 8988,
		'&urcorn;': 8989,
		'&urcorner;': 8989,
		'&dlcorn;': 8990,
		'&llcorner;': 8990,
		'&drcorn;': 8991,
		'&lrcorner;': 8991,
		'&frown;': 8994,
		'&sfrown;': 8994,
		'&smile;': 8995,
		'&ssmile;': 8995,
		'&cylcty;': 9005,
		'&profalar;': 9006,
		'&topbot;': 9014,
		'&ovbar;': 9021,
		'&solbar;': 9023,
		'&angzarr;': 9084,
		'&lmoust;': 9136,
		'&lmoustache;': 9136,
		'&rmoust;': 9137,
		'&rmoustache;': 9137,
		'&tbrk;': 9140,
		'&OverBracket;': 9140,
		'&bbrk;': 9141,
		'&UnderBracket;': 9141,
		'&bbrktbrk;': 9142,
		'&OverParenthesis;': 9180,
		'&UnderParenthesis;': 9181,
		'&OverBrace;': 9182,
		'&UnderBrace;': 9183,
		'&trpezium;': 9186,
		'&elinters;': 9191,
		'&blank;': 9251,
		'&oS;': 9416,
		'&circledS;': 9416,
		'&boxh;': 9472,
		'&HorizontalLine;': 9472,
		'&boxv;': 9474,
		'&boxdr;': 9484,
		'&boxdl;': 9488,
		'&boxur;': 9492,
		'&boxul;': 9496,
		'&boxvr;': 9500,
		'&boxvl;': 9508,
		'&boxhd;': 9516,
		'&boxhu;': 9524,
		'&boxvh;': 9532,
		'&boxH;': 9552,
		'&boxV;': 9553,
		'&boxdR;': 9554,
		'&boxDr;': 9555,
		'&boxDR;': 9556,
		'&boxdL;': 9557,
		'&boxDl;': 9558,
		'&boxDL;': 9559,
		'&boxuR;': 9560,
		'&boxUr;': 9561,
		'&boxUR;': 9562,
		'&boxuL;': 9563,
		'&boxUl;': 9564,
		'&boxUL;': 9565,
		'&boxvR;': 9566,
		'&boxVr;': 9567,
		'&boxVR;': 9568,
		'&boxvL;': 9569,
		'&boxVl;': 9570,
		'&boxVL;': 9571,
		'&boxHd;': 9572,
		'&boxhD;': 9573,
		'&boxHD;': 9574,
		'&boxHu;': 9575,
		'&boxhU;': 9576,
		'&boxHU;': 9577,
		'&boxvH;': 9578,
		'&boxVh;': 9579,
		'&boxVH;': 9580,
		'&uhblk;': 9600,
		'&lhblk;': 9604,
		'&block;': 9608,
		'&blk14;': 9617,
		'&blk12;': 9618,
		'&blk34;': 9619,
		'&squ;': 9633,
		'&square;': 9633,
		'&Square;': 9633,
		'&squf;': 9642,
		'&squarf;': 9642,
		'&blacksquare;': 9642,
		'&FilledVerySmallSquare;': 9642,
		'&EmptyVerySmallSquare;': 9643,
		'&rect;': 9645,
		'&marker;': 9646,
		'&fltns;': 9649,
		'&xutri;': 9651,
		'&bigtriangleup;': 9651,
		'&utrif;': 9652,
		'&blacktriangle;': 9652,
		'&utri;': 9653,
		'&triangle;': 9653,
		'&rtrif;': 9656,
		'&blacktriangleright;': 9656,
		'&rtri;': 9657,
		'&triangleright;': 9657,
		'&xdtri;': 9661,
		'&bigtriangledown;': 9661,
		'&dtrif;': 9662,
		'&blacktriangledown;': 9662,
		'&dtri;': 9663,
		'&triangledown;': 9663,
		'&ltrif;': 9666,
		'&blacktriangleleft;': 9666,
		'&ltri;': 9667,
		'&triangleleft;': 9667,
		'&loz;': 9674,
		'&lozenge;': 9674,
		'&cir;': 9675,
		'&tridot;': 9708,
		'&xcirc;': 9711,
		'&bigcirc;': 9711,
		'&ultri;': 9720,
		'&urtri;': 9721,
		'&lltri;': 9722,
		'&EmptySmallSquare;': 9723,
		'&FilledSmallSquare;': 9724,
		'&starf;': 9733,
		'&bigstar;': 9733,
		'&star;': 9734,
		'&phone;': 9742,
		'&female;': 9792,
		'&male;': 9794,
		'&spades;': 9824,
		'&spadesuit;': 9824,
		'&clubs;': 9827,
		'&clubsuit;': 9827,
		'&hearts;': 9829,
		'&heartsuit;': 9829,
		'&diams;': 9830,
		'&diamondsuit;': 9830,
		'&sung;': 9834,
		'&flat;': 9837,
		'&natur;': 9838,
		'&natural;': 9838,
		'&sharp;': 9839,
		'&check;': 10003,
		'&checkmark;': 10003,
		'&cross;': 10007,
		'&malt;': 10016,
		'&maltese;': 10016,
		'&sext;': 10038,
		'&VerticalSeparator;': 10072,
		'&lbbrk;': 10098,
		'&rbbrk;': 10099,
		'&lobrk;': 10214,
		'&LeftDoubleBracket;': 10214,
		'&robrk;': 10215,
		'&RightDoubleBracket;': 10215,
		'&lang;': 10216,
		'&LeftAngleBracket;': 10216,
		'&langle;': 10216,
		'&rang;': 10217,
		'&RightAngleBracket;': 10217,
		'&rangle;': 10217,
		'&Lang;': 10218,
		'&Rang;': 10219,
		'&loang;': 10220,
		'&roang;': 10221,
		'&xlarr;': 10229,
		'&longleftarrow;': 10229,
		'&LongLeftArrow;': 10229,
		'&xrarr;': 10230,
		'&longrightarrow;': 10230,
		'&LongRightArrow;': 10230,
		'&xharr;': 10231,
		'&longleftrightarrow;': 10231,
		'&LongLeftRightArrow;': 10231,
		'&xlArr;': 10232,
		'&Longleftarrow;': 10232,
		'&DoubleLongLeftArrow;': 10232,
		'&xrArr;': 10233,
		'&Longrightarrow;': 10233,
		'&DoubleLongRightArrow;': 10233,
		'&xhArr;': 10234,
		'&Longleftrightarrow;': 10234,
		'&DoubleLongLeftRightArrow;': 10234,
		'&xmap;': 10236,
		'&longmapsto;': 10236,
		'&dzigrarr;': 10239,
		'&nvlArr;': 10498,
		'&nvrArr;': 10499,
		'&nvHarr;': 10500,
		'&Map;': 10501,
		'&lbarr;': 10508,
		'&rbarr;': 10509,
		'&bkarow;': 10509,
		'&lBarr;': 10510,
		'&rBarr;': 10511,
		'&dbkarow;': 10511,
		'&RBarr;': 10512,
		'&drbkarow;': 10512,
		'&DDotrahd;': 10513,
		'&UpArrowBar;': 10514,
		'&DownArrowBar;': 10515,
		'&Rarrtl;': 10518,
		'&latail;': 10521,
		'&ratail;': 10522,
		'&lAtail;': 10523,
		'&rAtail;': 10524,
		'&larrfs;': 10525,
		'&rarrfs;': 10526,
		'&larrbfs;': 10527,
		'&rarrbfs;': 10528,
		'&nwarhk;': 10531,
		'&nearhk;': 10532,
		'&searhk;': 10533,
		'&hksearow;': 10533,
		'&swarhk;': 10534,
		'&hkswarow;': 10534,
		'&nwnear;': 10535,
		'&nesear;': 10536,
		'&toea;': 10536,
		'&seswar;': 10537,
		'&tosa;': 10537,
		'&swnwar;': 10538,
		'&rarrc;': 10547,
		'&cudarrr;': 10549,
		'&ldca;': 10550,
		'&rdca;': 10551,
		'&cudarrl;': 10552,
		'&larrpl;': 10553,
		'&curarrm;': 10556,
		'&cularrp;': 10557,
		'&rarrpl;': 10565,
		'&harrcir;': 10568,
		'&Uarrocir;': 10569,
		'&lurdshar;': 10570,
		'&ldrushar;': 10571,
		'&LeftRightVector;': 10574,
		'&RightUpDownVector;': 10575,
		'&DownLeftRightVector;': 10576,
		'&LeftUpDownVector;': 10577,
		'&LeftVectorBar;': 10578,
		'&RightVectorBar;': 10579,
		'&RightUpVectorBar;': 10580,
		'&RightDownVectorBar;': 10581,
		'&DownLeftVectorBar;': 10582,
		'&DownRightVectorBar;': 10583,
		'&LeftUpVectorBar;': 10584,
		'&LeftDownVectorBar;': 10585,
		'&LeftTeeVector;': 10586,
		'&RightTeeVector;': 10587,
		'&RightUpTeeVector;': 10588,
		'&RightDownTeeVector;': 10589,
		'&DownLeftTeeVector;': 10590,
		'&DownRightTeeVector;': 10591,
		'&LeftUpTeeVector;': 10592,
		'&LeftDownTeeVector;': 10593,
		'&lHar;': 10594,
		'&uHar;': 10595,
		'&rHar;': 10596,
		'&dHar;': 10597,
		'&luruhar;': 10598,
		'&ldrdhar;': 10599,
		'&ruluhar;': 10600,
		'&rdldhar;': 10601,
		'&lharul;': 10602,
		'&llhard;': 10603,
		'&rharul;': 10604,
		'&lrhard;': 10605,
		'&udhar;': 10606,
		'&UpEquilibrium;': 10606,
		'&duhar;': 10607,
		'&ReverseUpEquilibrium;': 10607,
		'&RoundImplies;': 10608,
		'&erarr;': 10609,
		'&simrarr;': 10610,
		'&larrsim;': 10611,
		'&rarrsim;': 10612,
		'&rarrap;': 10613,
		'&ltlarr;': 10614,
		'&gtrarr;': 10616,
		'&subrarr;': 10617,
		'&suplarr;': 10619,
		'&lfisht;': 10620,
		'&rfisht;': 10621,
		'&ufisht;': 10622,
		'&dfisht;': 10623,
		'&lopar;': 10629,
		'&ropar;': 10630,
		'&lbrke;': 10635,
		'&rbrke;': 10636,
		'&lbrkslu;': 10637,
		'&rbrksld;': 10638,
		'&lbrksld;': 10639,
		'&rbrkslu;': 10640,
		'&langd;': 10641,
		'&rangd;': 10642,
		'&lparlt;': 10643,
		'&rpargt;': 10644,
		'&gtlPar;': 10645,
		'&ltrPar;': 10646,
		'&vzigzag;': 10650,
		'&vangrt;': 10652,
		'&angrtvbd;': 10653,
		'&ange;': 10660,
		'&range;': 10661,
		'&dwangle;': 10662,
		'&uwangle;': 10663,
		'&angmsdaa;': 10664,
		'&angmsdab;': 10665,
		'&angmsdac;': 10666,
		'&angmsdad;': 10667,
		'&angmsdae;': 10668,
		'&angmsdaf;': 10669,
		'&angmsdag;': 10670,
		'&angmsdah;': 10671,
		'&bemptyv;': 10672,
		'&demptyv;': 10673,
		'&cemptyv;': 10674,
		'&raemptyv;': 10675,
		'&laemptyv;': 10676,
		'&ohbar;': 10677,
		'&omid;': 10678,
		'&opar;': 10679,
		'&operp;': 10681,
		'&olcross;': 10683,
		'&odsold;': 10684,
		'&olcir;': 10686,
		'&ofcir;': 10687,
		'&olt;': 10688,
		'&ogt;': 10689,
		'&cirscir;': 10690,
		'&cirE;': 10691,
		'&solb;': 10692,
		'&bsolb;': 10693,
		'&boxbox;': 10697,
		'&trisb;': 10701,
		'&rtriltri;': 10702,
		'&LeftTriangleBar;': 10703,
		'&RightTriangleBar;': 10704,
		'&race;': 10714,
		'&iinfin;': 10716,
		'&infintie;': 10717,
		'&nvinfin;': 10718,
		'&eparsl;': 10723,
		'&smeparsl;': 10724,
		'&eqvparsl;': 10725,
		'&lozf;': 10731,
		'&blacklozenge;': 10731,
		'&RuleDelayed;': 10740,
		'&dsol;': 10742,
		'&xodot;': 10752,
		'&bigodot;': 10752,
		'&xoplus;': 10753,
		'&bigoplus;': 10753,
		'&xotime;': 10754,
		'&bigotimes;': 10754,
		'&xuplus;': 10756,
		'&biguplus;': 10756,
		'&xsqcup;': 10758,
		'&bigsqcup;': 10758,
		'&qint;': 10764,
		'&iiiint;': 10764,
		'&fpartint;': 10765,
		'&cirfnint;': 10768,
		'&awint;': 10769,
		'&rppolint;': 10770,
		'&scpolint;': 10771,
		'&npolint;': 10772,
		'&pointint;': 10773,
		'&quatint;': 10774,
		'&intlarhk;': 10775,
		'&pluscir;': 10786,
		'&plusacir;': 10787,
		'&simplus;': 10788,
		'&plusdu;': 10789,
		'&plussim;': 10790,
		'&plustwo;': 10791,
		'&mcomma;': 10793,
		'&minusdu;': 10794,
		'&loplus;': 10797,
		'&roplus;': 10798,
		'&Cross;': 10799,
		'&timesd;': 10800,
		'&timesbar;': 10801,
		'&smashp;': 10803,
		'&lotimes;': 10804,
		'&rotimes;': 10805,
		'&otimesas;': 10806,
		'&Otimes;': 10807,
		'&odiv;': 10808,
		'&triplus;': 10809,
		'&triminus;': 10810,
		'&tritime;': 10811,
		'&iprod;': 10812,
		'&intprod;': 10812,
		'&amalg;': 10815,
		'&capdot;': 10816,
		'&ncup;': 10818,
		'&ncap;': 10819,
		'&capand;': 10820,
		'&cupor;': 10821,
		'&cupcap;': 10822,
		'&capcup;': 10823,
		'&cupbrcap;': 10824,
		'&capbrcup;': 10825,
		'&cupcup;': 10826,
		'&capcap;': 10827,
		'&ccups;': 10828,
		'&ccaps;': 10829,
		'&ccupssm;': 10832,
		'&And;': 10835,
		'&Or;': 10836,
		'&andand;': 10837,
		'&oror;': 10838,
		'&orslope;': 10839,
		'&andslope;': 10840,
		'&andv;': 10842,
		'&orv;': 10843,
		'&andd;': 10844,
		'&ord;': 10845,
		'&wedbar;': 10847,
		'&sdote;': 10854,
		'&simdot;': 10858,
		'&congdot;': 10861,
		'&easter;': 10862,
		'&apacir;': 10863,
		'&apE;': 10864,
		'&eplus;': 10865,
		'&pluse;': 10866,
		'&Esim;': 10867,
		'&Colone;': 10868,
		'&Equal;': 10869,
		'&eDDot;': 10871,
		'&ddotseq;': 10871,
		'&equivDD;': 10872,
		'&ltcir;': 10873,
		'&gtcir;': 10874,
		'&ltquest;': 10875,
		'&gtquest;': 10876,
		'&les;': 10877,
		'&LessSlantEqual;': 10877,
		'&leqslant;': 10877,
		'&ges;': 10878,
		'&GreaterSlantEqual;': 10878,
		'&geqslant;': 10878,
		'&lesdot;': 10879,
		'&gesdot;': 10880,
		'&lesdoto;': 10881,
		'&gesdoto;': 10882,
		'&lesdotor;': 10883,
		'&gesdotol;': 10884,
		'&lap;': 10885,
		'&lessapprox;': 10885,
		'&gap;': 10886,
		'&gtrapprox;': 10886,
		'&lne;': 10887,
		'&lneq;': 10887,
		'&gne;': 10888,
		'&gneq;': 10888,
		'&lnap;': 10889,
		'&lnapprox;': 10889,
		'&gnap;': 10890,
		'&gnapprox;': 10890,
		'&lEg;': 10891,
		'&lesseqqgtr;': 10891,
		'&gEl;': 10892,
		'&gtreqqless;': 10892,
		'&lsime;': 10893,
		'&gsime;': 10894,
		'&lsimg;': 10895,
		'&gsiml;': 10896,
		'&lgE;': 10897,
		'&glE;': 10898,
		'&lesges;': 10899,
		'&gesles;': 10900,
		'&els;': 10901,
		'&eqslantless;': 10901,
		'&egs;': 10902,
		'&eqslantgtr;': 10902,
		'&elsdot;': 10903,
		'&egsdot;': 10904,
		'&el;': 10905,
		'&eg;': 10906,
		'&siml;': 10909,
		'&simg;': 10910,
		'&simlE;': 10911,
		'&simgE;': 10912,
		'&LessLess;': 10913,
		'&GreaterGreater;': 10914,
		'&glj;': 10916,
		'&gla;': 10917,
		'&ltcc;': 10918,
		'&gtcc;': 10919,
		'&lescc;': 10920,
		'&gescc;': 10921,
		'&smt;': 10922,
		'&lat;': 10923,
		'&smte;': 10924,
		'&late;': 10925,
		'&bumpE;': 10926,
		'&pre;': 10927,
		'&preceq;': 10927,
		'&PrecedesEqual;': 10927,
		'&sce;': 10928,
		'&succeq;': 10928,
		'&SucceedsEqual;': 10928,
		'&prE;': 10931,
		'&scE;': 10932,
		'&prnE;': 10933,
		'&precneqq;': 10933,
		'&scnE;': 10934,
		'&succneqq;': 10934,
		'&prap;': 10935,
		'&precapprox;': 10935,
		'&scap;': 10936,
		'&succapprox;': 10936,
		'&prnap;': 10937,
		'&precnapprox;': 10937,
		'&scnap;': 10938,
		'&succnapprox;': 10938,
		'&Pr;': 10939,
		'&Sc;': 10940,
		'&subdot;': 10941,
		'&supdot;': 10942,
		'&subplus;': 10943,
		'&supplus;': 10944,
		'&submult;': 10945,
		'&supmult;': 10946,
		'&subedot;': 10947,
		'&supedot;': 10948,
		'&subE;': 10949,
		'&subseteqq;': 10949,
		'&supE;': 10950,
		'&supseteqq;': 10950,
		'&subsim;': 10951,
		'&supsim;': 10952,
		'&subnE;': 10955,
		'&subsetneqq;': 10955,
		'&supnE;': 10956,
		'&supsetneqq;': 10956,
		'&csub;': 10959,
		'&csup;': 10960,
		'&csube;': 10961,
		'&csupe;': 10962,
		'&subsup;': 10963,
		'&supsub;': 10964,
		'&subsub;': 10965,
		'&supsup;': 10966,
		'&suphsub;': 10967,
		'&supdsub;': 10968,
		'&forkv;': 10969,
		'&topfork;': 10970,
		'&mlcp;': 10971,
		'&Dashv;': 10980,
		'&DoubleLeftTee;': 10980,
		'&Vdashl;': 10982,
		'&Barv;': 10983,
		'&vBar;': 10984,
		'&vBarv;': 10985,
		'&Vbar;': 10987,
		'&Not;': 10988,
		'&bNot;': 10989,
		'&rnmid;': 10990,
		'&cirmid;': 10991,
		'&midcir;': 10992,
		'&topcir;': 10993,
		'&nhpar;': 10994,
		'&parsim;': 10995,
		'&parsl;': 11005,
		'&fflig;': 64256,
		'&filig;': 64257,
		'&fllig;': 64258,
		'&ffilig;': 64259,
		'&ffllig;': 64260,
		'&Ascr;': 119964,
		'&Cscr;': 119966,
		'&Dscr;': 119967,
		'&Gscr;': 119970,
		'&Jscr;': 119973,
		'&Kscr;': 119974,
		'&Nscr;': 119977,
		'&Oscr;': 119978,
		'&Pscr;': 119979,
		'&Qscr;': 119980,
		'&Sscr;': 119982,
		'&Tscr;': 119983,
		'&Uscr;': 119984,
		'&Vscr;': 119985,
		'&Wscr;': 119986,
		'&Xscr;': 119987,
		'&Yscr;': 119988,
		'&Zscr;': 119989,
		'&ascr;': 119990,
		'&bscr;': 119991,
		'&cscr;': 119992,
		'&dscr;': 119993,
		'&fscr;': 119995,
		'&hscr;': 119997,
		'&iscr;': 119998,
		'&jscr;': 119999,
		'&kscr;': 120000,
		'&lscr;': 120001,
		'&mscr;': 120002,
		'&nscr;': 120003,
		'&pscr;': 120005,
		'&qscr;': 120006,
		'&rscr;': 120007,
		'&sscr;': 120008,
		'&tscr;': 120009,
		'&uscr;': 120010,
		'&vscr;': 120011,
		'&wscr;': 120012,
		'&xscr;': 120013,
		'&yscr;': 120014,
		'&zscr;': 120015,
		'&Afr;': 120068,
		'&Bfr;': 120069,
		'&Dfr;': 120071,
		'&Efr;': 120072,
		'&Ffr;': 120073,
		'&Gfr;': 120074,
		'&Jfr;': 120077,
		'&Kfr;': 120078,
		'&Lfr;': 120079,
		'&Mfr;': 120080,
		'&Nfr;': 120081,
		'&Ofr;': 120082,
		'&Pfr;': 120083,
		'&Qfr;': 120084,
		'&Sfr;': 120086,
		'&Tfr;': 120087,
		'&Ufr;': 120088,
		'&Vfr;': 120089,
		'&Wfr;': 120090,
		'&Xfr;': 120091,
		'&Yfr;': 120092,
		'&afr;': 120094,
		'&bfr;': 120095,
		'&cfr;': 120096,
		'&dfr;': 120097,
		'&efr;': 120098,
		'&ffr;': 120099,
		'&gfr;': 120100,
		'&hfr;': 120101,
		'&ifr;': 120102,
		'&jfr;': 120103,
		'&kfr;': 120104,
		'&lfr;': 120105,
		'&mfr;': 120106,
		'&nfr;': 120107,
		'&ofr;': 120108,
		'&pfr;': 120109,
		'&qfr;': 120110,
		'&rfr;': 120111,
		'&sfr;': 120112,
		'&tfr;': 120113,
		'&ufr;': 120114,
		'&vfr;': 120115,
		'&wfr;': 120116,
		'&xfr;': 120117,
		'&yfr;': 120118,
		'&zfr;': 120119,
		'&Aopf;': 120120,
		'&Bopf;': 120121,
		'&Dopf;': 120123,
		'&Eopf;': 120124,
		'&Fopf;': 120125,
		'&Gopf;': 120126,
		'&Iopf;': 120128,
		'&Jopf;': 120129,
		'&Kopf;': 120130,
		'&Lopf;': 120131,
		'&Mopf;': 120132,
		'&Oopf;': 120134,
		'&Sopf;': 120138,
		'&Topf;': 120139,
		'&Uopf;': 120140,
		'&Vopf;': 120141,
		'&Wopf;': 120142,
		'&Xopf;': 120143,
		'&Yopf;': 120144,
		'&aopf;': 120146,
		'&bopf;': 120147,
		'&copf;': 120148,
		'&dopf;': 120149,
		'&eopf;': 120150,
		'&fopf;': 120151,
		'&gopf;': 120152,
		'&hopf;': 120153,
		'&iopf;': 120154,
		'&jopf;': 120155,
		'&kopf;': 120156,
		'&lopf;': 120157,
		'&mopf;': 120158,
		'&nopf;': 120159,
		'&oopf;': 120160,
		'&popf;': 120161,
		'&qopf;': 120162,
		'&ropf;': 120163,
		'&sopf;': 120164,
		'&topf;': 120165,
		'&uopf;': 120166,
		'&vopf;': 120167,
		'&wopf;': 120168,
		'&xopf;': 120169,
		'&yopf;': 120170,
		'&zopf;': 120171
	});
	
	var ISBNTerritories = Object.freeze([
		Object.freeze(["0","English"]),
		Object.freeze(["1","English"]),
		Object.freeze(["2","French"]),
		Object.freeze(["3","German"]),
		Object.freeze(["4","Japan"]),
		Object.freeze(["5","USSR"]),
		Object.freeze(["600","Iran"]),
		Object.freeze(["601","Kazakhstan"]),
		Object.freeze(["602","Indonesia"]),
		Object.freeze(["603","Saudi Arabia"]),
		Object.freeze(["604","Vietnam"]),
		Object.freeze(["605","Turkey"]),
		Object.freeze(["606","Romania"]),
		Object.freeze(["607","Mexico"]),
		Object.freeze(["608","Macedonia"]),
		Object.freeze(["609","Lithuania"]),
		Object.freeze(["611","Thailand"]),
		Object.freeze(["612","Peru"]),
		Object.freeze(["613","Mauritius"]),
		Object.freeze(["614","Lebanon"]),
		Object.freeze(["615","Hungary"]),
		Object.freeze(["616","Thailand"]),
		Object.freeze(["617","Ukraine"]),
		Object.freeze(["618","Greece"]),
		Object.freeze(["619","Bulgaria"]),
		Object.freeze(["620","Mauritius"]),
		Object.freeze(["621","Philippines"]),
		Object.freeze(["622","Iran"]),
		Object.freeze(["623","Indonesia"]),
		Object.freeze(["624","Sri Lanka"]),
		Object.freeze(["625","Turkey"]),
		Object.freeze(["65","Brazil"]),
		Object.freeze(["7","China"]),
		Object.freeze(["80","Czech Republic"]),
		Object.freeze(["81","India"]),
		Object.freeze(["82","Norway"]),
		Object.freeze(["83","Poland"]),
		Object.freeze(["84","Spain"]),
		Object.freeze(["85","Brazil"]),
		Object.freeze(["86","Yugoslavia"]),
		Object.freeze(["87","Denmark"]),
		Object.freeze(["88","Italy"]),
		Object.freeze(["89","Republic of Korea"]),
		Object.freeze(["90","The Netherlands"]),
		Object.freeze(["91","Sweden"]),
		Object.freeze(["93","India"]),
		Object.freeze(["94","The Netherlands"]),
		Object.freeze(["950","Argentina"]),
		Object.freeze(["951","Finland"]),
		Object.freeze(["952","Finland"]),
		Object.freeze(["953","Croatia"]),
		Object.freeze(["954","Bulgaria"]),
		Object.freeze(["955","Sri Lanka"]),
		Object.freeze(["956","Chile"]),
		Object.freeze(["957","Taiwan"]),
		Object.freeze(["958","Colombia"]),
		Object.freeze(["959","Cuba"]),
		Object.freeze(["960","Greece"]),
		Object.freeze(["961","Slovenia"]),
		Object.freeze(["962","Hong Kong"]),
		Object.freeze(["963","Hungary"]),
		Object.freeze(["964","Iran"]),
		Object.freeze(["965","Israel"]),
		Object.freeze(["966","Ukraine"]),
		Object.freeze(["967","Malaysia"]),
		Object.freeze(["968","Mexico"]),
		Object.freeze(["969","Pakistan"]),
		Object.freeze(["970","Mexico"]),
		Object.freeze(["971","Philippines"]),
		Object.freeze(["972","Portugal"]),
		Object.freeze(["973","Romania"]),
		Object.freeze(["974","Thailand"]),
		Object.freeze(["975","Turkey"]),
		Object.freeze(["976","CARICOM"]),
		Object.freeze(["977","Egypt"]),
		Object.freeze(["978","Nigeria"]),
		Object.freeze(["979","Indonesia"]),
		Object.freeze(["980","Venezuela"]),
		Object.freeze(["981","Singapore"]),
		Object.freeze(["982","South Pacific"]),
		Object.freeze(["983","Malaysia"]),
		Object.freeze(["984","Bangladesh"]),
		Object.freeze(["985","Belarus"]),
		Object.freeze(["986","Taiwan"]),
		Object.freeze(["987","Argentina"]),
		Object.freeze(["988","Hong Kong"]),
		Object.freeze(["989","Portugal"]),
		Object.freeze(["9915","Uruguay"]),
		Object.freeze(["9916","Estonia"]),
		Object.freeze(["9917","Bolivia"]),
		Object.freeze(["9918","Malta"]),
		Object.freeze(["9919","Mongolia"]),
		Object.freeze(["9920","Morocco"]),
		Object.freeze(["9921","Kuwait"]),
		Object.freeze(["9922","Iraq"]),
		Object.freeze(["9923","Jordan"]),
		Object.freeze(["9924","Cambodia"]),
		Object.freeze(["9925","Cyprus"]),
		Object.freeze(["9926","Bosnia and Herzegovina"]),
		Object.freeze(["9927","Qatar"]),
		Object.freeze(["9928","Albania"]),
		Object.freeze(["9929","Guatemala"]),
		Object.freeze(["9930","Costa Rica"]),
		Object.freeze(["9931","Algeria"]),
		Object.freeze(["9932","Laos"]),
		Object.freeze(["9933","Syria"]),
		Object.freeze(["9934","Latvia"]),
		Object.freeze(["9935","Iceland"]),
		Object.freeze(["9936","Afghanistan"]),
		Object.freeze(["9937","Nepal"]),
		Object.freeze(["9938","Tunisia"]),
		Object.freeze(["9939","Armenia"]),
		Object.freeze(["9940","Montenegro"]),
		Object.freeze(["9941","Georgia"]),
		Object.freeze(["9942","Ecuador"]),
		Object.freeze(["9943","Uzbekistan"]),
		Object.freeze(["9944","Turkey"]),
		Object.freeze(["9945","Dominican Republic"]),
		Object.freeze(["9946","North Korea"]),
		Object.freeze(["9947","Algeria"]),
		Object.freeze(["9948","United Arab Emirates"]),
		Object.freeze(["9949","Estonia"]),
		Object.freeze(["9950","Palestine"]),
		Object.freeze(["9951","Kosova"]),
		Object.freeze(["9952","Azerbaijan"]),
		Object.freeze(["9953","Lebanon"]),
		Object.freeze(["9954","Morocco"]),
		Object.freeze(["9955","Lithuania"]),
		Object.freeze(["9956","Cameroon"]),
		Object.freeze(["9957","Jordan"]),
		Object.freeze(["9958","Bosnia and Herzegovina"]),
		Object.freeze(["9959","Libya"]),
		Object.freeze(["9960","Saudi Arabia"]),
		Object.freeze(["9961","Algeria"]),
		Object.freeze(["9962","Panama"]),
		Object.freeze(["9963","Cyprus"]),
		Object.freeze(["9964","Ghana"]),
		Object.freeze(["9965","Kazakhstan"]),
		Object.freeze(["9966","Kenya"]),
		Object.freeze(["9967","Kyrgyzstan"]),
		Object.freeze(["9968","Costa Rica"]),
		Object.freeze(["9970","Uganda"]),
		Object.freeze(["9971","Singapore"]),
		Object.freeze(["9972","Peru"]),
		Object.freeze(["9973","Tunisia"]),
		Object.freeze(["9974","Uruguay"]),
		Object.freeze(["9975","Moldova"]),
		Object.freeze(["9976","Tanzania"]),
		Object.freeze(["9977","Costa Rica"]),
		Object.freeze(["9978","Ecuador"]),
		Object.freeze(["9979","Iceland"]),
		Object.freeze(["9980","Papua New Guinea"]),
		Object.freeze(["9981","Morocco"]),
		Object.freeze(["9982","Zambia"]),
		Object.freeze(["9983","Gambia"]),
		Object.freeze(["9984","Latvia"]),
		Object.freeze(["9985","Estonia"]),
		Object.freeze(["9986","Lithuania"]),
		Object.freeze(["9987","Tanzania"]),
		Object.freeze(["9988","Ghana"]),
		Object.freeze(["9989","Macedonia"]),
		Object.freeze(["99901","Bahrain"]),
		Object.freeze(["99903","Mauritius"]),
		Object.freeze(["99904","Curaçao"]),
		Object.freeze(["99905","Bolivia"]),
		Object.freeze(["99906","Kuwait"]),
		Object.freeze(["99908","Malawi"]),
		Object.freeze(["99909","Malta"]),
		Object.freeze(["99910","Sierra Leone"]),
		Object.freeze(["99911","Lesotho"]),
		Object.freeze(["99912","Botswana"]),
		Object.freeze(["99913","Andorra"]),
		Object.freeze(["99914","Suriname"]),
		Object.freeze(["99915","Maldives"]),
		Object.freeze(["99916","Namibia"]),
		Object.freeze(["99917","Brunei Darussalam"]),
		Object.freeze(["99918","Faroe Islands"]),
		Object.freeze(["99919","Benin"]),
		Object.freeze(["99920","Andorra"]),
		Object.freeze(["99921","Qatar"]),
		Object.freeze(["99922","Guatemala"]),
		Object.freeze(["99923","El Salvador"]),
		Object.freeze(["99924","Nicaragua"]),
		Object.freeze(["99925","Paraguay"]),
		Object.freeze(["99926","Honduras"]),
		Object.freeze(["99927","Albania"]),
		Object.freeze(["99928","Georgia"]),
		Object.freeze(["99929","Mongolia"]),
		Object.freeze(["99930","Armenia"]),
		Object.freeze(["99931","Seychelles"]),
		Object.freeze(["99932","Malta"]),
		Object.freeze(["99933","Nepal"]),
		Object.freeze(["99934","Dominican Republic"]),
		Object.freeze(["99935","Haiti"]),
		Object.freeze(["99936","Bhutan"]),
		Object.freeze(["99937","Macau"]),
		Object.freeze(["99938","Republika Srpska"]),
		Object.freeze(["99939","Guatemala"]),
		Object.freeze(["99940","Georgia"]),
		Object.freeze(["99941","Armenia"]),
		Object.freeze(["99942","Sudan"]),
		Object.freeze(["99943","Albania"]),
		Object.freeze(["99944","Ethiopia"]),
		Object.freeze(["99945","Namibia"]),
		Object.freeze(["99946","Nepal"]),
		Object.freeze(["99947","Tajikistan"]),
		Object.freeze(["99948","Eritrea"]),
		Object.freeze(["99949","Mauritius"]),
		Object.freeze(["99950","Cambodia"]),
		Object.freeze(["99952","Mali"]),
		Object.freeze(["99953","Paraguay"]),
		Object.freeze(["99954","Bolivia"]),
		Object.freeze(["99955","Republika Srpska"]),
		Object.freeze(["99956","Albania"]),
		Object.freeze(["99957","Malta"]),
		Object.freeze(["99958","Bahrain"]),
		Object.freeze(["99959","Luxembourg"]),
		Object.freeze(["99960","Malawi"]),
		Object.freeze(["99961","El Salvador"]),
		Object.freeze(["99962","Mongolia"]),
		Object.freeze(["99963","Cambodia"]),
		Object.freeze(["99964","Nicaragua"]),
		Object.freeze(["99965","Macau"]),
		Object.freeze(["99966","Kuwait"]),
		Object.freeze(["99967","Paraguay"]),
		Object.freeze(["99968","Botswana"]),
		Object.freeze(["99969","Oman"]),
		Object.freeze(["99970","Haiti"]),
		Object.freeze(["99971","Myanmar"]),
		Object.freeze(["99972","Faroe Islands"]),
		Object.freeze(["99973","Mongolia"]),
		Object.freeze(["99974","Bolivia"]),
		Object.freeze(["99975","Tajikistan"]),
		Object.freeze(["99976","Republika Srpska"]),
		Object.freeze(["99977","Rwanda"]),
		Object.freeze(["99978","Mongolia"]),
		Object.freeze(["99979","Honduras"]),
		Object.freeze(["99980","Bhutan"]),
		Object.freeze(["99981","Macau"]),
		Object.freeze(["99982","Benin"]),
		Object.freeze(["99983","El Salvador"])
	]);
	
	//function to decode certain unwanted html entities
	function htmlDecode(input){
		
		//early out
		if (input == null || input == "") return "";
		
		//convert non-breaking space
		input = input.replace(/[\u00A0]/g," ");
		
		//convert all letter only HTML entities to unicode char
		let change = true;
		while (change) {
			change = false;
			let prevInput = input;
			input = input.replace(/\&(amp;)?[A-Z]+;*/gi,
				function(match, $1, offset, original) {
					change = true;
					if (match == null || match == "") return match;
					if ($1 != null && $1 != "") match = match.replace(/^\&amp;/,"&");
					if (match === '&') return match;
					let ent = htmlEnts[match.replace(/[\;]*$/i,"")+";"];
					if (ent == null) return match;
					return String.fromCharCode(ent);
				}
			);
			
			//avoid infinite loop in case matches should not be replaced
			change = change && (input != prevInput);
		}
		
		//convert all number HTML entities (hex or dec) to unicode char
		change = true;
		while (change) {
			change = false;
			input = input.replace(/\&(?:amp;)?[\#]?(?:x[0-9ABCDEF]+|[0-9]+);/gi,
				function(match, offset, original) {
					change = true;
					let returnString = match.replace(/^\&(?:amp;)?[\#]?/gi,"");
					returnString = parseInt(returnString.replace(/(?:^[^0-9ABCDEF]*|;$)/gi,""),(returnString.search(/^x/) != -1 ? 16 : 10));
					if (returnString == NaN || returnString < 0) return match;
					return String.fromCharCode(returnString);
				}
			);
		}
		
		return input;
	}
	
	//function to convert to title case
	function toTitleCase(input,forceLowerCase = false) {
		if (input == null || typeof(input) != 'string' || input == "") return "";
		input = input.slice(0,1).toUpperCase() + input.slice(1);
		input = input.replace(/([^\w]+|^)([\w]+)/gi,
			function (match, $1, $2, offset, original) {
				if ($1 == "" || $2.search(/^(a|an|and|at|but|by|for|in|nor|of|on|or|so|the|to|up|yet|und)$/i) == -1) {
					$2 = $2.slice(0,1).toUpperCase() + (forceLowerCase ? $2.slice(1).toLowerCase() : $2.slice(1));
				} else if(forceLowerCase) {
					$2 = $2.toLowerCase();
				}
				return ("" + $1 + $2);
			}
		);
		return input;
	}
	
	//function to get iso language
	function getIsoLanguage(input) {
		//early out
		if (input == null || typeof(input) != 'string' || input == "") return null;
		
		//remove subtags and all unnecessary characters
		input = input.replace(/[\-\,\.\:\;\s]+.*$/gi,"").replace(/[^a-zA-Z]/gi,"");
		
		//proceed if input != empty
		if (input == "") return null;
		
		//get language object
		input = languageCodes[input];
		
		//return null if invalid
		if (input == null && typeof(input) != 'object') return null;
		
		//return object
		return input;
		
	}
	
	// this function properly escapes all characters of its input that are necessary for being used in a regular expression
	function escapeForRegExp(input) {
		return input.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
	}
	
	// this function recognizes regexp flags and returns them all as a string
	function recognizeRegExpFlags(exp) {
		let ind = "";
		if (exp != null && typeof(exp) == 'string' && exp.length > 0) {
			if (exp.search("e") != -1) {                
				ind += "e";
			} else {
				if (exp.search("g") != -1) ind += "g";
				if (exp.search("i") != -1) ind += "i";
				if (exp.search("m") != -1) ind += "m";
				if (exp.search("s") != -1) ind += "s";
				if (exp.search("u") != -1) ind += "u";
				if (exp.search("y") != -1) ind += "y";
			}
		}
		return ind;
	}
	
	// this function is stolen from MDN to deal with non-BMP (UTF16) characters
	function fixedCharCodeAt(str, idx) {
		idx = idx || 0;
		let code = str.charCodeAt(idx);
		let hi, low;
		
		if (0xD800 <= code && code <= 0xDBFF) {
			hi = code;
			low = str.charCodeAt(idx + 1);
			if (isNaN(low)) {
				//if high surrogate not followed by low surrogate, there is something wrong in the string. return a space then!
				return 32;
			}
			return ((hi - 0xD800) * 0x400) + (low - 0xDC00) + 0x10000;
		}
		if (0xDC00 <= code && code <= 0xDFFF) {
			return false;
		}
		return code;
	}
	
	
	//function to detect and remove outer brackets
	function removeOuterBrackets(inputOri,oB = "(",cB = ")") {
        
        //trim input
        let input = inputOri.trim();
        
        //early out
        let oBLength, cBLength, inputLength;
        if (input == null || typeof(input) != 'string' || (inputLength = input.length) == 0 || oB == null || typeof(oB) != 'string' || (oBLength = (oB = oB.trim()).length) == 0 || cB == null || typeof(cB) != 'string' || (cBLength = (cB = cB.trim()).length) == 0 ||  !input.startsWith(oB) || !input.endsWith(cB)) return inputOri;
        
        //get length of oB and
        let oriLength = inputOri.length;
        
        //now check that oB and cB enclose the entire string apart from white spaces
        let pos = oBLength, posO = -1, posC = -1, level = 1;
        while(pos < inputLength) {
            posO = input.indexOf(oB,pos);
            posC = input.indexOf(cB,pos);
            if (level > 0 && posO != posC) {
                if (posO < posC && posO != -1) {
                    pos = posO + oBLength;
                    level++;
                } else {
                    pos = posC + cBLength;
                    level--;
                }
            } else {
                return inputOri;
            }
        }
        //check passed
        
        //get trailing white space
        let ws = inputOri.match(/[\s]*$/);
        ws = ws == null ? "" : ws[0];
        
        //remove brackets
        input = inputOri.replace(oB,"");
        return (input.slice(0,input.lastIndexOf(cB)).concat(ws));
        
    }
	
	function convertToPunycode(input) {
			
		// remove variation selectors from input
		input = input.replace(/[\uFE00-\uFE0F]/g,"");
		
		// prepare return string
		let returnString = input;
		
		// check if punycoding necessary
		if (input != null && input != "") {
			
			
			//get input length
			let inputLength = input.length;
			
			// proceed only if length > 0
			if (inputLength > 0) {
				
				//find ascii characters, non-ascii characters, and the necessary data to compute the insertion codes for the latter
				returnString = "";
				let nonAscii = [], numToInsert = 0, numNonBMP = 0; //numNonBMP saves the number of non-BMP characters
				for (let i = 0; i<inputLength; ++i) {
					let code = fixedCharCodeAt(input,i);
					
					if (code == false) {
						numNonBMP++; //low surrogate of UTF 16 character, skip
					} else if (code > 127) {
						nonAscii[numToInsert] = [];
						nonAscii[numToInsert][0] = (code-128); //insertion code
						nonAscii[numToInsert][1] = (i-numNonBMP) - numToInsert; //saving the insertion position in the string containing only ascii characters
						nonAscii[numToInsert][2] = (i-numNonBMP); //saving the order in original string to decide which character comes first whenever the insertion position in the basic remainder string is the same
						numToInsert++;
						
					} else {
						returnString += String.fromCharCode(code);
					}
				}
				inputLength -= numNonBMP;
				
				//if necessary, modify the return string according to the punycode prescription
				if (numToInsert > 0) {
					
					//add xn-- prefix and dash to returnString
					if (returnString.length > 0) returnString += "-";
					returnString = "xn--" + returnString;
					
					//establish translation table for numeric codes
					const translationTable = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","0","1","2","3","4","5","6","7","8","9"];
					
					//sort non-ascii array for precise insertion code determination. If code is the same (=same unicode character), sort by position in ascii only string!
					nonAscii.sort(function(a,b) {
							let diff = a[0] - b[0];
							if (diff != 0) return diff;
							return a[1] - b[1];
						}
					);
					//set correct positions at the state of insertion (taking into account all shifts due to previous insertions)
					for (let i = 0; i < numToInsert; ++i) {
						let pos = nonAscii[i][1];
						let code = nonAscii[i][2];
						for (let j = i+1; j < numToInsert; ++j) {
							if ((nonAscii[j][1] > pos) || (nonAscii[j][1] == pos && nonAscii[j][2] > code) ) {
								nonAscii[j][1]++;
							}
						}
					}
					
					//generate insertion codes and add the corresponding ascii characters to returnString
					inputLength -= (numToInsert-1); //length of ascii string, important for insertion of first code
					let lastCode = 0;
					let lastPos = -1; //-1 means that prior to first insertion, the position is effectively "in front of the string"
					let bias = 72; //initial bias
					let damp = 700; //initial damp
					
					for (let i = 0; i<numToInsert; ++i) {
						
						//load code and pos of next insertion code
						let code = nonAscii[i][0];
						let pos = nonAscii[i][1];
						//insertion code must be determined relatively to old one
						let insertionCode = (code-lastCode)*inputLength+(pos-lastPos-1);
						
						//save code and pos for next run
						lastPos = pos; lastCode = code;
						
						//convert to "35-34-...-system" and add corresponding ascii letter to returnString. Temporarily use code as variable
						code = insertionCode;
						
						for (let j = 1; j > 0; ++j) {
							
							//determine threshold value
							let threshold = 36*j-bias;
							if (threshold < 1) threshold = 1;
							if (threshold > 26) threshold = 26;
		    							
							if ( code < threshold ) {
								
								// output last character below threshold value!
								returnString += translationTable[code];
								
								//determine bias for next threshold
								bias = insertionCode / damp;
								damp = 2;
								bias += (bias / (inputLength));
								let numDivs = 0;
								while (bias > 455) {
									bias /= 35;
									numDivs++;
								}
								bias = Math.floor((36*numDivs) + ((36*bias)/(bias + 38)))
								
								//break
								break;
							}
							// return character above threshold value and continue
							returnString += translationTable[threshold + ((code - threshold) % (36 - threshold))];
							code = Math.floor((code - threshold) / (36 - threshold));
						}
						
						//take into account that the string increases length with each insertion
						inputLength++;
						
					}
				}
			}
		}
		
		return returnString;
	}
	
    //function to obtain all period characters as string
    function getPunctuationChars(mode = 0) {
        if (mode == null || typeof(mode) != 'number') mode = 0;
        let puncChars = "\\.\\u002E\\u06D4\\u0701\\u0702\\u1362\\u166E\\u1803\\u1809\\u2CF9\\u2CFE\\uA4FF\\u16EB\\u2024\\u2027\\u2E31\\u2E33\\u2E3C\\u3002\\u30FB\\uA60E\\uA6F3\\uFE12\\uFE45\\uFE46\\uFE52\\uFE0E\\uFF61\\uFF65";
        let hyphenChars = "\\u002D\\uFF0D\\uFE58\\uFE63\\u207B\\u208B\\u00AD\\u058A\\u05BE\\u1806\\u2010\\u2011\\u2012\\u2013\\u2014\\u2015\\u2043\\u2E3A\\u2E1A\\u2E3B";
        let commaChars = "\\u002C\\uFE50\\uFF0C\\u055D\\u060C\\u07F8\\u1363\\u1802\\u1808";
        switch(mode) {
            case 0:
                return puncChars;
                break;
            case 1:
                return hyphenChars;
                break;
            case 2:
                return commaChars;
                break;
            case 3:
            default:
                return (puncChars + hyphenChars + commaChars);
                break;
        }
    }
	
	// function to standardize special characters by ascii
	function asciiPunctuation(inputString, mode) {
		
		//early out
		if (inputString == null || typeof(inputString) != 'string') return inputString;
		      
		//depending on mode, replace hyphen, full stop, comma, or all
		if (mode == null || typeof(mode) != 'number') mode = 0;
		if (mode > -1) {
			inputString = inputString.replace(/[\u002D\uFF0D\uFE58\uFE63\u207B\u208B\u00AD\u058A\u05BE\u1806\u2010\u2011\u2012\u2013\u2014\u2015\u2043\u2E3A\u2E1A\u2E3B]/g,"-");
			if (mode > 0) {
				inputString = inputString.replace(/[\u002E\u06D4\u0701\u0702\u1362\u166E\u1803\u1809\u2CF9\u2CFE\uA4FF\u16EB\u2024\u2027\u2E31\u2E33\u2E3C\u3002\u30FB\uA60E\uA6F3\uFE12\uFE45\uFE46\uFE52\uFE0E\uFF61\uFF65]/g,".");
				if (mode > 1) {
					inputString = inputString.replace(/[\u002C\uFE50\uFF0C\u055D\u060C\u07F8\u1363\u1802\u1808]/g,",");
					inputString = inputString.replace(/[\u00B4\u02B9\u02BB\u02BD\u02BE\u02BF\u02C8\u02CA\u0301\u0313\u0314\u0315\u0341\u0343\u0374\u0384\u055A\u1FBD\u1FBF\u2018\u201B\u2032\u2035\uA78B\uA78C\uFF07]/g,"'")
				}
			}
		}
		
		//return
		return inputString;
	}
	
	//function to clean DOI, exposed for omnibox feature
	function cleanDOI(input) {
		//early out
		if (input == null || typeof(input) != 'string' || input.length == 0) return "";
		
		//remove any kind of initial link structure, non-numerical prefixes, and any kind of whites spaces from DOI
		input = input.replace(/^http[s]?:\/\/[^\/]*\//i,"").replace(/(?:^[^0-9]*|[\s])/g,"").trim();
		
		//check if doi is in correct format, otherwise remove
		input = input.search(/^10\.[0-9]{4,5}\//) != -1 ? input : "";
		
		//return
		return input;
	}
	
	//function to obtain ISBN territories
	function getISBNTerritories() {
		return ISBNTerritories;
	}
	
	//function to get all letters in unicode
	function getAllLetters(escaped = true) {
		let returnString = "A-Za-z" + "\\u0041-\\u005A\\u0061-\\u007A\\u00AA\\u00B5\\u00BA\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02C1\\u02C6-\\u02D1\\u02E0-\\u02E4\\u02EC\\u02EE\\u0370-\\u0374\\u0376\\u0377\\u037A-\\u037D\\u0386\\u0388-\\u038A\\u038C\\u038E-\\u03A1\\u03A3-\\u03F5\\u03F7-\\u0481\\u048A-\\u0527\\u0531-\\u0556\\u0559\\u0561-\\u0587\\u05D0-\\u05EA\\u05F0-\\u05F2\\u0620-\\u064A\\u066E\\u066F\\u0671-\\u06D3\\u06D5\\u06E5\\u06E6\\u06EE\\u06EF\\u06FA-\\u06FC\\u06FF\\u0710\\u0712-\\u072F\\u074D-\\u07A5\\u07B1\\u07CA-\\u07EA\\u07F4\\u07F5\\u07FA\\u0800-\\u0815\\u081A\\u0824\\u0828\\u0840-\\u0858\\u08A0\\u08A2-\\u08AC\\u0904-\\u0939\\u093D\\u0950\\u0958-\\u0961\\u0971-\\u0977\\u0979-\\u097F\\u0985-\\u098C\\u098F\\u0990\\u0993-\\u09A8\\u09AA-\\u09B0\\u09B2\\u09B6-\\u09B9\\u09BD\\u09CE\\u09DC\\u09DD\\u09DF-\\u09E1\\u09F0\\u09F1\\u0A05-\\u0A0A\\u0A0F\\u0A10\\u0A13-\\u0A28\\u0A2A-\\u0A30\\u0A32\\u0A33\\u0A35\\u0A36\\u0A38\\u0A39\\u0A59-\\u0A5C\\u0A5E\\u0A72-\\u0A74\\u0A85-\\u0A8D\\u0A8F-\\u0A91\\u0A93-\\u0AA8\\u0AAA-\\u0AB0\\u0AB2\\u0AB3\\u0AB5-\\u0AB9\\u0ABD\\u0AD0\\u0AE0\\u0AE1\\u0B05-\\u0B0C\\u0B0F\\u0B10\\u0B13-\\u0B28\\u0B2A-\\u0B30\\u0B32\\u0B33\\u0B35-\\u0B39\\u0B3D" +
		"\\u0B5C\\u0B5D\\u0B5F-\\u0B61\\u0B71\\u0B83\\u0B85-\\u0B8A\\u0B8E-\\u0B90\\u0B92-\\u0B95\\u0B99\\u0B9A\\u0B9C\\u0B9E\\u0B9F\\u0BA3\\u0BA4\\u0BA8-\\u0BAA\\u0BAE-\\u0BB9\\u0BD0\\u0C05-\\u0C0C\\u0C0E-\\u0C10\\u0C12-\\u0C28\\u0C2A-\\u0C33\\u0C35-\\u0C39\\u0C3D\\u0C58\\u0C59\\u0C60\\u0C61\\u0C85-\\u0C8C\\u0C8E-\\u0C90\\u0C92-\\u0CA8\\u0CAA-\\u0CB3\\u0CB5-\\u0CB9\\u0CBD\\u0CDE\\u0CE0\\u0CE1\\u0CF1\\u0CF2\\u0D05-\\u0D0C\\u0D0E-\\u0D10\\u0D12-\\u0D3A\\u0D3D\\u0D4E\\u0D60\\u0D61\\u0D7A-\\u0D7F\\u0D85-\\u0D96\\u0D9A-\\u0DB1\\u0DB3-\\u0DBB\\u0DBD\\u0DC0-\\u0DC6\\u0E01-\\u0E30\\u0E32\\u0E33\\u0E40-\\u0E46\\u0E81\\u0E82\\u0E84\\u0E87\\u0E88\\u0E8A\\u0E8D\\u0E94-\\u0E97\\u0E99-\\u0E9F\\u0EA1-\\u0EA3\\u0EA5\\u0EA7\\u0EAA\\u0EAB\\u0EAD-\\u0EB0\\u0EB2\\u0EB3\\u0EBD\\u0EC0-\\u0EC4\\u0EC6\\u0EDC-\\u0EDF\\u0F00\\u0F40-\\u0F47\\u0F49-\\u0F6C\\u0F88-\\u0F8C\\u1000-\\u102A\\u103F\\u1050-\\u1055\\u105A-\\u105D\\u1061\\u1065\\u1066\\u106E-\\u1070\\u1075-\\u1081\\u108E\\u10A0-\\u10C5\\u10C7\\u10CD\\u10D0-\\u10FA\\u10FC-\\u1248\\u124A-\\u124D\\u1250-\\u1256\\u1258\\u125A-\\u125D\\u1260-\\u1288\\u128A-\\u128D\\u1290-\\u12B0\\u12B2-\\u12B5\\u12B8-\\u12BE\\u12C0" +
		"\\u12C2-\\u12C5\\u12C8-\\u12D6\\u12D8-\\u1310\\u1312-\\u1315\\u1318-\\u135A\\u1380-\\u138F\\u13A0-\\u13F4\\u1401-\\u166C\\u166F-\\u167F\\u1681-\\u169A\\u16A0-\\u16EA\\u1700-\\u170C\\u170E-\\u1711\\u1720-\\u1731\\u1740-\\u1751\\u1760-\\u176C\\u176E-\\u1770\\u1780-\\u17B3\\u17D7\\u17DC\\u1820-\\u1877\\u1880-\\u18A8\\u18AA\\u18B0-\\u18F5\\u1900-\\u191C\\u1950-\\u196D\\u1970-\\u1974\\u1980-\\u19AB\\u19C1-\\u19C7\\u1A00-\\u1A16\\u1A20-\\u1A54\\u1AA7\\u1B05-\\u1B33\\u1B45-\\u1B4B\\u1B83-\\u1BA0\\u1BAE\\u1BAF\\u1BBA-\\u1BE5\\u1C00-\\u1C23\\u1C4D-\\u1C4F\\u1C5A-\\u1C7D\\u1CE9-\\u1CEC\\u1CEE-\\u1CF1\\u1CF5\\u1CF6\\u1D00-\\u1DBF\\u1E00-\\u1F15\\u1F18-\\u1F1D\\u1F20-\\u1F45\\u1F48-\\u1F4D\\u1F50-\\u1F57\\u1F59\\u1F5B\\u1F5D\\u1F5F-\\u1F7D\\u1F80-\\u1FB4\\u1FB6-\\u1FBC\\u1FBE\\u1FC2-\\u1FC4\\u1FC6-\\u1FCC\\u1FD0-\\u1FD3\\u1FD6-\\u1FDB\\u1FE0-\\u1FEC\\u1FF2-\\u1FF4\\u1FF6-\\u1FFC\\u2071\\u207F\\u2090-\\u209C\\u2102\\u2107\\u210A-\\u2113\\u2115\\u2119-\\u211D\\u2124\\u2126\\u2128\\u212A-\\u212D\\u212F-\\u2139\\u213C-\\u213F\\u2145-\\u2149" +
		"\\u214E\\u2183\\u2184\\u2C00-\\u2C2E\\u2C30-\\u2C5E\\u2C60-\\u2CE4\\u2CEB-\\u2CEE\\u2CF2\\u2CF3\\u2D00-\\u2D25\\u2D27\\u2D2D\\u2D30-\\u2D67\\u2D6F\\u2D80-\\u2D96\\u2DA0-\\u2DA6\\u2DA8-\\u2DAE\\u2DB0-\\u2DB6\\u2DB8-\\u2DBE\\u2DC0-\\u2DC6\\u2DC8-\\u2DCE\\u2DD0-\\u2DD6\\u2DD8-\\u2DDE\\u2E2F\\u3005\\u3006\\u3031-\\u3035\\u303B\\u303C\\u3041-\\u3096\\u309D-\\u309F\\u30A1-\\u30FA\\u30FC-\\u30FF\\u3105-\\u312D\\u3131-\\u318E\\u31A0-\\u31BA\\u31F0-\\u31FF\\u3400-\\u4DB5\\u4E00-\\u9FCC\\uA000-\\uA48C\\uA4D0-\\uA4FD\\uA500-\\uA60C\\uA610-\\uA61F\\uA62A\\uA62B\\uA640-\\uA66E\\uA67F-\\uA697\\uA6A0-\\uA6E5\\uA717-\\uA71F\\uA722-\\uA788\\uA78B-\\uA78E\\uA790-\\uA793\\uA7A0-\\uA7AA\\uA7F8-\\uA801\\uA803-\\uA805\\uA807-\\uA80A\\uA80C-\\uA822\\uA840-\\uA873\\uA882-\\uA8B3\\uA8F2-\\uA8F7\\uA8FB\\uA90A-\\uA925\\uA930-\\uA946\\uA960-\\uA97C\\uA984-\\uA9B2\\uA9CF" + 
		"\\uAA00-\\uAA28\\uAA40-\\uAA42\\uAA44-\\uAA4B\\uAA60-\\uAA76\\uAA7A\\uAA80-\\uAAAF\\uAAB1\\uAAB5\\uAAB6\\uAAB9-\\uAABD\\uAAC0\\uAAC2\\uAADB-\\uAADD\\uAAE0-\\uAAEA\\uAAF2-\\uAAF4\\uAB01-\\uAB06\\uAB09-\\uAB0E\\uAB11-\\uAB16\\uAB20-\\uAB26\\uAB28-\\uAB2E\\uABC0-\\uABE2\\uAC00-\\uD7A3\\uD7B0-\\uD7C6\\uD7CB-\\uD7FB\\uF900-\\uFA6D\\uFA70-\\uFAD9\\uFB00-\\uFB06\\uFB13-\\uFB17\\uFB1D\\uFB1F-\\uFB28\\uFB2A-\\uFB36\\uFB38-\\uFB3C\\uFB3E\\uFB40\\uFB41\\uFB43\\uFB44\\uFB46-\\uFBB1\\uFBD3-\\uFD3D\\uFD50-\\uFD8F\\uFD92-\\uFDC7\\uFDF0-\\uFDFB\\uFE70-\\uFE74\\uFE76-\\uFEFC\\uFF21-\\uFF3A\\uFF41-\\uFF5A\\uFF66-\\uFFBE\\uFFC2-\\uFFC7\\uFFCA-\\uFFCF\\uFFD2-\\uFFD7\\uFFDA-\\uFFDC";
		if (!escaped) returnString = returnString.replace(/[\\]+/gi,"\\")
		return returnString;
	}
	
	//function to convert non standard characters to latex
	function convertSpecialChars(inputString, mode, checkMath = false, surelyInMath = false, someutf = false) {
		
		// return trivial input
		if (inputString == "" || inputString == null) return inputString;
		
		// define regular expression containing all characters to be replaced
		let repRegExp;
		if (someutf) {
			repRegExp = new RegExp("[^0-9\\ \\.,\\-;:'()\\?\\[\\]\\+!\"\/=@" + getAllLetters() + "]+","gi");
			punyRegExp = new RegExp("[^0-9\\ \\.,\\-;:'()\\?\\[\\]\\+!\"\/=@" + getAllLetters() + "]{1,63}","gi");
		} else {
			repRegExp = new RegExp(/[^A-Za-z0-9\ \.,\-;:'()\?\[\]\+!"\/=@]+/gi);
			punyRegExp = new RegExp(/[^\s\.,\-;:'()\?\[\]\+!"\/=@\{\}]{1,63}/gi);
		}
		      
		// replace function, looking characters up in xml resource
		function stringReplace(match, offset, original) {
			
			//string to be finally returned
			let returnString = "";
			
			//closure -> local variable
			let conversionMode = mode, inMath = surelyInMath;
			
			//temporary for high-low surrogate detection
			let translated = false;
			
			//reference to special char list xml resource
			const responseXML = BINData.getSpecialCharList();
			
			//loop over characters in match
			let length = match.length;
			for (let i = 0; i < length; ++i) {
				
				//get char value, utf 16 compatible
				let char = fixedCharCodeAt(match,i);
				const charCode = char; //save for later
				
				//early continue for low surrogate in case high surrogate not translated
				if (char == false) {
					if (!translated) returnString += match.charAt(i);
					continue;
				}
				
				// reset translated indicator
				translated = false;

				// get char from character list 
				char = responseXML.getElementById(char);
				//if not in list, simply add char and continue with next iteration
				if (char == null || char == undefined) {
					returnString += match.charAt(i);
					continue;
				}
				
				//otherwise, act depending on conversion mode
				if (conversionMode == 0) {
					
					//define math separator depending on math mode
					let mathSep = inMath ? "" : "$";
					//early continue for xml-latex conflicts
					if (charCode == 38) {
						returnString += "{\\&}";
						continue;
					} else if (charCode == 60 || charCode == 62) {
						returnString += "{" + mathSep + String.fromCharCode(charCode) + mathSep + "}";
						continue;
					} else if (charCode == 8814) {
						returnString += "{" + mathSep + "\\not<" + mathSep + "}";
						continue;
					} else if (charCode == 8815) {
						returnString += "{" + mathSep + "\\not>" + mathSep + "}";
						continue;
					} else if (charCode == 10643) {
						returnString += "{" + mathSep + "<\\kern-0.58em" + mathSep + "}";
						continue;
					}
					
					//check if character only exists in math mode, and adjust math separator if necessary
					mathSep = char.getAttribute("mode");
					mathSep = (inMath || mathSep == null || mathSep != "math") ? "" : "$";
					let str1 = char.getElementsByTagName('latex')[0].innerHTML, str2 = char.getElementsByTagName('mathlatex');
					if (str2.length > 0 && !inMath) {
						//if (str1.search(/^[]/) != "\\") str1 = " " + str1;
						//str2 = str2[0].innerHTML;
						//if (str2.charAt(0) != "\\") str2 = " " + str2;
						char = "{\\ifmmode" + str2[0].innerHTML.trim() + "\\else" + str1.trim() + "\\fi}";
					} else {
						char = "{" + mathSep + str1.replace(/\ $/,"") + mathSep + "}";
					}
					translated = true;
				} else if (conversionMode == 1) {
					let str1 = char.getElementsByTagName('abbrev');
					if (str1.length > 0) { 
						char = str1[0].innerHTML;
						translated = true;
					} else {
						char = match.charAt(i);
					}
				}
				returnString += char;
			}
			return returnString;
		}
		
		// if in latex mode, treat math passages separately if required
		if (mode == 0 && checkMath) {
			
			//find substrings in which characters should be replaced. Do not touch math parts in between dollars (try to detect these parts reliably!)
			let returnString = "";
			
			//start by search a pattern that is likely to be the start of a latex math mode section
			let idx1 = 0, matchArr = null;
			while (inputString != "" && (matchArr = inputString.match(/(?:[^0-9\$][\s]*|^[\s]*)\$[^\$\ ]/)) != null) {
				//get exact position of dollar sign
				idx1 = matchArr.index + matchArr[0].search(/\$/);
				
				//replace first characters that are not in math mode, use only chunks of not more than 63 chars
				returnString += inputString.slice(0,idx1).replace(repRegExp, stringReplace).replace(punyRegExp, function(match, offset, original) {
						return convertToPunycode(match);
					}
				);
				
				//continue from potential start of math mode section
				inputString = inputString.slice(idx1+1);
				if ((idx1 = inputString.search(/\$/)) != -1) {
					
					//any math mode section may only contain ascii characters, if not then it's not math mode
					let tStr = "$" + inputString.slice(0,idx1+1);
					if (tStr.search(/[^\x00-\x7F]/) == -1) {
						//simply add string in math mode
						returnString += tStr;
						
						//continue after math mode section
						inputString = inputString.slice(idx1+1);
					} else {
						//if not in math mode, replace dollar sign and continue scanning in next loop, starting from the position up to which there were definitely no math mode chars
						returnString += '{\\ifmmode\\$\\else\\textdollar\\fi}';
					}
					
				} else {
					//if no more math mode section, replace dollar sign, break loop and replace remaining characters
					returnString += '{\\ifmmode\\$\\else\\textdollar\\fi}';
					break;
				}
			}
			
			//replace remaining characters if there are any by punycode. Allow only chunks not larger than 63 characters to prevent overflow in punycode!
			returnString += inputString.replace(repRegExp, stringReplace).replace(punyRegExp, function(match, offset, original) {
					return convertToPunycode(match);
				}
			);
			
			//return properly parsed string, with adjacent math tags being merged
			return returnString;
		} else {
			//try to replace critical characters, and replace all remaining non-ASCII characters in space separated words using punycode (percentage encoding does not always work!). Allow only chunks not larger than 63 characters to prevent overflow in punycode!
			return inputString.replace(repRegExp, stringReplace).replace(punyRegExp, function(match, offset, original) {
					return convertToPunycode(match);
				}
			);
		}
		
		
	}
	
	// function to identify address
	function identifyAddress(input,isAddress = false,territory = null) {
		//early out
		if (input == null || typeof(input) != 'string' || input.length == 0) return null;
		      
		//compare to city list
		const cityList = BINData.getCityList();
		let length = cityList.length; let candidate = [];
		for (let i = 0; i<length; ++i) {
			let elem = cityList[i];
			
			//first try to check if country correct
			if (territory != null && elem[2].search(territory) == -1) continue;
			if (input.search(new RegExp("(?:^|[\\s]+)" + elem[0].replace(/[\s]/g,"\\ ") + "(?:$|[\\s]+)","gi")) != -1) {
				candidate.push(elem);
			}
		}
		//search for country within possible candidates
		length = candidate.length;
		for (let i = 0; i<length; ++i) {
			if (input.search(new RegExp("(?:" + candidate[i][2].replace(/[\s]*\,[\s]/gi,"|").replace(/[\s]+/g,"\\ ") + ")","i")) != -1) {
				candidate = [candidate[i]];
				break;
			}
		}
		
		//act depending on whether city was found
		if (length == 0) {
			candidate = isAddress ? [input] : null;
		} else {
			candidate = candidate[0];
		}
		
		//return location array
		return candidate;
	}
	
	//function to get domain country
	function getDomainCountry(topLevelDomain) {
        
        //early out and sanitize
        if (topLevelDomain == null || typeof(topLevelDomain) != 'string' || topLevelDomain.length == 0) return "";
        topLevelDomain = topLevelDomain.replace(/^[.]*\./gi,"").trim();
        if (topLevelDomain.length == 0) return "";
        
        //get country
        let country = "";
        try {
            country = domainCountries[topLevelDomain];
            if (country == null) country = "";
        } catch(error) {
            country = "";
        }
        return country;
    }
	
	//function to find address of publisher
	function findPublisherAddressCombination(address,publisher,publisherNonLatex,territoryString,domainCountry) {
		//early out and sanitize
		if (publisher == null || typeof(publisher) != 'string' || publisher.length == 0) return { city: "" , country: "" , publisher: "", publisherNonLatex: "" };
		if (publisherNonLatex == null || typeof(publisherNonLatex) != 'string' || publisherNonLatex.length == 0) publisherNonLatex = publisher;
		
		//simplified publisher string for search
		let publisherNonLatexSimplified = convertSpecialChars(asciiPunctuation(publisher,2),1).toUpperCase();
		
		//simplify territory to match possible countries
		if (territoryString == null || typeof(territoryString) != 'string' || territoryString.length == 0) territoryString = "";
		let territory = territoryString;
		if (territory.length > 0) {
			territory = territory.replace(/English/,"(?:USA|Australia|Canada|UK|Ireland|New\\ Zealand|India)");
			territory = territory.replace(/German/,"(?:Germany|Switzerland|Belgium|Austria|Liechtenstein)");
			territory = territory.replace(/French/,"(?:DR\\ Congo|France|Canada|Madagascar|Ivory\\ Coast|Niger|Burkina\\ Faso|Senegal|Chad|Guinea|Belgium|Burundi|Switzerland|Togo|Central\\ African\\ Republic|Congo|Gabon|Equatorial\\ Guinea|Djibouti|Comoros|Vanuatu|Monaco)");
			territoryString = territory;
			territory = new RegExp(territory,"");
		} else {
			territory = null;
		}
		
		//if the input is known to be address, first try address matching
		let candidate = null, priorityCandidate = [], fallbackCandidate = []; let modifyPublisher = true;
		if (address != null && typeof(address) == 'string' && address.length > 0) {
			candidate = identifyAddress(convertSpecialChars(asciiPunctuation(address,2),1).replace(/\&/g," AND ").replace(/[^0-9A-Za-z\s]+/gi," ").replace(/[\s]+/g," ").trim().toUpperCase(),true,territory);
			if (candidate.length == 1) candidate = null;
		}
		if (candidate == null) {
			//compare to publisher address list
			let inputSimplified = publisherNonLatexSimplified.replace(/\&/g," AND ").replace(/[^0-9A-Za-z\s]+/gi," ").replace(/[\s]+/g," ").trim();
			
			//get a precise regexp, and a smart regexp that includes variants of most common words
			let inputSimplifiedRegExp = new RegExp("(?:^|[\\s]+)"+inputSimplified.replace(/[\s]+/g,"\\ ")+"(?:$|[\\s]+)","i");
			let inputSimplifiedFallback = "(?:Verlag[e]?|Pub[a-z]+|(?:e[\s\-]*)Book[s]?|B[uü]ch(?:er|)|Press[e]?|Print[a-z]*|Corporation|Distrib[a-z]*|Group|Limited|Hardcover|Paperback|International|Edition[s]?|Custom|Foundation)";
			inputSimplifiedFallback = new RegExp("(?:^[\\s]*" + inputSimplifiedFallback + "[\\s]+|[\\s]+" + inputSimplifiedFallback + "[\\s]*$)","gi");
			inputSimplifiedFallback = inputSimplified.replace(inputSimplifiedFallback, 
				function(match, offset, original) {
					return ("" + "(?:|" + match + ")");
				}
			);
			inputSimplifiedFallback = inputSimplifiedFallback.replace(/([\s]+)(GmbH|Inc|Plc|Ltd|llc|co|kg|Corp|ag|and|pr|up|pty)($|[\s]+)/gi, 
				function(match, $1, $2, $3, offset, original) {
					return ("(?:" + $1 + $3 + "|" + $1 + $2 + $3 + ")");
				}
			);
			inputSimplifiedFallback = new RegExp("(?:^|[\\s]+)"+inputSimplifiedFallback.replace(/\(\?\:\ \|([^\)]*)\)$/i,"(?:|$1)").replace(/[\s]+/g,"\\ ")+"(?:$|[\\s]+)","i");
            
            //check and format domain country
            if (domainCountry == null || typeof(domainCountry) != 'string' || domainCountry.length == 0) domainCountry = null;
            if (domainCountry == "United Kingdom") {
                domainCountry = "UK";
            } else if (domainCountry == "United States of America") {
                domainCountry = "USA";
            }
            
            //sweep list
			const addressList = BINData.getPublisherAddressList();
			let length = addressList.length;
            candidate = [];
			for (let i = 0; i<length; ++i) {
				let elem = addressList[i];
				
				//first rule out country if territory available
				if (territory != null && elem[3].search(territory) == -1) {
					continue;
				}
				
				let elemString = elem[0];
				if (elemString.indexOf(inputSimplified + " ") == 0) {
					priorityCandidate.push(elem);
				} else if (elemString.search(inputSimplifiedRegExp) != -1) {
					candidate.push(elem);
				} else if (elemString.search(inputSimplifiedFallback) != -1) {
					fallbackCandidate.push(elem);
				}
			}
			//if not found, search for address in publisher line
			if (priorityCandidate.length == 0 && candidate.length == 0) {
				candidate = identifyAddress(inputSimplified,false);
				if (candidate == null && (length = fallbackCandidate.length) != 0) {
					candidate = fallbackCandidate;
                    
                    //if domain country available and more than one possible candidate, prioritize according to domain country
                    if (domainCountry != null) {
                        for (let i = 0; i<length; i++) {
                            if (candidate[i][3].search(domainCountry) != -1) {
                                candidate = [candidate[i]];
                                break;
                            }
                        }
                    }
                    candidate = candidate[0];
                    
					if (candidate.length > 4) modifyPublisher = false;
					candidate = [candidate[1],candidate[2],candidate[3]];
				}
			} else {
				if (priorityCandidate.length != 0) candidate = priorityCandidate;
                
                //if domain country available and if more than one possible candidate, prioritize according to domain country
                if (domainCountry != null) {
                    length = candidate.length;
                    for (let i = 0; i<length; i++) {
                        if (candidate[i][3].search(domainCountry) != -1) {
                            candidate = [candidate[i]];
                            break;
                        }
                    }
                }
                candidate = candidate[0];
                
				if (candidate.length > 4) modifyPublisher = false;
				candidate = [candidate[1],candidate[2],candidate[3]];
			}
		}
		
		//now combine
		if (candidate != null) {
			//save city in priorityCandidate and country in candidate, adjust publisher if city found and if necessary
			if (candidate.length == 1) {
				priorityCandidate = address;
				candidate = address;
			} else {
				priorityCandidate = candidate[1];
				candidate = candidate[2];
				
				//if publisher contains city somehow, check whether it needs to be removed, deal with non-latex variant
				if (modifyPublisher) {
					let ind; let cityRegExp = null;
					address = (publisherNonLatex != publisher);
					if (address) {
						let publisherSimplified = convertSpecialChars(asciiPunctuation(publisher,2),1).toUpperCase();
						if (publisher.length == publisherSimplified.length) {
							cityRegExp = new RegExp("[\\s\\,\\-\\;\\:]+" + BINData.getCityRegExpString() + "[\\s\\,\\.\\-\\;\\:]*$","");
							while ((ind = publisherSimplified.search(cityRegExp)) != -1) {
								publisher = publisher.slice(0,ind);
								publisherSimplified = publisherSimplified.slice(0,ind);
							}
						}
					}
					if (publisherNonLatex.length == publisherNonLatexSimplified.length) {
						if (cityRegExp == null) cityRegExp = new RegExp("[\\s\\,\\-\\;\\:]+" + BINData.getCityRegExpString() + "[\\s\\,\\.\\-\\;\\:]*$","");
						while ((ind = publisherNonLatexSimplified.search(cityRegExp)) != -1) {
							publisherNonLatex = publisherNonLatex.slice(0,ind);
							publisherNonLatexSimplified = publisherNonLatexSimplified.slice(0,ind);
						}
					}
					if (!address) publisher = publisherNonLatex;
				}
			}

			//set final output
			candidate = { city: priorityCandidate , country: candidate , publisher: publisher, publisherNonLatex: publisherNonLatex}
		} else {
			//if country available from territory, at least add country. Otherwise choose address if possible
			if (territoryString.charAt(0) == "(") territoryString = address == null ? "" : address;
			candidate = { city: "" , country: territoryString , publisher: publisher, publisherNonLatex: publisherNonLatex };
		}
		
		//return location array
		return candidate;
	}
	
	function findJournalAbbreviation(name) {
		
		//replace all special characters by abbreviation characters, since journal ids are written with these!
		name = convertSpecialChars(name,1);
		
		//remove remaining special characters, all multiple white spaces, and put to upper case
		let nameWithAnd = name.replace(/\&/g," AND ");
		name = name.replace(/[^A-Za-z0-9\ ]/g,"").replace(/[\s]+/g," ").toUpperCase();
		nameWithAnd = nameWithAnd.replace(/[^A-Za-z0-9\ ]/g,"").replace(/[\s]+/g," ").toUpperCase();
		
		//now search for abbreviation
		//start with extracting all journals with same first letter
		let list = BINData.getJournalAbbrevList().getElementById("" + name.charAt(0));

		// if not available, return empty string immediately
		if (list == null) return "";
		//otherwise, look for exact match
		let abbrev = list.querySelector("journal[ident=\"" + name + "\"]");
		if (abbrev == null) {
			abbrev = list.querySelector("journal[ident=\"" + nameWithAnd + "\"]");
		}
		// if not available, return empty string immediately
		if (abbrev == null) return "";
		//otherwise get abbreviation
		abbrev = abbrev.getAttribute('abbrev');
		// if not available, return empty string immediately
		if (abbrev == null) return "";
		//otherwise return trimmed journal abbreviation
		return abbrev.trim();

	}
	
	function sanitizeBibkey(bibkey,whiteSpace = "") {
		if (bibkey == null || typeof(bibkey) != 'string' && bibkey.length == 0) return bibkey;
		if (whiteSpace == null || typeof(whiteSpace) != 'string') whiteSpace = "";
		return (convertSpecialChars(bibkey.slice(0,50),1).replace(/[\,\{\}\?\!]+/g,"").trim().replace(/[\s]+/g,whiteSpace.replace(/[\s]*/g,"")));
	}
	
	//return helper functions
	return Object.freeze({
		htmlDecode: htmlDecode,
		convertSpecialChars: convertSpecialChars,
		findJournalAbbreviation: findJournalAbbreviation,
		convertToPunycode: convertToPunycode,
		fixedCharCodeAt: fixedCharCodeAt,
		escapeForRegExp: escapeForRegExp,
		asciiPunctuation: asciiPunctuation,
        getPunctuationChars: getPunctuationChars,
		getIsoLanguage: getIsoLanguage,
		cleanDOI: cleanDOI,
		sanitizeBibkey: sanitizeBibkey,
		toTitleCase: toTitleCase,
		recognizeRegExpFlags: recognizeRegExpFlags,
		getAllLetters: getAllLetters,
		findPublisherAddressCombination: findPublisherAddressCombination,
		getISBNTerritories: getISBNTerritories,
        getDomainCountry: getDomainCountry,
        removeOuterBrackets: removeOuterBrackets
	}); //end return
}());
