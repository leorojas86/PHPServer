<?php 
	require_once "utils/php/ServiceResult.php";
	require_once "utils/php/UtilsConstants.php"; 

	if(isset($_POST["payload"]))
	{
		$payload = json_decode($_POST["payload"]);

		switch($payload->service)
		{
			case "User":
				require_once "api/services/users/UsersService.php";
				$result = UsersService::Service($payload);
			break;
			case "Group":
				require_once "api/services/groups/GroupsService.php";
				$result = GroupsService::Service($payload);
			break;
			case "Tag":
				require_once "api/services/tags/TagsService.php";
				$result = TagsService::Service($payload);
			break;
			case "File":
				require_once "api/services/files/FilesService.php";
				$result = FilesService::Service($payload);
			break;
			default: $result = new ServiceResult(false, "Unknown service '$service'", UtilsConstants::UNKNOWN_SERVICE_ERROR_CODE); break;
		}
	}
	else
		$result = new ServiceResult(false, "Unspecified payload parameter", UtilsConstants::UNKNOWN_SERVICE_ERROR_CODE);

	echo $result->toJSON();
?>