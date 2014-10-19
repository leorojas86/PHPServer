<?php 
	require_once "app_template/model/Constants.php";
	require_once "utils/php/ServiceResult.php";

	class User
	{
		public static function Register($email, $password, $name)
		{
			#echo "RegisterUser name '$name' pass '$password'";
			$sql = "INSERT INTO users (name, password, email)
					VALUES ('$name', '$password', '$email')";

			$result = MySQLManager::Execute($sql);

			if($result)
			{
				MySQLManager::Close($result);
				$resultData = array("new_user_id" => MySQLManager::GetLastInsertId());
				return new ServiceResult(true, $resultData);
			}
			else
				return new ServiceResult(false, null, "Can not register user", Constants::MYSQL_ERROR_CODE);
		}

		public static function ExistsUserWithEmail($email)
		{
			$sql    = "SELECT count(id) as count FROM users WHERE email='$email'";
			$result = MySQLManager::Execute($sql);

			if($result)
			{
				$row    = MySQLManager::FetchRow($result);
				$exists = $row["count"] > 0;
				MySQLManager::Close($result);

				return new ServiceResult(true, array("exists" => $exists));
			}
			else
				return new ServiceResult(false, null, "Can not check if user exist", Constants::MYSQL_ERROR_CODE);
		}

		public static function Login($name, $password)
		{

		}

		public static function UpdateData($userId, $userData)
		{
			
		}
	}
?>