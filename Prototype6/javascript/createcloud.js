//Appends cloud information to generate cloud
function createCloud(data,type){
	var button = $('#tag-toggle-button').html();
	var tagCloudInner = document.getElementById("tag-cloud-inner");


	if(button == 'Tweets' && type == 'tweet'){
		$("#tag-cloud-inner").empty();
		jQuery.each(data, function(index,item) {

			//Create the button
			var tagButton = document.createElement("button");
			tagButton.className = "btn btn-info tager tweettag" + index;
			
			var termDiv = document.createElement("div");
			$(termDiv).addClass('term');
			termDiv.innerHTML = item.term;

			var ratingDiv = document.createElement("div");
			$(ratingDiv).addClass('rating-all');
			var rating = item.rating;
			//Add stars
			for(var i = 0; i < rating; i++){
				var starDiv = document.createElement("div");
				starDiv.className = "icon-star ratingFull rating";
				starDiv.id = "rating" + rating + i;
				ratingDiv.appendChild(starDiv);
				//tagButton.innerHTML += "<div class='icon-star ratingFull rating' id='rating" + rating + i + "'></div>"
			}
			for(var i = rating; i < 5; i++){
				var starDiv = document.createElement("div");
				starDiv.className = "icon-star-empty ratingFull rating";
				starDiv.id = "rating" + rating + i;
				ratingDiv.appendChild(starDiv);
				//tagButton.innerHTML += "<div class='icon-star-empty ratingEmpty rating' id='rating" + rating + i + "'></div>"
			}
			tagButton.appendChild(termDiv);
			tagButton.appendChild(ratingDiv);
			tagCloudInner.appendChild(tagButton);
		})
	}
	if(button == 'Visual' && type == 'visual'){
		$("#tag-cloud-inner").empty();
		jQuery.each(data, function(index,item) {
			//Create the button
			var tagButton = document.createElement("button");
			tagButton.className = "btn btn-info tager visualtag" + index;
			
			var termDiv = document.createElement("div");
			$(termDiv).addClass('term');
			termDiv.innerHTML = item.term;

			var ratingDiv = document.createElement("div");
			$(ratingDiv).addClass('rating-all');
			var rating = item.rating;
			//Add stars
			for(var i = 0; i < rating; i++){
				var starDiv = document.createElement("div");
				starDiv.className = "icon-star ratingFull rating";
				starDiv.id = "rating" + rating + i;
				ratingDiv.appendChild(starDiv);
				//tagButton.innerHTML += "<div class='icon-star ratingFull rating' id='rating" + rating + i + "'></div>"
			}
			for(var i = rating; i < 5; i++){
				var starDiv = document.createElement("div");
				starDiv.className = "icon-star-empty ratingFull rating";
				starDiv.id = "rating" + rating + i;
				ratingDiv.appendChild(starDiv);
				//tagButton.innerHTML += "<div class='icon-star-empty ratingEmpty rating' id='rating" + rating + i + "'></div>"
			}
			tagButton.appendChild(termDiv);
			tagButton.appendChild(ratingDiv);
			tagCloudInner.appendChild(tagButton);
		})
	}
	if(data.length < 1){
		$('#tag-cloud-inner').append("<span>No tags found,change search query!</span>");
	}
	$("#loading-img").hide();
}

//############# Helper functions for tag generation #############

//Regenerates the tweet-/zappoints
function getNewTags(type){
	var hash = getUrlVars();
	var vidid = hash['vidid'];

	var rerankingscore = $("#tweet_value").val();
	var visualscore = $("#visual_value").val();
	filterData(vidid, window.videodur, type);
}	

//Scroll tag to the right position 
//give cloudTag id as paramater
function scrollToTag(id){
			$('#tag-cloud-inner').scrollTop(0);
			var tagcloudTop = $('#tag-cloud-inner').position().top;
			var tagTop = $(id).position().top;

			$('#tag-cloud-inner').animate({
				scrollTop: tagTop - tagcloudTop
			},500);
}
//##############################################################