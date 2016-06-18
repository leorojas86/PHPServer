<?php 
	require_once "config.php";
	require_once "UsersService.php";
	require_once "utils/php/Profiler.php";
	require_once "inventory/service/model/Environment.php";
		
	if(isset($_POST["payload"]))
	{
		$payload = json_decode($_POST["payload"]);
		$service = $payload->service;
		$method  = $payload->method;
		$result  = Environment::Init($service);

		if($result->success)
			return UsersService::Service($payload->method, $payload);
	}
	else
		$result = new ServiceResult(false, "Unspecified payload parameter", UtilsConstants::UNKNOWN_SERVICE_ERROR_CODE);
	
	echo $result->toJSON();
?>