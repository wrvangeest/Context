<?php
//Make connection
include("config.php");
include("rating.php");

	$dur = $_GET["dur"];
	$data = file_get_contents("http://socialzapapi.demo.auxilium.nl/analyzer/" .  $_GET["id"] . "/scores?format=json");
	$visualData = file_get_contents("http://socialzapapi.demo.auxilium.nl/videos/" . $_GET["id"] . "/zap_points");

	class Filtered {
		public $visual = array();
		public $tweet = array();
	}

	class Tweet {
		public $term = "";
		public $time_jump_in_point = "";
		public $reranking_score = "";
		public $rating = "";
	}

	class Visual {
		public $term = "";
		public $time_jump_in_point = "";
		public $reranking_score = "";
		public $visual_score = "";
		public $rating = "";
	}

	$decoded = json_decode($data,true);
	$decoded = $decoded["scores"];

	$visualDecoded = json_decode($visualData,true);
	$visualDecoded = $visualDecoded["zap_points"];

	$filtered = new Filtered;

	for($i = 0; $i < count($decoded); $i++){
		if(timeToSec($decoded[$i]["time_jump_in_point"]) <= $dur){
			$rating = getRatings($decoded[$i]["term"]);
			$rating = json_decode($rating,true);
			$rating = intval($rating[0]['rating']);
			if($rating == null){
				$rating = 3;
			}
			if($decoded[$i]["tweet_score"] > 0){
				$tw = new Tweet;
				$tw->{'term'} = $decoded[$i]["term"];
				$tw->{'time_jump_in_point'} = $decoded[$i]["time_jump_in_point"];
				$tw->{'reranking_score'} = $decoded[$i]["reranking_score"];
				$tw->{'rating'} = $rating;
				array_push($filtered->{'tweet'}, $tw);
			}
			/*if($decoded[$i]["in_lscom"] == 1){
				$vi = new Visual;
				$vi->{'term'}  = $decoded[$i]["term"];
				$vi->{'time_jump_in_point'} = $decoded[$i]["time_jump_in_point"];
				$vi->{'reranking_score'} = $decoded[$i]["reranking_score"];
				$vi->{'visual_score'} = $decoded[$i]["visual_score"];
				$vi->{'rating'} = $rating;
				array_push($filtered->{'visual'}, $vi);
			}*/
		}
	}

	for($i = 0; $i < count($visualDecoded); $i++){
		if(timeToSec($visualDecoded[$i]["start"]) <= $dur){
			$rating = json_decode(getRatings($decoded[$i]["term"]),true);
			$rating = intval($rating[0]['rating']);
			if($rating == null){
				$rating = 3;
			}
			$vi = new Visual;
			$vi->{'term'} = $visualDecoded[$i]["term"];
			$vi->{'time_jump_in_point'} = $visualDecoded[$i]["start"];
			$vi->{'reranking_score'} = $visualDecoded[$i]["confidence_score"];
			$vi->{'visual_score'} = $visualDecoded[$i]["confidence_score"];
			$vi->{'rating'} = $rating;
			array_push($filtered->{'visual'}, $vi);
		}
	}

	echo json_encode($filtered);

	function timeToSec($minutes){
		$time = explode(":", $minutes);
		return (intval($time[0] * 60) + intval($time));
	}
?>

