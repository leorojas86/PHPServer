<?php 
	class Session
	{
		private static $USER_LOGGED_IN = "USER_LOGGED_IN";

		public static function Start()
		{
			session_start();
		}

		public static function IsUserLoggedIn()
		{
			return isset($_SESSION[Session::$USER_LOGGED_IN]);
		}

		public static function SetUserLoggedInData($loggedInUserData)
		{
			$_SESSION[Session::$USER_LOGGED_IN] = $loggedInUserData;
		}
	} 
?>