<?php 
	require_once "api/general/Environment.php";
	require_once "api/services/groups/DBConfig.php";
	require_once "api/services/groups/Group.php";

	class GroupsService
	{
		public static function Service($payload)
		{
			$result = Environment::Init(true);

			if($result->success)
			{
				switch($payload->method) 
				{
					case "GetGroup": 		$result = GroupsService::GetGroup($payload);		break;
					case "UpdateData":		$result = GroupsService::UpdateGroupData($payload);	break;
					case "Add":				$result = GroupsService::AddGroup($payload);		break;
					case "Delete":			$result = GroupsService::DeleteGroup($payload);		break;
					case "Move":			$result = GroupsService::MoveGroup($payload);		break;
					case "Rename":			$result = GroupsService::RenameGroup($payload);		break;
					case "GetGroups": 		$result = GroupsService::GetGroups($payload);		break;
					default: 		 
						$result = new ServiceResult(false, "Unsupported Groups service method '$method'", UtilsConstants::UNSUPPORTED_SERVICE_METHOD_ERROR_CODE); 
					break;
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

		private static function AddGroup($payload)
		{
			$userId   		  = $payload->userId;
			$parentGroupId    = $payload->parentGroupId;
			$data    		  = $payload->data;

			return Group::AddGroup($parentGroupId, $userId, $data);
		}

		private static function GetGroups($payload)
		{
			$ids = $payload->ids;

			return Group::GetGroupsData($ids);
		}
		
	}
?>