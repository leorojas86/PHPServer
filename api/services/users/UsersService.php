<?php 
	require_once "api/general/Environment.php";
	require_once "api/services/users/DBConfig.php";
	require_once "api/services/users/User.php";

	class UsersService
	{
		public static function Service($payload)
		{
			$result = Environment::Init(true);

			if($result->success)
			{
				switch($payload->method) 
				{
					case "Register": 	$result = UsersService::Register($payload);		break;
					case "Login": 		$result = UsersService::Login($payload);		break;
					case "UpdateData": 	$result = UsersService::UpdateData($payload);	break;
					default: 		 
						$result = new ServiceResult(false, "Unsupported Users service method '$method'", UtilsConstants::UNSUPPORTED_SERVICE_METHOD_ERROR_CODE); 
					break;
				}
			}

			return $result;
		}

		private static function Register($payload)
		{
			$email 	= $payload->email;//TODO: Validate email
			$result = User::ExistsUserWithEmail($email);

			if($result->success)
			{
				if($result->data["exists"])
					$result = new ServiceResult(false, "User with email '$email' already exists", UtilsConstants::USER_ALREADY_EXISTS_ERROR_CODE); 
				else
				{
					$password 		= $payload->password;//TODO: send password securely
					$name     		= $payload->name;
					$rootGroupId    = $payload->rootGroupId;
					return User::Register($email, $password, $name, $rootGroupId);//TODO: send validation email
				}
			}

			return $result;
		}

		private static function Login($payload)
		{
			$email 	  = $payload->email;
			$password = $payload->password;//TODO: send password securely
			$result   = User::Login($email, $password);

			return $result;
		}

		private static function UpdateData($payload)
		{
			$data   = $payload->data;
			$userId = $payload->userId;

			return User::UpdateData($userId, $data);
		}
	}
?>