<?php 

	class MySQLManager
	{
		private static $_mysqli = null;

		public static function Connect()
		{
			MySQLManager::$_mysqli = new mysqli('localhost', 'root', 'root');

			if(MySQLManager::$_mysqli->connect_errno)
    			echo "Failed to connect to MySQL error MySQLManager::$_mysqli->connect_errno, connect error 'MySQLManager::$_mysqli->connect_error'";

			echo "Connected to db successfully \n";

			MySQLManager::Execute("use mysql");
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