$(document).ready(function () {
    getTwitterFeed();
});
function getTwitterFeed(){
	
		$.ajax({
			//url: 'https://userstream.twitter.com/1.1/user.json',
			url: 'http://api.twitter.com/1/statuses/user_timeline.json',
			type: 'GET',
			dataType: 'jsonp',
			data: {
				screen_name: 'dwdd',
				include_rts: true,
				count: 10
			},
			success: function(data, textStatus, xhr) {
				for (var i = 0; i <= data.length - 1;i++) {
					console.log(data[i].text);
					//$("#twitter_feed").append("<div class='tweet' >"+data[i].text+"</div>");
									
					$("#twitter_feed").append('<div class="tweet"></div>')
									  .append('<div class="tweet-info">'+ data[i].user.screen_name+' at '+ new Date(data[i].created_at)+':</div>')
									  .append('<div class="tweet-text">'+ data[i].text +'</div>');
										
				};
			}	

		});

}