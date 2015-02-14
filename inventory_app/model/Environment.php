<?php 
	require_once "inventory_app/model/Config.php";
	require_once "utils/php/MySQLManager.php";
	require_once "utils/php/SessionManager.php";

	class Environment
	{
		public static function Setup()
		{
			$result = MySQLManager::Connect(Config::DB_SERVER, Config::DB_USER, Config::DB_PASS, Config::DB_NAME);
			
			if($result->success)
				$result = SessionManager::StartSession();

			return $result;
		}
	} 
?>