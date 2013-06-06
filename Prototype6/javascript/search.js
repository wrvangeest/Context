function search(searchTerm){
	var videos = [3,4,6,7,8,9,10];
	for(video in videos){
		$.post("php/zappoints.php?id=" + video + "&dur=999999")
		.done(function (data) {
			var obj = JSON.parse(data);
			searchObject(obj);
		})
		    //Give message when failed
	   	.fail(function() {
	    	//alert("getZapData failed!");
		});
	}
}

function searchObject(object){
	
}


$(document).ready(function(){

	$('#top-search').keyup(function(e){
		if(e.keyCode == 13)
		{
			if($(this).val() == "")
			{
				$(this).attr('placeholder','You need to fill something in here....');
				e.stopImmediatePropagation();
			}else
			{
				location.href = "search.php?query=" + $(this).val();
			}
		}
	});

});