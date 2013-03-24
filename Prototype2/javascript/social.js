$(document).ready(function(){

alert("Social working!");
//Twitter implementation
var div = document.getElementById("social");
var twit = document.createElement('a');
twit		.href = "https://twitter.com/share";
			.class = "twitter-share-button";
div.appendChild(twit);

//<a href="https://twitter.com/share" class="twitter-share-button" data-url="localhost" data-text="Check SocialZap!" data-hashtags="SocialZap">Tweet</a>
//<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>

});