<<<<<<< HEAD
function getTagRating(term){
	$.post("php/rating.php?term=" + term)
		.done(function (data) {
			return JSON.parse(data)[0].rating;
		})
=======
function getRating(){
	

		//get rating from database and put as rating

		var rating = 3;

		for(var i = 0 ; i < 5;i++){
			if(i < rating){
				$('.ratingbar').append('<i class="icon-star icon-3x ster"></i>');
			}else{
				$('.ratingbar').append('<i class="icon-star-empty icon-3x ster"></i>');
			}

		}	
>>>>>>> origin/comment-rating
}