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
				$result = GroupsController::GetTestingGroupInternal();
			break;
			case "UpdateData":
				$result = GroupsController::UpdateData();
			break;
			case "AddSubGroup":
				$result = GroupsController::AddSubGroup();
			break;
			case "Delete":
				$result = GroupsController::DeleteGroup();
			break;
			default: 		 
				$result = new ServiceResult(false, null, "Unsupported user service method '$method'", Constants::UNSUPPORTED_SERVICE_METHOD); 
			break;
		}

		echo $result->toJSON();
	}

	private static function DeleteGroup()
	{
		$groupId = $_POST["id"];
		return Group::Delete($groupId);
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
			$groupPath     = $result->data["path"];
			$groupData     = $result->data["data"]; 
			$parentGroupId = $result->data["parent_group_id"];

			$groupAjax = "<p>$groupPath</p>";

			if($parentGroupId != 0)
				$groupAjax .= "<button type='button' onclick='onBackButtonClick($parentGroupId)'>Back</button>
							   <button type='button' onclick='onCopyButtonClick($groupId)'>Copy</button>
							   <button type='button' onclick='onDeleteButtonClick($groupId)'>Delete</button>";

			$groupAjax .= "<p>Group Data</p>
						  <input type='text' id='group_data' value = '$groupData'>
				  		  <button type='button' onclick='onUpdateGroupDataClick($groupId)'>Update</button><br/><br/>
				  		  <p>Sub Groups:</p>";

			$subGroups = $result->data["sub_groups"];

			foreach($subGroups as $subGroup)
    		{
    			$subGroupName = $subGroup["name"];
    			$subGroupId	  = $subGroup["id"];
    			$groupAjax   .= "<button type='button' onclick='onSubGroupClick($subGroupId)'>$subGroupName</button><br/><br/>";
    		}

    		$groupAjax .= "<input type='text' id='new_group_name' value = 'New Group'>
				  		  <button type='button' onclick='onAddSubGroupClick($groupId)'>Add</button>";

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

	public static function AddSubGroup()
	{
		$loggedInUserData = Session::GetLoggedIdUserData();
		$userId   		  = $loggedInUserData["id"];

		$name 		   = $_POST["name"];
		$parentGroupId = $_POST["parentGroupId"];

		return Group::AddSubGroup($name, $parentGroupId, $userId);
	}
}
?>