<?php 
	require_once "inventory/service/model/Config.php";
	require_once "utils/php/MySQLManager.php";
	require_once "utils/php/SessionManager.php";

	class Environment
	{
		public static function Setup()
		{
			$result = MySQLManager::Connect(Config::DB_SERVER, Config::DB_USER, Config::DB_PASS, Config::DB_NAME, Config::DB_PORT);
			
			if($result->success)
				$result = SessionManager::StartSession();

			return $result;
		}

		public static function DisplayPage($page, $requiresLogin)//Generates the page content (html/js/etc) 
		{
			if(!$requiresLogin || SessionManager::IsUserLoggedIn())
				require_once $page;
			else
				require_once "inventory/app/php/login.php";
		}
	} 
?>