<?php
	require_once "utils/ServiceResult.php";
	require_once "utils/UtilsConstants.php";

	if(isset($_REQUEST["payload"]))
	{
		$payload = json_decode($_REQUEST["payload"]);

		switch($payload->service)
		{
			case "User":
				require_once "services/users/UsersService.php";
				$result = UsersService::Service($payload);
			break;
			case "Group":
				require_once "services/groups/GroupsService.php";
				$result = GroupsService::Service($payload);
			break;
			case "Tag":
				require_once "services/tags/TagsService.php";
				$result = TagsService::Service($payload);
			break;
			case "File":
				require_once "services/files/FilesService.php";
				$result = FilesService::Service($payload);
			break;
			default: $result = new ServiceResult(false, "Unknown service '$service'", UtilsConstants::UNKNOWN_SERVICE_ERROR_CODE); break;
		}
	}
	else
		$result = new ServiceResult(false, "Unspecified parameter 'payload'", UtilsConstants::UNKNOWN_SERVICE_ERROR_CODE);

	echo $result->toJSON();
?>
