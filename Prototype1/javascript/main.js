
//ready function
$(document).ready(function(){

	$(".tag").click(function(){
		var time = $(this).data("time");		
		var video = document.getElementsByTagName('video')[0];
		video.currentTime = time;
		video.play();
	});
	
	$(".tag").popover({title:'hoi'});

	});