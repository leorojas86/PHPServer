<?php 
	
	require_once "utils/php/Profiler.php";
	

	/*try 
	{
		throw new Exception('Division by zero.');*/
		
		
	if(isset($_POST["payload"]))
	{
		$payload = json_decode($_POST["payload"]);
		$userId  = $payload->userId;
		$service = $payload->service;
		$method  = $payload->method;

		switch($service)
			{
				case "User": 		
					require_once "api/api.php";
					die();
				break;
				case "Group": 		
					require_once "api/api.php";
					die();	
				break;

				default:      
						require_once "inventory/service/model/Environment.php";
						$result = Environment::Init($service);

						if($result->success)
						{
							//$profiler = new Profiler($userId, "userId = $userId, service = $service, method = $method");

							switch($service)
							{
								case "Group": 		
									require_once "inventory/service/controllers/GroupsController.php";
									$result = GroupsController::Service($method, $payload); 	
								break;
								case "File":
									require_once "inventory/service/controllers/FilesController.php";  		
									$result = FilesController::Service($method, $payload);  	
								break;
								case "Tag": 
									require_once "inventory/service/controllers/TagsController.php"; 		
									$result = TagsController::Service($method, $payload);  		
								break;
								case "Analytic":  
									require_once "inventory/service/controllers/AnalyticsController.php";	
									$result = AnalyticsController::Service($method, $payload);  
								break;
							}
						}
				break;
			}

		

			//AnalyticsController::SaveProfile($profiler);
	}
	else
		$result = new ServiceResult(false, "Unspecified payload parameter", UtilsConstants::UNKNOWN_SERVICE_ERROR_CODE);
	/*}
	catch(Exception $e) 
	{
		$result = new ServiceResult(false, "Unexpected exception occurred, message = " . $e->getMessage(), UtilsConstants::UNKNOWN_SERVICE_ERROR_CODE);
    	error_log("Error message => " . $e->getMessage());
    	error_log("Error stack trace => " . $e->getTraceAsString());
	}*/

	echo $result->toJSON();
?>