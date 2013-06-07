function searchTerms(searchTerm){
	var videos = [3,4,6,7,8,9,10];
	for(video in videos){
		$.post("php/zappoints.php?id=" + videos[video] + "&dur=999999")
		.done(function (data) {
			var obj = JSON.parse(data);
			searchObject(searchTerm, obj);
		})
		    //Give message when failed
	   	.fail(function() {
	    	//alert("getZapData failed!");
		});
	}
}

function searchObject(searchTerm, object){
	var results = {};
	results.visual = [];
	results.tweet = [];
	results.id = object.id;
	//Process visual
	for(zapPoint in object.visual){
		if(object.visual[zapPoint].term.search(searchTerm) >= 0){
			results.visual.push(object.visual[zapPoint]);
		}
	}
	//Process tweet
	for(zapPoint in object.tweet){
		if(object.tweet[zapPoint].term.search(searchTerm) >= 0){
			results.tweet.push(object.tweet[zapPoint]);
		}
	}
	putResultInPage(results);
}


function putResultInPage(object){
	if(object.visual.length > 0 || object.tweet.length > 0){

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
		img.attr('data-videoid', object.id);
		img.attr('data-videoname',vidName);
		img.attr('data-title',vidTitle);
		img.attr('src', 'img/videothumb/' + imgSrc + '.png');
		img.addClass('searchImg');


		var tagsContainer = $('<div></div>');
		tagsContainer.css('padding-top',"15px");
		tagsContainer.addClass("span4 offset1");

		var tagsContainerTitle = $('<span></span>');
		tagsContainerTitle.css('font-weight','bold');
		tagsContainerTitle.css('font-style','italic');
		tagsContainerTitle.append("Matched tags");

		var tags = $('<div></div>');
		for(tag in object.tweet){
			tags.append(object.tweet[tag].term + "<br>");
		}


		imgdiv.append(img);
		imgdiv.append(vidTitle);
		tagsContainer.append(tagsContainerTitle);
		tagsContainer.append(tags);
		imgContainer.append(imgdiv);
		container.append(imgContainer);
		container.append(tagsContainer);

		$("#topsearchheader").after(container);
	}
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