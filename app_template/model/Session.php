<?php 
	class Session
	{
		const $USER_LOGGED_IN = "USER_LOGGED_IN";

		public static function Start()
		{
			session_start();
		}

		public void IsUserLoggedIn()
		{
			return isset($_SESSION[$USER_LOGGED_IN]) ? $_SESSION[$USER_LOGGED_IN] : false;
		}

		public void SetUserLoggedIn($loggedIn)
		{
			$_SESSION[$USER_LOGGED_IN] = $loggedIn;
		}
	} 
?>