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

		$name = $_SESSION['name'];
		$vidid = $_REQUEST['vidid'];
		var_dump($comment);
		
		//Query
		$qry = "INSERT INTO `comments`(`name`, `vid_id`, `text`) VALUES ('$name','$vidid','$comment')";


		if(!mysql_query($qry))
		{
			echo "something went wrong.. ";
		}
		else
		{
			echo "success!";
		}




	}


?>