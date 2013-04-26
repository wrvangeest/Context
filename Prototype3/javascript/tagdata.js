$(document).ready(function(){

	/*function snapshot(time){

		var video2 = document.getElementById("snapvideo");
		var canvas = document.createElement('canvas');

		canvas.width  = 350;
		canvas.height = 150;

		video2.currentTime = time;

		

		var ctx = canvas.getContext('2d');
		ctx.drawImage(video2, 0, 0, 350, 150); 

		return canvas;
	}*/

//############# Mouse actions for zappoints ################# 
	$("body").on("mouseenter",".icon-bolt",function(){
		//Displays extra information on the right
		updateExtraInfo($(this).css("margin-left"));
		$("#extrainfo_inner").css("display", "block");

		//Highlights tag in cloud
		$zapId = this.id;
		$zapId = $zapId.slice(8,$zapId.length);
		$cloudClass = ".btn.t" + $zapId;
		$orTagColor = $($cloudClass).css("backgroundColor");
		$($cloudClass).css("background-color", "#b98acf");
	});

	$("body").on("mouseout",".icon-bolt",function(){
		//Clear extra info
		$("#extrainfo_inner").html("");
		$($cloudClass).css("background-color", $orTagColor);
	});

//############# Mouse actions for tags ################# 
	$("body").on("mouseenter",".tager",function(){
		//Displays extra information on the right
		updateExtraInfo($(this).css("margin-left"));
		$("#extrainfo_inner").css("display", "block");

		//Change background color
		$orTagColor = $(this).css("backgroundColor");
		$(this).css("background-color", "#b98acf");

		//Change ZapPoint color
		$tagId = this.className;
		$tagId = $tagId.slice(20,$tagId.length);
		$zapId = "#zappoint" + $tagId;
		$orZapColor = $($zapId).css("color");
		$($zapId).css("color", "blue");
		$($zapId).addClass("icon-large");
	});	

	$("body").on("mouseout",".tager",function(){
		//Clear extra info
		$("#extrainfo_inner").html("");

		//Restore original colors
		$(this).css("background-color", $orTagColor);
		$($zapId).css("color", $orZapColor);
		$($zapId).removeClass("icon-large");
	});

//############# Update extra info ###################
function updateExtraInfo(starttime){

		var ratio = parseInt(starttime) / parseInt($("#popcorn-progbar-wrapper").css("width"));
		var fulldur = Popcorn("#video").duration();
		var timeat = fulldur * ratio;




//'<img src=http://placehold.it/350x150><br/>'

		$("#extrainfo_inner")//.append(snapshot(timeat))
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
		zap.className = "icon-bolt";
		//Set id for linking to cloud
		zap.id = "zappoint" + index;
		//Set location in pixels
		zap.style.marginLeft = loc + "px";
		//Append item to list
		list.appendChild(zap);
	});
	$(".icon-bolt").css("position", "absolute");
	console.log($(".icon-bluh"));
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