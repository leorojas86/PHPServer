<?php 
	class Tag
	{
		public static function UpdateTextTags($id, $textTags, $type)
		{
			$result = Tag::RemoveAllTextTagAssociations($id, $type);

			if($result->success)
			{
				foreach($textTags as $text)
				{
	    			$result = Tag::AssociateTextTag($id, $text, $type);

	    			if(!$result->success)
	    				return $result;
				}
			}

			return $result;
		}

		public static function UpdateDateTags($id, $dateTags)
		{
			foreach($dateTags as $dateTag)
			{
				$result = Tag::RemoveDateTag($id, $dateTag->type);

				if(!$result->success)
    				return $result;

    			$result = Tag::AssociateDateTag($id, $dateTag->date, $dateTag->type);

    			if(!$result->success)
    				return $result;
			}

			return $result;
		}

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

		public static function Search($searchText, $types)
		{
			$typesText 	= MySQLManager::GetListSQL($types);
			$where 		= "WHERE text_tags_per_id.type IN ($typesText)";
			$where 		.= " and text_tags.text = '$searchText'";
			$sql    	= "SELECT text_tags_per_id.id as id
							FROM text_tags_per_id
					   		INNER JOIN text_tags ON text_tags_per_id.text_tag_id = text_tags.id
					   		$where
					   		LIMIT 500";
			$result 	= MySQLManager::ExecuteSelectRows($sql);
			
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

		private static function AddTextTag($text)
		{
			$sql    = "INSERT INTO text_tags (text) VALUES ('$text')";
			$result = MySQLManager::ExecuteInsert($sql);

			return $result;
		}

		private static function ExistsTextTag($text)
		{
			$sql    = "SELECT id FROM text_tags WHERE text='$text'";
			$result = MySQLManager::ExecuteSelectRow($sql);

			if($result->success)
			{
				$exists = $result->data != null;
				$id     = $exists ? $result->data["id"] : -1;

				return new ServiceResult(true, array("exists" => $exists, "id" => $id));
			}
			
			return $result;
		}

		private static function RemoveAllTextTagAssociations($id, $type)
		{
			$sql 	= "DELETE FROM text_tags_per_id WHERE id = '$id' and type = '$type'";
			$result = MySQLManager::ExecuteDelete($sql, false);

			return $result;
		}

		private static function AssociateTextTag($id, $text, $type)
		{
			$result = Tag::ExistsTextTag($text);

			if($result->success)
			{
				if($result->data["exists"])
					$tagId = $result->data["id"];
				else
				{
					$result = Tag::AddTextTag($text);

					if($result->success)
						$tagId = $result->data["insert_id"]; 
					else
						return $result;
				}

				$sql 	= "INSERT INTO text_tags_per_id (id, text_tag_id, type) VALUES ('$id', '$tagId', '$type')";
				$result = MySQLManager::ExecuteInsert($sql);
			}

			return $result;
		}
	}
?>