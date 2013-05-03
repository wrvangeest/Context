<?php

//file to be tested
require_once '../zappoints.php' ;
//import testsuite
require_once 'simpletest/autorun.php';
//Database connection
include("../config.php");


class testZapPoints extends UnitTestCase{

		//test Function testTransDurSec of zappoints.php
		function testTransDurSec(){
			$result = transDurSec(100);
			$expected = 40;
			$this->assertTrue($result == $expected);
			
			$result = transDurSec(100);
			$expected = 0;
			$this->assertFalse($result == $expected);

			$result = transDurSec(60);
			$expected = 0;
			$this->assertTrue($result == $expected);

			$result = transDurSec(-20);
			$expected = -20;
			$this->assertTrue($result == $expected);

			$result = transDurSec(-100);
			$expected = -40;
			$this->assertTrue($result == $expected);			
		}

		//test Function testTransDurMin of zappoints.php
		function testTransDurMin(){
			$result = transDurMin(60);
			$expected = 1;
			$this->assertTrue($result == $expected);
			
			$result = transDurMin(100);
			$expected = 0;
			$this->assertFalse($result == $expected);

			$result = transDurMin(-20);
			$expected = -1;
			$this->assertTrue($result == $expected);

			$result = transDurMin(-100);
			$expected = -2;
			$this->assertTrue($result == $expected);			
		}
		
		//test Function runQuery of zappoints.php
		function testRunQuery(){

			$result = runQuery(10);
			//echo ($result);
			$expected = '[{"term":"bite","time":"0:0"},{"term":"kevin","time":"0:3"},{"term":"course","time":"0:0"},{"term":"wine","time":"0:0"},{"term":"glass","time":"0:0"},{"term":"eat","time":"0:0"},{"term":"seeking","time":"0:3"}]';
			//$expected = '[{"term":"bite","time":"0:0"},{"term":"course","time":"0:0"},{"term":"wine","time":"0:0"},{"term":"glass","time":"0:0"},{"term":"eat","time":"0:0"}]';
			$this->assertTrue($result == $expected);	

			$result = runQuery(0);
			$expected = '[{"term":"bite","time":"0:0"},{"term":"course","time":"0:0"},{"term":"wine","time":"0:0"},{"term":"glass","time":"0:0"},{"term":"eat","time":"0:0"}]';
			$this->assertTrue($result == $expected);	


		}
 
}

?>