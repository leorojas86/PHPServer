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
			$result = MySQLManager::$_mysqli->query($query);

			if(!$result) 
		    	echo "Error executing query '$query', MySQLManager::$_mysqli->error";

			return $result;
		}
	} 
?>