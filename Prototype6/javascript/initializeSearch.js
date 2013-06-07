$(document).ready(function(){
	var term = getUrlVars();
	var term = term['query'];

	searchTerms(term);
});