<?php
	include("config.php");

	function getDur($vidid){
		$qry = "SELECT duration 
				FROM videos
				WHERE aux_id = '$vidid'";
		$result = mysql_query($qry);
		$result = mysql_fetch_assoc($result);
		return $result;
	}

	//Calls function
	if(isset($_REQUEST['vidid'])){
		echo json_encode(getDur($_REQUEST['vidid']));
	}
?>