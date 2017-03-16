<?php
	require_once "general/EnvironmentConfig.php";
	require_once "utils/MySQLManager.php";

	class Environment
	{
		public static function Init($initDB)
		{
			if(EnvironmentConfig::FAKE_RESPONSE_DELAY)
				sleep(3);

			header('Access-Control-Allow-Origin: ' . EnvironmentConfig::ALLOW_ORIGIN);
			//header('Access-Control-Allow-Methods: GET, POST');

			if($initDB)
				return MySQLManager::Connect(DBConfig::DB_SERVER, DBConfig::DB_USER, DBConfig::DB_PASS, DBConfig::DB_NAME, DBConfig::DB_PORT);
			else
				return new ServiceResult(true);
		}
	}
?>
