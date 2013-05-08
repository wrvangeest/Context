//########### Set video to time in url (if any) ################
function getSkipTime(){
	var hash = getUrlVars();

	$("#videosource").attr("src","videos/" + hash['videoname'] + ".mp4");

	if(!isNaN(hash['time'])){
		Popcorn("#video").currentTime(hash['time']).play();
	}

	console.log(hash['videoid']);
	console.log(hash['videoname']);
}