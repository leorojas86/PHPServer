<?php 
	class Group
	{
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
			$name 		   = json_decode($groupData["data"])->name;
			$parentGroupId = $groupData["parent_group_id"];
			$groupPath     = "$name/";

			while($parentGroupId != 0)
			{
				$result = Group::GetGroupData($parentGroupId);

				if($result->success)
				{
					$parentGroupId = $result->data["parent_group_id"];
					$groupName     = json_decode($result->data["data"])->name;
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

		public static function AddGroup($parentGroupId, $userId, $data)
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