<?php 
	require_once "inventory_app/controller/database/UsersController.php";
	require_once "inventory_app/controller/database/GroupsController.php";

	function includePage($page, $requiresLogin)
	{
		if(!$requiresLogin || Session::IsUserLoggedIn())
			require_once $page;
		else
			require_once "inventory_app/view/php/login.php";
	}

	if(isset($_POST["service"]))
	{
		$service = $_POST["service"];
		$method  = $_POST["method"]; 

		switch($service) //Generates the app content (html/js/etc) 
		{
			case "User":  UsersController::Service($method);  break;
			case "Group": GroupsController::Service($method); break;
			default:      echo "Unknown service '$service'";  break;
		}
	}
	else
	{
		$page = isset($_GET["page"]) ? $_GET["page"] : "Home";

		switch($page) //Generates the app content (html/js/etc) 
		{
	  		case "Home": includePage("inventory_app/view/php/MainPage.php", true); break;
	    	default: 	 echo "Unknown page '" + $page + "'"; 		 break;
		}
	}
?>