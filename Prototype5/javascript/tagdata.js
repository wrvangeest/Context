var OFFSET = 6;
$(document).ready(function(){

//############# Mouse actions for zappoints ################# 
	$("body").on("click",".zapPoint",function(){
		//Get pixel location
		$loc = $(this).css("margin-left");
		$loc = $loc.substr(0,$loc.length - 2);
		//Jump to given time
		goToTime(parseInt($loc) + OFFSET);
	});

	$("body").on("mouseenter",".zapPoint",function(){
		//Displays extra information on the right
		updateExtraInfo(this);
		$("#extrainfo_inner").css("display", "block");

		//Highlights tag in cloud for tweetpoints
		if($(this).hasClass("tweetPoint")){
			$cloudClass = getAssocId(this);
			$orTagColor = $($cloudClass).css("backgroundColor");
			$($cloudClass).css("background-color", darkerColor($cloudClass));
			//scroll tag to the right position when hovering over tag
			scrollToTag($cloudClass);
		}
		if($(this).hasClass("visualPoint")){
			$cloudClass = getAssocId(this);
			$orTagColor = $($cloudClass).css("backgroundColor");
			$($cloudClass).css("background-color", darkerColor($cloudClass));
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
		if($(this).hasClass("visualPoint")){
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
		goToTime(parseInt(loc) + OFFSET);
	});
	$("body").on("mouseenter",".tager",function(){
		//Gather ID information
		$zapId = getAssocId(this);

		//Displays extra information on the right
		updateExtraInfo(document.getElementById($zapId));
		$("#extrainfo_inner").css("display", "block");

		//Change background color
		$orTagColor = $(this).css("backgroundColor");
		$(this).css("background-color", darkerColor(this));

		//Change ZapPoint color
		$zapId = '#' + $zapId;
		$orZapColor = $($zapId).css("color");
		$($zapId).css("color", "blue");
		$($zapId).css("z-index", 99);
		$($zapId).addClass("icon-large");
	});	

	$("body").on("mouseout",".tager", function() {
		//Clear extra info
		$("#extrainfo_inner").html("");
		//Restore original colors
		$(this).css("background-color", $orTagColor);
		$($zapId).css("color", $orZapColor);
		$($zapId).css("z-index", 1);
		$($zapId).removeClass("icon-large");
	});
});

//############# Mouse actions for ratings #################

	$("body").on("mouseenter",".rating", function() {
		if($(this).hasClass("icon-star")){
			var child = this;
			$(child).removeClass("icon-star");
			$(child).addClass("icon-star-empty");
			while(child.nextSibling){
				child = child.nextSibling;
				$(child).removeClass("icon-star");
				$(child).addClass("icon-star-empty");
			}
		}

		if($(this).hasClass("icon-star-empty")){	
			var child = this;
			while(child.previousSibling){
				$(child).removeClass("icon-star-empty");
				$(child).addClass("icon-star");
				child = child.previousSibling;
			}
		}
	});

	$("body").on("mouseout",".rating", function() {
		var rating = this.id.substr(6,1);
		var children = $(this).parent().children();
		for(var i = 0; i < rating; i++){
			$(children[i]).removeClass("icon-star-empty");
			$(children[i]).addClass("icon-star");
		}
		for(var i = rating; i <= 5; i++){
			$(children[i]).removeClass("icon-star");
			$(children[i]).addClass("icon-star-empty");
		}
	});

	$("body").on("click",".rating", function() {

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
		var time = calcTime(parseInt($(obj).css("margin-left")) + 4);
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
	$.post("php/zappoints.php?id=" + vidid + "&dur=" + dur)
		.done(function (data) {
			var obj = JSON.parse(data);
			console.log(obj);
			obj.visual.sort(sortByScore);
			obj.tweet.sort(sortByScore);
			jFiltered = JSON.stringify(obj);
			localStorage.setItem(vidid, jFiltered);
			filterData(vidid, dur, "" );
		})
		    //Give message when failed
	   	.fail(function() {
	    	//alert("getZapData failed!");
	});
}		

//Filters the relevent data from the stored data
function filterData(id, dur, type){
	data = JSON.parse(localStorage.getItem(id));
	var filteredTemp = {};
	filteredTemp.visual = [];
	filteredTemp.tweet = [];
	var j = 0;
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
		checkTags(colorTags,0);
		break;
	case "visual" :
		$("#visualPoints").empty();
		for(var i = 0; i < Math.min(100, data.tweet.length); i++){
			if(i < data.visual.length && data.visual[i].visual_score > $("#visual_value").val()){
				var x = {};
				x.term = data.visual[i].term;
				x.time = data.visual[i].time_jump_in_point;
				x.reranking_score = data.visual[i].reranking_score;
				x.rating = data.tweet[i].rating;
				filteredTemp.visual.push(x);
			}
		}
		createZapCode(filteredTemp.visual, "visual");
		createCloud(filteredTemp.visual,type);
		checkTags(colorTags,0);
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
		checkTags(colorTags,0);
		break;
	}
}

//Regenerates the tweet-/zappoints
function getNewTags(type){
	var hash = getUrlVars();
	var vidid = hash['vidid'];

	var rerankingscore = $("#tweet_value").val();
	var visualscore = $("#visual_value").val();
	filterData(vidid, Popcorn("#video").duration(), type);
}	



//Appends cloud information to generate cloud
function createCloud(data,type){
	var button = $('#tag-toggle-button').html();
	var tagCloudInner = document.getElementById("tag-cloud-inner");


	if(button == 'Tweets' && type == 'tweet'){
		$("#tag-cloud-inner").empty();
		jQuery.each(data, function(index,item) {

			//Create the button
			var tagButton = document.createElement("button");
			tagButton.className = "btn btn-info tager tweettag" + index;
			tagButton.innerHTML = item.term + "    ";

			var rating = item.rating;

			//Add stars
			for(var i = 0; i < rating; i++){
				tagButton.innerHTML += "<div class='icon-star ratingFull rating' id='rating" + rating + i + "'></div>"
			}
			for(var i = rating; i < 5; i++){
				tagButton.innerHTML += "<div class='icon-star-empty ratingEmpty rating' id='rating" + rating + i + "'></div>"
			}
			
			tagCloudInner.appendChild(tagButton);
		})
	}
	if(button == 'Visual' && type == 'visual'){
		$("#tag-cloud-inner").empty();
		jQuery.each(data, function(index,item) {
			//Create the button
			var tagButton = document.createElement("button");
			tagButton.className = "btn btn-info tager visualtag" + index;
			tagButton.innerHTML = item.term + "    ";
			var rating = item.rating;

			//Add stars
			for(var i = 0; i < rating; i++){
				tagButton.innerHTML += "<div class='icon-star ratingFull rating' id='rating" + rating + i + "'></div>"
			}
			for(var i = rating; i < 5; i++){
				tagButton.innerHTML += "<div class='icon-star-empty ratingEmpty rating' id='rating" + rating + i + "'></div>"
			}
			
			tagCloudInner.appendChild(tagButton);
		})
	}	
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
		//Set location in pixels
		zap.style.marginLeft = loc - OFFSET + "px";
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

//Sets sorting type
function sortByScore(x,y){
	return y.reranking_score - x.reranking_score;
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
			return ".btn.tweettag" + $zapId;
		case "vis":
			$zapId = obj.id;
			$zapId = $zapId.slice(11,$zapId.length);
			return ".btn.visualtag" + $zapId;
		case "":
			//if its a tag element , check wether its on tweets or tags and return the right zappoint id
			if($('#tag-toggle-button').html() == "Tweets"){
				$tagId = obj.className;
				$tagId = $tagId.slice(27,$tagId.length);
				return "tweetPoint" + $tagId;
			}
			else{
				$tagId = obj.className;
				$tagId = $tagId.slice(28,$tagId.length);
				return "visualPoint" + $tagId;
			}
	}
}

function hasClass(element, clss){
	return (' ' + element.className + ' ').indexOf(' ' + clss + ' ') > -1;
}

function darkerColor(obj){
	var colorChange = 50;
	var str = $(obj).css("background-color");
	var raw = str.match(/(\d+)/g);
	var r = parseInt(raw[0]);
	var g = parseInt(raw[1]);
	var b = parseInt(raw[2]);
	var hexr = r >= colorChange ? (r - colorChange).toString(16): (0).toString(16);
	var hexg = g >= colorChange ? (g - colorChange).toString(16): (0).toString(16);;
	var hexb = b >= colorChange ? (b - colorChange).toString(16): (0).toString(16);;
	hexr = hexr.length == 1 ? '0' + hexr: hexr;
	hexg = hexg.length == 1 ? '0' + hexg: hexg;
	hexb = hexb.length == 1 ? '0' + hexb: hexb;
	var hex = '#' + hexr + hexg + hexb;
	return hex;
}

//##############################################################
