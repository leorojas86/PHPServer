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
			case "UpdateData":
				$result = GroupsController::UpdateData();
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
			$groupData = $result->data["data"]; 
			$groupAjax = "<p>Group Name</p>
						  <p>$groupName</p>
						  <p>Group Data</p>
						  <input type='text' id='group_data' value = '$groupData'>
				  		  <button type='button' onclick='onUpdateGroupDataClick($groupId)'>Update</button><br/><br/>
				  		  <p>Sub Groups</p>";

			return new ServiceResult(true, $groupAjax);
		}

		return $result;
	}

	public static function UpdateData()
	{
		$groupId = $_POST["id"];
		$data    = $_POST["data"];

		return Group::UpdateData($groupId, $data);
	}
}
?>