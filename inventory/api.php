<?php 
	
	require_once "utils/php/Profiler.php";
	require_once "inventory/service/model/Environment.php";
	require_once "inventory/service/controller/database/UsersController.php";
	require_once "inventory/service/controller/database/GroupsController.php";
	require_once "inventory/service/controller/files/FilesController.php";
	require_once "inventory/service/controller/analytics/AnalyticsController.php";

	/*try 
	{
		throw new Exception('Division by zero.');*/
		
		$result = Environment::Init();

		if($result->success)
		{
			if(isset($_POST["payload"]))
			{
				$payload = json_decode($_POST["payload"]);
				$userId  = $payload->userId;
				$service = $payload->service;
				$method  = $payload->method;

				$profiler = new Profiler($userId, "userId = $userId, service = $service, method = $method");

				switch($service)
				{
					case "User":  		$result = UsersController::Service($method, $payload);  break;
					case "Group": 		$result = GroupsController::Service($method, $payload); break;
					case "File":  		$result = FilesController::Service($method, $payload);  break;
					case "Analytic":  	$result = AnalyticsController::Service($method, $payload);  break;
					default:      		$result = new ServiceResult(false, "Unknown service '$service'", UtilsConstants::UNKNOWN_SERVICE_ERROR_CODE); break;
				}

				AnalyticsController::SaveProfile($profiler);
			}
			else
				$result = new ServiceResult(false, "Unspecified payload parameter", UtilsConstants::UNKNOWN_SERVICE_ERROR_CODE);
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