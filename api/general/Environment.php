<?php 
	require_once "api/general/Constants.php";
	require_once "utils/php/MySQLManager.php";

	class Environment
	{
		public static function Init($service)
		{
			header('Access-Control-Allow-Origin: *');
			header('Access-Control-Allow-Methods: GET, POST');

			$result = MySQLManager::Connect(Config::DB_SERVER, Config::DB_USER, Config::DB_PASS, Config::DB_NAME, Config::DB_PORT);

			return $result;
		}
	}
?>