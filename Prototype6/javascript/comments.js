$(document).ready(function(){

	loadComments();
});

function loadComments(){

	var hash = getUrlVars();
	var vidid = hash['vidid'];
	
	$.post("php/comments.php?vidid=" + vidid)
		.done(function (data) {
			putComments(JSON.parse(data));
		})
}

function putComments(data){
		jQuery.each(data, function(index,item) {

			//make a new date object,
			//get the right format of date and time
			//and how long ago it was posted
			var datumpost = new Date(item.datum);
			var datumformat = getPostTime(datumpost);
			var geleden = getPostPast(datumpost);


			//create the elements and append it to comments div
			var acomment = $(document.createElement('div'));
			acomment.addClass("a-comment");

			var userphoto = $(document.createElement('div'));
			userphoto.addClass("user-photo");
			userphoto.html('<li class="icon-user icon-2x"></li>');
				
			var commentinfo = $(document.createElement('div'));
			commentinfo.addClass("comment-info");
			commentinfo.html(item.name + ' @ ' + datumformat + ' , ' + geleden);

			var commenttext = $(document.createElement('div'));
			commenttext.addClass("comment-text");
			commenttext.html(item.text);

			$(acomment).append(userphoto)
					   .append(commentinfo)
					   .append(commenttext)

			$('#comments-real').append(acomment)
		})
}
//return the date in a clearer format
function getPostTime(datumpost){
					jaar = datumpost.getFullYear();
					maand = datumpost.getMonth();
					dag = datumpost.getDate();
					uur = datumpost.getHours();
					minuut = datumpost.getMinutes();
					sec = datumpost.getSeconds();
					if(minuut <10){
						minuut = '0'+minuut;
					}
					var datumformat = dag+"/"+maand+"/"+jaar+" around "+uur+":"+minuut;
					return datumformat;
}

//returns the differance in time with now and the given date: datumpost
// extends with the correct extension
function getPostPast(datumpost){

						var nu = new Date()
						var verschildatum = nu - datumpost;
						
						if(verschildatum<1000){
						    return Math.floor(verschildatum/1000) + " seconds ago";
						}
						if(verschildatum<(60*60*1000)){
						    return Math.floor(verschildatum/(60*1000)) +" minutes ago";
						}
						if(verschildatum<(24*60*60*1000)){
							return Math.floor(verschildatum/(60*60*1000)) +" hours ago";
						}
						if(verschildatum<(365*24*60*60*1000)){
							return Math.floor(verschildatum/(24*60*60*1000))+" days ago";
						}
						else{
						  	return "once upon a time";
						}
}