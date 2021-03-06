<!DOCTYPE HTML>
<html>
	<head>
		<meta charset = "utf-8">
		<title>SocialZap</title>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js"></script>
		<!--[if IE]><script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script><![endif]-->
		<script src ="javascript/bootstrap.js"></script>
		<script src ="javascript/jqcloud-1.0.3.js"></script>
		<script src ="http://popcornjs.org/code/dist/popcorn.min.js"></script>
		<!--  css files -->
		<LINK rel="stylesheet" href="css/style.css" type="text/css" MEDIA=screen>
		<link rel="stylesheet" href="css/bootstrap.css" type="text/css">
		<link rel="stylesheet" href="css/jqcloud.css" type="text/css">
		<link rel="stylesheet" href="css/font-awesome.css" type="text/css">
		
	</head>
	
	<body>
	
	

		<!--page wrapper -->
		<div class="main-content-wrapper">
			
			<!-- header -->
			
			<header class="header2">
					<div class="container">
						<h1 class="logo">
							<a href="index.php">
								<img src="logo2.jpg">
							</a>

						</h1>
						
				<div class="row">
					

					<div class="span9" style="float:right; height:66px;">
						<ul class="navigation">
			     			<li><a href="index.html">Home</a></li>
			     			<li><a href="#">Browse</a></li>
			     			<li><a href="#">Random Video</a></li>
			     			<li><a href="#">Sign Up</a></li>
			     			<li><a href="#">Login</a></li>
			    		</ul>

					</div>

				</div>
				</div>
			<!-- end header -->
			</header>


			<!--demo video -->
			<div class="demo-video-wrapper">
				<!-- begin demo video container -->
				<div class="container panel">
					
					<!-- video area -->
					<div class="video-area">

						<div class="panel-header">
							Demo video
						</div>
						
						<div>
							<video height="360" width="640" id="video" onclick="play()">
							<source type="video/mp4" src="videos/dwdd14052012.mp4">
							</video>
						</div>

						<div>
							<video height="0" width="0" id="snapvideo" onclick="play()" style="display:none;">
							<source type="video/mp4" src="videos/powned2.m4v">
							</video>
						</div>
					
				
						<!-- video controls -->								
						<div id="video_controls" style="margin-bottom:5px;">
							<button class="btn btn-success" id="playbutton">Play</button>
							<button class="btn btn-primary" id="pausebutton">Pause</button>
							<button class="btn btn-danger" id="stopbutton">Stop</button>
						</div>
						
						<!-- progress bar -->

						<div class="progress" id="popcorn-progbar-wrapper" style="width:640px; height:15px; background-color:grey; margin-bottom:5px; cursor: pointer;">
							
						<div class="bar" id="popcorn-progbar" style="width: 0%;"></div>
						</div>

						<!-- break points -->
						<div id="breakpoints" style="height:22px; width:640px;">
						<!-- is filled dynamically with zappoint.js-->
						</div>

					
					<!-- end video area -->
					</div>

					<!-- begin tagcloud -->
					<div class="tag-cloud">
							<div class="panel-header">
								Tag Cloud
							</div>

							<div id="tag-cloud-inner">
							</div>

					<!-- end tagcloud -->
					</div>

					<div class="extrainfo">
						<div class="panel-header">
								Extra Information
						</div>
						<div id="extrainfo_inner" style="display:none;">
						</div>
					</div>
				<!-- end demo video container -->
				</div>	
			<!-- end demo video wrapper -->
			</div>


			<!-- middle part with features and related -->
			<div class="features-related-wrapper">
				<!-- features -->
				<div class="container features">
					<div class="panel-header">
						Why is it awesome?? 
					</div>
					
						<div class="span4">
							ZapPoints
							<img src="remote.jpg" style="height:100px;">
						</div>
						<div class="span4">
							TagCloud
							<img src="cloud.jpg">
						</div>
						<div id = "social" class="span4">
							Social<BR>
							<a id = "twitter_link" href="https://twitter.com/share" class="twitter-share-button">Tweet</a>
						</div>
				<!-- end features-->
				</div>
				<!-- related container, not really necessary -->
				<!--
				<div class="container related">
					<div class="panel-header">
						Related
					</div>
					<ul class="thumbnails">
  						<li class="span4">
    						<a href="#" class="thumbnail">
      						<img src="http://placehold.it/350x150">
    						</a>
  						</li>
  						<li class="span4">
    						<a href="#" class="thumbnail">
      						<img src="http://placehold.it/350x150">
    						</a>
  						</li>
  						<li class="span4">
    						<a href="#" class="thumbnail">
      						<img src="http://placehold.it/350x150">
    						</a>
  						</li>
  					</ul>
				</div>-->
				
			<!-- end middle part with features and related -->
			</div>

			<footer>
				<div class="footer">
					<div class="container">
						sdfdf
					</div>
				</div>
			</footer>


		<!-- end page wrapper -->
		</div>

	
	<script src ="javascript/main.js"></script>
	<script src ="javascript/video.js"></script>
	<script src ="simple_tip.js"></script>
	<script src ="javascript/tagdata.js"></script>
	<script src ="javascript/social.js"></script>
	<script src ="javascript/checktime.js"></script>
	<script src ="javascript/geturlvars.js"></script>
	<script src ="javascript/skiptime.js"></script>
	</body>
	</html>
