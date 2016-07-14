<?php 
	class Tag
	{
		public static function AddTag($name)
		{
			$sql    = "INSERT INTO text_tags (text) VALUES ('$name')";
			$result = MySQLManager::ExecuteInsert($sql);

			return $result;
		}

		public static function ExistsTag($name)
		{
			$sql    = "SELECT id FROM text_tags WHERE text='$name'";
			$result = MySQLManager::ExecuteSelectRow($sql);

			if($result->success)
			{
				$exists = $result->data != null;
				$id     = $exists ? $result->data["id"] : -1;

				return new ServiceResult(true, array("exists" => $exists, "id" => $id));
			}
			
			return $result;
		}

		public static function UpdateTags($id, $tags, $type)
		{
			$result = Tag::RemoveAllTagAssociations($id, $type);

			if($result->success)
			{
				foreach($tags as $tagName)
				{
	    			$result = Tag::AssociateTag($id, $tagName, $type);

	    			if(!$result->success)
	    				return $result;
				}
			}

			return $result;
		}

		private static function RemoveAllTagAssociations($id, $type)
		{
			$sql 	= "DELETE FROM text_tags_per_id WHERE id = '$id' and type = '$type'";
			$result = MySQLManager::ExecuteDelete($sql, false);

			return $result;
		}

		private static function AssociateTag($id, $tagName, $type)
		{
			$result = Tag::ExistsTag($tagName);

			if($result->success)
			{
				if($result->data["exists"])
					$tagId = $result->data["id"];
				else
				{
					$result = Tag::AddTag($tagName);

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
	}
?>