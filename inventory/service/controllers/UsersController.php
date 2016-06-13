<?php 
	require_once "inventory/service/model/database/User.php";

	class UsersController
	{
		public static function Service($method, $payload)
		{
			switch ($method) 
			{
				case "Register": 	$result = UsersController::Register($payload);		break;
				case "Login": 		$result = UsersController::Login($payload);			break;
				case "UpdateData": 	$result = UsersController::UpdateData($payload);	break;
				default: 		 
					$result = new ServiceResult(false, "Unsupported user service method '$method'", UtilsConstants::UNSUPPORTED_SERVICE_METHOD_ERROR_CODE); 
				break;
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
					$password = $payload->password;//TODO: send password securely
					$name     = $payload->name;
					return User::Register($email, $password, $name);//TODO: send validation email
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