<?php 
	require_once "inventory_app/model/Environment.php";
	require_once "inventory_app/controller/database/UsersController.php";
	require_once "inventory_app/controller/database/GroupsController.php";
	require_once "inventory_app/controller/files/FilesController.php";

	$result = Environment::Setup();

	if(isset($_POST["service"]))
	{
		if($result->success)
		{
			$service = $_POST["service"];
			$method  = $_POST["method"]; 

			switch($service)
			{
				case "User":  $result = UsersController::Service($method);  break;
				case "Group": $result = GroupsController::Service($method); break;
				case "File":  $result = FilesController::Service($method);  break;
				default:      $result = new ServiceResult(false, null, "Unknown service '$service'", UtilsConstants::UNKNOWN_SERVICE_ERROR_CODE); break;
			}
		}
			
		echo $result->toJSON();
	}
	else
	{
		if($result->success)
		{
			$page = isset($_GET["page"]) ? $_GET["page"] : "Home";

			switch($page)
			{
		  		case "Home":     Environment::DisplayPage("inventory_app/view/php/inventory.php", true); break;
		  		case "Register": Environment::DisplayPage("inventory_app/view/php/register.php", false); break;
		    	default: 	     Environment::DisplayPage("inventory_app/view/php/error.php", false);    break;
			}
		}
		else
			Environment::DisplayPage("inventory_app/view/php/error.php", false);
	}
?>