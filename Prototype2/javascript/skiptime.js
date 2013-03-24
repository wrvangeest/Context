$(document).ready(function(){
	
	//########### Set video to time in url (if any) ################
	function getSkipTime(){
		var hash = getUrlVars();
		//alert(typeof parseInt(hash['time']));
		Popcorn("#video").currentTime(hash['time']);
	}
	
	//Calls function after video is loaded
	checkTime(function(dur){
		//alert("callback ok");
	 	getSkipTime();
	}); 
});