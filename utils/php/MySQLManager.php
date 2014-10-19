<?php 

	class MySQLManager
	{
		private static $_mysqli = null;

		public static function Connect($server, $user, $pass, $db)
		{
			MySQLManager::$_mysqli = new mysqli($server, $user, $pass);

			if(MySQLManager::$_mysqli->connect_errno)
    			echo "Failed to connect to MySQL error MySQLManager::$_mysqli->connect_errno, connect error 'MySQLManager::$_mysqli->connect_error'";
    		//else
				//echo "Connected to db successfully \n";

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
			{
				error_log("Calling MySQLManager::Execute without calling MySQLManager::Connect before, mysql connection is null");
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
	} 
?>