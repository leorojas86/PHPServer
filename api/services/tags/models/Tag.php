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

			$sql = "SELECT ids.id AS id 
					FROM ids
					$joins
					$where
					LIMIT 500";

			//error_log("TEST ->  $sql");

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