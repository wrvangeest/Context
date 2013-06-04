<?php 
session_start();
include("config.php");

if(!$con)
{
	echo mysql_error();
}
else
{
	mysql_select_db("users", $con);	
}

function postRatings($term, $score){
	//Error codes:
	//	1: Error
	//	2: Success
	//	3: Not logged in
	$return = 1;
	if(!isset($_SESSION['loginstatus'])){
		$return = 3;
	}
	else{
		$id = $_SESSION['id'];
		$deleteQry = "DELETE  
				FROM ratings
				WHERE user_id ='$id'
			    AND tag_name = '$term'";
		$qry = "INSERT INTO ratings (tag_name,user_id,rating)
			    VALUES ('$term','$id','$score')";
		$delSuccess = mysql_query($deleteQry);
		$success = mysql_query($qry);
		if($success){
			$return = 2;
		}
		
	}
	return $return;
}

//Calls function
	if(isset($_REQUEST['term'],$_REQUEST['score'])){
		echo postRatings($_REQUEST['term'],$_REQUEST['score']);
	}
?>