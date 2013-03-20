<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">  
<html>  
  <head>  
    <link rel="stylesheet" type="text/css" href="tagcloud.css">  
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">  
    <title>Tag Cloud Test</title>  
  </head>  
  <body>  
    <div id="tagCloud">  
      <h2>Tag Cloud</h2>  
    </div>  


    <?php
    //connection information  
    $host = "localhost";  
    $user = "root";  
    $password = "root";  
    $database = "programmadata";  
        
    //make connection  
    $server = mysql_connect($host, $user, $password);  
    $connection = mysql_select_db($database, $server);  
        
    //query the database  
    $query = "SELECT reranking_score,term FROM dwdd14052012 ORDER BY reranking_score DESC"; 

    $result = mysql_query($query);

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
      echo "<div style = 'color:#0000FF; font-size:" . $row["reranking_score"] * 70 * $row["reranking_score"] . "px'>" . $row["term"] . "</div>";
      if($i > 20)
        break;
      else
        $i++;
    }


    mysql_free_result($result); 
    ?>


    </script>  
  </body>  
</html>  