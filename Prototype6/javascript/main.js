$(document).ready(function(){
	//fix search button
	$("#searchbutton").click(function(){
		var xyz = $("#search-animate-bar").css("margin-top");
		if(parseInt(xyz) < 0){
		$("#search-animate-bar").animate({ marginTop: '0px'}, 1000);
		}else{
			$("#search-animate-bar").animate({ marginTop: '-50px'}, 1000);
		}

	});

	//fix browsebutton
	$("#browsebutton").click(function(){
		location.href = "index.php";
	});

	//################# Function for search bar #####################

	$('#top-search').keyup(function(e){
		if(e.keyCode == 13)
		{
			if($(this).val() == "")
			{
				$(this).attr('placeholder','Please enter a search term....');
				e.stopImmediatePropagation();
			}else
			{
				location.href = "searchPage.php?query=" + $(this).val();
				searchTerms($(this).val());
			}
		}
	});
	//###############################################################

	//fix homebutton
	$("#homebutton").click(function(){
		location.href = "index.php";
	});		
});

function cleartags(){
	$("#tag-cloud-inner").empty();
	$("#tweetPoints").empty();
	$("#visualPoints").empty();
}