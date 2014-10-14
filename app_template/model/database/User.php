<?php 
	class User
	{
		private static $TABLE_NAME = "users";

		public static function Register($name, $password)
		{
			#echo "RegisterUser name '$name' pass '$password'";
			$sql = "INSERT INTO users (name, password)
					VALUES ('$name', '$password')";

			$result = MySQLManager::Execute($sql);

			if($result)
			{
				echo "Success";
		    	$result->close();
			}
			else
				echo "Error";
		}

		public static function Login($name, $password)
		{

		}

		public static function UpdateData($userId, $userData)
		{
			
		}
	}
?>