$(document).ready(function(){

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
    			range: [0, 100]
			   ,start: 50
			   ,handles: 1
			   ,connect: "lower"
			   ,serialization: {
			      to: [$("#tweet_value")]
			   }
			});

			//make second slider
			$("#slider2").noUiSlider({
			    range: [0, 100]
			   ,start: 50
			   ,handles: 1
			   ,connect: "lower"
			   ,serialization: {
			      to: [$("#visual_value")]
			   }
			});


});