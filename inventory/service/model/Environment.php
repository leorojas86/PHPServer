<?php 
	require_once "inventory/service/model/Config.php";
	require_once "inventory/service/model/Constants.php";
	require_once "utils/php/MySQLManager.php";

	class Environment
	{
		public static function Init()
		{
			header('Access-Control-Allow-Origin: *');
			header('Access-Control-Allow-Methods: GET, POST');

			$result = MySQLManager::Connect(Config::DB_SERVER, Config::DB_USER, Config::DB_PASS, Config::DB_NAME, Config::DB_PORT);

			return $result;
		}
	}
?>