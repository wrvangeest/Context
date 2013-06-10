$(document).ready(function(){

//############# Mouse actions for ratings #################
	$("body").on("mouseenter",".rating", function() {
		var orChild = this;
		var child = orChild;
		while(child.nextSibling){
			$(child).removeClass("icon-star");
			$(child).addClass("icon-star-empty");
			child = child.nextSibling;
		}
		child = orChild;
		while(child.previousSibling){
			$(child).removeClass("icon-star-empty");
			$(child).addClass("icon-star");
			child = child.previousSibling;
		}
		$(orChild).removeClass("icon-star-empty");
		$(orChild).addClass("icon-star");

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
				switch(result){
					case '1': alert("Er is iets mis gegaan"); break;
					case '2': alert("Rating toegevoegd."); break;
					case '3': alert("Je moet eerst ingelogd zijn om een rating te geven."); break;
				}
			});
	});
//#########################################################
});