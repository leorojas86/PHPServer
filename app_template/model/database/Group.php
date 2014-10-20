<?php 
	class Group
	{
		public static function GetUserRootGroup($userId)
		{
			$result = Group::GetUserRootGroupInternal($userId);

			if($result->success & $result->data == null)//User does not have a root folder yet
			{
				$result = Group::AddRootGroupToUser($userId);

				if($result->success)
					return Group::GetUserRootGroupInternal($userId);
			}

			return $result;
		}

		public static function GetUserRootGroupInternal($userId)
		{
			$sql    = "SELECT id FROM groups WHERE is_root='1' and user_id='$userId'";
			$result = MySQLManager::Execute($sql);
			
			if($result)
			{
				$row 		 = MySQLManager::FetchRow($result);
				$rootGroupId = $row['id'];
				MySQLManager::Close($result);

				return Group::GetGroup($rootGroupId);
			}
			else
				return new ServiceResult(false, null, "Can not get group", Constants::MYSQL_ERROR_CODE);
		} 

		public static function GetGroup($id)
		{
			$sql    = "SELECT * FROM groups WHERE id='$id'";
			$result = MySQLManager::Execute($sql);
			
			if($result)
			{
				$row = MySQLManager::FetchRow($result);
				MySQLManager::Close($result);

				$result = Group::GetSubGroups($id);

				if($result->success)
				{
					$row['sub_groups'] = $result->data;
					return new ServiceResult(true, $row);
				}
			}
			else
				return new ServiceResult(false, null, "Can not get group", Constants::MYSQL_ERROR_CODE);
		}


		public static function GetSubGroups($id)
		{
			$sql    = "SELECT * FROM groups WHERE parent_group_id='$id'";
			$result = MySQLManager::Execute($sql);
			
			if($result)
			{
				$groups = array();
				$row    = MySQLManager::FetchRow($result);
				
				while($row != null)
				{
					$groups[] = $row;
					$row 	  = MySQLManager::FetchRow($result);
				}

				return new ServiceResult(true, $groups);
			}
			else
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

			$result = MySQLManager::Execute($sql);

			if($result)
			{
				MySQLManager::Close($result);
				$resultData = array("new_group_id" => MySQLManager::GetLastInsertId());

				return new ServiceResult(true, $resultData);
			}
			else
				return new ServiceResult(false, null, "Couldn't add group to database", Constants::MYSQL_ERROR_CODE);
		}

		public static function UpdateData($groupId, $groupData)
		{
			$sql    = "UPDATE groups SET data='$groupData' where id='$groupId'";
			$result = MySQLManager::Execute($sql);
			
			if($result)
			{
				$affectedRows = MySQLManager::AffectedRows();
				MySQLManager::Close($result);

				if($affectedRows == 1)
					return new ServiceResult(true, array("group_id" => $groupId));
				else
					return new ServiceResult(false, null, "Could not update user data", Constants::MYSQL_ERROR_CODE);
			}
			else
				return new ServiceResult(false, null, "Can not login user", Constants::MYSQL_ERROR_CODE);
		}

		public static function Delete($groupId)
		{

		}
	}
?>