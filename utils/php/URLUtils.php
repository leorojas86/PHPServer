<?php 

	class URLUtils
	{
		public static function Redirect($url)
		{
		   	header('Location: ' . $url);
		    exit();
		}
	}
?>