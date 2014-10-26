<?php 
require_once "model/Environment.php";
require_once "model/database/Group.php";

class GroupsController
{
	public static function Service($method)
	{
		switch ($method) 
		{
			case "GetGroupAjax": 
				$result = GroupsController::GetGroupInternal();
			break;
			case "GetRootGroupAjax": 
				$result = GroupsController::GetRootGroup();
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
			case "Rename":
				$result = GroupsController::RenameGroup();
			break;
			default: 		 
				$result = new ServiceResult(false, null, "Unsupported user service method '$method'", Constants::UNSUPPORTED_SERVICE_METHOD); 
			break;
		}

		echo $result->toJSON();
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

	private static function GetRootGroup()
	{
		$loggedInUserData = Session::GetLoggedIdUserData();
		$userId   		  = $loggedInUserData["id"];
		$rootGroupResult  = Group::GetUserRootGroup($userId);

		if($rootGroupResult->success)
		{
			$groupId         = $rootGroupResult->data["id"];
			return GroupsController::GetGroupAjax($groupId, null);
	 	}

	 	return $rootGroupResult;
	}

	private static function GetGroupInternal()
	{
		$groupId 		= $_POST["id"];
		$cuttingGroupId = $_POST["cuttingGroupId"];

		return GroupsController::GetGroupAjax($groupId, $cuttingGroupId);
	}

	public static function GetGroupAjax($groupId, $cuttingGroupId)
	{
		$result = Group::GetGroup($groupId);

		if($result->success)
		{
			$groupData     = $result->data;
			$groupPath     = $groupData["path"];
			$parentGroupId = $groupData["parent_group_id"];
			$subGroups 	   = $groupData["sub_groups"];

			$groupAjax = "<div id='folders_area' align='center'>";
			
				$groupPath  = str_replace("RootGroup/", "Principal/", $groupPath);

				if($parentGroupId != 0)
					$groupAjax .= "<p>$groupPath <button id='back_button' type='button' onclick='onBackButtonClick($parentGroupId)'>Atras</button> </p>";
				else
					$groupAjax .= "<p>$groupPath</p>";

				$groupAjax .= "<div id='folders_scroll_panel' oncontextmenu='showContextMenu(event); return false;' align='center' style='overflow:scroll; width:600px; height:400px;' >";

				foreach($subGroups as $subGroup)
	    		{
	    			$subGroupName = $subGroup["name"];
	    			$subGroupId	  = $subGroup["id"];

	    			$groupAjax .= "<div id='folder_$subGroupId' style='width:100px; height:120px; float: left;'>
										<img id='folder_image_$subGroupId' src='view/images/Folder.png' onclick='onSubGroupClick($subGroupId);' style='cursor:pointer; cursor:hand;'/>
										<label id='folder_label_$subGroupId' > $subGroupName </label>
								   </div>";
	    		}

	    		$groupAjax .= "</div>";

				if($cuttingGroupId != "null")
				{
					$result = GroupsController::CanPasteGroup($cuttingGroupId, $subGroups, $groupId);

					if($result->success)
						$groupData["can_paste"] = $result->data;
					else
						return $result;
				}

    		$groupAjax .= "</div>";

			return new ServiceResult(true, array("group_ajax" =>$groupAjax, "group_data" => $groupData));
		}

		return $result;
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
		$loggedInUserData = Session::GetLoggedIdUserData();
		$userId   		  = $loggedInUserData["id"];

		$name 		   = $_POST["name"];
		$parentGroupId = $_POST["parentGroupId"];
		$type	       = $_POST["type"];

		return Group::AddSubGroup($name, $parentGroupId, $userId, $type);
	}
}
?>