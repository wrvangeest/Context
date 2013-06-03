window.videodur = 0;

$(document).ready(function(){

		/*########################### begin update progressbar  ###########*/

		//load video
		npoplayer("socialzap-player").setup({
			prid: 'VARA_101278889',
			width: 700,
			height: 394,
			options: {
				showControlbar: true,
				showTitlebar: false
			}
		});
    		var currentTime = 0;
    		var oldtime = 0;

    		$("#total-time").text('00:00');

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

    			if (window.videodur == 0) {
    				npoplayer("socialzap-player").play(true);
  				} 			
    		});

    		//event listener for when time has changed in the video
			npoplayer("socialzap-player").onTime(function(){
				  if (window.videodur == 0) {
				    window.videodur = this.getDuration();
				    //update total time
				    $("#total-time").text(moment(moment.duration(window.videodur,'seconds')).format('mm:ss'));
				    //stop player
				    npoplayer("socialzap-player").stop(true);
				    getZapData(window.videodur);
				  }else{

				  		currentTime = this.getPosition();
						if(Math.abs(currentTime-oldtime) > 0.01){
							updatePopcornBar(currentTime);
							oldtime = currentTime;	
						}
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

	});

	///update progressbar
	function updatePopcornBar(newwidth)
	{
		var finalnew =  (newwidth / window.videodur) * parseInt($("#popcorn-progbar-wrapper").css("width"));
		$("#popcorn-progbar").css("width", finalnew +"px");
		$("#current-time").text(moment(moment.duration(newwidth,'seconds')).format('mm:ss'));
	}

	