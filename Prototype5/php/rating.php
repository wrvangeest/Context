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

	function runQuery($term){
		//Query
		$qry = "SELECT AVG(rating) AS rating
		FROM ratings
		WHERE tag_name = '$term'";

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
		return json_encode($rows);
	}

	//Calls function
	if(isset($_REQUEST['term'])){
		echo runQuery($_REQUEST['term']);
	}
?>