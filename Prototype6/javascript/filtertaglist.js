$(document).ready(function(){

	//When something is entered in search field do function
  	$('#tagSearch').keydown(function(){
    	setTimeout(function() {
      		var query = $('#tagSearch').val();
      		filterTagList(query);
    	}, 50);
  	});
});

//filter tags by search query and tweetslider score
function filterTagList(searchquery){

	//Get the video ID from URL
	var hash = getUrlVars();
	var vidid = hash['vidid'];

	//Create object
	var filteredTags = [];
	//Grab data from localstorage
	var data = JSON.parse(localStorage.getItem(vidid));
	 
	//Check button state
	var button = $('#tag-toggle-button').html();
	if(button == 'Tweets'){
      		var tweetdata = data.tweet;
      		var type  = 'tweet';
      		var score = $("#tweet_value").val();

    }else{
      		var tweetdata = data.visual;
   			var type = 'visual';
   			var score = $("#visual_value").val();
    }
	
 	//filter the tags with given rerankingscore or visualscore
 	var length = Math.min(101,tweetdata.length);
	for(var i = 0;i < length;i++){
		var tag = {};
		tag.term = tweetdata[i].term;
		tag.rating = tweetdata[i].rating;
		if (type == 'tweet'){
		tag.score = tweetdata[i].reranking_score;
		}else{
		tag.score = tweetdata[i].visual_score;
		}	
		if(tag.score > score){			
			if(tag.term.indexOf(searchquery) != -1){
				filteredTags.push(tag);
			}
		}
	}
	//Generate the cloud
	createCloud(filteredTags,type);
	checkTags(function(){colorTags($('#tag-cloud-inner').children().length)},0);
}