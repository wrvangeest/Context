<?php session_start(); 

	if(isset($_SESSION['loginstatus'])){
		$_SESSION['curpage'] = curPageName();
	}
 	function curPageName() {
 		return substr($_SERVER["SCRIPT_NAME"],strrpos($_SERVER["SCRIPT_NAME"],"/")+1).'?'.$_SERVER["QUERY_STRING"];
	}
?>
<!DOCTYPE HTML>
<html>
	<head>
		<meta charset = "utf-8">
		<title>SocialZap</title>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js"></script>
		<!--[if IE]><script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script><![endif]-->
		<script src ="lib/javascript/bootstrap.js"></script>
		<script src ="lib/javascript/nouislider.js"></script>
		<script src ="http://popcornjs.org/code/dist/popcorn.min.js"></script>
		<!--  css files -->
		<link rel="stylesheet" href="lib/css/bootstrap.css" type="text/css">
		<link rel="stylesheet" href="lib/css/font-awesome.css" type="text/css">
		<link rel="stylesheet" href="lib/css/nouisliderfox.css" type="text/css">
		<LINK rel="stylesheet" href="css/tagtoggler.css" type="text/css" >
		<LINK rel="stylesheet" href="css/ratingbar.css" type="text/css" >	
		<LINK rel="stylesheet" href="css/style.css" type="text/css" MEDIA=screen>
		<link rel="shortcut icon" href="img/icon.ico">
		
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
					<div class="navbar-innfer" id="search-animate-bar" style="margin-top:-50px;">
						<div class="container" >
			   				<input id="top-search" type="search" placeholder="Vul een zoekterm in..." style="width:100%;">
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
	  						<div id="nav-bar-form" style="margin-top:0px; float:right;">
	  							
	  							<?php if( isset($_SESSION['loginstatus'])) {?>
	  							<!-- If there is a existing session greet the user -->
		  							<div id="logged-in">
		  								<span>Hallo, <?php echo $_SESSION['name']; ?></span>
		  								<a href='php/logout.php' id='logout'>Log uit</a>
		  							</div>
	  							
	  							<?php }else {?>
	  							<!-- Else make it login form -->
			  						<form class="form-inline" id="inlog-form" method="post">
									  <input name="email" type="text" class="input-small" id="login-email" placeholder="Username">
									  <input name="password" type="password" class="input-small" id="login-passwd" placeholder="Password">
									  <input name="name" type="text" class="input-small" id="reg-name" placeholder="Name">


									  <label class="radio" id="loginlabel">
										  <input type="radio" name="optionsRadios" id="loginradio" value="option1" checked>
										  <span style="color:white;">Log in</span>
										</label>
										<label class="radio" id="registerlabel">
										  <input type="radio" name="optionsRadios" id="registerradio" value="option2">
										   <span style="color:white;">Registreer</span>
										</label>

									  <button type="submit" class="btn" id="ok">Log in</button>
									  <button type="submit" class="btn" id="ok-reg">Registreer</button>
									</form>
								<?php } ?>
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
						<div class="well well-header"><?php echo $_REQUEST['title'];?></div>
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
						<!-- is filled dynamically-->
						</div>

						<!-- Visual zappoints -->
						<div id="visualPoints" style="height:22px; width:700px;">
						<!-- is filled dynamically-->
						</div>

						<!-- Comment images -->
						<div id="commentPoints" style="height:22px; width:700px;">
						<!-- is filled dynamically-->
						</div>

					<!-- begin advanced options -->
					<div id="adv-options">
						<div class="well well-header">Geavanceerde opties</div>
							<div style="clear:right;">Selecteer minimale Tweet Score
								<a href="#" id="popo" data-toggle="popover" data-placement="top" data-trigger="hover" data-content="De reranking score is een combinatie van visuele scores en tweet scores. De tweet scores worden berekend door het vergelijken van de tweets met de afbeeldingen en onderwerpen in de video." title="Reranking Score" data-original-title="Popover on top">?</a>
							</div>
								<div class="noUiSlider" id="slider1" style="float:left; margin-top:10px;"></div>
								<input id="tweet_value" type="text" style="margin-left:5px;" class="input-mini" disabled="true">

							<div style="clear:right;">Selecteer minimale Visuele Score
								<a href="#" id="popo2" data-toggle="popover" data-placement="top" data-trigger="hover" data-content="The visuele score wordt berekend door de vergelijking van de keyframes met de tags. De hoogte van de score wordt bepaald het aantal overeenkomsten." title="Visual Score" data-original-title="Popover on top">?</a>
							</div>
								<div class="noUiSlider" id="slider2" style="float:left; margin-top:10px;"></div>
								<input id="visual_value" type="text" style="margin-left:5px;" class="input-mini" disabled="true">
						</div>

					
					<!-- end video area -->
					</div>

					<div class="span3">
						<!-- begin tagcloud -->
						<div class="tag-cloud">
								<div class="well well-header">Populaire onderwerpen</div>
								<div id="tag-toggle">
									<div id="tag-toggle-achtergrond">
							             <span class="links">Tweets</span>
							             <span class="rechts">Visual</span>
						            </div>
								    <span id="tag-toggle-button">Tweets</span>
								</div>


								<input type="search" id="tagSearch" placeholder="Search Twitter Tags">
								<div id="tagTitles" class="well well-header" style="margin-bottom:0px;height:100%">
									<div id="termTitle" style="float:left; margin-left:auto; margin-right:auto; width:50%; line-height:140%">Term</div>
									<div id="ratingTitle" style="float:left; margin-left:auto; margin-right:auto;width:50%; line-height:140%">Rating</div>
									<div id="titleFiller" style="width:10px"></div>
								</div>
								<div id="loading-img" style="display:none;"><img src="img/ajax-loader.gif"/></div>

								<div id="tag-cloud-inner">
								</div>

						<!-- end tagcloud -->
						</div>
					</div>
			
			
				</div>
				<!-- end demo video container -->

				<?php
						function curPageURL() {
							 $pageURL = '';
							 
							 //DELETED BECAUSE OF LOCALHOST
							 /*if ($_SERVER["HTTPS"] == "on") {$pageURL .= "s";}
							 $pageURL .= "://";
							 */ 

							 if ($_SERVER["SERVER_PORT"] != "80") {
							  $pageURL .= $_SERVER["SERVER_NAME"].":".$_SERVER["SERVER_PORT"].$_SERVER["REQUEST_URI"];
							 } else {
							  $pageURL .= $_SERVER["SERVER_NAME"].$_SERVER["REQUEST_URI"];
							 }
							 return $pageURL;
						}
					?>

					<!-- middle part with comments -->
					<div class="middle-part-wrapper">
						<div class="row">
							<div class="span9">
								<div class="comments">
										<div class="well well-header">Reacties</div>
										<div>


											<form class="form-inline" id="comments-input" method="post"> 
												<input name="comment" type="text" class="input medium" id="inputcomment" placeholder="Geef je reactie">
												<button type="submit" class="btn" id="commentbutton">Reageer!</button>
											</form>
										
											<div id="comments-real">


											</div>
										</div>

										
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
						Gemaakt door het SocialZap Team van TU Delft, Nederland. Copyright 2013
					</div>
				</div>
			</footer>
		


		<!-- end page wrapper -->
		</div>




	
	
	<script src ="javascript/helperfunctions.js"></script>
	<script src ="javascript/tagCloudColor.js"></script>
	<script src ="javascript/social.js"></script>
	<script src ="javascript/checktime.js"></script>


	<script src ="javascript/geturlvars.js"></script>	
	<script src ="javascript/filtertaglist.js"></script>
	<script src ="javascript/togglebutton.js"></script>
	<script src ="javascript/rating.js"></script>
	<script src="javascript/loginform.js"></script>
	<script src ="javascript/comments.js"></script>

	<script src ="javascript/tagdata.js"></script>
	<script src ="javascript/createcloud.js"></script>
	<script src ="javascript/createzapcode.js"></script>
	<script src ="javascript/filterdata.js"></script>
	<script src ="javascript/getzapdata.js"></script>

	<script src ="javascript/video.js"></script>
	<script src ="javascript/main.js"></script>



	
	</body>
	</html>
