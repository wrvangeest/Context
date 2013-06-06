$(document).ready(function(){

	
	loadComments();


	//$('#comments-input')

});


function loadComments(){

	var hash = getUrlVars();
	var vidid = hash['vidid'];
	var comments = [];
	
	$.post("php/comments.php?vidid=" + vidid)
		.done(function (data) {
			console.log(data);
			comments.push(JSON.parse(data));
		})

	setTimeout(function(){
	console.log(comments);
	jQuery.each(comments[0], function(index,item) {

		$('.comments').append('<div class="a-comment"><div class="user-photo"><li class="icon-user icon-2x"></li></div><div class="comment-info">id:'+item.id+' at 0:25, 1 hours ago:</div><div class="comment-text"> '+item.text+' </div></div>')
	})
	},3000);

}