<?php

	$output = file_get_contents('http://socialzapapi.demo.auxilium.nl/analyzer/3/scores?format=json');
	echo $output;

?>