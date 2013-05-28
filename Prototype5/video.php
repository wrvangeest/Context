<!DOCTYPE HTML>
<html>
	<head>
		<meta charset = "utf-8">
		<title>SocialZap</title>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js"></script>
		<!--[if IE]><script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script><![endif]-->
		<script src ="lib/javascript/bootstrap.js"></script>
		<script src ="lib/javascript/nouislider.js"></script>
		<script src ="lib/javascript/moment.js"></script>
		<script src ="http://popcornjs.org/code/dist/popcorn.min.js"></script>
		<!--  css files -->
		<link rel="stylesheet" href="lib/css/bootstrap.css" type="text/css">
		<link rel="stylesheet" href="lib/css/font-awesome.css" type="text/css">
		<link rel="stylesheet" href="lib/css/nouisliderfox.css" type="text/css">
		<LINK rel="stylesheet" href="css/tagtoggler.css" type="text/css" >
		<LINK rel="stylesheet" href="css/ratingbar.css" type="text/css" >	
		<LINK rel="stylesheet" href="css/style.css" type="text/css" MEDIA=screen>
		
	</head>	
	<body>


		<div id="fb-root"></div>
		<script>(function(d, s, id) {
		  var js, fjs = d.getElementsByTagName(s)[0];
		  if (d.getElementById(id)) return;
		  js = d.createElement(s); js.id = id;
		  js.src = "//connect.facebook.net/nl_NL/all.js#xfbml=1";
		  fjs.parentNode.insertBefore(js, fjs);
		}(document, 'script', 'facebook-jssdk'));</script>
	
	

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


  					<div class="navbar-inner" id="mainNavBar">
  						<div class="container">
    						<a class="brand" href="index.php"></li>SocialZap</a>
						    <!--<ul class="navigation">
			     			<li class="icon-th icon-2x navButton" id="browsebutton" style="cursor: pointer"></li>
			     			<li class="icon-search icon-2x navButton" id="searchbutton" style="cursor: pointer"></li>
			     			</ul>-->
			     			<div class="btn-group" id="navButtons">
			     				<button class="btn navButton" id="browsebutton"><div class="icon-th navButton"></button>
			     				<button class="btn navButton" id="searchbutton"><div class="icon-search navButton"></button>
			     			</div>
  						</div>
					</div>

				</div>
			<!-- end header -->
			</header>


			<!-- begin main-page container -->
			<div class="container">
			<div id="video_top_filler">
			</div>
			<div class="row">
				<!-- video area -->
				<div class="video-area span9">
					<div class="well well-header"><?php echo $_REQUEST['vidn'];?></div>
					<div>
						<video height="394" width="700" id="video" style="margin-top:4px;">
				
						<source id="videosource" type="video/mp4" src="videos/<?php echo $_REQUEST['vidn'];?>.mp4">
						
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
						<button class="btn btn-success icon-play" id="playbutton"></button>
						<button class="btn btn-success icon-pause" id="pausebutton" style="display:none;"></button>
						<button class="btn btn-danger icon-stop" id="stopbutton"></button>
						<span id="current-time">0:00</span>/<span id="total-time"></span>
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
						<div class="well well-header">Advanced options</div>

						<div style="clear:right;">Set minimal reranking Score</div>
							<div class="noUiSlider" id="slider1" style="float:left; margin-top:10px;"></div>
							<input id="tweet_value" type="text" style="margin-left:5px;" class="input-mini" disabled="true">

							<div style="clear:right;">Set minimal visual Score</div>
							<div class="noUiSlider" id="slider2" style="float:left; margin-top:10px;"></div>
							<input id="visual_value" type="text" style="margin-left:5px;" class="input-mini" disabled="true">
					</div>

				
				<!-- end video area -->
				</div>

				<div class="span3">
					<!-- begin tagcloud -->
					<div class="tag-cloud">
							<div class="well well-header">Hot topics</div>
							<div id="tag-toggle">
							    <span id="tag-toggle-button">Tweets</span>
							</div>


							<input type="search" id="tagSearch" placeholder="Search Twitter Tags">
							<div id="loading-img" style="display:none;"><img src="img/ajax-loader.gif"/></div>

							<div id="tag-cloud-inner">
							</div>

					<!-- end tagcloud -->
					</div>

					<div class="extrainfo">
						<div class="well well-header">Extra information</div>
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
							<div class="comments">
									<div class="well well-header">Comments</div>
									<div class="fb-comments" data-href="http://localhost/context/Prototype5/" data-width="700" data-num-posts="10"></div>
									
							</div>
						</div>
					</div>
					<div id="video_bot_filler">
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



	<script src ="javascript/video.js"></script>
	<script src ="javascript/tagCloudColor.js"></script>
	<script src ="javascript/tagdata.js"></script>
	<script src ="javascript/social.js"></script>
	<script src ="javascript/checktime.js"></script>
	<script src ="javascript/geturlvars.js"></script>
	<script src ="javascript/skiptime.js"></script>
	<script src ="javascript/filtertaglist.js"></script>
	<script src ="javascript/togglebutton.js"></script>
	<script src ="javascript/rating.js"></script>
	<script src ="javascript/main.js"></script>
	
	</body>
	</html>
