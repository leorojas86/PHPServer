<?php
	class Tag
	{
		public static function UpdateTags($guid, $textTags, $datesTags, $valuesTags)
		{
			$result = Tag::AddGuid($guid);

			if($result->success)
			{
				if($textTags != null)
				{
					$texts  = explode(',', $textTags->text);
					$type   = $textTags->type;
					$result = Text::UpdateTextTags($guid, $texts, $type);

					if(!$result->success)
						return $result;
				}

				if($datesTags != null)
				{
					$result = Date::UpdateDateTags($guid, $datesTags);

					if(!$result->success)
						return $result;
				}

				if($valuesTags != null)
					$result = Value::UpdateValueTags($guid, $valuesTags);
			}

			return $result;
		}

		public static function Search($searchText, $searchDates, $searchValues)
		{
			$joins = "";
			$where = "WHERE ";

			if($searchText != null)
			{
				$joins .= Text::GetSearchJoin();
				$where .= Text::GetSearchWhere($searchText);
			}

			if($searchDates != null)
			{
				$joins .= "
							" . Date::GetSearchJoin($searchDates);

				if($where != "")
					$where .= " AND
								";

				$where .= Date::GetSearchWhere($searchDates);
			}

			if($searchValues != null)
			{
				$joins .= "
							" . Value::GetSearchJoin($searchValues);

				if($where != "")
					$where .= " AND
								";

				$where .= Value::GetSearchWhere($searchValues);
			}

			$sql = "SELECT guids.id AS guid
							FROM guids
							$joins
							$where
							LIMIT 500";

			$result = MySQLManager::ExecuteSelectRows($sql);

			return $result;
		}

		private static function AddGuid($guid)
		{
			$sql    = "INSERT IGNORE INTO guids (guid) VALUES ('$guid')";
			$result = MySQLManager::ExecuteInsert($sql);

			return $result;
		}
	}
?>
