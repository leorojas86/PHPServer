<?php 
	require_once "api/general/Environment.php";
	require_once "api/services/tags/DBConfig.php";
	require_once "api/services/tags/Tag.php";

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
			$searchText = $payload->searchText;
			$types      = $payload->types;
			$result 	= Tag::Search($searchText, $types);

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
			$id 	= $payload->id;
			$tags   = explode(',', $payload->tags);
			$type   = $payload->type;
			$result = Tag::UpdateTags($id, $tags, $type);

			return $result;
		}
	}
?>