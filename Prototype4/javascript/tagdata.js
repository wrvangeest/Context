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
		$zapId = getAssocId(this);

		//Get pixel location
		$loc = $($zapId).css("margin-left");
		$loc = $loc.substr(0,$loc.length - 2);
		//Jump to given time
		goToTime($loc);
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
		$($zapId).addClass("icon-large");
	});	

	$("body").on("mouseout",".tager",function(){
		//Clear extra info
		$("#extrainfo_inner").html("");

		//Restore original colors
		$(this).css("background-color", $orTagColor);
		$($zapId).css("color", $orZapColor);
		$($zapId).removeClass("icon-large");
	});
});
//############# Helper functions for mouse events #############
//Go to time given by loc in pixels
function goToTime(loc) {
	//Calculate seconds
	var time = calcTime(loc);
	console.log(time);
	//Jump to time
	Popcorn("#video").currentTime(time).play();
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
	$.post("php/zappoints.php", {type : "tweet"})
		.done(function (data) {
			var obj = JSON.parse(data);
			var filtered = {};
			filtered.visual = [];
			filtered.tweet = [];
			var j = 0;
			for(var i = 0; i < obj.scores.length; i++){
				if(timeToSec(obj.scores[i].time_jump_in_point) <= dur){
					if(obj.scores[i].tweet_score > 0){

						var x = {};
						x.term = obj.scores[i].term;
						x.time = obj.scores[i].time_jump_in_point;
						x.reranking_score = obj.scores[i].reranking_score;
						filtered.tweet.push(x);
					}
					if(obj.scores[i].in_lscom == 1 && obj.scores[i].visual_score > 0){
						var x = {};
						x.term = obj.scores[i].term;
						x.time = obj.scores[i].time_jump_in_point;
						x.reranking_score = obj.scores[i].reranking_score;
						filtered.visual.push(x);
					}
				}
			}
			filtered.visual.sort(sortByScore);
			filtered.tweet.sort(sortByScore);
			filtered.visual.splice(19,filtered.visual.length);
			filtered.tweet.splice(19,filtered.tweet.length);
			//Generate the HTML from the data for..
			//..zappoints()
			createZapCode(filtered.tweet, "tweet");
			createZapCode(filtered.visual, "visual");
			//..tagcloud
			createCloud(filtered.tweet);
	    })
	    //Give message when failed
	    .fail(function() {
	    	alert("getZapData failed!");
	});


}		

function sortByScore(x,y){
	return y.reranking_score - x.reranking_score;
}

//Appends cloud information to generate cloud
function createCloud(data){
	jQuery.each(data, function(index,item) {
		$("#tag-cloud-inner").append('<button class="btn btn-info tager t' + index + '">' + item.term + "</button>" + " "  );
	})
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
				break;
			case "visual":
				zap.className = "icon-eye-open visualPoint zapPoint";
				zap.id = "visualPoint" + index;
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
	var min = Math.floor(seconds / 60);
	var sec = Math.round(seconds % 60);
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