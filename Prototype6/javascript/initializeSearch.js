$(document).ready(function(){
	var term = getUrlVars();
	var term = term['query'];
	$("#loading-img").show();
	searchTerms(term);
});