
var video = document.getElementsByTagName('video')[0];
//ready function
$(document).ready(function(){

	//tags clicking
	$(".tag ,.icon_marker").click(function(){
		var time = $(this).data("time");		
		var video = document.getElementsByTagName('video')[0];
		video.currentTime = time;
		video.play();
	});

	
	
	setInterval(function(){
		$("#progbar").css("width", video.currentTime );
	},80);
	
	


$(".icon_marker").hover(
         function () {
         	
			$(".twitter_icon").parent().css("opacity","0.2");
			$(".twitter_icon").eq(0).parent().css("opacity","1");
           	$(".extra_info").eq(0).css("display","block");
         }

         , 
         function () {
           $(".twitter_icon").parent().css("opacity","1");
           $(".extra_info").eq(0).css("display","none");
       
         }
     );

	$("#interactive_button").click(function(){
		$("#tagcloud_lef").css("display","block");
		$("#tagmarkers").css("display","block");

	});


});