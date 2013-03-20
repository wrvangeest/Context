$(document).ready(function(){
//document.write("<script src ='javascript/video.js'></script>");
//document.write('blazz');

//############# Tags onder timeline ################# 
			$(".icon-fire").on("mouseenter",function(){
				updateExtraInfo($(this).css("margin-left"));
			});

			$(".icon-fire").on("mouseout",function(){
				$("#extrainfo_inner").innerHTML="HHH";
				$("#extrainfo_inner").fadeOut();			
			});

//############# Update extra info ###################
function updateExtraInfo(starttime){



		var canvas = $("#extrainfo_inner");
		canvas.append("hoi");
		canvas.fadeIn();
	}

});

