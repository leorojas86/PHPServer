<?php
	require_once "utils/php/UtilsConstants.php"; 
	require_once "utils/php/ServiceResult.php";

	class MySQLManager
	{
		private static $_mysqli = null;

		public static function Connect($server, $user, $pass, $db)
		{
			MySQLManager::$_mysqli = new mysqli($server, $user, $pass);

			if(MySQLManager::$_mysqli->connect_errno)
			{
    			error_log("Failed to connect to MySQL error MySQLManager::$_mysqli->connect_errno, connect error 'MySQLManager::$_mysqli->connect_error'");
    			return new ServiceResult(false, null, "Failed to connect to MySQL", UtilsConstants::MYSQL_ERROR_CODE);
			}
			else
				return MySQLManager::Execute("use $db");
		}

		public static function Execute($query)
		{
			if(MySQLManager::$_mysqli != null)
			{
				$sqlResult = MySQLManager::$_mysqli->query($query);

				if($sqlResult) 
					return new ServiceResult(true, $sqlResult);
				else
				{
					$error = MySQLManager::$_mysqli->error;
			    	error_log("Error executing query '$query', error '$error'");
			    	return new ServiceResult(false, null, "Error executing Mysql query", UtilsConstants::MYSQL_ERROR_CODE);
				}
			}
			else
			{
				error_log("Calling MySQLManager::Execute without calling MySQLManager::Connect before, mysql connection is null");
				return new ServiceResult(false, null, "Calling MySQLManager::Execute without calling MySQLManager::Connect before, mysql connection is null", Constants::MYSQL_ERROR_CODE);
			}
		}

		public static function GetLastInsertId()
		{
			return mysqli_insert_id(MySQLManager::$_mysqli);
		}

		public static function FetchRow($result)
		{
			return $result->fetch_assoc();
		}

		public static function Close($result)
		{
			if(!is_bool($result))
				$result->close();
		}

		public static function AffectedRows()
		{
			return MySQLManager::$_mysqli->affected_rows;
		}

		public static function Escape($string)
		{
			return MySQLManager::$_mysqli->real_escape_string($string);
		}

		//Extension Methods
		public static function ExecuteSelectRow($sql)
		{
			$result = MySQLManager::Execute($sql);
			
			if($result->success)
			{
				$row = MySQLManager::FetchRow($result->data);
				MySQLManager::Close($result->data);

				return new ServiceResult(true, $row);
			}
			
			return $result;
		}

		public static function ExecuteInsert($sql)
		{
			$result = MySQLManager::Execute($sql);
			
			if($result->success)
			{
				MySQLManager::Close($result->data);
				$resultData = array("insert_id" => MySQLManager::GetLastInsertId());

				return new ServiceResult(true, $resultData);
			}
			
			return $result;
		}

		public static function ExecuteUpdate($sql)
		{
			$result = MySQLManager::Execute($sql);
			
			if($result->success)
			{
				$affectedRows = MySQLManager::AffectedRows();
				MySQLManager::Close($result->data);

				if($affectedRows > 0)
					return new ServiceResult(true);
				else
				{
					error_log("Update query didn't update any row -> $sql");
					return new ServiceResult(false, null, "Update query didn't update any row", UtilsConstants::MYSQL_ERROR_CODE);
				}
			}
			
			return $result;
		}

		public static function ExecuteSelectRows($sql)
		{
			$result = MySQLManager::Execute($sql);
			
			if($result->success)
			{
				$rows = array();
				$row  = MySQLManager::FetchRow($result->data);
				
				while($row != null)
				{
					$rows[] = $row;
					$row 	= MySQLManager::FetchRow($result->data);
				}

				MySQLManager::Close($result->data);

				return new ServiceResult(true, $rows);
			}
			
			return $result;
		}

		public static function ExecuteDelete($sql)
		{
			$result = MySQLManager::Execute($sql);
			
			if($result->success)
			{
				$affectedRows = MySQLManager::AffectedRows();
				MySQLManager::Close($result->data);

				if($affectedRows > 0)
					return new ServiceResult(true);
				else
				{
					error_log("Delete query didn't delete any row -> $sql");
					return new ServiceResult(false, null, "Delete query didn't delete any row", UtilsConstants::MYSQL_ERROR_CODE);
				}
			}
			
			return $result;
		}
	} 
?>