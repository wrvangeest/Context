$(document).ready(function(){
	//Grabs search term from URL
	var term = getUrlVars();
	var term = term['query'];
	//Displays loading icon
	$("#loading-img").show();
	//Starts the search process
	searchTerms(term);

	//################# Mouse functions for tag buttons #####################
	$("body").on("mouseenter",".tager",function(){
		//Change background color
		$orTagColor = $(this).css("backgroundColor");
		$(this).css("background-color", darkerColor(this));
	});	

	$("body").on("mouseleave",".tager", function() {
		//Restore original colors
		$(this).css("background-color", $orTagColor);
	});
	//#######################################################################
});