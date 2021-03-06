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
		<script src ="http://popcornjs.org/code/dist/popcorn.min.js"></script>
		<!--  css files -->
		<link rel="stylesheet" href="lib/css/bootstrap.css" type="text/css">
		<link rel="stylesheet" href="lib/css/font-awesome.css" type="text/css">
		<LINK rel="stylesheet" href="css/style.css" type="text/css" MEDIA=screen>
		
	</head>
	
	<body>
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


	  					<div class="navbar-inner" id="mainNavBar">
	  						<div class="container">
	    						<a class="brand" href="index.php"></li>SocialZap</a>
							<!--    <ul class="navigation">
				     			<li class="icon-th icon-2x" id="browsebutton"></li>
				     			<li class="icon-search icon-2x" id="searchbutton"></li>
				     			</ul> -->
				     		<div class="btn-group" id="navButtons">
				     			<button class="btn navButton" id="browsebutton"><div class="icon-th navButton"></button>
				     			<button class="btn navButton" id="searchbutton"><div class="icon-search navButton"></button>
	  						</div>
	  							
	  						<div id="nav-bar-form">
	  							
	  							<?php if( isset($_SESSION['loginstatus'])) {?>
	  							<!-- If there is a existing session greet the user -->
		  							<div id="logged-in">
		  								<span>Hello, <?php echo $_SESSION['name']; ?></span>
		  								<a href='php/logout.php' id='logout'>Logout</a>
		  							</div>
	  							
	  							<?php }else {?>
	  							<!-- Else make it login form -->
			  						<form class="form-inline" id="inlog-form" method="post">
									  <input name="email" type="text" class="input-small" id="login-email" placeholder="Email">
									  <input name="password" type="password" class="input-small" id="login-passwd" placeholder="Password">
									  <button type="submit" class="btn" id="ok">Sign in</button>
									</form>
								<?php } ?>
							</div>
						</div>
					</div>

			<!-- end header -->
			</header>


			<div class="container" style="margin-top:15px;">
				<div id="video_top_filler"> </div>
				<div class="row">
						<div class="well well-header" style="width:900px; margin-left:50px">Browse all videos</div>
				</div>


				<div class="row">
					<div class="span4" style="padding-top:15px;">
						<div style="height:160px; overflow:hidden;" class="vidThumb">
						<img data-videoid="3" data-videoname="dwdd14052012" src="img/videothumb/dwdd14052012.png" />
						</div>
						<span>dwdd-14052012</span>
					</div>		
					<div class="span4" style="padding-top:15px; height:150px;">
						<div style="height:160px; overflow:hidden;" class="vidThumb">
						<img data-videoid="4" data-videoname="dwdd15052012" src="img/videothumb/dwdd15052012.png" />	
						</div>
						<span>dwdd-15052012</span>
					</div>	
					<div class="span4" style="padding-top:15px;">
						<div style="height:160px; overflow:hidden;" class="vidThumb">
						<img data-videoid="5" data-videoname="dwdd18052012" src="img/videothumb/dwdd18052012.png"/>
						</div>
						<span>dwdd-18052012</span>
					</div>
				</div>
				<div class="row">

						<div class="span4" style="padding-top:15px;">
						<div style="height:160px; overflow:hidden;" class="vidThumb">	
						<img data-videoid="7" data-videoname="pow14052012" src="img/videothumb/pow14052012.png"/>
						</div>
						<span>pow-14052012</span>
					</div>		
					<div class="span4" style="padding-top:15px;">
						<div style="height:160px; overflow:hidden;" class="vidThumb">
						<img data-videoid="8" data-videoname="pow15052012" src="img/videothumb/pow15052012.png"/>
						</div>
						<span>pow-15052012</span>
					</div>	
					<div class="span4" style="padding-top:15px;">
						<div style="height:160px; overflow:hidden;" class="vidThumb">
						<img data-videoid="9" data-videoname="pow16052012" src="img/videothumb/pow16052012.png"/>
						</div>
						<span>pow-16052012</span>
					</div>
				</div>

				<div class="row">
					<div class="span4" style="padding-top:15px;">
						<div style="height:160px; overflow:hidden;" class="vidThumb">
						<img data-videoid="10" data-videoname="pow18052012" src="img/videothumb/pow18052012.png"/>
						</div>
						<span>pow-18052012</span>
					</div>

				</div>
					<div id="video_bot_filler">
					</div>

				<!-- footer -->
				<footer>
					<div class="footer">
						<div class="container">
							Made by a Team at TU Delft, The Netherlands. Copyright 2013
						</div>
					</div>
				</footer>
			
				
			</div>
		<!-- end page wrapper -->
		</div>
		<script>
		$(document).ready(function(){


				//fix search button
			$("#searchbutton").click(function(){
				var xyz = $("#search-animate-bar").css("margin-top");
				if(parseInt(xyz) < 0){
				$("#search-animate-bar").animate({ marginTop: '0px'}, 1000);
				}else{
					$("#search-animate-bar").animate({ marginTop: '-50px'}, 1000);
				}

			});

			//fix browsebutton
			$("#browsebutton").click(function(){
				location.href = "index.php";
			});

			//fix homebutton
			$("#homebutton").click(function(){
				location.href = "index.php";
			});

			$('img').click(function(){
				var videoid = $(this).attr("data-videoid");
				var videoname = $(this).attr("data-videoname");
				location.href = "video.php?vidid=" + videoid + "&vidn=" + videoname;
			});

		});

		</script>
	</body>
	<script src="javascript/loginform.js" type="text/javascript"></script>
	</html>
