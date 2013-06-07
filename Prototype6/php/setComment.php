<?php
session_start(); 

include("config.php");


$comment = $_REQUEST['comment'];
$vidid = $_REQUEST['vidid'];


if(!$con)
{
	echo mysql_error();
}
else
{
	mysql_select_db("users", $con);	
}



	if(!isset($_SESSION['loginstatus'])){
		echo "not logged in";
	}
	else{

		$user_id = $_SESSION['id'];
		$vidid = $_REQUEST['vidid'];
		
		//Query
		$qry = "INSERT INTO `comments`(`user_id`, `vid_id`, `text`) VALUES ('$user_id','$vidid','$comment')";


		if(!mysql_query($qry))
		{
			echo "something went wrong...";
		}
		else
		{
			echo "succesfully commented!";
		}




	}


?>