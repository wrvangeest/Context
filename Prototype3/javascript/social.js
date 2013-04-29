$(document).ready(function(){

//alert("Social working!");

checkTime(function(dur){
	createTwit();
	},0
);

//getScript();

//Twitter implementation
function createTwit() {
	$('#twitter_link').each(function(){
		$(this).attr('data-url', "localhost");
		$(this).attr('data-hashtags',"SocialZap");
		$(this).attr('data-text', "Tweet over dit tijdstip: " + window.location.href + "?time=" + Popcorn("#video").currentTime() + "!")
	});
	getScript();
}

function getScript() {
	$.getScript('http://platform.twitter.com/widgets.js');
}

//alert("Social still working!");
});