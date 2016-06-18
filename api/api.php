<?php 
		
	if(isset($_POST["payload"]))
	{
		$payload = json_decode($_POST["payload"]);
		$userId  = $payload->userId;
		$service = $payload->service;
		$method  = $payload->method;

		switch($service)
		{
			case "User":  
				require_once "api/users/UsersService.php";
				$result = UsersService::Service($method, $payload);  	
			break;
			case "Group":  
				require_once "api/groups/GroupsService.php";
				$result = GroupsService::Service($method, $payload);  	
			break;
			case "Tag":  
				require_once "api/tags/TagsService.php";
				$result = TagsService::Service($method, $payload);  	
			break;
			case "File":  
				require_once "api/files/FilesService.php";
				$result = FilesService::Service($method, $payload);  	
			break;
			default: $result = new ServiceResult(false, "Unknown service '$service'", UtilsConstants::UNKNOWN_SERVICE_ERROR_CODE); break;
		}
	}
	else
		$result = new ServiceResult(false, "Unspecified payload parameter", UtilsConstants::UNKNOWN_SERVICE_ERROR_CODE);

	echo $result->toJSON();
?>