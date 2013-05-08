//########### Set video to time in url (if any) ################
function getSkipTime(){
	var hash = getUrlVars();
	if(!isNaN(hash['time'])){
		Popcorn("#video").currentTime(hash['time']).play();
	}

	console.log(hash['videoid']);
}