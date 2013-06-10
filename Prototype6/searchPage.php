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
		<link rel="stylesheet" href="css/ratingbar.css" type="text/css">
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
	  							
	  						<div id="nav-bar-form" style="margin-top:0px; float:right;">
	  							
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
									  <input name="name" type="text" class="input-small" id="reg-name" placeholder="Name">


									  <label class="radio" id="loginlabel">
										  <input type="radio" name="optionsRadios" id="loginradio" value="option1" checked>
										  <span style="color:white;">Login</span>
										</label>
										<label class="radio" id="registerlabel">
										  <input type="radio" name="optionsRadios" id="registerradio" value="option2">
										   <span style="color:white;">Register</span>
										</label>

									  <button type="submit" class="btn" id="ok">Sign in</button>
									  <button type="submit" class="btn" id="ok-reg">Register</button>
									</form>
								<?php } ?>
							</div>
						</div>
					</div>

			<!-- end header -->
			</header>


			<div class="container" style="margin-top:15px;">
				<div id="video_top_filler"> </div>
				<div class="row" id="topsearchheader">
						<div class="well well-header" style="width:900px; margin-left:50px">Results for "<?php echo $_REQUEST['query'] ?>"</div>
				</div>
						
				<div id="video_bot_filler">
				</div>

				<!-- footer -->
				<footer>
					<div class="footer">
						<div class="container">
							Made by a Team at TU Delft, The Netherlands. Copyright 2013-2014
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
		});

		</script>
	</body>
	<script src="javascript/geturlvars.js" type="text/javascript"></script>
	<script src = "javascript/initializeSearch.js" type="text/javascript"></script>
	<script src="javascript/loginform.js" type="text/javascript"></script>
	<script src="javascript/search.js" type="text/javascript"></script>
	<script src="javascript/tagCloudColor.js" type="text/javascript"></script>
	<script src="javascript/checktime.js" type="text/javascript"></script>
	</html>
