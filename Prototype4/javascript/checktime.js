//Function that returns duration after video is loaded
function checkTime(callback, times){
	
	//Load duration
	var dur = Popcorn("#video").duration();

	if(!isNaN(times) && times > 500){
		callback(-1);
	}
	else if(isNaN(dur)){
		//Wait 100ms
		setTimeout( function() { checkTime(callback, times + 1); } , 100);
	}
	else {
		//Video is loaded, grab the zappoint data
		callback(dur);
	}
}