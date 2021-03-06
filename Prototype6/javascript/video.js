$(document).ready(function(){
	$("#loading-img").show();

	/*########################### begin update progressbar  ###########*/

	// create new popcorn instance
	var pop = Popcorn("#video");

	// listen to timeupdate
	pop.on( "timeupdate", function() {
		updatePopcornBar(this.currentTime());
	});

	//when someone clicks on the timeline
	$("#popcorn-progbar-wrapper").click(function(e){
		var posX = $(this).offset().left;
		pop.currentTime(
			(pop.duration() * ((e.pageX - posX) / parseInt($(this).css("width"))))
		);
	});

	$("#playbutton").click(function(){
		pop.play();
	});

	$("#pausebutton").click(function(){
		pop.pause();
	});

	$("#stopbutton").click(function(){
		pop.currentTime(0);
		pop.pause();
	});

	/*########################### end update progressbar ################*/

	//make first slider
	$("#slider1").noUiSlider({
		range: [0, 1]
	   ,start: 0.5
	   ,handles: 1
	   ,connect: "lower"
	   ,serialization: {
	      to: [$("#tweet_value")]
	   }
	   ,slide: function(){
			getNewTags("tweet");
		}
	});

	//make second slider
	$("#slider2").noUiSlider({
	    range: [0, 1]
	   ,start: 0.5
	   ,handles: 1
	   ,connect: "lower"
	   ,serialization: {
	      to: [$("#visual_value")]
	   }
	   ,slide: function(){
			getNewTags("visual");
		}
	});
	
	//When played show pause button, and when paused show play button
	Popcorn("#video").on("playing", function(){
		$("#pausebutton").show();
		$("#playbutton").hide();
	});
	Popcorn("#video").on("pause", function(){
		$("#pausebutton").hide();
		$("#playbutton").show();
	})

	/* update de current time */
	Popcorn("#video").on("timeupdate", function(){
		$("#current-time").text(timeToMin(Popcorn("#video").currentTime()));
	});

	checkTime( function(dur) {
		//Starts chain to construct ZapPoints
		getZapData(dur);
		//Creates the Twitter button
		createTwit();
		//Skips video to time specified in URL
		getSkipTime();
		//Sets the total time
		$("#total-time").text(timeToMin(Popcorn("#video").duration()));
	},0);

	//POPOVER
	$('#popo').popover();
	$('#popo2').popover();

});

///update progressbar
function updatePopcornBar(newwidth)
{
	var finalnew =  (newwidth / Popcorn("#video").duration()) * parseInt($("#popcorn-progbar-wrapper").css("width"));
	$("#popcorn-progbar").css("width", finalnew +"px");
}

	