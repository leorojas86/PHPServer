<?php 
	class Group
	{
		public static function GetUserRootGroup($userId)
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
			$name 		   = $groupData["name"];
			$parentGroupId = $groupData["parent_group_id"];
			$groupPath     = "$name/";

			while($parentGroupId != 0)
			{
				$result = Group::GetGroupData($parentGroupId);

				if($result->success)
				{
					$parentGroupId = $result->data["parent_group_id"];
					$groupName     = $result->data["name"];
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

		private static function AddRootGroupToUser($userId)
		{
			return Group::AddSubGroup('RootGroup', null, $userId, UtilsConstants::DEFAULT_GROUP_TYPE, null);
		}

		public static function AddSubGroup($name, $parentGroupId, $userId, $type, $data)
		{
			$sql    = "INSERT INTO groups (name, user_id, parent_group_id, type, data, creation_date)
					   VALUES ('$name', '$userId', '$parentGroupId', '$type', '$data', NOW())";
			$result = MySQLManager::ExecuteInsert($sql);

			return $result;
		}

		public static function UpdateData($id, $groupData)
		{
			$sql    = "UPDATE groups SET data='$groupData' WHERE id='$id'";
			$result = MySQLManager::ExecuteUpdate($sql);

			return $result;
		}

		public static function Rename($id, $newName)
		{
			$sql    = "UPDATE groups SET name='$newName' WHERE id='$id'";
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

		/*public static function IsInHierarchy($id, $hierarchyParentId)
		{
			if($hierarchyParentId != $id)
			{
				$result = Group::GetSubGroups($hierarchyParentId);

				if($result->success)
				{
					$subGroups = $result->data;

					foreach($subGroups as $subGroup)
		    		{
		    			$result = Group::IsInHierarchy($id, $subGroup["id"]);

		    			if($result->success)
		    			{
		    				$isInHierarchy = $result->data;

		    				if($isInHierarchy)
		    					return $result;
		    			}
		    			else
		    				return $result;
					}

					return new ServiceResult(true, false);
				}
			}

			return new ServiceResult(true, true);
		}*/
	}
?>