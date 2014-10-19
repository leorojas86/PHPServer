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
			$sql    = "SELECT * FROM groups WHERE is_root='1' and user_id='$userId'";
			$result = MySQLManager::Execute($sql);
			
			if($result)
			{
				$row = MySQLManager::FetchRow($result);
				MySQLManager::Close($result);

				return new ServiceResult(true, $row);
			}
			else
				return new ServiceResult(false, null, "Can not login user", Constants::MYSQL_ERROR_CODE);
		} 

		private static function AddRootGroupToUser($userId)
		{
			$sql = "INSERT INTO groups (name, type, user_id, is_root)
					VALUES ('RootGroup', '0', '$userId', '1')";

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

		public static function AddNewGroup($name, $type, $userId, $parentGroupId, $isRoot)
		{

		}

		public static function UpdateGroupData($groupId, $groupData)
		{
			
		}

		public static function DeleteGroup($groupId)
		{

		}
	}
?>