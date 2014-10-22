<?php 

	class Utils
	{
		public static function Redirect($url)
		{
		   	header('Location: ' . $url);
		    exit();
		}
	} 
?>