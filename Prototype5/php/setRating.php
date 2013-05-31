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

function postRatings($term, $user_id, $score){
	$result = mysql_query(" SELECT COUNT( user_id ) 
							FROM (
								SELECT user_id
								FROM ratings
								WHERE tag_name = '$term'
								AND user_id = $user_id
							) AS ids");
	if(/*intval($result) > 0*/ 1==2){
		$qry = "UPDATE ratings
				SET rating='$score'
				WHERE tag_name='$term' 
				AND user_id='$user_id'";
	}
	else{
		$qry = "INSERT INTO ratings(tag_name,user_id,rating)
				VALUES('$term','$user_id','$score')";
	}
	$success = mysql_query($qry);

	return $result;
}

//Calls function
	if(isset($_REQUEST['term'],$_REQUEST['user_id'],$_REQUEST['score'])){
		echo postRatings($_REQUEST['term'],$_REQUEST['user_id'],$_REQUEST['score']);
	}
?>