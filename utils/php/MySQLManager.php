<?php 
	require_once "utils/php/ServiceResult.php";

	class MySQLManager
	{
		private static $_mysqli = null;

		public static function Connect($server, $user, $pass, $db)
		{
			MySQLManager::$_mysqli = new mysqli($server, $user, $pass);

			if(MySQLManager::$_mysqli->connect_errno)
    			error_log("Failed to connect to MySQL error MySQLManager::$_mysqli->connect_errno, connect error 'MySQLManager::$_mysqli->connect_error'");

			MySQLManager::Execute("use $db");
		}

		public static function Execute($query)
		{
			if(MySQLManager::$_mysqli != null)
			{
				$result = MySQLManager::$_mysqli->query($query);

				if(!$result) 
				{
					$error = MySQLManager::$_mysqli->error;
			    	error_log("Error executing query '$query', error '$error'");
				}

				return $result;
			}
			else
				error_log("Calling MySQLManager::Execute without calling MySQLManager::Connect before, mysql connection is null");
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

		//Extension Methods
		public static function ExecuteSelectRow($sql)
		{
			$sqlResult = MySQLManager::Execute($sql);
			
			if($sqlResult)
			{
				$row = MySQLManager::FetchRow($sqlResult);
				MySQLManager::Close($sqlResult);

				return new ServiceResult(true, $row);
			}
			
			return new ServiceResult(false, null, "Error executing Mysql query", Constants::MYSQL_ERROR_CODE);
		}

		public static function ExecuteInsert($sql)
		{
			$sqlResult = MySQLManager::Execute($sql);

			if($sqlResult)
			{
				MySQLManager::Close($sqlResult);
				$resultData = array("new_id" => MySQLManager::GetLastInsertId());

				return new ServiceResult(true, $resultData);
			}
			
			return new ServiceResult(false, null, "Error executing Mysql query", Constants::MYSQL_ERROR_CODE);
		}

		public static function ExecuteUpdate($sql)
		{
			$sqlResult = MySQLManager::Execute($sql);
			
			if($sqlResult)
			{
				$affectedRows = MySQLManager::AffectedRows();
				MySQLManager::Close($sqlResult);

				if($affectedRows == 1)
					return new ServiceResult(true);
			}
			
			return new ServiceResult(false, null, "Error executing Mysql query", Constants::MYSQL_ERROR_CODE);
		}

		public static function ExecuteSelectRows($sql)
		{
			$sqlResult = MySQLManager::Execute($sql);
			
			if($sqlResult)
			{
				$rows = array();
				$row  = MySQLManager::FetchRow($sqlResult);
				
				while($row != null)
				{
					$rows[] = $row;
					$row 	= MySQLManager::FetchRow($sqlResult);
				}

				MySQLManager::Close($sqlResult);

				return new ServiceResult(true, $rows);
			}
			
			return new ServiceResult(false, null, "Error executing Mysql query", Constants::MYSQL_ERROR_CODE);
		}

		public static function ExecuteDelete($sql)
		{
			$sqlResult = MySQLManager::Execute($sql);

			if($sqlResult)
			{
				$affectedRows = MySQLManager::AffectedRows();
				MySQLManager::Close($sqlResult);

				if($affectedRows == 1)
					return new ServiceResult(true);
			}
			
			return new ServiceResult(false, null, "Error executing Mysql query", Constants::MYSQL_ERROR_CODE);
		}
	} 
?>