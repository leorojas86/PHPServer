<?php 
require_once "model/Environment.php";
require_once "model/database/Group.php";

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
			case "Move":
				$result = GroupsController::MoveGroup();
			break;
			default: 		 
				$result = new ServiceResult(false, null, "Unsupported user service method '$method'", Constants::UNSUPPORTED_SERVICE_METHOD); 
			break;
		}

		echo $result->toJSON();
	}

	private static function MoveGroup()
	{
		$groupId 	   = $_POST["id"];
		$parentGroupId = $_POST["parentGroupId"];

		return Group::Move($groupId, $parentGroupId);
	}

	private static function DeleteGroup()
	{
		$groupId = $_POST["id"];
		return Group::Delete($groupId);
	}

	private static function GetTestingGroupInternal()
	{
		$groupId 		= $_POST["id"];
		$copyingGroupId = $_POST["copyingGroupId"];

		return GroupsController::GetTestingGroupAjax($groupId, $copyingGroupId);
	}

	public static function GetTestingGroupAjax($groupId, $copyingGroupId)
	{
		$result = Group::GetGroup($groupId);

		if($result->success)
		{
			$groupPath     = $result->data["path"];
			$groupData     = $result->data["data"]; 
			$parentGroupId = $result->data["parent_group_id"];
			$subGroups 	   = $result->data["sub_groups"];

			$groupAjax = "<p>$groupPath</p>";

			if($parentGroupId != 0)
			{
				$groupAjax .= "<button type='button' onclick='onBackButtonClick($parentGroupId)'>Back</button>
							   <button type='button' onclick='onCopyButtonClick($groupId)'>Copy</button>";
			}

			if($copyingGroupId != "null")
			{
				$result = Group::IsInHierarchy($groupId, $copyingGroupId);

				if($result->success)
				{
					$isInHierarchy = $result->data;
					
					if(!$isInHierarchy)
						$groupAjax .= "<button type='button' onclick='onPasteButtonClick($groupId)'>Paste</button>";
				}
				else
					return $result;
			}

			if($parentGroupId != 0)
				$groupAjax .= "<button type='button' onclick='onDeleteButtonClick($groupId, $parentGroupId)'>Delete</button>";

			$groupAjax .= "<p>Group Data</p>
						  <input type='text' id='group_data' value = '$groupData'>
				  		  <button type='button' onclick='onUpdateGroupDataClick($groupId)'>Update</button><br/><br/>
				  		  <p>Sub Groups:</p>";

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
		$type	       = $_POST["type"];

		return Group::AddSubGroup($name, $parentGroupId, $userId, $type);
	}
}
?>