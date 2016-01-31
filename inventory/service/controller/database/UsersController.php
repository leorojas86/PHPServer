<?php 

	require_once "inventory/service/model/Environment.php";
	require_once "inventory/service/model/database/User.php";

	class UsersController
	{
		public static function Service($method)
		{
			switch ($method) 
			{
				case "Register": 	$result = UsersController::Register();		break;
				case "Login": 		$result = UsersController::Login();			break;
				case "UpdateData": 	$result = UsersController::UpdateData();	break;
				default: 		 
					$result = new ServiceResult(false, "Unsupported user service method '$method'", UtilsConstants::UNSUPPORTED_SERVICE_METHOD_ERROR_CODE); 
				break;
			}

			return $result;
		}

		private static function Register()
		{
			$email 	= $_POST["email"];//TODO: Validate email
			$result = User::ExistsUserWithEmail($email);

			if($result->success)
			{
				if($result->data["exists"])
					$result = new ServiceResult(false, "User with email '$email' already exists", UtilsConstants::USER_ALREADY_EXISTS_ERROR_CODE); 
				else
				{
					$password = $_POST["password"];//TODO: send password securely
					$name     = $_POST["name"];
					return User::Register($email, $password, $name);//TODO: send validation email
				}
			}

			return $result;
		}

		private static function Login()
		{
			$email 	  = $_POST["email"];
			$password = $_POST["password"];//TODO: send password securely
			$result   = User::Login($email, $password);

			return $result;
		}

		private static function UpdateData()
		{
			$data = $_POST["data"];

			return User::UpdateData($data);
		}
	}

?>