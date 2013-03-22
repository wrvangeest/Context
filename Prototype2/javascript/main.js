$(document).ready(function(){

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
