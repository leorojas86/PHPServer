<?php 

require_once "inventory_app/model/Environment.php";
require_once "inventory_app/model/database/Group.php";

class GroupsController
{
	public static function Service($method)
	{
		switch ($method) 
		{
			case "GetGroupData": 		$result = GroupsController::GetGroupData();		break;
			case "GetRootGroupData": 	$result = GroupsController::GetRootGroupData();	break;
			case "UpdateData":			$result = GroupsController::UpdateData();		break;
			case "AddSubGroup":			$result = GroupsController::AddSubGroup();		break;
			case "Delete":				$result = GroupsController::DeleteGroup();		break;
			case "Move":				$result = GroupsController::MoveGroup();		break;
			case "Rename":				$result = GroupsController::RenameGroup();		break;
			case "Search":				$result = GroupsController::Search();			break;
			default: 		 
				$result = new ServiceResult(false, null, "Unsupported user service method '$method'", UtilsConstants::UNSUPPORTED_SERVICE_METHOD_ERROR_CODE); 
			break;
		}

		return $result;
	}

	private static function Search()
	{
		$searchText = $_POST["searchText"];

		return Group::SearchGroupsByName($searchText);	
	}

	private static function RenameGroup()
	{
		$groupId   = $_POST["id"];
		$groupName = $_POST["name"];

		return Group::Rename($groupId, $groupName);
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

	private static function GetRootGroupData()
	{
		$loggedInUserData = SessionManager::GetUserData();
		$userId   		  = $loggedInUserData["id"];
		$rootGroupResult  = Group::GetUserRootGroup($userId);

		if($rootGroupResult->success)
		{
			$groupId = $rootGroupResult->data["id"];
			return Group::GetGroup($groupId);
	 	}

	 	return $rootGroupResult;
	}

	private static function GetGroupData()
	{
		$groupId = $_POST["id"];

		return Group::GetGroup($groupId);
	}

	private static function CanPasteGroup($cuttingGroupId, $subGroups, $groupId)
	{
		$isChildGroup = false;

		foreach($subGroups as $subGroup)
		{
			$subGroupId	  = $subGroup["id"];
			$isChildGroup = $isChildGroup || $cuttingGroupId == $subGroupId;
		}

		if(!$isChildGroup)
		{
			$result = Group::IsInHierarchy($groupId, $cuttingGroupId);

			if($result->success)
			{
				$isInHierarchy = $result->data;
				return new ServiceResult(true, !$isInHierarchy);
			}
			else
				return $result;
		}

		return new ServiceResult(true, false);
	}

	public static function UpdateData()
	{
		$groupId = $_POST["id"];
		$data    = $_POST["data"];

		return Group::UpdateData($groupId, $data);
	}

	public static function AddSubGroup()
	{
		$loggedInUserData = SessionManager::GetUserData();
		$userId   		  = $loggedInUserData["id"];
		$name 		      = $_POST["name"];
		$parentGroupId    = $_POST["parentGroupId"];
		$type	          = $_POST["type"];

		return Group::AddSubGroup($name, $parentGroupId, $userId, $type);
	}
}

?>