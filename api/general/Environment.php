<?php 
	require_once "Constants.php";
	require_once "../../utils/php/MySQLManager.php";

	class Environment
	{
		public static function Init($service)
		{
			header('Access-Control-Allow-Origin: *');
			header('Access-Control-Allow-Methods: GET, POST');

			$dbName = isset(Config::DB_NAMES[$service]) ? Config::DB_NAMES[$service] : Config::DB_NAME;

			$result = MySQLManager::Connect(Config::DB_SERVER, Config::DB_USER, Config::DB_PASS, $dbName, Config::DB_PORT);

			return $result;
		}
	}
?>