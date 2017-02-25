<?php
	class Group
	{
		public static function GetGroup($guid)
		{
			$result = Group::GetGroupData($guid);

			if($result->success && $result->data != null)
			{
				$groupData = $result->data;
				$result = Group::GetSubGroups($guid);

				if($result->success)
				{
					$groupData['sub_groups'] 	= $result->data;
					$result 		   		 				= Group::GetGroupPath($groupData);

					if($result->success)
					{
						$groupData['path'] = $result->data;
						return new ServiceResult(true, $groupData);
					}
				}
			}

			return $result;
		}

		public static function GetGroupData($guid)
		{
			$sql    = "SELECT * FROM groups WHERE guid='$guid'";
			$result = MySQLManager::ExecuteSelectRow($sql);

			return $result;
		}

		public static function GetGroupsData($guids)
		{
			$guidsText 	= MySQLManager::GetListSQL($guids);
			$sql    		= "SELECT * FROM groups WHERE $guid IN ($guidsText)";
			$result 		= MySQLManager::ExecuteSelectRows($sql);

			return $result;
		}

		public static function GetGroupPath($groupData)
		{
			$guid   		   		= $groupData["guid"];
			$name 		   			= json_decode($groupData["data"])->name;
			$parentGroupGuid 	= $groupData["parent_group_guid"];
			$groupPath     		= "$name/";

			while($parentGroupGuid != 0)
			{
				$result = Group::GetGroupData($parentGroupGuid);

				if($result->success)
				{
					$parentGroupGuid 	= $result->data["parent_group_guid"];
					$groupName     		= json_decode($result->data["data"])->name;
					$groupPath     		= $groupName . "/" .$groupPath;
				}
				else
					return $result;
			}

			return new ServiceResult(true, $groupPath);
		}

		public static function GetSubGroups($guid)
		{
			$sql    = "SELECT * FROM groups WHERE parent_group_guid='$guid'";
			$result = MySQLManager::ExecuteSelectRows($sql);

			return $result;
		}

		public static function AddGroup($guid, $parentGroupGuid, $data)
		{
			$sql    							= "INSERT INTO groups (guid, parent_group_guid, data)
															 VALUES ('$guid', '$parentGroupGuid', '$data')";
			$result 							= MySQLManager::ExecuteInsert($sql);
			$result->data['guid'] = $guid;

			return $result;
		}

		public static function UpdateData($guid, $groupData)
		{
			$sql    = "UPDATE groups SET data='$groupData' WHERE guid='$guid'";
			$result = MySQLManager::ExecuteUpdate($sql);

			return $result;
		}

		public static function Delete($guid)
		{
			$result = Group::GetSubGroups($guid);

			if($result->success)
			{
				$subGroups = $result->data;

				foreach($subGroups as $subGroup)
	    	{
    			$subGroupGuid = $subGroup["guid"];
    			Group::Delete($subGroupGuid);
				}

				$sql 		= "DELETE FROM groups WHERE guid = '$guid'";
				$result = MySQLManager::ExecuteDelete($sql);

				return $result;
			}

			return $result;
		}

		public static function Move($guid, $parentGroupGuid)
		{
			$sql    = "UPDATE groups SET parent_group_guid='$parentGroupGuid' WHERE guid='$guid'";
			$result = MySQLManager::ExecuteUpdate($sql);

			return $result;
		}
	}
?>
