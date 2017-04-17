<?php
	require_once "utils/ServiceResult.php";
	require_once "utils/UtilsConstants.php";
	require_once "services/users/UsersService.php";

	if(isset($_REQUEST["payload"]))
	{
		$payload = json_decode($_REQUEST["payload"]);
		$result = UsersService::Service($payload);
	}
	else
		$result = new ServiceResult(false, "Unspecified parameter 'payload'", UtilsConstants::UNKNOWN_SERVICE_ERROR_CODE);

	echo $result->toJSON();
?>
