//Function that returns duration after video is loaded
function checkTime(callback, times){
	
	if(window.videodur == 0 && times > 500){
		callback(-1);
	}
	else if(window.videodur <= 0){
		//Wait 100ms
		setTimeout( function() { checkTime(callback, times + 1); } , 100);
	}
	else {
		//Video is loaded, callback
		callback(window.videodur);
	}
}

function checkTags(callback, times){
	var i = $('#tag-cloud-inner').children().length;
	//Gives error message when timed out
	if(!isNaN(times) && times > 500){
		setTimeout(callback(-1), 100);
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