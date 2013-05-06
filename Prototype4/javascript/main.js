$(document).ready(function(){

checkTime(function(dur) {
	//Starts chain to construct ZapPoints
	getZapData(dur);
	//Creates the Twitter button
	createTwit();
	//Skips video to time specified in URL
	getSkipTime();
},0)
});