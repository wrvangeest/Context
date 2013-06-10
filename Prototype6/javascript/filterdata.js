//Filters the relevent data from the stored data
function filterData(id, dur, type){
	data = JSON.parse(localStorage.getItem(id));
	var filteredTemp = {};
	filteredTemp.visual = [];
	filteredTemp.tweet = [];
	var j = 0;
	
	//Used to generate lists in combination with toggle button
	switch(type){
	case "tweet" :
		$("#tweetPoints").empty();
		for(var i = 0; i < Math.min(100, data.tweet.length); i++){
			if(i < data.tweet.length && data.tweet[i].reranking_score >= $("#tweet_value").val()){
				var x = {};
				x.term = data.tweet[i].term;
				x.time = data.tweet[i].time_jump_in_point;
				x.reranking_score = data.tweet[i].reranking_score;
				x.rating = data.tweet[i].rating;
				filteredTemp.tweet.push(x);
			}
		}
		createZapCode(filteredTemp.tweet, "tweet");
		createCloud(filteredTemp.tweet,type);
		checkTags(colorTags($('#tag-cloud-inner').children().length,""),0);
		break;
	case "visual" :
		$("#visualPoints").empty();
		for(var i = 0; i < Math.min(100, data.tweet.length); i++){
			if(i < data.visual.length && data.visual[i].visual_score > $("#visual_value").val()){
				var x = {};
				x.term = data.visual[i].term;
				x.time = data.visual[i].time_jump_in_point;
				x.reranking_score = data.visual[i].reranking_score;
				x.rating = data.visual[i].rating;
				filteredTemp.visual.push(x);
			}
		}
		createZapCode(filteredTemp.visual, "visual");
		createCloud(filteredTemp.visual,type);
		checkTags(colorTags($('#tag-cloud-inner').children().length,""),0);
		break;
	default : 
		for(var i = 0; i < Math.min(100, Math.max(data.visual.length, data.tweet.length)); i++){
			if(timeToSec(data.tweet[i].time_jump_in_point) <= dur){
				if(i < data.tweet.length && data.tweet[i].reranking_score >= $("#tweet_value").val()){
					var x = {};
					x.term = data.tweet[i].term;
					x.time = data.tweet[i].time_jump_in_point;
					x.reranking_score = data.tweet[i].reranking_score;
					x.rating = data.tweet[i].rating;
					filteredTemp.tweet.push(x);
				}
				if(i < data.visual.length && data.visual[i].visual_score > $("#visual_value").val()){
					var x = {};
					x.term = data.visual[i].term;
					x.time = data.visual[i].time_jump_in_point;
					x.reranking_score = data.visual[i].reranking_score;
					x.rating = data.tweet[i].rating;
					filteredTemp.visual.push(x);
				}
			}
		}
		//Generate the HTML from the data for..
		//..zappoints()
		createZapCode(filteredTemp.tweet, "tweet");
		createZapCode(filteredTemp.visual, "visual");
		//..tagcloud
		createCloud(filteredTemp.tweet,'tweet');
		var number = $('#tag-cloud-inner').children().length;
		checkTags(colorTags(number,""),0);
		break;
	}
}