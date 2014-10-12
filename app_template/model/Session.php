<?php 
	class Session
	{
		const USER_LOGGED_IN = "USER_LOGGED_IN";

		public static function Start()
		{
			session_start();
		}

		public static function IsUserLoggedIn()
		{
			return isset($_SESSION[USER_LOGGED_IN]) ? $_SESSION[USER_LOGGED_IN] : false;
		}

		public static function SetUserLoggedIn($loggedIn)
		{
			$_SESSION[USER_LOGGED_IN] = $loggedIn;
		}
	} 
?>