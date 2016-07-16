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
			$joins = "";
			$where = "";

			if($searchText != null)
			{
				$joins .= Text::GetSearchJoin($searchText);
				$where .= Text::GetSearchWhere($searchText);
			}

			$sql    = "SELECT ids.id as id 
						FROM ids
						$joins
					   	$where
					   	LIMIT 500";
			$result = MySQLManager::ExecuteSelectRows($sql);
			
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