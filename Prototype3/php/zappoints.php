<?php

//Make connection
include("config.php");



//Function that runs query
function runQuery($duration){
	//Get duration in (min:sec)
	$durSec = transDurSec($duration);
	$durMin = transDurMin($duration);

	//Query
	//First condition selects rows within requested minute and lower than requested seconds (e.g. everything from 2:00 to 2:41, but not above)
	//Second condition selects all rows with lower minutes (e.g. everything lower than 2 minutes)
	//The example covers all rows with lower times than duration 2:41
	$qry = "SELECT term, time
			FROM dwdd14052012
			WHERE (CONVERT(SUBSTRING_INDEX(time,':',1), UNSIGNED INTEGER) = '$durMin' -- Grabs minutes and compares
				   AND CONVERT(SUBSTRING_INDEX(time,':',-1), UNSIGNED INTEGER) <= '$durSec') -- Grabs seconds and compares
			OR CONVERT(SUBSTRING_INDEX(time,':',1), UNSIGNED INTEGER) < '$durMin' -- Grabs minutes and compares
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

//<<<<<<< HEAD
//Grabs remaining seconds without minutes from seconds
function transDurSec($d){
	return $d % 60;
}

//Grabs minutes from seconds
function transDurMin($d){
	return floor($d / 60);
?>