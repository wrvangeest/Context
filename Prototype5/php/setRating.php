<?php 
$con = mysql_connect("localhost", "root", "root");

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
	$id = $_SESSION['id'];

	$qry = "DELETE * 
			FROM ratings
			WHERE user_id ='$id'
		    AND tag_name = '$term';
		    INSERT INTO ratings (tag_name,user_id,rating)
		    VALUES ($term,$id,$score)";

	$result = mysql_query($qry);

	$success = mysql_query($qry);

	return $result;
}

//Calls function
	if(isset($_REQUEST['term'],$_REQUEST['user_id'],$_REQUEST['score'])){
		echo postRatings($_REQUEST['term'],$_REQUEST['user_id'],$_REQUEST['score']);
	}
?>