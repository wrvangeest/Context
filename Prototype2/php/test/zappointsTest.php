<?php

require_once '../zappoints.php' ;
require_once 'simpletest/autorun.php';


class testZapPoints extends UnitTestCase{


		function testTransDur(){
			$result = transDur(100);
			$expected = '1:40';
			$this->assertTrue($result == $expected);
			
			$result = transDur(100);
			$expected = '1:30';
			$this->assertTrue($result == $expected);			
		}
		
		function testRunQuery(){
			$result = runQuery(20);
			$expected = '[{"term":"look","time":"0:13"}]';
			$this->assertTrue($result == $expected);	
		}
 
}

?>