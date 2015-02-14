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
			{
				$rootGroupId = $result->data['id'];

				return Group::GetGroup($rootGroupId);
			}
			
			return new ServiceResult(false, null, "Can not get group", Constants::MYSQL_ERROR_CODE);
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

		public static function GetGroupPath($groupData)
		{
			$id   		   = $groupData["id"];
			$name 		   = $groupData["name"];
			$parentGroupId = $groupData["parent_group_id"];

			$groupPath = "$name/";

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
			$sql       = "SELECT * FROM groups WHERE parent_group_id='$id'";
			$sqlResult = MySQLManager::Execute($sql);
			
			if($sqlResult)
			{
				$groups = array();
				$row    = MySQLManager::FetchRow($sqlResult);
				
				while($row != null)
				{
					$groups[] = $row;
					$row 	  = MySQLManager::FetchRow($sqlResult);
				}

				MySQLManager::Close($sqlResult);

				return new ServiceResult(true, $groups);
			}
			
			return new ServiceResult(false, null, "Couldn't get sub groups", Constants::MYSQL_ERROR_CODE);
		}

		private static function AddRootGroupToUser($userId)
		{
			return Group::AddSubGroup('RootGroup', null, $userId, Constants::DEFAULT_GROUP_TYPE);
		}

		public static function AddSubGroup($name, $parentGroupId, $userId, $type)
		{
			$sql = "INSERT INTO groups (name, user_id, parent_group_id, type)
					VALUES ('$name', '$userId', '$parentGroupId', '$type')";

			$result = MySQLManager::ExecuteInsert($sql);

			return $result;
		}

		public static function UpdateData($groupId, $groupData)
		{
			$sql       = "UPDATE groups SET data='$groupData' WHERE id='$groupId'";
			$sqlResult = MySQLManager::Execute($sql);
			
			if($sqlResult)
			{
				$affectedRows = MySQLManager::AffectedRows();
				MySQLManager::Close($sqlResult);

				if($affectedRows == 1)
					return new ServiceResult(true, array("group_id" => $groupId));
			}
			
			return new ServiceResult(false, null, "Could not update group data", Constants::MYSQL_ERROR_CODE);
		}

		public static function Rename($groupId, $groupName)
		{
			$sql       = "UPDATE groups SET name='$groupName' WHERE id='$groupId'";
			$sqlResult = MySQLManager::Execute($sql);
			
			if($sqlResult)
			{
				$affectedRows = MySQLManager::AffectedRows();
				MySQLManager::Close($sqlResult);

				if($affectedRows == 1)
					return new ServiceResult(true, array("group_id" => $groupId));
			}
			
			return new ServiceResult(false, null, "Could not rename group", Constants::MYSQL_ERROR_CODE);
		}

		public static function Delete($groupId)
		{
			$result = Group::GetSubGroups($groupId);

			if($result->success)
			{
				$subGroups = $result->data;

				foreach($subGroups as $subGroup)
	    		{
	    			$subGroupId = $subGroup["id"];
	    			$result 	= Group::Delete($subGroupId);

	    			if(!$result->success)
	    				return $result;
				}

				$sql 	   = "DELETE FROM groups WHERE id = '$groupId'";
				$sqlResult = MySQLManager::Execute($sql);

				if($sqlResult)
				{
					$affectedRows = MySQLManager::AffectedRows();
					MySQLManager::Close($sqlResult);

					if($affectedRows == 1)
						return new ServiceResult(true, array("group_id" => $groupId));
				}
				
				return new ServiceResult(false, null, "Could not delete group", Constants::MYSQL_ERROR_CODE);
			}

			return $result;
		}

		public static function Move($groupId, $parentGroupId)
		{
			$sql       = "UPDATE groups SET parent_group_id='$parentGroupId' WHERE id='$groupId'";
			$sqlResult = MySQLManager::Execute($sql);
			
			if($sqlResult)
			{
				$affectedRows = MySQLManager::AffectedRows();
				MySQLManager::Close($sqlResult);

				if($affectedRows == 1)
					return new ServiceResult(true, array("group_id" => $groupId));
			}
			
			return new ServiceResult(false, null, "Could not move group", Constants::MYSQL_ERROR_CODE);
		}

		public static function IsInHierarchy($groupId, $hierarchyParentId)
		{
			if($hierarchyParentId != $groupId)
			{
				$result = Group::GetSubGroups($hierarchyParentId);

				if($result->success)
				{
					$subGroups = $result->data;

					foreach($subGroups as $subGroup)
		    		{
		    			$subGroupId = $subGroup["id"];
		    			$result 	= Group::IsInHierarchy($groupId, $subGroupId);

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
		}

		public static function SearchGroupsByName($name)
		{
			$sql       = "SELECT * FROM groups WHERE name LIKE '$name'";
			$sqlResult = MySQLManager::Execute($sql);
			
			if($sqlResult)
			{
				$groups = array();
				$row    = MySQLManager::FetchRow($sqlResult);

				while($row != null)
				{
					$groups[] = $row;
					$row 	  = MySQLManager::FetchRow($sqlResult);
				}

				MySQLManager::Close($sqlResult);

				return new ServiceResult(true, $groups);
			}
			
			return new ServiceResult(false, null, "Could not perform group search", Constants::MYSQL_ERROR_CODE);
		}

	}


?>