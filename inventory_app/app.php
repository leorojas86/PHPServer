<?php 
	require_once "inventory_app/controller/database/UsersController.php";
	require_once "inventory_app/controller/database/GroupsController.php";

	function includePage($page, $requiresLogin)//Generates the page content (html/js/etc) 
	{
		if(!$requiresLogin || SessionManager::IsUserLoggedIn())
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

		switch($page)
		{
	  		case "Home":     includePage("inventory_app/view/php/inventory.php", true);    	break;
	  		case "Register": includePage("inventory_app/view/php/register.php", false); 	break;
	    	default: 	     echo "Unknown page '" + $page + "'"; 		 			   		break;
		}
	}
?>