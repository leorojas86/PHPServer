<?php
	class Date
	{
		public static function GetSearchJoin($searchDates)
		{
			$join 	= "";
			$length = count($searchDates);

			for($i = 0; $i < $length; $i++)
				$join .= "INNER JOIN date_tags_per_guid AS dtpi$i ON objects.guid = dtpi$i.guid ";

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

				$date  = $searchDates[$i];
				$type  = $date->type;
				$min   = $date->min;
				$max   = $date->max;
				$where .= "(dtpi$i.type = '$type' AND dtpi$i.timespan >= '$min' AND dtpi$i.timespan <= '$max')";
			}

			$where .= " )";

			return $where;
		}

		public static function UpdateDateTags($guid, $dateTags)
		{
			foreach($dateTags as $dateTag)
			{
				$result = Date::RemoveDateTag($guid, $dateTag->type);

				if(!$result->success)
    				return $result;

    		$result = Date::AssociateDateTag($guid, $dateTag->timespan, $dateTag->type);

    		if(!$result->success)
    			return $result;
			}

			return $result;
		}

		private static function RemoveDateTag($guid, $type)
		{
			$sql 	= "DELETE FROM date_tags_per_guid WHERE guid = '$guid' and type = '$type'";
			$result = MySQLManager::ExecuteDelete($sql, false);

			return $result;
		}

		private static function AssociateDateTag($guid, $date, $type)
		{
			$sql 	  = "INSERT INTO date_tags_per_guid (guid, timespan, type) VALUES ('$guid', '$date', '$type')";
			$result = MySQLManager::ExecuteInsert($sql);

			return $result;
		}
	}
?>
