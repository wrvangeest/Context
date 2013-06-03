$(document).ready(function () {
	//get tweets with given username
    //getTwitterFeed();
    //get tweets with given hashtag in the tweet
    getHashTag();
});
function getTwitterFeed(){
	
		$.ajax({
			//url: 'https://userstream.twitter.com/1.1/user.json',
			url: 'http://api.twitter.com/1/statuses/user_timeline.json',
			type: 'GET',
			dataType: 'jsonp',
			data: {
				screen_name: 'powned',
				include_rts: true,
				count: 10
			},
			success: function(data, textStatus, xhr) {
				for (var i = 0; i <= data.length - 1;i++) {
					var datumpost = new Date(posts[i].created_at);
					var datumformat = getPostTime(datumpost);
					var geleden = getPostPast(datumpost);
					$("#twitter_feed").append('<div class="tweet"><div class="tweet-info"><p class="username">'+ data[i].user.screen_name+'</p> Posted at:'+ datumformat +' , '+geleden+':<br/></div><div class="tweet-text">'+ data[i].text +'</div></div>');
										
				};
			}	

		});

}

function getHashTag(){

		$.ajax({
			//url: 'https://userstream.twitter.com/1.1/user.json',
			url: 'http://search.twitter.com/search.json',
			type: 'GET',
			dataType: 'jsonp',
			data: {
					q: encodeURIComponent('#dwdd')
			},
			success: function(data, textStatus, xhr) {
				//console.log(data);
				var posts = data.results;
				for (var i = 0; i <= posts.length - 1;i++) {
					
					var datumpost = new Date(posts[i].created_at);
					var datumformat = getPostTime(datumpost);
					var geleden = getPostPast(datumpost);
					$("#twitter_feed").append('<div class="tweet"><div class="tweet-info"><p class="username">'+ posts[i].from_user_name+'</p> Posted at:'+ datumformat +' , '+geleden+':<br/></div><div class="tweet-text">'+ posts[i].text +'</div></div>');
										
				};
			}	

		});


}

//return the date in a clearer format
function getPostTime(datumpost){
					jaar = datumpost.getFullYear();
					maand = datumpost.getMonth();
					dag = datumpost.getDate();
					uur = datumpost.getHours();
					minuut = datumpost.getMinutes();
					sec = datumpost.getSeconds();

					var datumformat = dag+"/"+maand+"/"+jaar+" around "+uur+":"+minuut;
					return datumformat;
}

//returns the differance in time with now and the given date: datumpost
// extends with the correct extension
function getPostPast(datumpost){

						var nu = new Date()
						var verschildatum = nu - datumpost;
						
						if(verschildatum<1000){
						    return Math.floor(verschildatum/1000) + " seconds ago";
						}
						if(verschildatum<(60*60*1000)){
						    return Math.floor(verschildatum/(60*1000)) +" minutes ago";
						}
						if(verschildatum<(24*60*60*1000)){
							return Math.floor(verschildatum/(60*60*1000)) +" hours ago";
						}
						if(verschildatum<(365*24*60*60*1000)){
							return Math.floor(verschildatum/(24*60*60*1000))+" days ago";
						}
						else{
						  	return "once upon a time";
						}
}