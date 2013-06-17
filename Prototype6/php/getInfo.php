<?php
	include("config.php");

	function getInfo($vidid){
		$qry = "SELECT duration, ug_id
				FROM videos
				WHERE aux_id = '$vidid'";
		$result = mysql_query($qry);
		$result = mysql_fetch_assoc($result);
		return $result;
	}

	//Calls function
	if(isset($_REQUEST['vidid'])){
		echo json_encode(getInfo($_REQUEST['vidid']));
	}
?>