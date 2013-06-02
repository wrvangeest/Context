<?php
 session_start();
 $goback = $_SESSION['curpage'];
 unset($_SESSION['loginstatus']);
 header('Location: ../'.$goback);
?>