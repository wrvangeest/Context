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
//##############################################################
