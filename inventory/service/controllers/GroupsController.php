<?php 
	require_once "inventory/service/model/database/Group.php";

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
				default: 		 
					$result = new ServiceResult(false, "Unsupported Groups service method '$method'", UtilsConstants::UNSUPPORTED_SERVICE_METHOD_ERROR_CODE); 
				break;
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

		private static function UpdateGroupData($payload)
		{
			$groupId 	= $payload->id;
			$data    	= $payload->data;
			$result 	= Group::UpdateData($groupId, $data);

			return $result;
		}

		private static function AddSubGroup($payload)
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