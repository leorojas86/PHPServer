<?php 

	require_once "inventory/service/model/Environment.php";
	require_once "inventory/service/controller/database/UsersController.php";
	require_once "inventory/service/controller/database/GroupsController.php";
	require_once "inventory/service/controller/files/FilesController.php";

	/*try 
	{
		throw new Exception('Division by zero.');*/
		
		
		$result = Environment::Init(isset($_POST["sessionId"]) ? $_POST["sessionId"] : null);

		if($result->success)
		{
			if(isset($_POST["service"]) && isset($_POST["method"]))
			{
				$service = $_POST["service"];
				$method  = $_POST["method"];

				switch($service)
				{
					case "User":  $result = UsersController::Service($method);  break;
					case "Group": $result = GroupsController::Service($method); break;
					case "File":  $result = FilesController::Service($method);  break;
					default:      $result = new ServiceResult(false, "Unknown service '$service'", UtilsConstants::UNKNOWN_SERVICE_ERROR_CODE); break;
				}
			}
			else
				$result = new ServiceResult(false, "Unspecified service parameter", UtilsConstants::UNKNOWN_SERVICE_ERROR_CODE);
		}
	/*}
	catch(Exception $e) 
	{
		$result = new ServiceResult(false, "Unexpected exception occurred, message = " . $e->getMessage(), UtilsConstants::UNKNOWN_SERVICE_ERROR_CODE);
    	error_log("Error message => " . $e->getMessage());
    	error_log("Error stack trace => " . $e->getTraceAsString());
	}*/

	echo $result->toJSON();
?>