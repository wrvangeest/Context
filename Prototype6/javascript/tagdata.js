var OFFSET = 6;
var zapclicked = false;
var tagclicked = false;
$(document).ready(function(){

//############# Mouse actions for zappoints ################# 
	$("body").on("click",".zapPoint",function(){
		zapclicked = true;
		//Get pixel location
		$loc = $(this).css("margin-left");
		$loc = $loc.substr(0,$loc.length - 2);
		//Jump to given time
		goToTime(parseInt($loc) + OFFSET);
	});

	$("body").on("mouseenter",".zapPoint",function(){
		var toggle = $('#tag-toggle-button').html();

		//Highlights tag in cloud for tweetpoints
		if($(this).hasClass("tweetPoint") && toggle == 'Tweets'){
			$cloudClass = getAssocId(this);
			$orTagColor = $($cloudClass).css("backgroundColor");
			$($cloudClass).css("background-color", darkerColor($cloudClass));
			//scroll tag to the right position when hovering over tag
			scrollToTag($cloudClass);
		}
		if($(this).hasClass("visualPoint") && toggle == 'Visual'){
			$cloudClass = getAssocId(this);
			$orTagColor = $($cloudClass).css("backgroundColor");
			$($cloudClass).css("background-color", darkerColor($cloudClass));
			//scroll tag to the right position when hovering over tag
			scrollToTag($cloudClass);
		}
	});

	$("body").on("mouseleave",".zapPoint",function(){
		var toggle = $('#tag-toggle-button').html();
		if($(this).hasClass("tweetPoint") && toggle == 'Tweets' ){
			$($cloudClass).css("background-color", $orTagColor);
		}
		if($(this).hasClass("visualPoint") && toggle == 'Visual' ){
			$($cloudClass).css("background-color", $orTagColor);
		}
	});

//############# Mouse actions for tags #################
	
	$("body").on("mouseenter",".tager",function(){
		//Gather ID information
		$zapId = getAssocId(this);

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

	$("body").on("mouseleave",".tager", function() {
		//Restore original colors
		$(this).css("background-color", $orTagColor);
		
		//Gather ID information
		$zapId = getAssocId(this);
		$zapId = '#' + $zapId;

		$($zapId).css("color", $orZapColor);
		$($zapId).css("z-index", 1);
		$($zapId).removeClass("icon-large");
	});

	$("body").on("click",".tager",function(){

		$zapId = getAssocId(this);

		tagclicked = true;
		//Get pixel location
		loc = $('#' + $zapId).css("margin-left");
		loc = loc.substr(0,loc.length - 2);
		//Jump to givesn time
		goToTime(parseInt(loc) + OFFSET);
	});

});

//############# Helper functions for mouse events #############
//Go to time given by loc in pixels
function goToTime(loc) {
	//Calculate seconds
	var time = calcTime(loc);
	//Jump to time
	npoplayer("socialzap-player").seek(time);
	npoplayer("socialzap-player").play(true);
}

//##############################################################