$(document).ready(function(){
	//Mouse action for commentbutton
	$('#commentbutton').click(	
		function(e){
			e.preventDefault();

			if($('#inputcomment').val() === ""){
				alert("Vul iets in in het invoervak.");
			}else{

				var hash = getUrlVars();
				var vidid = hash['vidid'];
				var text = $('#inputcomment').val();
				var dur = Popcorn("#video").currentTime();

				$.post("php/setComment.php?", {vidid:vidid, comment:text, vid_time:dur}, function(data){
					if(data.name != ''){
						var a = [];
						a[0] = JSON.parse(data);
						putComments(a);

					}
				});
			}
		} 
	);

	//Initializes comment display
	checkTime(function(dur){loadComments()},0);
});

//Retrieves comment data
function loadComments(){

	var hash = getUrlVars();
	var vidid = hash['vidid'];
	
	$.post("php/comments.php?vidid=" + vidid)
		.done(function (data) {
			putComments(JSON.parse(data));
		})
}

//Generates comments
function putComments(data){
	var list = document.getElementById("commentPoints");
	jQuery.each(data, function(index,item) {
		//---------------Create zappoints for comments --------------------------
		//Convert time ("m:(s)s") to seconds
		var secs = item.vid_time;
		//Grab duration of video
		var dur = Popcorn("#video").duration();
		if(secs <= dur){
			
			//Calculate ratio of time/duration
			var ratio = secs / dur;
			//Grab width of timeline in pixels
			var wdth = document.getElementById("commentPoints").style.width;
			//Trim for calculations
			wdth = wdth.substr(0,wdth.length - 2);
			//Return offset value in pixels calculated using ratio
			var loc = (ratio * wdth);

			var zap = document.createElement('img');
			zap.className = "commentPoint zapPoint";
			zap.id = "commentPoint" + index;
			zap.src =  item.image;
			zap.style.marginLeft = loc + "px";
			zap.style.width = "16px";
			zap.style.height = "16px";
			$(zap).popover({placement: 'bottom',
							trigger:'hover',
							toggle:'popover',
							});
			zap.setAttribute('data-content', item.text);
			zap.setAttribute('data-original-title', item.name + " zegt:");

			zap.style.position = "absolute";

			list.appendChild(zap);
		}

		//---------------- Create comments ---------------------------------
		//make a new date object,
		//get the right format of date and time
		//and how long ago it was posted
		var datumpost = new Date(item.datum);
		var datumformat = getPostTime(datumpost);
		var geleden = getPostPast(datumpost);


		//create the elements and append it to comments div
		var acomment = $(document.createElement('div'));
		acomment.addClass("a-comment");

		var userphoto = document.createElement('div');
		var userImg = document.createElement('img');
		userImg.src = item.image;
		userImg.style.width = '32px';
		userImg.style.height = '32px';
		$(userphoto).addClass("user-photo");
		userphoto.appendChild(userImg);

		//userphoto.html('<li class="icon-user icon-2x"></li>');
			
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
	var datumformat = dag+"/"+maand+"/"+jaar+" rond "+uur+":"+minuut;
	return datumformat;
}

//returns the difference in time with now and the given date: datumpost
// extends with the correct extension
function getPostPast(datumpost){

	var nu = new Date()
	var verschildatum = nu - datumpost;
	
	if(verschildatum<1000){
	    return Math.floor(verschildatum/1000) + " seconden geleden";
	}
	if(verschildatum<(60*60*1000)){
	    return Math.floor(verschildatum/(60*1000)) +" minuten geleden";
	}
	if(verschildatum<(24*60*60*1000)){
		return Math.floor(verschildatum/(60*60*1000)) +" uren geleden";
	}
	if(verschildatum<(365*24*60*60*1000)){
		return Math.floor(verschildatum/(24*60*60*1000))+" dagen geleden";
	}
	else{
	  	return "lang, lang geleden";
	}
}