<?php 
	require_once "inventory/service/model/database/Tag.php";

	class TagsController
	{
		public static function Service($method, $payload)
		{
			switch ($method) 
			{
				case "UpdateTags":			$result = GroupsController::UpdateTags($payload);	break;
				case "Search":				$result = GroupsController::Search($payload);		break;
				default:
					$result = new ServiceResult(false, "Unsupported Search service method '$method'", UtilsConstants::UNSUPPORTED_SERVICE_METHOD_ERROR_CODE); 
				break;
			}

			return $result;
		}

		private static function Search($payload)
		{
			$searchText 	= $payload->searchText;
			$result 	  	= Tag::Search($searchText);

			return $result;
		}

		private static function UpdateTags($payload)
		{
			$groupId = $payload->id;
			$data    = $payload->data;
			$result  = Tag::UpdateTags($groupId, $data);

			return $result;
		}
	}
?>