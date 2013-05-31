$(document).ready(function(){

$("#loading-img").show();
			checkTime(function(dur) {
				//Starts chain to construct ZapPoints
				getZapData(dur);
				//Creates the Twitter button
				createTwit();
				//Skips video to time specified in URL
				getSkipTime();
			},0);

			//fix search button
			$("#searchbutton").click(function(){
				var xyz = $("#search-animate-bar").css("margin-top");
				if(parseInt(xyz) < 0){
				$("#search-animate-bar").animate({ marginTop: '0px'}, 1000);
				}else{
					$("#search-animate-bar").animate({ marginTop: '-50px'}, 1000);
				}

			});

			//fix browsebutton
			$("#browsebutton").click(function(){
				location.href = "index.html";
			});

			//fix homebutton
			$("#homebutton").click(function(){
				location.href = "index.html";
			});

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

			var top = $('#adv-options').position().top;
			$('.extrainfo').css('top',top);
			/**** Sets the total time
				  Bij een readystate van 4 is alle informatie van een video geladen.
			 ***/
			var states = function() {
	    		// store the readyState
			    var rdy = Popcorn("#video").readyState();
		    	if(rdy===4){
			        $("#total-time").text(moment(moment.duration(Popcorn("#video").duration(),'seconds')).format('mm:ss')) ;
			    }else{
			    	setTimeout( states, 10 );
			    }
			}
    		states();

//End document ready    		
});

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



function cleartags(){
	$("#tag-cloud-inner").empty();
	$("#tweetPoints").empty();
	$("#visualPoints").empty();
}