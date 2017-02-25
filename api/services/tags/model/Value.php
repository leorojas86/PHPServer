<?php
	class Value
	{
		public static function GetSearchJoin($searchValues)
		{
			$join 	= "";
			$length = count($searchValues);

			for($i = 0; $i < $length; $i++)
				$join .= "INNER JOIN value_tags_per_guid AS vtpi$i ON guids.guid = vtpi$i.guid ";

			return $join;
		}

		public static function GetSearchWhere($searchValues)
		{
			$where  = " (";
			$length = count($searchValues);

			for($i = 0; $i < $length; $i++)
			{
				if($i > 0)
					$where .= " AND ";

				$value = $searchValues[$i];
				$type  = $value->type;
				$min   = $value->min;
				$max   = $value->max;
				$where .= "(vtpi$i.type = '$type' AND vtpi$i.value >= '$min' AND vtpi$i.value <= '$max')";
			}

			$where .= " )";

			return $where;
		}

		public static function UpdateValueTags($guid, $valueTags)
		{
			foreach($valueTags as $valueTag)
			{
				$result = Value::RemoveValueTag($guid, $valueTag->type);

				if(!$result->success)
    				return $result;

    			$result = Value::AssociateValueTag($guid, $valueTag->value, $valueTag->type);

    			if(!$result->success)
    				return $result;
			}

			return $result;
		}

		private static function RemoveValueTag($guid, $type)
		{
			$sql 	= "DELETE FROM value_tags_per_guid WHERE guid = '$guid' and type = '$type'";
			$result = MySQLManager::ExecuteDelete($sql, false);

			return $result;
		}

		private static function AssociateValueTag($guid, $value, $type)
		{
			$sql 	= "INSERT INTO value_tags_per_guid (guid, value, type) VALUES ('$guid', '$value', '$type')";
			$result = MySQLManager::ExecuteInsert($sql);

			return $result;
		}
	}
?>
