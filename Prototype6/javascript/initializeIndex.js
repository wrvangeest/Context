$(document).ready(function(){
	$('img').click(function(){
		var videoid = $(this).attr("data-videoid");
		var videoname = $(this).attr("data-videoname");
		var videotitle = $(this).attr("data-title");
		location.href = "video.php?vidid=" + videoid + "&vidn=" + videoname + "&title=" + videotitle;
	});
});