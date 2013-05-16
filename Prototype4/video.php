<!DOCTYPE HTML>
<html>
	<head>
		<meta charset = "utf-8">
		<title>SocialZap</title>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js"></script>
		<!--[if IE]><script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script><![endif]-->
		<script src ="javascript/bootstrap.js"></script>
		<script src ="http://popcornjs.org/code/dist/popcorn.min.js"></script>
		<!--  css files -->
		<LINK rel="stylesheet" href="css/style.css" type="text/css" MEDIA=screen>
		<link rel="stylesheet" href="css/bootstrap.css" type="text/css">
		<link rel="stylesheet" href="css/jqcloud.css" type="text/css">
		<link rel="stylesheet" href="css/font-awesome.css" type="text/css">
		<link rel="stylesheet" href="css/nouisliderfox.css" type="text/css">
		
	</head>	
	<body>
	
	

		<!--page wrapper -->
		<div class="main-content-wrapper">
			
			<!-- header -->
			
			<header>
					<div class="navbar navbar-static-top">
					<div class="navbar-inner" id="search-animate-bar" style="margin-top:-50px;">
						<div class="container" >
			   				<input id="top-search" type="search" placeholder="What are you looking for?..." style="width:100%;">
  						</div>
					</div>


  					<div class="navbar-inner">
  						<div class="container">
    						<a class="brand" href="index.php"></li> SocialZap</a>
						    <ul class="navigation">
			     			<li class="icon-home icon-2x navButton" id="homebutton" style="cursor: pointer"></li>
			     			<li class="icon-th icon-2x navButton" id="browsebutton" style="cursor: pointer"></li>
			     			<li class="icon-user icon-2x navButton" id ="userButton" style="cursor: pointer"></li>
			     			<li class="icon-search icon-2x navButton" id="searchbutton" style="cursor: pointer"></li>
			     			</ul>
			     			<form id="loginform">
								<div class="input-prepend">
									<span class="add-on"><i class="icon-envelope"></i></span>
									<input class="span2" type="text" placeholder="Email address">
								</div>
								<div class="input-prepend">
									<span class="add-on"><i class="icon-key"></i></span>
									<input class="span2" type="password" placeholder="Password">
								</div>
							</form>
  						</div>
					</div>

				</div>
			<!-- end header -->
			</header>


			<!-- begin main-page container -->
			<div class="container" style="margin-top:15px;">
			<div class="row">
				<!-- video area -->
				<div class="video-area span9">
					<button class="well well-header"><?php echo $_REQUEST['vidn'];?></button>
					<div>
						<video height="394" width="700" id="video" style="margin-top:4px;">
				
						<source id="videosource" type="video/mp4" src="videos/<?php echo $_REQUEST['vidn'];?>.mp4">
						
						nopppeeee
						</video>
					</div>
					<!-- video for frame preview -->
					<div>
						<video height="0" width="0" id="snapvideo" onclick="play()" style="display:none;">
						<source type="video/mp4" src="videos/<?php echo $_REQUEST['videoname']; ?>.mp4">
						</video>
					</div>
				
					<!-- video controls -->								
					<div id="video_controls" style="margin-bottom:5px;">
						<!-- twitter button -->
						<span style="float:right;height:20px;"> <button class="btn btn-mini" type="button" onclick="sendTweet();"><img src = "img\tweet.png" \>Tweet</button></span>
						<!-- play, pause and stop -->
						<button class="btn btn-success" id="playbutton">Play</button>
						<button class="btn btn-primary" id="pausebutton">Pause</button>
						<button class="btn btn-danger" id="stopbutton">Stop</button>
					</div>
					
					<!-- progress bar -->

					<div class="progress" id="popcorn-progbar-wrapper" style="width:700px; height:15px; background-color:grey; margin-bottom:5px; cursor: pointer;">
						
					<div class="bar" id="popcorn-progbar" style="width: 0%;"></div>
					</div>

					<!-- Tweet zappoints -->
					<div id="tweetPoints" style="height:22px; width:700px;">
					<!-- is filled dynamically with zappoint.js-->
					</div>

					<!-- Visual zappoints -->
					<div id="visualPoints" style="height:22px; width:700px;">
					<!-- is filled dynamically with zappoint.js-->
					</div>

					<!-- begin advanced options -->
					<div>
						<button class="well well-header">Advanced options</button>

						<div style="clear:right;">Set minimal reranking Score</div>
							<div class="noUiSlider" id="slider1" style="float:left; margin-top:10px;"></div>
							<input id="tweet_value" type="text" style="margin-left:5px;" class="input-mini">

							<div style="clear:right;">Set minimal visual Score</div>
							<div class="noUiSlider" id="slider2" style="float:left; margin-top:10px;"></div>
							<input id="visual_value" type="text" style="margin-left:5px;" class="input-mini">

							<button class="btn" style="float:left; clear:both; margin-top:10px; margin-bottom:10px;">Update tags</button>
						

					</div>


					

				
				<!-- end video area -->
				</div>

				<div class="span3">
					<!-- begin tagcloud -->
					<div class="tag-cloud">
							<button class="well well-header">Hot topics</button>

							<div id="tag-cloud-inner">
							</div>

					<!-- end tagcloud -->
					</div>

					<div class="extrainfo">
						<button class="well well-header">Extra information</button>
						<div id="extrainfo_inner" style="display:none;">
						</div>
					</div>
				</div>
			</div>
			<!-- end demo video container -->

				<!-- middle part with comments -->
				<div class="middle-part-wrapper">
					<div class="row">
						<div class="span9">
							<div class="comments" style="width:700px; float:left;">
									<div><button class="well well-header">Comments</button></div>
									<div><input type="text" placeholder="Write a comment...." style="width:687px; margin-top:5px;"></div>

									<div class="a-comment" style="width:100%; margin-top:5px; border-bottom:1px solid #999999; float:left;">
										<div class="user-photo" style="width:45px; height:45px; float:left;"><li class="icon-user icon-2x"></li>
										</div>
										<div class="comment-info">Ping Wan at 0:25, 1 hours ago:</div>
										<div class="comment-text" style="float:left;">Great Video!</div>
									</div>

									<div class="a-comment" style="width:100%; margin-top:5px; border-bottom:1px solid #999999; float:left;">
										<div class="user-photo" style="width:45px; height:45px; float:left;"><li class="icon-user icon-2x"></li>
										</div>
										<div class="comment-info">Anish Narwade at 4:25, 5 hours ago:</div>
										<div class="comment-text" style="float:left;">Standje 69 Owned!</div>
									</div>

									<div class="a-comment" style="width:100%; margin-top:5px; border-bottom:1px solid #999999; float:left;">
										<div class="user-photo" style="width:45px; height:45px; float:left;"><li class="icon-user icon-2x"></li>
										</div>
										<div class="comment-info">Haluk Sahin at 3:25, 12 hours ago:</div>
										<div class="comment-text" style="float:left;">Black money under black couch LOL</div>
									</div>
							</div>
						</div>
					</div>
				</div>

			<!-- end main-page container -->
			</div>	
		
				<!-- footer -->
		<footer>
			<div class="footer">
				<div class="container">
					Made by a Team at TU Delft, The Netherlands. Copyright 2013
				</div>
			</div>
		</footer>
		


		<!-- end page wrapper -->
		</div>

		<script>

		$(document).ready(function(){
			$("#searchbutton").click(function(){
				var xyz = $("#search-animate-bar").css("margin-top");
				if(parseInt(xyz) < 0){
				$("#search-animate-bar").animate({ marginTop: '0px'}, 1000);
				}else{
					$("#search-animate-bar").animate({ marginTop: '-50px'}, 1000);
				}

			});

			$("#browsebutton").click(function(){
				location.href = "index.html";
			});

			$("#homebutton").click(function(){
				location.href = "index.html";
			});

			
			$("#slider1").noUiSlider({
    			range: [0, 100]
			   ,start: 50
			   ,handles: 1
			   ,connect: "lower"
			   ,serialization: {
			      to: [$("#tweet_value")]
			   }
			});


			$("#slider2").noUiSlider({
			    range: [0, 100]
			   ,start: 50
			   ,handles: 1
			   ,connect: "lower"
			   ,serialization: {
			      to: [$("#visual_value")]
			   }
			});
			


		});
		</script>

	<script src ="javascript/video.js"></script>
	<script src ="javascript/lib/nouislider.js"></script>
	<script src ="javascript/tagdata.js"></script>
	<script src ="javascript/social.js"></script>
	<script src ="javascript/checktime.js"></script>
	<script src ="javascript/geturlvars.js"></script>
	<script src ="javascript/skiptime.js"></script>
	<script src ="javascript/main.js"></script>
	
	</body>
	</html>
