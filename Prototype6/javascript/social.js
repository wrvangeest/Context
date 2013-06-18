//Twitter implementation
function createTwit() {
	$('#twitter_link').each(function(){
		$(this).attr('data-url', "localhost");
		$(this).attr('data-hashtags',"SocialZap");
		$(this).attr('data-text', "Tweet over dit tijdstip: " + window.location.href + "time=" + npoplayer("socialzap-player").getPosition() + "!")
		$(this).attr('data-count', "none");
	});
	getScript();
}

function getScript() {
	$.getScript('http://platform.twitter.com/widgets.js');
}

function sendTweet() {
	//-------Text toevoegen-------
	//URL ontleden
	var hash = getUrlVars();
	//Gegevens toevoegen aan basic URL
	var orUrl = window.location.href.slice(0,window.location.href.indexOf('?'))
			//Video ID
			+ '?vidid=' + hash['vidid']
			//Video name
			+ '%26vidn='  + hash['vidn']
			//Current time
			+ '%26time='  + npoplayer("socialzap-player").getPosition();
	
	$.ajax({
        url: 'https://www.googleapis.com/urlshortener/v1/url',
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        data: '{ longUrl: "' + orUrl +'"}',
        dataType: 'text',
        success: function(response) {
            var shortUrl = JSON.parse(response).id; // Evaluate the J-Son response object.
            completeLink(shortUrl, orUrl);
        }
     });
}

function completeLink(sUrl, oUrl) {
	var link = "https://twitter.com/intent/tweet?"
			 + "&text=Dit moet je zien op SocialZap! " + sUrl
			 + "&hashtags=SocialZap";
	getScript();
	window.open(link, 'twitterwindow', 'height=550, width=420');
}