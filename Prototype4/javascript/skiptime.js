$(document).ready(function(){
	
	//Calls function after video is loaded
	checkTime(function(dur){
			//alert("callback ok");
		 	getSkipTime();
		},0
	); 

	//########### Set video to time in url (if any) ################
	function getSkipTime(){
		var hash = getUrlVars();
		if(!isNaN(hash['time'])){
			Popcorn("#video").currentTime(hash['time']).play();
		}
	}
	
	
});