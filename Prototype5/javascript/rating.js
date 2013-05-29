function getTagRating(term){
	$.post("php/rating.php?term=" + term)
		.done(function (data) {
			return JSON.parse(data)[0].rating;
		})
}