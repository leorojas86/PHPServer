<?php 
	class Value
	{
		public static function GetSearchJoin()
		{
			return "INNER JOIN value_tags_per_id ON ids.id = value_tags_per_id.id";
		}

		public static function GetSearchWhere($searchValues)
		{
			$where  = " (";
			$length = count($searchValues);

			for($i = 0; $i < $length; $i++) 
			{
				if($i > 0)
					$where .= " and ";

				$value = $searchValues[$i];
				$type  = $value->type;
				$min   = $value->min;
				$max   = $value->max;
				$where .= "(value_tags_per_id.type = '$type' AND 
							value_tags_per_id.value >= '$min' AND
							value_tags_per_id.value <= '$max')";
			}

			$where .= " )";

			return $where;
		}

		public static function UpdateValueTags($id, $valueTags)
		{
			foreach($valueTags as $valueTag)
			{
				$result = Value::RemoveValueTag($id, $valueTag->type);

				if(!$result->success)
    				return $result;

    			$result = Value::AssociateValueTag($id, $valueTag->value, $valueTag->type);

    			if(!$result->success)
    				return $result;
			}

			return $result;
		}

		private static function RemoveValueTag($id, $type)
		{
			$sql 	= "DELETE FROM value_tags_per_id WHERE id = '$id' and type = '$type'";
			$result = MySQLManager::ExecuteDelete($sql, false);

			return $result;
		}

		private static function AssociateValueTag($id, $value, $type)
		{
			$sql 	= "INSERT INTO value_tags_per_id (id, value, type) VALUES ('$id', '$value', '$type')";
			$result = MySQLManager::ExecuteInsert($sql);

			return $result;
		}
	}
?>