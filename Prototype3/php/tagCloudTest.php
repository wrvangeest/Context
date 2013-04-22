<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">  
<html>  
  <head>  
    <link rel="stylesheet" type="text/css" href="jqcloud.css" />
    <link rel="stylesheet" href="css/bootstrap.css">

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js"></script>
    <script type="text/javascript" src="jqcloud-1.0.3.js"></script>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">  
    <title>Tag Cloud Test</title>  
  </head>  

  <body>  
  
    <div id="tagCloud" style="width: 700px; height: 350px;"></div>

   

    <div id="infoBox">This is the content of invisible div.</div>
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

    ?>

        <script type="text/javascript">
          //make new array to store the database result in javascript
          var result = new Array();
        </script>

    <?php
    $data = array();

    $i = 0;
    while ($row = mysql_fetch_assoc($result)) {
      

        $tempTerm = $row["term"];
        $tempScore = $row["reranking_score"];
      ?>

      <script type="text/javascript">
        //Store the result in javascript for the cloud in the form : {text: "text here ", weight "weight here"}
        window.result["<?= $i ?>"] = {text: "<?php echo $tempTerm; ?>",weight: <?php echo $tempScore; ?>}; 
      </script>

      <?php
      //echo "<div style = 'color:#0000FF; font-size:" . $row["reranking_score"] * 70 * $row["reranking_score"] . "px'>" . $row["term"] . "</div>";
      if($i > 20)
        break;
      else
     $i++;
    }


    mysql_free_result($result); 
    ?>
    <script type="text/javascript">

        //Call the function jQCloud(made bu lucaong https://github.com/lucaong/jQCloud)
        $(document).ready(
          function() {
            $("#tagCloud").jQCloud(window.result);
          }
         );

        $(document).ready(
          function() {
    
            $("#infoBox").hide();
            var children = document.getElementById('#tagCloud').childNodes;
            
            for each (var in children){
              $(var).hover(
                function () {
                  $('#infoBox').stop().fadeTo("slow", 0.33);
                },
                function () {
                  $('#infoBox').stop().fadeOut("slow");
                }
              );
            }
          }
        );
        
    </script>

    </script>  
  </body>  
</html>  