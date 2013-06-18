var OFFSET = 6;
//Generates HTML code
function createZapCode(data, type){
	//Grab the list div (located in HTML file)
	var list = document.getElementById(type + "Points");

	//Loop through the data using JSON functions
	jQuery.each(data,function(index, item) {
		//Retrieve offset in pixels from time
		var loc = calcDist(item);
		//Create listitem element
		var zap = document.createElement("li");
		//Set properties so CSS recognizes correctly
		switch(type) {
			case "tweet":
				zap.className = "icon-twitter-sign tweetPoint zapPoint";
				zap.id = "tweetPoint" + index;
				zap.style.color = "rgb(64,153,255)";
				break;
			case "visual":
				zap.className = "icon-eye-open visualPoint zapPoint";
				zap.id = "visualPoint" + index;
				zap.style.color = "rgb(64, 153, 255)";
				break;
		}
		//Set location in pixels
		zap.style.marginLeft = loc - OFFSET + "px";
		//Set tag name as attribute
		zap.setAttribute('term', item.term);
		//Append item to list
		list.appendChild(zap);
		zap.style.position = "absolute";
	});
}