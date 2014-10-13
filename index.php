<?php 
	require_once "app_template/controller/database/UsersController.php";

	if(isset($_POST["service"]))
	{
		$service = $_POST["service"];
		$method  = $_POST["method"]; 

		switch($service) //Generates the app content (html/js/etc) 
		{
			case "User": UsersController::Service($method); break;
			default:     echo "Unknown service '$service'"; break;
		}
	}
	else
	{
		$page = isset($_GET["page"]) ? $_GET["page"] : "Home";

		switch($page) //Generates the app content (html/js/etc) 
		{
	  		case "Home": 	  require_once "app_template/view/php/MainPage.php"; 				 break;
	    	case "TestCases": require_once "app_template/view/php/test_cases/MainTestCases.php"; break;
		}
	}
?>