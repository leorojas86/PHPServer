<?php 
	require_once "inventory/service/model/database/Group.php";
	require_once "inventory/service/model/database/Tag.php";

	class AnalyticsController
	{
		public static function Service($method, $payload)
		{
			switch($method) 
			{
				case "Event": $result = AnalyticsController::Event($payload); break;
				default: 		 
					$result = new ServiceResult(false, "Unsupported Analytics service method '$method'", UtilsConstants::UNSUPPORTED_SERVICE_METHOD_ERROR_CODE); 
				break;
			}

			return $result;
		}

		private static function Event($payload)
		{
			$userId = $payload->userId;
			$name 	= $payload->name;
			$data 	= $payload->data;

			return AnalyticsController::SaveEvent($name, $data);
		}

		private static function SaveEvent($userId, $name, $data)
		{
			return Group::AddSubGroup($name, null, $userId, Constants::ANALYTICS_GROUP_TYPE, $data);
		}

		public static function SaveProfile($profiler)
		{
			$duration = $profiler->Profile();
			return AnalyticsController::SaveEvent($profiler->userId, $profiler->name, $duration);
		}
	}
?>