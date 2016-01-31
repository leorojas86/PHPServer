<?php 
	require_once "inventory/service/model/Environment.php";
	require_once "inventory/service/controller/database/UsersController.php";
	require_once "inventory/service/controller/database/GroupsController.php";
	require_once "inventory/service/controller/files/FilesController.php";

	$result = Environment::Init();

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
		$result = new ServiceResult(false, null, "Unspecified service parameter", UtilsConstants::UNKNOWN_SERVICE_ERROR_CODE);
?>