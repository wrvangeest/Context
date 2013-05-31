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


	if (is_null($_POST['email']) || is_null($_POST['password'])) {
	    utils::redirect_url("../index.php");
	} else {
    
    $email = $_POST['email'];
    $password = $_POST['password'];

    $query = "SELECT service_id 
              FROM 'mock_users'
             ";

?>