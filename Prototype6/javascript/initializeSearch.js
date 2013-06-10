$(document).ready(function(){
	var term = getUrlVars();
	var term = term['query'];
	$("#loading-img").show();
	searchTerms(term);

	$("body").on("mouseenter",".tager",function(){
		//Change background color
		$orTagColor = $(this).css("backgroundColor");
		$(this).css("background-color", darkerColor(this));
	});	

	$("body").on("mouseleave",".tager", function() {
		//Restore original colors
		$(this).css("background-color", $orTagColor);
	});
});