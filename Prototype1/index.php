<!DOCTYPE HTML>
<html>
	<head>
		<meta charset = "utf-8">
		<title>SocialZap</title>
		<link rel="stylesheet" href="css/bootstrap.css">
		<link href="http://vjs.zencdn.net/c/video-js.css" rel="stylesheet">
		<script src="http://vjs.zencdn.net/c/video.js"></script>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js"></script>
		<!--[if IE]><script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script><![endif]-->
		<script src ="javascript/bootstrap.js"></script>
		
		<style>

		body{
			padding-top: 60px;
		}

		.alert{
			display: none;
		}

		tbody {
    		height: 450px;
    		overflow: auto;
		}
		
		td, th{
			width:150px;
		}

		thead > tr, tbody{
    	display:block;
		}

		#container_inner{
			width:640px;
			margin: 0 auto;
		}

		.twitter_icon{
			width:15px;
			height: 15px;
			margin-bottom:0px;
		}

		.tag{
			float:left;
			margin-top:5px;
			margin-left:5px;
			
			padding:5px;

		}


		
	
		</style>
	</head>
	
	<body>
	
	<header>
		<div class="navbar navbar-fixed-top">
			
	  			<div class="navbar-inner">
	  				<div class="container">
			    		<ul class="nav">
			     			<li class="active"><a href="index.php">Home</a></li>
			    		</ul>

			    	</div>
	  			</div>


		</div>
	</header>

	<?php
	$link = mysql_connect('localhost','root','root');
	if (!$link) {
	    die('Could not connect: ' . mysql_error());
	}
	echo 'Connected successfully';
	?>

	<?php 

	if (!mysql_select_db('programmadata')) {
	echo "The mysql_select_db returned FALSE: " . mysql_error();
	}

	$query = sprintf("SELECT term FROM dwdd14052012
	    LIMIT 1");

	// Perform Query
	$result = mysql_query($query);

	// Check result
	// This shows the actual query sent to MySQL, and the error. Useful for debugging.
	if (!$result) {
	    $message  = 'Invalid query: ' . mysql_error() . "\n";
	    $message .= 'Whole query: ' . $query;
	    die($message);
	}
	while ($row = mysql_fetch_assoc($result)) {
    echo $row['term'];
	}
	?>

	<div class="container">
		
		<div class="row">

				<div class="span2">
			<div class="accordion" id="accordion_leftmenu">
  				
  				<div class="form-horizontal" id="addNewUser" action="users.php" method="post">
					<a class="accordion-toggle" data-toggle="collapse" data-target="#add_inner" data-parent="#accordion_leftmenu">
					<legend>Tag Cl</legend>
					</a></div>
					<div id="add_inner" class="accordion-body collapse in">
							<span class="label label-success tag" data-time="105"><img src="twitter_icon.png" rel="popover" class="twitter_icon"><?php echo "Random"?></span>
							<span class="label label-success tag" data-time="105"><img src="twitter_icon.png" rel="popover" class="twitter_icon">
								<?php
								$result = "bluh";
								echo $result;
								?></span>
							
					</div>
				
				</div>
			</div>
			<?php mysql_close($link); ?>
		<div class="span5">	
			<video id="videoplayer"  controls="controls" width="640" height="360" onplay="updateTimetemp()">
			<source type="video/mp4" src="powned.mp4">
			</video>

			<div class="progress progress-striped active">
  			<div class="bar" style="width: 40%;"></div>
			</div>
		</div>

				

		


		
		</div>
	</div>





	<footer>
		<a href="tagCloudTest.html"> Klik </a>
	</footer>


	<div class="container">  
<h2>Example of creating Modal with Twitter Bootstrap</h2>  
<div class="well">  
<a href="#" id="example" class="btn btn-danger" rel="popover" data-content="It's so simple to create a tooltop for my website!" data-original-title="Twitter Bootstrap Popover">hover for popover</a>  
</div>  
</div>  
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>  
<script src="/twitter-bootstrap/twitter-bootstrap-v2/js/bootstrap-tooltip.js"></script>  
<script src="/twitter-bootstrap/twitter-bootstrap-v2/js/bootstrap-popover.js"></script>  
<script>  
$(function ()  
{ $("#example").hover(function(){
	popover();
})
});  
</script>  






	
	<script src ="javascript/main.js"></script>
	</body>
	</html>