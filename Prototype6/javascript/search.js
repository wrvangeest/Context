function searchTerms(searchTerm){
	var videos = [3,4,6,7,8,9,10];
	for(video in videos){
		$.post("php/zappoints.php?id=" + videos[video] + "&dur=999999")
		.done(function (data) {
			var obj = JSON.parse(data);
			searchObject(searchTerm, obj);
		})
	   	.fail(function() {
		});
	}
}

function searchObject(searchTerm, object){
	var results = {};
	results.visual = [];
	results.tweet = [];
	results.total = [];
	results.id = object.id;
	//Process visual
	for(zapPoint in object.visual){
		if(object.visual[zapPoint].term.search(searchTerm) >= 0){
			results.total.push(object.visual[zapPoint]);
		}
	}
	//Process tweet
	for(zapPoint in object.tweet){
		if(object.tweet[zapPoint].term.search(searchTerm) >= 0){
			results.total.push(object.tweet[zapPoint]);
		}
	}
	results.visual.sort(sortByRerankingScore);
	results.tweet.sort(sortByRerankingScore);
	results.total.sort(sortByRerankingScore);
	putResultInPage(results);
}


function putResultInPage(object){
	if(object.visual.length > 0 || object.tweet.length > 0 || object.total.length > 0){

		var imgSrc = '';
		var vidTitle = '';
		var vidName = '';

		switch(object.id){
			case '3':
				imgSrc = 'dwdd14052012';
				vidTitle = 'De Wereld Draait Door 14-05-2012';
				vidName = 'dwdd14052012';
				break;
			case '4':
				imgSrc = 'dwdd15052012';
				vidTitle = 'De Wereld Draait Door 15-05-2012';
				vidName = 'dwdd15052012';
				break;
			case '6':
				imgSrc = 'dwdd18052012';
				vidTitle = 'De Wereld Draait Door 18-05-2012';
				vidName = 'dwdd18052012';
				break;
			case '7':
				imgSrc = 'pow14052012';
				vidTitle = 'Pow!News 14-05-2012';
				vidName = 'pow14052012';
				break;
			case '8':
				imgSrc = 'pow15052012';
				vidTitle = 'Pow!News 15-05-2012';
				vidName = 'pow15052012';
				break;
			case '9':
				imgSrc = 'pow16052012';
				vidTitle = 'Pow!News 16-05-2012';
				vidName = 'pow16052012';
				break;
			case '10':
				imgSrc = 'pow18052012';
				vidTitle = 'Pow!News 18-05-2012';
				vidName = 'pow18052012';
				break;
		}

		var container = $('<div></div>');
		container.addClass("row");
		//container.css('margin-left', '0px');

		var imgContainer = $('<div></div>');
		imgContainer.css('padding-top',"15px");
		imgContainer.addClass("span4 offset1");

		var imgdiv = $('<div></div>');
		imgdiv.css('overflow', 'hidden');
		imgdiv.addClass("vidThumb");

		var img = $('<img></img>');
		img.attr('id', 'img' + object.id);
		img.attr('data-videoid', object.id);
		img.attr('data-videoname',vidName);
		img.attr('data-title',vidTitle);
		img.attr('src', 'img/videothumb/' + imgSrc + '.png');
		img.addClass('searchImg');
		img.click(function(){
			location.href = "video.php?vidid=" + object.id + "&vidn=" + vidName + "&title=" + vidTitle;
		});
		console.log(img);


		var tagsContainer = $('<div></div>');
		tagsContainer.css('padding-top',"15px");
		tagsContainer.addClass("span4 offset1");

		var tagsContainerTitle = $('<span></span>');
		tagsContainerTitle.css('font-weight','bold');
		tagsContainerTitle.css('font-style','italic');
		tagsContainerTitle.append("Matched tags");

		var tags = $('<div></div>');
		tags.attr('id','tag-cloud-inner' + object.id);
		tags.css('max-height','150px');
		tags.css('overflow', 'auto');
		/*for(tag in object.tweet){
			tags.append(object.tweet[tag].term + "<br>");
		}*/


		imgdiv.append(img);
		imgdiv.append(vidTitle);
		tagsContainer.append(tagsContainerTitle);
		tagsContainer.append(tags);
		imgContainer.append(imgdiv);
		container.append(imgContainer);
		container.append(tagsContainer);

		$("#topsearchheader").after(container);

		createSearchCloud(object);
	}
}

function createSearchCloud(object){
	var tagCloudInner = document.getElementById("tag-cloud-inner" + object.id);
	var total = object.total;
	jQuery.each(total, function(index,item) {
		//Create the button
		var tagButton = document.createElement("button");
		tagButton.className = "btn btn-info tager tag" + object.id + index;
		$(tagButton).attr('time_jump_in_point', timeToSec(item.time_jump_in_point));
		tagButton.onclick = function(){
				var helpImg = document.getElementById("img" + object.id);
				window.location= "video.php?vidid=" + object.id + "&vidn=" + $(helpImg).attr('data-videoname') + 
					"&title=" + $(helpImg).attr('data-title') + '&time=' + timeToSec(item.time_jump_in_point);
		};
		
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
		}
		for(var i = rating; i < 5; i++){
			var starDiv = document.createElement("div");
			starDiv.className = "icon-star-empty ratingFull rating";
			starDiv.id = "rating" + rating + i;
			ratingDiv.appendChild(starDiv);
		}
		tagButton.appendChild(termDiv);
		tagButton.appendChild(ratingDiv);
		tagCloudInner.appendChild(tagButton);
		colorTags($(tagCloudInner).children().length, object.id);
	})
}

//Sets sorting type
function sortByRerankingScore(x,y){
	return y.reranking_score - x.reranking_score;
}

function timeToSec(minutes){
	var time = minutes.split(":");
	return ((parseInt(time[0]) * 60) + parseInt(time[1]));
}

$(document).ready(function(){

	$('#top-search').keyup(function(e){
		if(e.keyCode == 13)
		{
			if($(this).val() == "")
			{
				$(this).attr('placeholder','Please enter a search term....');
				e.stopImmediatePropagation();
			}else
			{
				location.href = "searchPage.php?query=" + $(this).val();
				searchTerms($(this).val());
			}
		}
	});

});