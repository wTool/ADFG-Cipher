function Encrypt(params01,params02,params03){
	var plaintext, ciphertext, keysquare, keyword;
	plaintext = params01.toLowerCase().replace(/[^abcdefghiklmnopqrstuvwxyz]/g, "");
	keysquare = params02.toLowerCase().replace(/[^abcdefghiklmnopqrstuvwxyz]/g, "");
	keyword = params03.toLowerCase().replace(/[^a-z]/g, "");
	
	if (plaintext.length < 1) {
		alert("please enter some plaintext (letters only)");
		return;
	}
	if (keysquare.length != 25) {
		alert("keysquare must be 25 characters in length containing letters a-z (no j)");
		return;
	}
	if (keyword.length <= 1) {
		alert("keyword should be at least 2 characters long");
		return;
	}
	
	adfgvx = "ADFGX";
	ciphertext1 = "";
	for (i = 0; i < plaintext.length; i++) {
		index = keysquare.indexOf(plaintext.charAt(i));
		ciphertext1 += adfgvx.charAt(index / 5) + adfgvx.charAt(index % 5);
	}
	var colLength = ciphertext1.length / keyword.length;
	var chars = "abcdefghijklmnopqrstuvwxyz";
	ciphertext = "";
	k = 0;
	for (i = 0; i < keyword.length; i++) {
		while (k < 26) {
			t = keyword.indexOf(chars.charAt(k));
			arrkw = keyword.split("");
			arrkw[t] = "_";
			keyword = arrkw.join("");
			if (t >= 0) break;
			else k++;
		}
		for (j = 0; j < colLength; j++) ciphertext += ciphertext1.charAt(j * keyword.length + t);
	}
	
	return ciphertext;
}

function Decrypt(params01,params02,params03){
	var ciphertext = params01.toLowerCase().replace(/[^abcdefghiklmnopqrstuvwxyz]/g, "");
	var keysquare = params02.toLowerCase().replace(/[^abcdefghiklmnopqrstuvwxyz]/g, "");
	var keyword = params03.toLowerCase().replace(/[^a-z]/g, "");
	klen = keyword.length;
	var re = /[^adfgx]/;

	if (ciphertext.length < 1) {
		alert("please enter some ciphertext (letters only)");
		return;
	}
	if (re.test(ciphertext)) {
		alert("ciphertext can only contain A,D,F,G or X characters.");
		return;
	};
	if (ciphertext.length % 2 != 0) {
		alert("number of ciphertext characters must be even");
		return;
	}
	if (keysquare.length != 25) {
		alert("keysquare must be 25 characters in length");
		return;
	}
	if (klen <= 1) {
		alert("keyword should be at least 2 characters long");
		return;
	}
	var numLongCols = ciphertext.length % klen;
	var cols = new Array(klen);
	var colLength = Math.floor(ciphertext.length / klen);

	chars = "abcdefghijklmnopqrstuvwxyz";
	i = 0;
	upto = 0;
	for (j = 0; j < klen;) {
		t = keyword.indexOf(chars.charAt(i));
		if (t >= 0) {
			if (t < numLongCols) cl = colLength + 1;
			else cl = colLength;
			cols[t] = ciphertext.substr(upto, cl);
			upto = upto + cl;
			arrkw = keyword.split("");
			arrkw[t] = "_";
			keyword = arrkw.join("");
			j++;
		} else i++;
	}

	plaintext1 = "";
	for (j = 0; j < colLength + 1; j++) {
		for (i = 0; i < klen; i++) {
			plaintext1 += cols[i].charAt(j);
		}
	}

	adfgvx = "adfgx";
	plaintext = "";
	for (i = 0; i < plaintext1.length; i += 2) {
		keyindex = adfgvx.indexOf(plaintext1.charAt(i)) * 5 + adfgvx.indexOf(plaintext1.charAt(i + 1));
		plaintext += keysquare.charAt(keyindex);
	}
	
	return plaintext;
}

function GenRandKey() {
	var keychars = "abcdefghiklmnopqrstuvwxyz";
	var chars = keychars.split("");
	ret = "";
	lim = chars.length
	for (i = 0; i < lim; i++) {
		index = Math.floor(chars.length * Math.random());
		ret += chars[index];
		chars.splice(index, 1);
	}
	return ret;
}
