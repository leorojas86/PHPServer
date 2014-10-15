<?php 
require_once "app_template/model/Environment.php";
require_once "app_template/model/database/User.php";

class UsersController
{
	public static function Service($method)
	{
		switch ($method) 
		{
			case "Register": 
				$result = UsersController::Register();
			break;
			default: 		 
				$result = new ServiceResult(false, null, "Unsupported user service method '$method'", Constants::UNSUPPORTED_SERVICE_METHOD); 
			break;
		}

		echo $result->toJSON();
	}

	private static function Register()
	{
		$email 	= $_POST["email"];//TODO: Validate email
		$result = User::ExistsUserWithEmail($email);

		if($result->success)
		{
			if($result->data["exists"])
				$result = new ServiceResult(false, null, "User with email '$email' already exists", Constants::USER_ALREADY_EXISTS); 
			else
			{
				$password = $_POST["password"];
				$name     = $_POST["name"];
				return User::Register($email, $password, $name);//TODO: send validation email
			}
		}

		return $result;
	}
}
?>