<?php

//Make connection
include("config.php");



//Function that runs query
function runQuery($duration){
	$dur = transDur($duration);

	//Query
	$qry = "SELECT term, time 
	FROM dwdd14052012
	WHERE time < '$dur'
	ORDER BY reranking_score DESC
	LIMIT 20";
	
	// Get data from table
	$result = mysql_query($qry);

	if(!$result){
		$result = "Failed!";
		exit();
	}

	$rows = array();

	while($row = mysql_fetch_assoc($result)){
		$rows[] = $row;
	}

	return json_encode($rows);
}

function transDur($d){
	return floor($d/60) . ":" . $d % 60;
}

//Calls function
echo runQuery($_REQUEST['duration']);

?>