//Twitter implementation
function createTwit() {
	$('#twitter_link').each(function(){
		$(this).attr('data-url', "localhost");
		$(this).attr('data-hashtags',"SocialZap");
		$(this).attr('data-text', "Tweet over dit tijdstip: " + window.location.href + "?time=" + Popcorn("#video").currentTime() + "!")
		$(this).attr('data-count', "none");
	});
	getScript();
}

function getScript() {
	$.getScript('http://platform.twitter.com/widgets.js');
}