<?php 
	class SessionManager
	{
		private static $USER_DATA = "USER_DATA";

		public static function StartSession()
		{
			session_start();
		}

		public static function IsUserLoggedIn()
		{
			return isset($_SESSION[SessionManager::$USER_DATA]);
		}

		public static function SetUserData($loggedInUserData)
		{
			$_SESSION[SessionManager::$USER_DATA] = $loggedInUserData;
		}

		public static function GetUserData()
		{
			return $_SESSION[SessionManager::$USER_DATA];
		}
	} 
?>