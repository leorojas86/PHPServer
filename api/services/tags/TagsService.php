<?php 
	require_once "general/Environment.php";
	require_once "services/tags/DBConfig.php";
	require_once "services/tags/models/Tag.php";
	require_once "services/tags/models/Text.php";
	require_once "services/tags/models/Value.php";
	require_once "services/tags/models/Date.php";

	class TagsService
	{
		public static function Service($payload)
		{
			$result = Environment::Init(true);

			if($result->success)
			{
				switch($payload->method) 
				{
					case "UpdateTags":	$result = TagsService::UpdateTags($payload);	break;
					case "Search":		$result = TagsService::Search($payload);		break;
					default:
						$result = new ServiceResult(false, "Unsupported Tags service method '$method'", UtilsConstants::UNSUPPORTED_SERVICE_METHOD_ERROR_CODE); 
					break;
				}
			}

			return $result;
		}

		private static function Search($payload)
		{
			$searchText 	= isset($payload->searchText) ? $payload->searchText 		: null;
			$searchDates 	= isset($payload->searchDates) ? $payload->searchDates 		: null;
			$searchValues 	= isset($payload->searchValues) ? $payload->searchValues 	: null;
			$result 		= Tag::Search($searchText, $searchDates, $searchValues);

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
			$id 		= $payload->id;
			$textTags 	= isset($payload->texts) ? $payload->texts 		: null;
			$dateTags 	= isset($payload->dates) ? $payload->dates 		: null;
			$valuesTags = isset($payload->values) ? $payload->values 	: null;
			$result 	= Tag::UpdateTags($id, $textTags, $dateTags, $valuesTags);

			return $result;
		}
	}
?>