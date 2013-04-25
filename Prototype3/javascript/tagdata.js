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




//Checktime ensures video is loaded
checkTime( function(dur) {
		getZapData(dur);
	},0
);




//Ajax call for zappoint data
//Return format: {"term":"<term>","time":"<time>"} (JSON String)
function getZapData(dur){
	$.post("php/zappoints.php", {duration : dur})
		.done(function (data) {
			var obj = JSON.parse(data);
			//Generate the HTML from the data
			createZapCode(obj);
			createCloud(obj);
	     }
	    )
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
	//Convert data from JSON string to object
	
	//Grab the list div (located in HTML file)
	var list = document.getElementById("breakpoints");

	//Loop through the data using JSON functions
	jQuery.each(data,function(index, item) {
		//Retrieve offset in pixels from time
		var loc = calcDist(item);
		//Create listitem element
		var zap = document.createElement("li");
		//Set properties so CSS recognizes correctly
		zap.className = "icon-fire";
		//Set id for linking to cloud
		//zap.id = "zappoint" . index;
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