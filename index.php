<?php 

	$page = isset($_GET["page"]) ? $_GET["page"] : "Home";

	switch($page) //Generates the app content (html/js/etc) 
	{
  		case "Home": 	  require_once "app_template/view/php/MainPage.php"; 				 break;
    	case "TestCases": require_once "app_template/view/php/test_cases/MainTestCases.php"; break;
	}
?>