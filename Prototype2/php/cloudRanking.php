 <?php
    //connection information  
    include("config.php");
         
    //query the database  
    $query = "SELECT reranking_score,term FROM dwdd14052012 ORDER BY reranking_score DESC"; 

    // get data from table
    $result = mysql_query($query);

    // check wether nothing exist
    if (!$result) {
      echo "Could not successfully run query ($sql) from DB: " . mysql_error();
      exit;
    }

    if (mysql_num_rows($result) == 0) {
      echo "No rows found, nothing to print so am exiting";
      exit;
    }

    $data = array();
    $i = 0;

    while ($row = mysql_fetch_assoc($result)) {
        
        //$terms[$i] = $row["term"];
        //$scores[$i] = $row["reranking_score"];

        $data[$i] = $row["term"];
        if($i > 20)
          break;
        else
          $i++;
    }

    mysql_free_result($result); 

    echo json_encode($data);
?>