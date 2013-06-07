function searchTerms(searchTerm){
	var videos = [3,4,6,7,8,9,10];
	for(video in videos){
		$.post("php/zappoints.php?id=" + videos[video] + "&dur=999999")
		.done(function (data) {
			var obj = JSON.parse(data);
			searchObject(searchTerm, obj);
		})
		    //Give message when failed
	   	.fail(function() {
	    	//alert("getZapData failed!");
		});
	}
}

function searchObject(searchTerm, object){
	var results = {};
	results.visual = [];
	results.tweet = [];
	results.id = object.id;
	//Process visual
	for(zapPoint in object.visual){
		if(object.visual[zapPoint].term.search(searchTerm) >= 0){
			results.visual.push(object.visual[zapPoint]);
		}
	}
	//Process tweet
	for(zapPoint in object.tweet){
		if(object.tweet[zapPoint].term.search(searchTerm) >= 0){
			results.tweet.push(object.tweet[zapPoint]);
		}
	}
	console.log(results);
}


$(document).ready(function(){

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

});