<?php
	include("config.php");
	session_start();
 	
    $email = $_REQUEST['email'];
    $password = $_REQUEST['password'];

	if(!$con)
	{
		echo mysql_error();
	}
	else
	{
		mysql_select_db("users", $con);	
	}

	
	if (is_null($_REQUEST['email']) || is_null($_REQUEST['password'])) {
	    redirect_url("../index.php");
	    $return = 1;
	} 
	else {
    
	    $query =  "SELECT * FROM registered_users WHERE email = '$email' AND password = '$password'";

	    $result = mysql_query($query)or die(mysql_error());
		$row = mysql_fetch_assoc($result);
		if($row['id']== ''){
			$return = 2;
		}
		else{
			$_SESSION['id'] = $row['id'];
			$_SESSION['email']=$row['email'];
			$_SESSION['name']=$row['name'];
			$_SESSION['loginstatus'] = true;
			$return = 3;
		}
	}
	echo $return;
?>