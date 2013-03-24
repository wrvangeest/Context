$(document).ready(function(){

//alert("Social working!");

createTwit();
//getScript();

//Twitter implementation
function createTwit() {




	$('#twitter_link').each(function(){
		$(this).attr('data-url', "localhost");
		$(this).attr('data-hashtags',"SocialZap");
		$(this).attr('data-text', "Tweet over dit tijdstip: " +  "!")
	});
	getScript();
}

function getScript() {
	$.getScript('http://platform.twitter.com/widgets.js');
}

//alert("Social still working!");
});