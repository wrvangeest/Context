<?php

	##### this file is used to log in the database ######

	$con = mysql_connect("localhost", "root", "root");

	if(!$con)
	{
		echo mysql_error();
	}
	else
	{
		mysql_select_db("programmadata", $con);	
	}
?>