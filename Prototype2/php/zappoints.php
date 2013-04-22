<?php

//Make connection
include("config.php");



//Function that runs query
function runQuery($duration){
	//Get duration in (min:sec)
	$dur = transDur($duration);

	//Query
	$qry = "SELECT term, time 
	FROM dwdd14052012
	WHERE time < '$dur'
	ORDER BY reranking_score DESC
	LIMIT 20";
	
	// Get data from table
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
	return json_encode($rows);
}

//Converts duration from seconds to (min:sec)
function transDur($d){
	if ($d>0) {
		return floor($d/60) . ":" . $d % 60;
	}else{
		return '0:0';
	}
}

//Calls function
if(isset($_REQUEST['duration'])){
	echo runQuery($_REQUEST['duration']);
}	
?>