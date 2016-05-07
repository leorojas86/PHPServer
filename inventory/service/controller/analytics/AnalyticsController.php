<?php 

	require_once "inventory/service/model/database/Group.php";
	require_once "inventory/service/model/database/Tag.php";

	class AnalyticsController
	{
		public static function Service($method)
		{
			switch ($method) 
			{
				case "Log": $result = AnalyticsController::Log(); break;
				default: 		 
					$result = new ServiceResult(false, "Unsupported user service method '$method'", UtilsConstants::UNSUPPORTED_SERVICE_METHOD_ERROR_CODE); 
				break;
			}

			return $result;
		}

		private static function Log()
		{
			$userId = SessionManager::GetUserData()["id"];
			$name 	= $_POST["name"];
			$data 	= $_POST["data"];

			return Group::AddSubGroup($name, null, $userId, Constants::ANALYTICS_GROUP_TYPE, $data);
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
			//$sessionId 		  = SessionManager::$sessionId;
			$userId   		  = SessionManager::GetUserData()["id"];
			$rootGroupResult  = Group::GetUserRootGroup($userId);

			//error_log("user id = '$userId' session id = '$sessionId'");

			if($rootGroupResult->success)
			{
				$groupId = $rootGroupResult->data["id"];
				return Group::GetGroup($groupId);
		 	}

		 	return $rootGroupResult;
		}

		private static function GetGroup()
		{
			$groupId = $_POST["id"];

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

		public static function UpdateGroupData()
		{
			$groupId = $_POST["id"];
			$data    = $_POST["data"];

			$result = Group::UpdateData($groupId, $data);

			if($result->success)
				$result = Tag::UpdateSearchTags($groupId, $data);

			return $result;
		}

		public static function AddSubGroup()
		{
			$userId   		  = SessionManager::GetUserData()["id"];
			$name 		      = $_POST["name"];
			$parentGroupId    = $_POST["parentGroupId"];
			$type	          = $_POST["type"];
			$data	          = $_POST["data"];

			return Group::AddSubGroup($name, $parentGroupId, $userId, $type, $data);
		}
	}

?>