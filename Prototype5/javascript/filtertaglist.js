$(document).ready(function(){

	//When something is entered in search field do function
  	$('#tag-search').keydown(function(){
    	setTimeout(function() {
      		var query = $('#tag-search').val();
      		var tweetValue = $('#tweet_value').val();
      		filterTagList(query,tweetValue);
      		colorTags();
    	}, 50);
  	});
});

//filter tags by search query and tweetslider score
function filterTagList(searchquery,score){

	var hash = getUrlVars();
	var vidid = hash['vidid'];

	
	var filteredTags = [];
	var data = JSON.parse(localStorage.getItem(vidid));
	var tweetdata = data.tweet;

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