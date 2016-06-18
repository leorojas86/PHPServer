<?php 
	require_once "utils/php/MySQLManager.php";

	class Environment
	{
		public static function Init($service)
		{
			header('Access-Control-Allow-Origin: *');
			header('Access-Control-Allow-Methods: GET, POST');

			$result = MySQLManager::Connect(DBConfig::DB_SERVER, DBConfig::DB_USER, DBConfig::DB_PASS, DBConfig::DB_NAME, DBConfig::DB_PORT);

			return $result;
		}
	}
?>