<?php
	class User
	{
		public static function Register($guid, $email, $password, $name, $rootGroupGuid)
		{
			$sql    = "INSERT INTO users (guid,name, password, email, rootGroupGuid)
					   VALUES ('$guid', '$name', '$password', '$email', '$rootGroupGuid')";
			$result = MySQLManager::ExecuteInsert($sql);

			return $result;
		}

		public static function ExistsUserWithEmail($email)
		{
			$sql    = "SELECT count(guid) AS count FROM users WHERE email='$email'";
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
					return new ServiceResult(true, $result->data);

				return new ServiceResult(false, "User name or password incorrect", UtilsConstants::USER_NAME_OR_PASSWORD_INCORRECT_ERROR_CODE);
			}

			return $result;
		}

		public static function UpdateData($userGuid, $userData)
		{
			$sql    = "UPDATE users SET data='$userData' WHERE id='$userGuid'";
			$result = MySQLManager::ExecuteUpdate($sql);

			return $result;
		}
	}
?>
