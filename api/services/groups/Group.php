<?php 
	class Group
	{
		public static function GetUserRootGroup($userId)//TODO: remove this function
		{
			$result = Group::GetUserRootGroupInternal($userId);

			if($result->success && $result->data == null)//User does not have a root folder yet
			{
				$result = Group::AddRootGroupToUser($userId);

				if($result->success)
					return Group::GetUserRootGroupInternal($userId);
			}

			return $result;
		}

		public static function GetUserRootGroupInternal($userId)
		{
			$sql    = "SELECT id FROM groups WHERE parent_group_id='0' AND user_id='$userId'";
			$result = MySQLManager::ExecuteSelectRow($sql);
			
			if($result->success)
				return Group::GetGroup($result->data['id']);
			
			return $result;
		}

		public static function GetGroup($id)
		{
			$result = Group::GetGroupData($id);
			
			if($result->success)
			{
				$groupData = $result->data;

				if($groupData != null)
				{
					$result = Group::GetSubGroups($id);

					if($result->success)
					{
						$groupData['sub_groups'] = $result->data;
						$result 		   		 = Group::GetGroupPath($groupData);

						if($result->success)
						{
							$groupData['path'] = $result->data;
							return new ServiceResult(true, $groupData);
						}
					}
				}
			}
			
			return $result;
		}

		public static function GetGroupData($id)
		{
			$sql    = "SELECT * FROM groups WHERE id='$id'";
			$result = MySQLManager::ExecuteSelectRow($sql);

			return $result;
		}

		public static function GetGroupsData($ids)
		{
			$idsText = MySQLManager::GetListSQL($ids);
			$sql    = "SELECT * FROM groups WHERE id IN ($idsText)";
			$result = MySQLManager::ExecuteSelectRows($sql);

			return $result;
		}

		public static function GetGroupPath($groupData)
		{
			$id   		   = $groupData["id"];
			$name 		   = $groupData->data["name"];
			$parentGroupId = $groupData["parent_group_id"];
			$groupPath     = "$name/";

			while($parentGroupId != 0)
			{
				$result = Group::GetGroupData($parentGroupId);

				if($result->success)
				{
					$parentGroupId = $result->data["parent_group_id"];
					$groupName     = $result->data->data["name"];
					$groupPath     = $groupName . "/" .$groupPath;
				}
				else
					return $result;
			}

			return new ServiceResult(true, $groupPath);
		}

		public static function GetSubGroups($id)
		{
			$sql    = "SELECT * FROM groups WHERE parent_group_id='$id'";
			$result = MySQLManager::ExecuteSelectRows($sql);
			
			return $result;
		}

		private static function AddRootGroupToUser($userId)//TODO: Remove this 
		{
			$type = UtilsConstants::DEFAULT_GROUP_TYPE;
			return Group::AddSubGroup(null, $userId, "{ \"name\":\"RootGroup\", \"type\":\"$type\", \"subgroups\":[] }");
		}

		public static function AddSubGroup($parentGroupId, $userId, $data)
		{
			$sql    = "INSERT INTO groups (user_id, parent_group_id, data)
					   VALUES ('$userId', '$parentGroupId', '$data')";
			$result = MySQLManager::ExecuteInsert($sql);

			return $result;
		}

		public static function UpdateData($id, $groupData)
		{
			$sql    = "UPDATE groups SET data='$groupData' WHERE id='$id'";
			$result = MySQLManager::ExecuteUpdate($sql);

			return $result;
		}

		public static function Delete($id)
		{
			$result = Group::GetSubGroups($id);

			if($result->success)
			{
				$subGroups = $result->data;

				foreach($subGroups as $subGroup)
	    		{
	    			$subGroupId = $subGroup["id"];
	    			Group::Delete($subGroupId);
				}

				$sql 	= "DELETE FROM groups WHERE id = '$id'";
				$result = MySQLManager::ExecuteDelete($sql);

				return $result;
			}

			return $result;
		}

		public static function Move($id, $parentGroupId)
		{
			$sql    = "UPDATE groups SET parent_group_id='$parentGroupId' WHERE id='$id'";
			$result = MySQLManager::ExecuteUpdate($sql);
			
			return $result;
		}
	}
?>