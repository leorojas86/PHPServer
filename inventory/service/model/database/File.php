<?php 
	class File
	{ 
		public static function GetFiles($ownerId)
		{
			$sql    = "SELECT * FROM files WHERE owner_id = '$ownerId'";
			$result = MySQLManager::ExecuteSelectRows($sql);

			return $result;
		}

		public static function Add($name, $owner_id, $type)
		{
			$sql    = "INSERT INTO files (name, owner_id, type, creation_date)
					   VALUES ('$name', '$owner_id', '$type', NOW())";
			$result = MySQLManager::ExecuteInsert($sql);

			return $result;
		}

		public static function Rename($id, $newName)
		{
			$sql    = "UPDATE files SET name='$newName' WHERE id='$id'";
			$result = MySQLManager::ExecuteUpdate($sql);
			
			return $result;
		}

		public static function Delete($id)
		{
			$sql 	= "DELETE FROM files WHERE id = '$id'";
			$result = MySQLManager::ExecuteDelete($sql);

			return $result;
		}
	}
?>