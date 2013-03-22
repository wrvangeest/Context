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
								.append('at ' + parseInt(starttime) + 'seconden<br/>')
								.append('User rating');
	}




//alert("I'm working!");
checkTime();


//Check time
function checkTime(){
	//Load duration
	$duration = Popcorn("#video").duration();
	
	//alert("Waiting: " + $duration);
	
	//As long as the video is not loaded
	if(isNaN($duration)){
		//Wait 100ms
		setTimeout( function() { checkTime(); } , 100);
	}
	else{
		getZapData($duration);
	}
}

//Ajax call for zappoint data
function getZapData(dur){
	$.post("php/zappoints.php", {duration : dur})
		.done(function (data) {
			createZapCode(data);
	     }
	    )
	    .fail(function() {
	    	alert("Failed!");
	    });
}		

//Generates HTML code
function createZapCode(data){
	var obj = JSON.parse(data);
	var list = document.getElementById("breakpoints");

	jQuery.each(obj,function(i, val) {
		var loc = calcDist(val);
		var zap = document.createElement("li");
		zap.className = "icon-fire";
		zap.style.marginLeft = loc + "px";
		list.appendChild(zap);
	})	
}

function calcDist(val){
	var tempTime = val.time.split(':');
	var secs = (+tempTime[0]) * 60 + (+tempTime[1]);
	var dur = Popcorn("#video").duration();
	var ratio = secs / dur;
	var wdth = document.getElementById("breakpoints").style.width;
	wdth = wdth.substr(0,wdth.length - 2);
	//alert("Secs: " + secs + " Dur: " + dur + " Ratio: " + ratio + " Width: " + wdth);
	return (ratio * wdth);
}


/*
<div id="breakpoints" style="height:22px; width:640px;">
							<li class="icon-fire" style="margin-left:0px;"></li>
							<li class="icon-fire" style="margin-left:5px;"></li>
							<li class="icon-fire" style="margin-left:55px;"></li>
							<li class="icon-fire" style="margin-left:590px;"></li>
							<li class="icon-fire" style="margin-left:490px;"></li>
							<li class="icon-fire" style="margin-left:610px;"></li>
						</div>*/

});