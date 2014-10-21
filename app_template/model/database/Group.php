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
			$sql       = "SELECT id FROM groups WHERE is_root='1' and user_id='$userId'";
			$sqlResult = MySQLManager::Execute($sql);
			
			if($sqlResult)
			{
				$row 		 = MySQLManager::FetchRow($sqlResult);
				$rootGroupId = $row['id'];
				MySQLManager::Close($sqlResult);

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
			$sql       = "SELECT * FROM groups WHERE id='$id'";
			$sqlResult = MySQLManager::Execute($sql);
			
			if($sqlResult)
			{
				$row = MySQLManager::FetchRow($sqlResult);
				MySQLManager::Close($sqlResult);

				return new ServiceResult(true, $row);
			}
			
			return new ServiceResult(false, null, "Can not get group", Constants::MYSQL_ERROR_CODE);
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
			return Group::AddSubGroup('RootGroup', null, $userId);
		}

		public static function AddSubGroup($name, $parentGroupId, $userId)
		{
			$sql = "INSERT INTO groups (name, type, user_id, is_root, parent_group_id)
					VALUES ('$name', '0', '$userId', '0', '$parentGroupId')";

			$sqlResult = MySQLManager::Execute($sql);

			if($sqlResult)
			{
				MySQLManager::Close($sqlResult);
				$resultData = array("new_group_id" => MySQLManager::GetLastInsertId());

				return new ServiceResult(true, $resultData);
			}

			return new ServiceResult(false, null, "Couldn't add group to database", Constants::MYSQL_ERROR_CODE);
		}

		public static function UpdateData($groupId, $groupData)
		{
			$sql       = "UPDATE groups SET data='$groupData' where id='$groupId'";
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
	}
?>