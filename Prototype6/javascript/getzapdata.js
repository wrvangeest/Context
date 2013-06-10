//Ajax call for zappoint data
//Return format: {"term":"<term>","time":"<time>"} (JSON String)
function getZapData(dur){
	var hash = getUrlVars();
	var vidid = hash['vidid'];
	var local = localStorage.getItem(vidid);
	if(local != null){
		filterData(vidid, dur, "");
	}
	$.post("php/zappoints.php?id=" + vidid + "&dur=" + dur)
		.done(function (data) {
			var obj = JSON.parse(data);
			obj.visual.sort(sortByRerankingScore);
			obj.tweet.sort(sortByRerankingScore);
			jFiltered = JSON.stringify(obj);
			localStorage.setItem(vidid, jFiltered);
			filterData(vidid, dur, "");
		})
		    //Give message when failed
	   	.fail(function() {
	    	//alert("getZapData failed!");
	});
}		

//Sets sorting type
function sortByRerankingScore(x,y){
	return y.reranking_score - x.reranking_score;
}
function sortByConfidenceScore(x,y){
	return y.confidence_score - x.reranking_score;
}