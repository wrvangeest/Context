$(document).ready(function(){

//############# Mouse actions for ratings #################
	$("body").on("mouseenter",".rating", function() {
		if($(this).hasClass("icon-star")){
			var child = this;
			$(child).removeClass("icon-star");
			$(child).addClass("icon-star-empty");
			while(child.nextSibling){
				child = child.nextSibling;
				$(child).removeClass("icon-star");
				$(child).addClass("icon-star-empty");
			}
		}

		if($(this).hasClass("icon-star-empty")){	
			var child = this;
			while(child.previousSibling){
				$(child).removeClass("icon-star-empty");
				$(child).addClass("icon-star");
				child = child.previousSibling;
			}
		}
	});

	$("body").on("mouseout",".rating", function() {
		var rating = this.id.substr(6,1);
		var children = $(this).parent().children();
		for(var i = 0; i < rating; i++){
			$(children[i]).removeClass("icon-star-empty");
			$(children[i]).addClass("icon-star");
		}
		for(var i = rating; i <= 5; i++){
			$(children[i]).removeClass("icon-star");
			$(children[i]).addClass("icon-star-empty");
		}
	});

	$("body").on("click",".rating", function() {
		var user_id = 2;
		var value = this.id.substr(7,1);
		var term = this.parentNode.parentNode.children[0].innerHTML;
		$.post("php/setRating.php?term=" + term + "&score=" + value)
			.done(function (result) {
			});
	});
//#########################################################
});