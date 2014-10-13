<?php 
require_once "app_template/model/database/User.php";

class UsersController
{
	public static function Service($method)
	{
		switch ($method) 
		{
			case "Register": User::Register($_POST["username"], $_POST["password"]); break;
			default: echo "Unsupported user service method '$service'"; break;
		}
	}
}
?>