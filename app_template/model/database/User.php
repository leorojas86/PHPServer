<?php 
	require_once "app_template/model/Constants.php";
	require_once "utils/php/ServiceResult.php";

	class User
	{
		public static function Register($name, $password)
		{
			#echo "RegisterUser name '$name' pass '$password'";
			$sql = "INSERT INTO users (name, password)
					VALUES ('$name', '$password')";

			$result = MySQLManager::Execute($sql);

			if($result)
			{
				//$result->close(); Dont close because the result is 'true'
				$resultData = array("new_user_id" => MySQLManager::GetLastInsertId());
				return new ServiceResult(true, $resultData);
			}
			else
				return new ServiceResult(false, null, "Can not register user", Constants::MYSQL_ERROR_CODE);
		}

		public static function Login($name, $password)
		{

		}

		public static function UpdateData($userId, $userData)
		{
			
		}
	}
?>