<?php

require_once '../zappoints.php' ;
require_once 'simpletest/autorun.php';
include("../config.php");


class testZapPoints extends UnitTestCase{


		function testTransDur(){
			$result = transDur(100);
			$expected = '1:40';
			$this->assertTrue($result == $expected);
			
			$result = transDur(100);
			$expected = '1:30';
			$this->assertFalse($result == $expected);

			$result = transDur(-10);
			$expected = '0:0';
			$this->assertTrue($result == $expected);			
		}
		
		
		function testRunQuery(){

			$result = runQuery(10);
			$expected = '[{"term":"bite","time":"0:0"},{"term":"course","time":"0:0"},{"term":"wine","time":"0:0"},{"term":"glass","time":"0:0"},{"term":"eat","time":"0:0"}]';
			$this->assertTrue($result == $expected);	

			$result = runQuery(0);
			$expected = '[]';
			$this->assertTrue($result == $expected);	
			

			$result = runQuery(-10);
			$expected = '[]';
			$this->assertTrue($result == $expected);	
		}
 
}

?>