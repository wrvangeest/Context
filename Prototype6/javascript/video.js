window.videodur = 0;



$(document).ready(function(){
	var hash = getUrlVars();
	var vidid = hash['vidid'];
	$.post("php/getInfo.php?", {vidid: vidid}, function(data){
		var parsed = JSON.parse(data);
		window.videodur = parsed.duration;

		//load video
		npoplayer("socialzap-player").setup({
			prid: parsed.ug_id,
			width: 700,
			height: 394,
			options: {
				showControlbar: false,
				showTitlebar: false
			}
		});
	});

	/*########################### begin update progressbar  ###########*/

	
		var currentTime = 0;
		var oldtime = 0;

		$("#popcorn-progbar-wrapper").click(function(e){
			var posX = $(this).offset().left;
			var time = (videodur * ((e.pageX - posX) / parseInt($(this).css("width"))));
			time = Math.round(time);
			npoplayer("socialzap-player").seek(time);
						
		});

		document.getElementById("playbutton").onclick = function() {
			npoplayer("socialzap-player").play(true);
		};

		document.getElementById("pausebutton").onclick = function() {
			npoplayer("socialzap-player").pause(true);
			$("#pausebutton").hide();
			$("#playbutton").show();
		};
		document.getElementById('stopbutton').onclick = function() {
			npoplayer("socialzap-player").stop(true);
			$("#current-time").text('00:00');
			$("#popcorn-progbar").css("width", "0px");
		}

		//event listener for when video is ready
		npoplayer("socialzap-player").onReady(function(){
	
		});

		//event listener for when time has changed in the video
		npoplayer("socialzap-player").onTime(function(){
	  		currentTime = this.getPosition();
			if(Math.abs(currentTime-oldtime) > 0.01){
				updatePopcornBar(currentTime);
				oldtime = currentTime;
			}	
		});

		//eventlistener for buffer
		npoplayer("socialzap-player").onBufferChange(function(){
			/*shoulde be loading bar
			var percentage = this.getBuffer();
			var viewerper = parseInt($("#popcorn-progbar").css("width"));
			var finalnew =  (percentage * parseInt($("#popcorn-progbar-wrapper").css("width")) ) - viewerper;

			$(".bar-warning").css("width", finalnew +"px");
			*/
		});

		//eventlistener for when video is playing
		npoplayer("socialzap-player").onPlay(function(){
			$("#pausebutton").show();
			$("#playbutton").hide();
		});

		//eventlistener for when video is stopped
		npoplayer("socialzap-player").onIdle(function(){
			$("#pausebutton").hide();
			$("#playbutton").show();
		});

		//eventlistener for when video is completely watched
		npoplayer("socialzap-player").onComplete(function(){

		});

	/*########################### end update progresar ################*/
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

	//Initialize
	checkTime( function(dur) {
		//Starts chain to construct ZapPoints
		getZapData(dur);
		//Creates the Twitter button
		createTwit();
		//Skips video to time specified in URL
		getSkipTime();
		//Sets the total time
		$("#total-time").text(timeToMin(window.videodur));
	},0);

	//POPOVER
	$('#popo').popover();
	$('#popo2').popover();

});

///update progressbar
function updatePopcornBar(newwidth)
{
	var finalnew =  (newwidth / window.videodur) * parseInt($("#popcorn-progbar-wrapper").css("width"));
	$("#popcorn-progbar").css("width", finalnew +"px");
	$("#current-time").text(timeToMin(newwidth));
}