<?php 
	/*require_once "utils/php/ServiceResult.php";

	class SessionManager
	{
		private static $USER_DATA = "USER_DATA";

		public static $sessionId = null;

		public static function StartSession($sessionId = null)
		{
			if($sessionId != null)
				session_id($sessionId);

			session_start();

			SessionManager::$sessionId = session_id();//Gets current session id

			return new ServiceResult(true);
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
	}*/
?>