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
	$("body").on("click",".icon-bolt",function(){
		//Get pixel location
		$loc = $(this).css("margin-left");
		$loc = $loc.substr(0,$loc.length - 2);
		//Jump to given time
		goToTime($loc);
	});

	$("body").on("mouseenter",".icon-bolt",function(){
		//Displays extra information on the right
		updateExtraInfo($(this).css("margin-left"));
		$("#extrainfo_inner").css("display", "block");

		//Highlights tag in cloud
		$zapId = this.id;
		$zapId = $zapId.slice(8,$zapId.length);
		$cloudClass = ".btn.t" + $zapId;
		$orTagColor = $($cloudClass).css("backgroundColor");
		$($cloudClass).css("background-color", "#b98acf");
	});

	$("body").on("mouseout",".icon-bolt",function(){
		//Clear extra info
		$("#extrainfo_inner").html("");
		$($cloudClass).css("background-color", $orTagColor);
	});

//############# Mouse actions for tags #################
	$("body").on("click",".tager",function(){
		//Gather ID information
		$tagId = this.className;
		$tagId = $tagId.slice(20,$tagId.length);
		$zapId = "#zappoint" + $tagId;

		//Get pixel location
		$loc = $($zapId).css("margin-left");
		$loc = $loc.substr(0,$loc.length - 2);
		//Jump to given time
		goToTime($loc);
	});
	$("body").on("mouseenter",".tager",function(){
		//Gather ID information
		$tagId = this.className;
		$tagId = $tagId.slice(20,$tagId.length);
		$zapId = "#zappoint" + $tagId;

		//Displays extra information on the right
		updateExtraInfo($($zapId).css("margin-left"));
		$("#extrainfo_inner").css("display", "block");

		//Change background color
		$orTagColor = $(this).css("backgroundColor");
		$(this).css("background-color", "#b98acf");

		//Change ZapPoint color
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

//Checktime ensures video is loaded
checkTime( function(dur) {
		getZapData(dur);
	},0
)

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
function updateExtraInfo(loc){
		var time = calcTime(parseInt(loc));
		time = convertTime(time);
		//.append(snapshot(timeat))
		$("#extrainfo_inner").append('<img src=http://placehold.it/350x150><br/>')
								.append('at approximately ' + time + '<br/>')

}

//Ajax call for zappoint data
//Return format: {"term":"<term>","time":"<time>"} (JSON String)
function getZapData(dur){
	$.post("php/zappoints.php", {duration : dur})
		.done(function (data) {
			var obj = JSON.parse(data);
			//Generate the HTML from the data for..
			//..zappoints
			createZapCode(obj);
			//..tagcloud
			createCloud(obj);
	     }
	    )
	    //Give message when failed
	    .fail(function() {
	    	alert("Failed!");
	    });
}		

//Appends cloud information to generate cloud
function createCloud(data){
	jQuery.each(data, function(index,item) {
		$("#tag-cloud-inner").append('<button class="btn btn-info tager t' + index + '">' + item.term + "</button>" + " "  );
	})
}

//Generates HTML code
function createZapCode(data){
	//Grab the list div (located in HTML file)
	var list = document.getElementById("breakpoints");

	//Loop through the data using JSON functions
	jQuery.each(data,function(index, item) {
		//Retrieve offset in pixels from time
		var loc = calcDist(item);
		//Create listitem element
		var zap = document.createElement("li");
		//Set properties so CSS recognizes correctly
		zap.className = "icon-bolt";
		//Set id for linking to cloud
		zap.id = "zappoint" + index;
		//Set location in pixels
		zap.style.marginLeft = loc + "px";
		//Append item to list
		list.appendChild(zap);
	});
	$(".icon-bolt").css("position", "absolute");
}

//Calculates the offset in pixels for zappoint location
function calcDist(val){
	//Convert time ("m:(s)s") to seconds
	var tempTime = val.time.split(':');
	var secs = (+tempTime[0]) * 60 + (+tempTime[1]);
	//Grab duration of video
	var dur = Popcorn("#video").duration();
	//Calculate ratio of time/duration
	var ratio = secs / dur;
	//Grab width of timeline in pixels
	var wdth = document.getElementById("breakpoints").style.width;
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
	var wdth = document.getElementById("breakpoints").style.width;
	//Trim for calculations
	wdth = wdth.substr(0,wdth.length - 2);
	//Calculate pixel/total ratio
	var ratio = dist / wdth;
	//Return time value in seconds calculated using ratio
	return (ratio * dur);
}

//Converts int seconds into string min:sec
function convertTime(seconds){
	var min = Math.floor(seconds / 60);
	var sec = Math.round(seconds % 60);
	if(sec < 10){
		sec = "0" + sec;
	}
	return min + ":" + sec;
}
});