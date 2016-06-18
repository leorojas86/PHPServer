<?php 
	require_once "api/tags/Constants.php";
	require_once "api/tags/DBConfig.php";
	require_once "api/tags/Tag.php";
	require_once "api/general/Environment.php";

	class TagsService
	{
		public static function Service($method, $payload)
		{
			$result = Environment::Init();

			if($result->success)
			{
				switch ($method) 
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
			$result  		= Tag::UpdateTags($id, $tags, $removeOldTags);

			return $result;
		}
	}
?>