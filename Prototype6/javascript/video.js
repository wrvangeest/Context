$(document).ready(function(){

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

	/*########################### end update progresar ################*/

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
		$("#current-time").text(moment(moment.duration(Popcorn("#video").currentTime(),'seconds')).format('mm:ss'));
	});

});

///update progressbar
function updatePopcornBar(newwidth)
{
	var finalnew =  (newwidth / Popcorn("#video").duration()) * parseInt($("#popcorn-progbar-wrapper").css("width"));
	$("#popcorn-progbar").css("width", finalnew +"px");
}

	