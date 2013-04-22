<?php

require_once '../zappoints.php' ;
require_once 'simpletest/autorun.php';


class testZapPoints extends UnitTestCase{


		function testTransDur(){
			$result = transDur(100);
			$expected = '1:40';
			$this->assertTrue($result == $expected);
		}
		
		function testRunQuery(){
			$result = runQuery(0);
			$expected = '[]';
			$this->assertTrue($result==$expected);	
		}

}

?>