<?php 
	class Date
	{
		public static function UpdateDateTags($id, $dateTags)
		{
			foreach($dateTags as $dateTag)
			{
				$result = Date::RemoveDateTag($id, $dateTag->type);

				if(!$result->success)
    				return $result;

    			$result = Date::AssociateDateTag($id, $dateTag->date, $dateTag->type);

    			if(!$result->success)
    				return $result;
			}

			return $result;
		}

		private static function RemoveDateTag($id, $type)
		{
			$sql 	= "DELETE FROM date_tags_per_id WHERE id = '$id' and type = '$type'";
			$result = MySQLManager::ExecuteDelete($sql, false);

			return $result;
		}

		private static function AssociateDateTag($id, $date, $type)
		{
			$sql 	= "INSERT INTO date_tags_per_id (id, date, type) VALUES ('$id', '$date', '$type')";
			$result = MySQLManager::ExecuteInsert($sql);

			return $result;
		}
	}
?>