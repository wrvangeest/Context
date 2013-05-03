<!DOCTYPE HTML>
<html>
	<head>
		<meta charset = "utf-8">
		<title>SocialZap</title>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js"></script>
		<!--[if IE]><script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script><![endif]-->
		<script src ="javascript/bootstrap.js"></script>
		<!--  css files -->
		<LINK rel="stylesheet" href="css/style.css" type="text/css" MEDIA=screen>
		<link rel="stylesheet" href="css/bootstrap.css" type="text/css">
		<link rel="stylesheet" href="css/font-awesome.css" type="text/css">
		
	</head>
	
	<body>
		<!--page wrapper -->
		<div class="main-content-wrapper">
			<!-- header -->
			<header>
				<div class="navbar navbar-static-top">
  					<div class="navbar-inner">
  						<div class="container">
    						<a class="brand" href="#">SocialZap</a>
						    <ul class="navigation">
			     			<a href="index.php" style="color:white; text-decoration:none;"><li class="icon-home icon-2x"></li></a>
			     			<li class="icon-th icon-2x"></li>
			     			<li class="icon-search icon-2x"></li>
			   				<li class="icon-user icon-2x"></li>
			    		</ul>
  						</div>
					</div>
				</div>
			<!-- end header -->
			</header>


			<div class="container">
				<div class="row">
					<div class="span4">
						<button class="btn" style="width:100%; cursor:default;">Browse all videos</button>
					</div>
				</div>


				<div class="row">
					<div class="span4" style="padding-top:15px;">
						<img src="http://placehold.it/350x150"/>
						<span>dwdd-14052012</span>
					</div>		

					<div class="span4" style="padding-top:15px;">
						<img src="http://placehold.it/350x150"/>
						<span>dwdd-15052012</span>
					</div>	
					<div class="span4" style="padding-top:15px;">
						<img src="http://placehold.it/350x150"/>
						<span>dwdd-18052012</span>
					</div>

						<div class="span4" style="padding-top:15px;">
						<img src="http://placehold.it/350x150"/>
						<span>pow-14052012</span>
					</div>		
					<div class="span4" style="padding-top:15px;">
						<img src="http://placehold.it/350x150"/>
						<span>pow-15052012</span>
					</div>	
					<div class="span4" style="padding-top:15px;">
						<img src="http://placehold.it/350x150"/>
						<span>pow-16052012</span>
					</div>
					<div class="span4" style="padding-top:15px;">
						<img src="http://placehold.it/350x150"/>
						<span>pow-18052012</span>
					</div>
				</div>
			
			</div>
		<!-- end page wrapper -->
		</div>

		<script>
		$(document).ready(function(){
			$.ajax('http://www.youtube.com', function(data){
				alert(data);
			});
		});
		</script>

	</body>
	</html>
