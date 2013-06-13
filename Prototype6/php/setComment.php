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
		echo "niet ingelogd";
	}
	else{

		$user_id = $_SESSION['id'];
		$vidid = $_REQUEST['vidid'];
		$dur = $_REQUEST['vid_time'];
		//Query
		$qry = "INSERT INTO `comments`(`user_id`, `vid_id`, `text`, `vid_time`) VALUES ('$user_id','$vidid','$comment','$dur')";


		if(!mysql_query($qry))
		{
			echo "er ging iets verkeerd...";
		}
		else
		{
			echo "Opmerking is geplaatst!";
		}




	}


?>