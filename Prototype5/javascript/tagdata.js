$(document).ready(function(){
	/*function snapshot(time){

		var video2 = document.getElementById("snapvideo");
		var canvas = document.createElement('canvas');

		canvas.width  = 350;
		canvas.height = 150;

		video2.currentTime = time;

		

		var ctx = canvas.getContext('2d');
		ctx.drawImage(video2, 0, 0, 350, 150); 

		return canvas;
	}*/

//############# Mouse actions for zappoints ################# 
	$("body").on("click",".zapPoint",function(){
		//Get pixel location
		$loc = $(this).css("margin-left");
		$loc = $loc.substr(0,$loc.length - 2);
		//Jump to given time
		goToTime($loc);
	});

	$("body").on("mouseenter",".zapPoint",function(){
		//Displays extra information on the right
		updateExtraInfo(this);
		$("#extrainfo_inner").css("display", "block");

		//Highlights tag in cloud for tweetpoints
		if($(this).hasClass("tweetPoint")){
			$cloudClass = getAssocId(this);
			$orTagColor = $($cloudClass).css("backgroundColor");
			$($cloudClass).css("background-color", "#b98acf");
			//scroll tag to the right position when hovering over tag
			scrollToTag($cloudClass);
		}


	});

	$("body").on("mouseout",".zapPoint",function(){
		//Clear extra info
		$("#extrainfo_inner").html("");

		if($(this).hasClass("tweetPoint")){
			$($cloudClass).css("background-color", $orTagColor);
		}
	});

//############# Mouse actions for tags #################
	$("body").on("click",".tager",function(){
		//Gather ID information
		var zapId = getAssocId(this);
		//Get pixel location
		loc = $($zapId).css("margin-left");
		loc = loc.substr(0,loc.length - 2);
		//Jump to givesn time
		goToTime(loc);
	});
	$("body").on("mouseenter",".tager",function(){
		//Gather ID information
		$zapId = getAssocId(this);

		//Displays extra information on the right
		updateExtraInfo(document.getElementById($zapId));
		$("#extrainfo_inner").css("display", "block");

		//Change background color
		$orTagColor = $(this).css("backgroundColor");
		$(this).css("background-color", "#b98acf");

		//Change ZapPoint color
		$zapId = '#' + $zapId;
		$orZapColor = $($zapId).css("color");
		$($zapId).css("color", "blue");
		$($zapId).css("z-index", 99);
		$($zapId).addClass("icon-large");
	});	

	$("body").on("mouseout",".tager",function(){
		//Clear extra info
		$("#extrainfo_inner").html("");
		//Restore original colors
		$(this).css("background-color", $orTagColor);
		$($zapId).css("color", $orZapColor);
		$($zapId).css("z-index", 1);
		$($zapId).removeClass("icon-large");
	});
});
//############# Helper functions for mouse events #############
//Go to time given by loc in pixels
function goToTime(loc) {
	//Calculate seconds
	var time = calcTime(loc);
	//Jump to time
	Popcorn("#video").currentTime(time);
	Popcorn("#video").play();
}

//Update extra info using pixel offset in pixels as time indicator
function updateExtraInfo(obj){
		var time = calcTime(parseInt($(obj).css("margin-left")));
		time = timeToMin(time);
		//.append(snapshot(timeat))
		$("#extrainfo_inner").append('<img src=http://placehold.it/350x150><br/>')
							 .append(obj.getAttribute('term') + ' at approximately ' + time + '<br/>')

}
//##############################################################


//############# Helper functions for tag generation #############

//Ajax call for zappoint data
//Return format: {"term":"<term>","time":"<time>"} (JSON String)
function getZapData(dur){
	var hash = getUrlVars();
	var vidid = hash['vidid'];
	$.post("php/zappoints.php?id=" + vidid)
		.done(function (data) {
			//localStorage.setItem(vidid,data);
			var obj = JSON.parse(data);
		var filtered = {};
		filtered.visual = [];
		filtered.tweet = [];
		var visCount = 0;
		var twtCount = 0;
		for(var i = 0; i < obj.scores.length; i++){
			if(timeToSec(obj.scores[i].time_jump_in_point) <= dur){
				if(obj.scores[i].tweet_score > 0){
					var x = {};
					x.term = obj.scores[i].term;
					x.time_jump_in_point = obj.scores[i].time_jump_in_point;
					x.reranking_score = obj.scores[i].reranking_score;
					filtered.tweet.push(x);
				}
				if(obj.scores[i].in_lscom == 1){
					var x = {};
					x.term = obj.scores[i].term;
					x.time_jump_in_point = obj.scores[i].time_jump_in_point;
					x.reranking_score = obj.scores[i].reranking_score;
					x.visual_score = obj.scores[i].visual_score;
					filtered.visual.push(x);
					/*filtered.visual[visCount] = {
						term : obj.scores[i].term,
						time_jump_in_point : obj.scores[i].time_jump_in_point,
						reranking_score : obj.scores[i].reranking_score
					};
					visCount++;*/
				}
			}
		}
		filtered.visual.sort(sortByScore);
		filtered.tweet.sort(sortByScore);
		jFiltered = JSON.stringify({visual: filtered.visual, tweet: filtered.tweet});
		localStorage.setItem(vidid, jFiltered);
		filterData(vidid, dur, "");
	})
	    //Give message when failed
	   	.fail(function() {
	    	//alert("getZapData failed!");
	});
}		


function filterData(id, dur, type){
	data = JSON.parse(localStorage.getItem(id));
	var filteredTemp = {};
	filteredTemp.visual = [];
	filteredTemp.tweet = [];
	var j = 0;
	switch(type){
	case "tweet" :
		$("#tag-cloud-inner").empty();
		$("#tweetPoints").empty();
		for(var i = 0; i < Math.min(100, data.tweet.length); i++){
			if(i < data.tweet.length && data.tweet[i].reranking_score >= $("#tweet_value").val()){
				var x = {};
				x.term = data.tweet[i].term;
				x.time = data.tweet[i].time_jump_in_point;
				x.reranking_score = data.tweet[i].reranking_score;
				filteredTemp.tweet.push(x);
			}
		}
		createZapCode(filteredTemp.tweet, "tweet");
		createCloud(filteredTemp.tweet);
		checkTags(colorTags(),0);
		break;
	case "visual" :
		$("#visualPoints").empty();
		for(var i = 0; i < Math.min(100, data.tweet.length); i++){
			if(i < data.visual.length && data.visual[i].visual_score > $("#visual_value").val()){
				var x = {};
				x.term = data.visual[i].term;
				x.time = data.visual[i].time_jump_in_point;
				x.reranking_score = data.visual[i].reranking_score;
				filteredTemp.visual.push(x);
			}
		}
		createZapCode(filteredTemp.visual, "visual");
		break;
	default : 
		for(var i = 0; i < Math.min(100, Math.max(data.visual.length, data.tweet.length)); i++){
			if(timeToSec(data.tweet[i].time_jump_in_point) <= dur){
				if(i < data.tweet.length && data.tweet[i].reranking_score >= $("#tweet_value").val()){
					var x = {};
					x.term = data.tweet[i].term;
					x.time = data.tweet[i].time_jump_in_point;
					x.reranking_score = data.tweet[i].reranking_score;
					filteredTemp.tweet.push(x);
				}
				if(i < data.visual.length && data.visual[i].visual_score > $("#visual_value").val()){
					var x = {};
					x.term = data.visual[i].term;
					x.time = data.visual[i].time_jump_in_point;
					x.reranking_score = data.visual[i].reranking_score;
					filteredTemp.visual.push(x);
				}
			}
		}
		//Generate the HTML from the data for..
		//..zappoints()
		createZapCode(filteredTemp.tweet, "tweet");
		createZapCode(filteredTemp.visual, "visual");
		//..tagcloud
		createCloud(filteredTemp.tweet);
		checkTags(colorTags(),0);
		break;
	}
}

function getNewTags(type){
	var hash = getUrlVars();
	var vidid = hash['vidid'];

	var rerankingscore = $("#tweet_value").val();
	var visualscore = $("#visual_value").val();
	filterData(vidid, Popcorn("#video").duration(), type);
}	

function sortByScore(x,y){
	return y.reranking_score - x.reranking_score;
}

//Appends cloud information to generate cloud
function createCloud(data){
	jQuery.each(data, function(index,item) {
		$("#tag-cloud-inner").append('<button class="btn btn-info tager t' + index + '">' + item.term + "</button>" + " "  );
	})
	$("#loading-img").hide();
}

//Generates HTML code
function createZapCode(data, type){
	//Grab the list div (located in HTML file)
	var list = document.getElementById(type + "Points");

	//Loop through the data using JSON functions
	jQuery.each(data,function(index, item) {
		//Retrieve offset in pixels from time
		var loc = calcDist(item);
		//Create listitem element
		var zap = document.createElement("li");
		//Set properties so CSS recognizes correctly
		switch(type) {
			case "tweet":
				zap.className = "icon-twitter-sign tweetPoint zapPoint";
				zap.id = "tweetPoint" + index;
				zap.style.color = "rgb(64,153,255)";
				break;
			case "visual":
				zap.className = "icon-eye-open visualPoint zapPoint";
				zap.id = "visualPoint" + index;
				zap.style.color = "rgb(64, 153, 255)";
				break;
		}
		//Set id for linking to cloud
		
		//Set location in pixels
		zap.style.marginLeft = loc + "px";
		//Set tag name as attribute
		zap.setAttribute('term', item.term);
		//Append item to list
		list.appendChild(zap);
		zap.style.position = "absolute";
	});
}

//Scroll tag to the right position 
//give cloudTag id as paramater
function scrollToTag(id){

			$('#tag-cloud-inner').scrollTop(0);
			var tagcloudTop = $('#tag-cloud-inner').position().top;
			var tagTop = $(id).position().top;

			$('#tag-cloud-inner').animate({
				scrollTop: tagTop - tagcloudTop
			},500);
}
//##############################################################

//############# Helper functions for conversion #############

//Calculates the offset in pixels for zappoint location
function calcDist(val){
	//Convert time ("m:(s)s") to seconds
	var secs = timeToSec(val.time);
	//Grab duration of video
	var dur = Popcorn("#video").duration();
	//Calculate ratio of time/duration
	var ratio = secs / dur;
	//Grab width of timeline in pixels
	var wdth = document.getElementById("visualPoints").style.width;
	//Trim for calculations
	wdth = wdth.substr(0,wdth.length - 2);
	//alert("Secs: " + secs + " Dur: " + dur + " Ratio: " + ratio + " Width: " + wdth);
	//Return offset value in pixels calculated using ratio
	return (ratio * wdth);
}

//Calculates the time in seconds from the offset in pixels
function calcTime(dist){
	//Get duration of the video
	var dur = Popcorn("#video").duration();
	//Get width of timeline in pixels
	var wdth = document.getElementById("visualPoints").style.width;
	//Trim for calculations
	wdth = wdth.substr(0,wdth.length - 2);
	//Calculate pixel/total ratio
	var ratio = dist / wdth;
	//Return time value in seconds calculated using ratio
	return (ratio * dur);
}

//Converts int seconds into string min:sec
function timeToMin(seconds){
	if (seconds < 0) {
		var min = 0;
		var sec = 0;
	}else{
		var min = Math.floor(seconds / 60);
		var sec = Math.round(seconds % 60);
	}
	if(sec < 10){
		sec = "0" + sec;
	}
	return min + ":" + sec;
}

function timeToSec(minutes){
	var time = minutes.split(":");
	return ((parseInt(time[0]) * 60) + parseInt(time[1]));
}
//##############################################################

//############# Miscellaneous helper functions #############
//Returns associated ID (TweetPointID -> TagID or TagID -> TweetPointID)
function getAssocId(obj){
	switch(obj.id.substr(0,3)) {
		case "twe":
			$zapId = obj.id;
			$zapId = $zapId.slice(10,$zapId.length);
			return ".btn.t" + $zapId;
		case "":
			$tagId = obj.className;
			$tagId = $tagId.slice(20,$tagId.length);
			return "tweetPoint" + $tagId;
	}
}

function hasClass(element, clss){
	return (' ' + element.className + ' ').indexOf(' ' + clss + ' ') > -1;
}

//##############################################################
