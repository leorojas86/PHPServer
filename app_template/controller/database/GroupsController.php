<?php 
require_once "app_template/model/Environment.php";
require_once "app_template/model/database/Group.php";

class GroupsController
{
	public static function Service($method)
	{
		switch ($method) 
		{
			case "GetTestingGroupAjax": 
				$result = GroupsController::GetTestingGroupAjax();
			break;
			default: 		 
				$result = new ServiceResult(false, null, "Unsupported user service method '$method'", Constants::UNSUPPORTED_SERVICE_METHOD); 
			break;
		}

		echo $result->toJSON();
	}

	private static function GetTestingGroupInternal()
	{
		$groupId = $_POST["id"];
		return GroupsController::GetTestingGroupAjax($groupId);
	}

	public static function GetTestingGroupAjax($groupId)
	{
		$result = Group::GetGroup($groupId);

		if($result->success)
		{
			$groupName = $result->data["name"];
			return new ServiceResult(true, "<p>$groupName</p>");
		}

		return $result;
	}
}
?>