$(document).ready(function(){



//############# Mouse actions for zappoints ################# 
			$("body").on("mouseenter",".icon-fire",function(){
				updateExtraInfo($(this).css("margin-left"));
				$("#extrainfo_inner").css("display", "block");	
			});

			$("body").on("mouseout",".icon-fire",function(){
				$("#extrainfo_inner").html("");
						
			});


//############# Update extra info ###################
function updateExtraInfo(starttime){
		$("#extrainfo_inner").append('<img src=http://placehold.it/350x150><br/>')
								.append('at ' + parseInt(starttime) + ' pixels<br/>')
								.append('User rating');
	}




//alert("I'm working!");

//Checktime ensures video is loaded
checkTime();


//Function that returns duration after video is loaded
function checkTime(){

	//Load duration
	var dur = Popcorn("#video").duration();
	
	//As long as the video is not loaded
	if(isNaN(dur)){
		//Wait 100ms
		setTimeout( function() { checkTime(); } , 100);
	}
	else{
		//Video is loaded, grab the zappoint data
		getZapData(dur);
	}
}

//Ajax call for zappoint data
//Return format: {"term":"<term>","time":"<time>"} (JSON String)
function getZapData(dur){
	$.post("php/zappoints.php", {duration : dur})
		.done(function (data) {
			//Generate the HTML from the data
			createZapCode(data);
	     }
	    )
	    .fail(function() {
	    	alert("Failed!");
	    });
}		

//Generates HTML code
function createZapCode(data){
	//Convert data from JSON string to object
	var obj = JSON.parse(data);
	//Grab the list div (located in HTML file)
	var list = document.getElementById("breakpoints");

	//Loop through the data using JSON functions
	jQuery.each(obj,function(index, time) {
		//Retrieve offset in pixels from time
		var loc = calcDist(time);
		//Create listitem element
		var zap = document.createElement("li");
		//Set properties so CSS recognizes correctly
		zap.className = "icon-fire";
		//Set location in pixels
		zap.style.marginLeft = loc + "px";
		//Append item to list
		list.appendChild(zap);
	})	
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
});