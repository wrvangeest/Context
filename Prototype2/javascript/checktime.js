//Function that returns duration after video is loaded
function checkTime(callback){
	
	//Load duration
	var dur = Popcorn("#video").duration();
	
	//alert("Time called: " + callback);

	//As long as the video is not loaded
	if(isNaN(dur)){
		//Wait 100ms
		setTimeout( function() { checkTime(callback); } , 100);
	}
	else{
		//Video is loaded, grab the zappoint data
		callback(dur);
	}
}
