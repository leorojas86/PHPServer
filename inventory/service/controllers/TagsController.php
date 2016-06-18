<?php 
	require_once "inventory/service/model/database/Tag.php";

	class TagsController
	{
		public static function Service($method, $payload)
		{
			switch ($method) 
			{
				case "UpdateTags":	$result = TagsController::UpdateTags($payload);	break;
				case "Search":		$result = TagsController::Search($payload);		break;
				default:
					$result = new ServiceResult(false, "Unsupported Tags service method '$method'", UtilsConstants::UNSUPPORTED_SERVICE_METHOD_ERROR_CODE); 
				break;
			}

			return $result;
		}

		private static function Search($payload)
		{
			$searchText = $payload->searchText;
			$result 	= Tag::Search($searchText);

			if($result->success)
			{
				$ids = array();

				foreach($result->data as $row)
					$ids[] = $row['id'];

				return new ServiceResult(true, $ids);
			}

			return $result;
		}

		private static function UpdateTags($payload)
		{
			$id 	 		= $payload->id;
			$tags    		= explode(',', $payload->tags);
			$removeOldTags 	= $payload->remove_old_tags;
			$result  		= Tag::UpdateTags($id, $tags);

			return $result;
		}
	}
?>