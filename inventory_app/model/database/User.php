<?php 
	require_once "inventory_app/model/Constants.php";

	class User
	{
		public static function Register($email, $password, $name)
		{
			$sql = "INSERT INTO users (name, password, email)
					VALUES ('$name', '$password', '$email')";

			$result = MySQLManager::ExecuteInsert($sql);

			if($result->success)
				return $result;
			
			return new ServiceResult(false, null, "Can not register user", Constants::MYSQL_ERROR_CODE);
		}

		public static function ExistsUserWithEmail($email)
		{
			$sql       = "SELECT count(id) AS count FROM users WHERE email='$email'";
			$sqlResult = MySQLManager::Execute($sql);

			if($sqlResult)
			{
				$row    = MySQLManager::FetchRow($sqlResult);
				$exists = $row["count"] > 0;
				MySQLManager::Close($sqlResult);

				return new ServiceResult(true, array("exists" => $exists));
			}
			
			return new ServiceResult(false, null, "Can not check if user exist", Constants::MYSQL_ERROR_CODE);
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
		
				return new ServiceResult(false, null, "User name or password incorrect", Constants::USER_NAME_OR_PASSWORD_INCORRECT);
			}
			
			return new ServiceResult(false, null, "Can not login user", Constants::MYSQL_ERROR_CODE);
		}

		public static function UpdateData($userData)
		{
			$loggedInUserData = SessionManager::GetUserData();
			$userId 		  = $loggedInUserData["id"];

			$sql       = "UPDATE users SET data='$userData' WHERE id='$userId'";
			$sqlResult = MySQLManager::Execute($sql);
			
			if($sqlResult)
			{
				$affectedRows = MySQLManager::AffectedRows();
				MySQLManager::Close($sqlResult);

				if($affectedRows == 1)
				{
					$sql       = "SELECT * FROM users WHERE id='$userId'";
					$sqlResult = MySQLManager::Execute($sql);

					if($sqlResult)
					{
						$row = MySQLManager::FetchRow($sqlResult);
						MySQLManager::Close($sqlResult);

						if($row)
						{
							SessionManager::SetUserData($row);
							return new ServiceResult(true, array("user_id" => $userId));
						}
					}
				}
			}
			
			return new ServiceResult(false, null, "Could not update user data", Constants::MYSQL_ERROR_CODE);
		}
	}
?>