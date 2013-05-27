<?php
//Make connection
include("config.php");

	$data = file_get_contents("http://socialzapapi.demo.auxilium.nl/analyzer/" .  $_GET["id"] . "/scores?format=json");

echo $data
?>

