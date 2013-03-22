$(document).ready(function(){

//############# Tags onder timeline ################# 
			$(".icon-fire").on("mouseenter",function(){
				updateExtraInfo($(this).css("margin-left"));
				$("#extrainfo_inner").css("display", "block");	
			});

			$(".icon-fire").on("mouseout",function(){
				$("#extrainfo_inner").html("");
			});

//############# Fix TagCloud ##################
			var ranking = new Array();

			$.post('php/cloudRanking.php',function(result){
					
	    		var oneStringResult = result.replace('["','');
	    		oneStringResult = oneStringResult.replace('"]','');
	    		ranking = oneStringResult.split('","');
				for (var i  = 0; i < 20;i++){
					$("#tag-cloud-inner").append('<button class="btn btn-info tager">' + ranking[i] + "</button>" + " "  );
				}
						
			});

       
          

});

//############# Update extra info ###################
function updateExtraInfo(starttime){
		$("#extrainfo_inner").append('<img src=http://placehold.it/350x150><br/>')
								.append('at ' + parseInt(starttime) + 'seconden<br/>')
								.append('User rating');
	}		

<<<<<<< HEAD

=======
});
>>>>>>> d35744909de135fec77319206f817b7d766c5288
