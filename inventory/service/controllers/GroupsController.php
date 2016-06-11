<?php 

	require_once "inventory/service/model/database/Group.php";
	require_once "inventory/service/model/database/Tag.php";

	class GroupsController
	{
		public static function Service($method, $payload)
		{
			switch ($method) 
			{
				case "GetGroup": 			$result = GroupsController::GetGroup($payload);			break;
				case "GetRootGroup": 		$result = GroupsController::GetRootGroup($payload);		break;
				case "UpdateData":			$result = GroupsController::UpdateGroupData($payload);	break;
				case "AddSubGroup":			$result = GroupsController::AddSubGroup($payload);		break;
				case "Delete":				$result = GroupsController::DeleteGroup($payload);		break;
				case "Move":				$result = GroupsController::MoveGroup($payload);		break;
				case "Rename":				$result = GroupsController::RenameGroup($payload);		break;
				case "Search":				$result = GroupsController::SearchGroup($payload);		break;
				default: 		 
					$result = new ServiceResult(false, "Unsupported Groups service method '$method'", UtilsConstants::UNSUPPORTED_SERVICE_METHOD_ERROR_CODE); 
				break;
			}

			return $result;
		}

		private static function SearchGroup($payload)
		{
			$searchText = $payload->searchText;
			$result 	= Group::SearchGroups($searchText);	

			if($result->success)
			{
				$groupsByName = $result->data;
				$result 	  = Tag::SearchGroups($searchText);

				if($result->success)
					$result->data = GroupsController::MergeSearchResults($result->data, $groupsByName); 
			}

			return $result;
		}

		private static function MergeSearchResults($result1, $result2)
		{
			$result = array();
			$ids    = array();

			foreach($result1 as $value) 
			{
				$result[] 	= $value;
				$ids[] 		= $value["id"];
			}

			foreach($result2 as $value) 
			{
				$id = $value["id"];

				if(!in_array($id, $ids))
				{
					$result[] 	= $value;
					$ids[] 		= $id;
				}
			}

			return $result;
		}

		private static function RenameGroup($payload)
		{
			$groupId   = $payload->id;
			$groupName = $payload->name;

			return Group::Rename($groupId, $groupName);
		}

		private static function MoveGroup($payload)
		{
			$groupId 	   = $payload->id;
			$parentGroupId = $payload->parentGroupId;

			return Group::Move($groupId, $parentGroupId);
		}

		private static function DeleteGroup($payload)
		{
			$groupId = $payload->id;
			return Group::Delete($groupId);
		}

		private static function GetRootGroup($payload)
		{
			$userId   		  = $payload->userId;
			$rootGroupResult  = Group::GetUserRootGroup($userId);

			if($rootGroupResult->success)
			{
				$groupId = $rootGroupResult->data["id"];
				return Group::GetGroup($groupId);
		 	}

		 	return $rootGroupResult;
		}

		private static function GetGroup($payload)
		{
			$groupId = $payload->id;

			return Group::GetGroup($groupId);
		}

		/*private static function CanPasteGroup($cuttingGroupId, $subGroups, $groupId)
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
		}*/

		public static function UpdateGroupData($payload)
		{
			$groupId = $payload->id;
			$data    = $payload->data;

			$result = Group::UpdateData($groupId, $data);

			if($result->success)
				$result = Tag::UpdateSearchTags($groupId, $data);

			return $result;
		}

		public static function AddSubGroup($payload)
		{
			$userId   		  = $payload->userId;
			$name 		      = $payload->name;
			$parentGroupId    = $payload->parentGroupId;
			$type	          = $payload->type;
			$data    		  = $payload->data;

			return Group::AddSubGroup($name, $parentGroupId, $userId, $type, $data);
		}
	}

?>