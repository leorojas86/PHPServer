<?php 
	class Tag
	{
		public static function UpdateTags($id, $textTags, $datesTags, $valuesTags)
		{
			$result = Tag::AddId($id);

			if($result->success)
			{
				if($textTags != null)
				{
					$texts  = explode(',', $textTags->text);
					$type   = $textTags->type;
					$result = Text::UpdateTextTags($id, $texts, $type);

					if(!$result->success)
						return $result;
				}

				if($datesTags != null)
				{
					$result = Date::UpdateDateTags($id, $datesTags);

					if(!$result->success)
						return $result;
				}

				if($valuesTags != null)
					$result = Value::UpdateValueTags($id, $valuesTags);
			}

			return $result;
		}

		public static function Search($searchText, $searchDates, $searchValues)
		{
			$text 		= $searchText->text;
			$typesText 	= MySQLManager::GetListSQL($searchText->types);
			$where 		= "WHERE text_tags_per_id.type IN ($typesText)";
			$where 		.= " and text_tags.text = '$text'";
			$sql    	= "SELECT ids.id as id 
							FROM ids
							INNER JOIN text_tags_per_id ON ids.id = text_tags_per_id.id
					   		INNER JOIN text_tags ON text_tags_per_id.text_tag_id = text_tags.id
					   		$where
					   		LIMIT 500";
			$result 	= MySQLManager::ExecuteSelectRows($sql);
			
			return $result;
		}

		private static function AddId($id)
		{
			$sql    = "INSERT IGNORE INTO ids (id) VALUES ('$id')";
			$result = MySQLManager::ExecuteInsert($sql);

			return $result;
		}
	}
?>