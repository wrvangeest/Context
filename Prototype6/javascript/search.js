//Function to initialize the process
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

//Generates the JSON object of search results
function searchObject(searchTerm, object){
	var results = {};
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
	results.total.sort(sortByRerankingScore);
	putResultInPage(results);
}

//Generates result page skeleton
function putResultInPage(object){
	if(object.total.length > 0){

		var imgSrc = '';
		var vidTitle = '';
		var vidName = '';

		//!!!!! Hardcoded associated video names and titles
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

		//Big container
		var container = $('<div></div>');
		container.addClass("row");
		container.css('margin-left', '0px');

		//Image container
		var imgContainer = $('<div></div>');
		imgContainer.css('padding-top',"15px");
		imgContainer.addClass("span4 offset1");

		//Image div
		var imgdiv = $('<div></div>');
		imgdiv.css('overflow', 'hidden');
		imgdiv.addClass("vidThumb");

		//Image
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

		//Tags container
		var tagsContainer = $('<div></div>');
		tagsContainer.css('padding-top',"15px");
		tagsContainer.addClass("span4 offset1");

		//Explanation div
		var explainDiv = document.createElement('div');
		$(explainDiv).css('float', 'left');
		explainDiv.style.width = '90%';
		explainDiv.style.marginLeft = '12px';
		var iconDiv = document.createElement('div');
		$(iconDiv).addClass('icon');
		iconDiv.innerHTML = "Type";
		var termDiv = document.createElement("div");
		$(termDiv).addClass('term');
		termDiv.innerHTML = "Term";
		var ratingDiv = document.createElement("div");
		$(ratingDiv).addClass('rating-all');
		ratingDiv.innerHTML = "Rating";
		explainDiv.appendChild(iconDiv);
		explainDiv.appendChild(termDiv);
		explainDiv.appendChild(ratingDiv);

		//Tags title
		var tagsContainerTitle = $('<span></span>');
		tagsContainerTitle.css('font-weight','bold');
		tagsContainerTitle.css('font-style','italic');
		tagsContainerTitle.append("<div>Matched tags</div>");
		tagsContainerTitle.append(explainDiv);

		//Tags div
		var tags = $('<div></div>');
		tags.attr('id','tag-cloud-inner' + object.id);
		tags.css('max-height','150px');
		tags.css('overflow', 'auto');
		tags.css('float','left');
		tags.css('width','100%');

		//Append all items
		imgdiv.append(img);
		imgdiv.append(vidTitle);
		tagsContainer.append(tagsContainerTitle);
		tagsContainer.append(tags);
		imgContainer.append(imgdiv);
		container.append(imgContainer);
		container.append(tagsContainer);
		$("#topsearchheader").append(container);

		//Call to function that generates result list
		createSearchCloud(object);
	}
}

//Generates result list
function createSearchCloud(object){
	//Get div to append to
	var tagCloudInner = document.getElementById("tag-cloud-inner" + object.id);
	//Array with results
	var total = object.total;
	//For each result in object
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

		//Div containing type icon
		var iconDiv = document.createElement("div");
		$(iconDiv).addClass('icon');
		if(item.visual_score != null){
			iconDiv.innerHTML = "<div class='icon-eye-open'></div>";
		}
		else{
			iconDiv.innerHTML = "<div class='icon-twitter-sign'></div>";
		}

		//Div containing term
		var termDiv = document.createElement("div");
		$(termDiv).addClass('term');
		termDiv.innerHTML = item.term;

		//Div containing rating stars
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
		//Append all items
		tagButton.appendChild(iconDiv);
		tagButton.appendChild(termDiv);
		tagButton.appendChild(ratingDiv);
		tagCloudInner.appendChild(tagButton);
		//Call to function that colors tags
		colorTags($(tagCloudInner).children().length, object.id);
		//Remove loading icon
		$("#loading-img").hide();
	})
}

//Sets sorting type
function sortByRerankingScore(x,y){
	return y.reranking_score - x.reranking_score;
}

//Converts 'minutes:seconds' to seconds
function timeToSec(minutes){
	var time = minutes.split(":");
	return ((parseInt(time[0]) * 60) + parseInt(time[1]));
}