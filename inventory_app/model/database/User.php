<?php 
	require_once "utils/php/UtilsConstants.php";

	class User
	{
		public static function Register($email, $password, $name)
		{
			$sql    = "INSERT INTO users (name, password, email)
					   VALUES ('$name', '$password', '$email')";
			$result = MySQLManager::ExecuteInsert($sql);

			return $result;
		}

		public static function ExistsUserWithEmail($email)
		{
			$sql    = "SELECT count(id) AS count FROM users WHERE email='$email'";
			$result = MySQLManager::ExecuteSelectRow($sql);

			if($result->success)
			{
				$exists = $result->data["count"] > 0;

				return new ServiceResult(true, array("exists" => $exists));
			}
			
			return $result;
		}

		public static function Login($email, $password)
		{
			$sql    = "SELECT * FROM users WHERE email='$email' AND password='$password'";
			$result = MySQLManager::ExecuteSelectRow($sql);
			
			if($result->success)
			{
				if($result->data)
				{
					SessionManager::SetUserData($result->data);

					return new ServiceResult(true, $result->data);
				}
		
				return new ServiceResult(false, null, "User name or password incorrect", UtilsConstants::USER_NAME_OR_PASSWORD_INCORRECT);
			}
			
			return $result;
		}

		public static function UpdateData($userData)
		{
			$loggedInUserData = SessionManager::GetUserData();
			$userId 		  = $loggedInUserData["id"];
			$sql    		  = "UPDATE users SET data='$userData' WHERE id='$userId'";
			$result 		  = MySQLManager::ExecuteUpdate($sql);
			
			return $result;
		}
	}
?>