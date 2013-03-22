<?php

//Make connection
include("config.php");



//Function that runs query
function runQuery($duration){

	//Query
	$qry = "SELECT term, time 
	FROM dwdd14052012
	LIMIT 2";
	
	// Get data from table
	$result = mysql_query($qry);

	if(!$result){
		$result = "Failed!";
		exit();
	}
	return $result;
}

//Calls function
echo runQuery($_REQUEST['duration']);

?>