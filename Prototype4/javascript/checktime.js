//Function that returns duration after video is loaded
function checkTime(callback, times){
	
	//Load duration
	var dur = Popcorn("#video").duration();

	//Gives error message when timed out
	if(!isNaN(times) && times > 500){
		callback(-1);
	}
	else if(isNaN(dur)){
		//Wait 100ms
		setTimeout( function() { checkTime(callback, times + 1); } , 100);
	}
	else {
		//Video is loaded, callback
		callback(dur);
	}
}

function checkTags(callback, times){
	var i = $('#tag-cloud-inner').children().length;

	//Gives error message when timed out
	if(!isNaN(times) && times > 500){
		callback(-1);
	}
	else if(i <= 0 || isNaN(i)) {
		//Wait 100ms
		setTimeout( function() { checkTags(callback, times + 1); }, 100);
	}
	else {
		//Tags are loaded
		callback();
	}
}