$(document).ready(function(){

		/*########################### begin update progressbar  ###########*/

			// create new popcorn instance
			var pop = Popcorn("#video");

			// listen to timeupdate
			pop.on( "timeupdate", function() {
			   // console.log(this.currentTime());
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

	});

	///update progressbar
	function updatePopcornBar(newwidth)
	{
		var finalnew =  (newwidth / Popcorn("#video").duration()) * parseInt($("#popcorn-progbar-wrapper").css("width"));
		$("#popcorn-progbar").css("width", finalnew +"px");
	}

	