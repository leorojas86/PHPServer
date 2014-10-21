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

			$sqlResult = MySQLManager::Execute($sql);

			if($sqlResult)
			{
				MySQLManager::Close($sqlResult);
				$resultData = array("new_user_id" => MySQLManager::GetLastInsertId());

				return new ServiceResult(true, $resultData);
			}
			else
				return new ServiceResult(false, null, "Can not register user", Constants::MYSQL_ERROR_CODE);
		}

		public static function ExistsUserWithEmail($email)
		{
			$sql       = "SELECT count(id) as count FROM users WHERE email='$email'";
			$sqlResult = MySQLManager::Execute($sql);

			if($sqlResult)
			{
				$row    = MySQLManager::FetchRow($sqlResult);
				$exists = $row["count"] > 0;
				MySQLManager::Close($sqlResult);

				return new ServiceResult(true, array("exists" => $exists));
			}
			else
				return new ServiceResult(false, null, "Can not check if user exist", Constants::MYSQL_ERROR_CODE);
		}

		public static function Login($email, $password)
		{
			$sql       = "SELECT * FROM users WHERE email='$email' and password='$password'";
			$sqlResult = MySQLManager::Execute($sql);
			
			if($sqlResult)
			{
				$row = MySQLManager::FetchRow($sqlResult);
				MySQLManager::Close($sqlResult);

				if($row)
				{
					Session::SetUserLoggedInData($row);
					return new ServiceResult(true, $row);
				}
				else
					return new ServiceResult(false, null, "User name or password incorrect", Constants::USER_NAME_OR_PASSWORD_INCORRECT);
			}
			else
				return new ServiceResult(false, null, "Can not login user", Constants::MYSQL_ERROR_CODE);
		}

		public static function UpdateData($userData)
		{
			$loggedInUserData = Session::GetLoggedIdUserData();
			$userId 		  = $loggedInUserData["id"];

			$sql       = "UPDATE users SET data='$userData' where id='$userId'";
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
							Session::SetUserLoggedInData($row);
							return new ServiceResult(true, array("user_id" => $userId));
						}
						else
							return new ServiceResult(false, null, "Could not update user data", Constants::MYSQL_ERROR_CODE);
					}
				}
				else
					return new ServiceResult(false, null, "Could not update user data", Constants::MYSQL_ERROR_CODE);
			}
			else
				return new ServiceResult(false, null, "Can not login user", Constants::MYSQL_ERROR_CODE);
		}
	}
?>