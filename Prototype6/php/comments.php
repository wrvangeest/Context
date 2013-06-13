<?php
	include("config.php");

	$vidid = $_REQUEST['vidid'];
	
	//Query
	$qry = "SELECT comments.text,registered_users.name,comments.datum, registered_users.image, comments.vid_time
			FROM comments, registered_users 
			WHERE vid_id = '$vidid'
			AND comments.user_id = registered_users.id";

	//Get data from table
	$result = mysql_query($qry);
	//If error
	if(!$result){
		$result = "Failed!";
		exit();
	}

	$rows = array();

	//Convert result to array
	while($row = mysql_fetch_assoc($result)){
		$rows[] = $row;
	}

	//Return a JSON string
	echo json_encode($rows);
?>