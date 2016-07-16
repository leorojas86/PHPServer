<?php 
	class Value
	{
		public static function UpdateValueTags($id, $valueTags)
		{
			foreach($valueTags as $valueTag)
			{
				$result = Tag::RemoveValueTag($id, $valueTag->type);

				if(!$result->success)
    				return $result;

    			$result = Tag::AssociateValueTag($id, $valueTag->value, $valueTag->type);

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