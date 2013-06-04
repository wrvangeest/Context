<?php
 	session_start();
 	include("config.php");

    $email = $_REQUEST['email'];
    $password = $_REQUEST['password'];
    $name = $_REQUEST['name'];

	if(!$con)
	{
		echo mysql_error();
	}
	else
	{
		mysql_select_db("users", $con);	
	}

	
	if (is_null($_REQUEST['email']) || is_null($_REQUEST['password']) || is_null($_REQUEST['name'])) {
	    echo "fout";
	} 
	else {
    
		$result = mysql_query("INSERT INTO `registered_users`( `email`, `password`, `name`) VALUES ('$email', '$password','$name')");


		if($result)
		{
			echo "goed";
		}
		else{
			echo "fout";
		}

	}
?>