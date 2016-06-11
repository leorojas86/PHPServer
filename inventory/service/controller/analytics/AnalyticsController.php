<?php 

	require_once "inventory/service/model/database/Group.php";
	require_once "inventory/service/model/database/Tag.php";

	class AnalyticsController
	{
		public static function Service($method)
		{
			/*switch ($method) 
			{
				case "Event": $result = AnalyticsController::Event(); break;
				default: 		 
					$result = new ServiceResult(false, "Unsupported user service method '$method'", UtilsConstants::UNSUPPORTED_SERVICE_METHOD_ERROR_CODE); 
				break;
			}

			return $result;*/
		}

		private static function Event()
		{
			$name = $_POST["name"];
			$data = $_POST["data"];

			return AnalyticsController::SaveEvent($name, $data);
		}

		private static function SaveEvent($name, $data)
		{
			$userId = SessionManager::GetUserData()["id"];

			return Group::AddSubGroup($name, null, $userId, Constants::ANALYTICS_GROUP_TYPE, $data);
		}

		public static function SaveProfile($profiler)
		{
			/*$duration = $profiler->Profile();
			return AnalyticsController::SaveEvent($profiler->name, $duration);*/
		}
	}
?>