<?php
	session_start();
 	
    $email = $_REQUEST['email'];
    $password = $_REQUEST['password'];

	$con = mysql_connect("localhost", "root", "root");

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
	} else {
    

    $query =  "SELECT * FROM registered_users WHERE email = '$email' AND password = '$password'";

    $result = mysql_query($query)or die(mysql_error("Failed!"));
		 	
	$row = mysql_fetch_assoc($result);
		   
	$_SESSION['id'] = $row['id'];
	$_SESSION['email']=$row['email'];
	$_SESSION['name']=$row['name'];
	$_SESSION['loginstatus'] = true;
	
	echo json_encode($row);
?>