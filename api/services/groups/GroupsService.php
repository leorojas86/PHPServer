<?php
	require_once "general/Environment.php";
	require_once "services/groups/DBConfig.php";
	require_once "services/groups/model/Group.php";

	class GroupsService
	{
		public static function Service($payload)
		{
			$result = Environment::Init(true);

			if($result->success)
			{
				switch($payload->method)
				{
					case "Add":					$result = GroupsService::AddGroup($payload);				break;
					case "Get": 				$result = GroupsService::GetGroup($payload);				break;
					case "Update":			$result = GroupsService::UpdateGroupData($payload);	break;
					case "Delete":			$result = GroupsService::DeleteGroup($payload);			break;
					case "Move":				$result = GroupsService::MoveGroup($payload);				break;
					case "Rename":			$result = GroupsService::RenameGroup($payload);			break;
					case "GetGroups": 	$result = GroupsService::GetGroups($payload);				break;
					default:
						$result = new ServiceResult(false, "Unsupported Groups service method '$method'", UtilsConstants::UNSUPPORTED_SERVICE_METHOD_ERROR_CODE);
					break;
				}
			}

			return $result;
		}

		private static function RenameGroup($payload)
		{
			$groupGuid = $payload->guid;
			$groupName = $payload->name;

			return Group::Rename($groupGuid, $groupName);
		}

		private static function MoveGroup($payload)
		{
			$groupGuid 				= $payload->guid;
			$parentGroupGuid 	= $payload->parentGroupGuid;

			return Group::Move($groupGuid, $parentGroupGuid);
		}

		private static function DeleteGroup($payload)
		{
			$groupGuid = $payload->guid;
			return Group::Delete($groupGuid);
		}

		private static function GetGroup($payload)
		{
			$groupGuid = $payload->guid;

			return Group::GetGroup($groupGuid);
		}

		private static function UpdateGroupData($payload)
		{
			$groupGuid = $payload->guid;
			$data    	 = $payload->data;
			$result 	 = Group::UpdateData($groupGuid, $data);

			return $result;
		}

		private static function AddGroup($payload)
		{
			$guid 						= $payload->guid;
			$parentGroupGuid  = $payload->parentGroupGuid;
			$data    		  		= $payload->data;

			return Group::AddGroup($guid, $parentGroupGuid, $data);
		}

		private static function GetGroups($payload)
		{
			$guids = $payload->guids;

			return Group::GetGroupsData($guids);
		}

	}
?>
