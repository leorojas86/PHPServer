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
		 return User::Register($_POST["username"], $_POST["password"]);
	}
}
?>