$(document).ready(function(){
//document.write("<script src ='javascript/video.js'></script>");
//document.write('blazz');

//############# Tags onder timeline ################# 
				$(".icon-fire").on("mouseenter",function(){
				updateExtraInfo($(this).css("margin-left"));
				$("#extrainfo_inner").css("display", "block");	
			});

			$(".icon-fire").on("mouseout",function(){
				$("#extrainfo_inner").html("");
						
			});

//############# Update extra info ###################
function updateExtraInfo(starttime){
		$("#extrainfo_inner").append('<img src=http://placehold.it/350x150><br/>')
								.append('at ' + parseInt(starttime) + 'seconden<br/>')
								.append('User rating');
	}		

});

