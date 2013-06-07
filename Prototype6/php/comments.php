<?php
	include("config.php");

	$vidid = $_REQUEST['vidid'];
	
	//Query
	$qry = "SELECT * 
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