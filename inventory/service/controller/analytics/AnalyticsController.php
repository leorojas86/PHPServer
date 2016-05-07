<?php 

	require_once "inventory/service/model/database/Group.php";
	require_once "inventory/service/model/database/Tag.php";

	class AnalyticsController
	{
		public static function Service($method)
		{
			switch ($method) 
			{
				case "Log": $result = AnalyticsController::Log(); break;
				default: 		 
					$result = new ServiceResult(false, "Unsupported user service method '$method'", UtilsConstants::UNSUPPORTED_SERVICE_METHOD_ERROR_CODE); 
				break;
			}

			return $result;
		}

		private static function Log()
		{
			$userId = SessionManager::GetUserData()["id"];
			$name 	= $_POST["name"];
			$data 	= $_POST["data"];

			return Group::AddSubGroup($name, null, $userId, Constants::ANALYTICS_GROUP_TYPE, $data);
		}
	}
?>