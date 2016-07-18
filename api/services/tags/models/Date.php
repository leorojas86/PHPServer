<?php 
	class Date
	{
		public static function GetSearchJoin($searchDates)
		{
			$join 	= "";
			$length = count($searchDates);

			for($i = 0; $i < $length; $i++) 
				$join .= "INNER JOIN date_tags_per_id AS dtpi$i ON ids.id = dtpi$i.id ";

			return $join;
		}

		public static function GetSearchWhere($searchDates)
		{
			$where  = " (";
			$length = count($searchDates);

			for($i = 0; $i < $length; $i++) 
			{
				if($i > 0)
					$where .= " AND ";

				$date = $searchDates[$i];
				$type  = $value->type;
				$min   = $value->min;
				$max   = $value->max;
				$where .= "(dtpi$i.type = '$type' AND dtpi$i.date >= '$min' AND dtpi$i.date <= '$max')";
			}

			$where .= " )";

			return $where;
		}

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