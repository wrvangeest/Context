$(document).ready(function(){

	
  	$('#tag-search').keydown(function(){
    	setTimeout(function() {
      		var query = $('#tag-search').val();
      		var tweetValue = $('#tweet_value').val();
      		filterTagList(query,tweetValue);
      		colorTags();
    	}, 50);
  	});
});



function filterTagList(searchquery,score){


	var hash = getUrlVars();
	var vidid = hash['vidid'];

	
	var filteredTags = [];
	var data = JSON.parse(localStorage.getItem(vidid));
	var tweetdata = data.tweet;
	console.log(searchquery + " " + score);
 	console.log(tweetdata);

 	//filter the tags with given rerankingscore
	for(var i = 0;i <= 100;i++){
		var tag = {};
		tag.term = tweetdata[i].term;
		tag.reranking_score = tweetdata[i].reranking_score;

		if(tag.reranking_score > score){

			if(tag.term.indexOf(searchquery) != -1){
				filteredTags.push(tag);
			}
		}
	}
	$("#tag-cloud-inner").empty();
	createCloud(filteredTags);
}
/*
//Appends cloud information to generate cloud
function createCloud(data){
	jQuery.each(data, function(index,item) {
		$("#tag-cloud-inner").append('<button class="btn btn-info tager t' + index + '">' + item.term + "</button>" + " "  );
	})
	$("#loading-img").hide();
}*/
