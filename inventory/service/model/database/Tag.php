<?php 
	class Tag
	{
		public static function AddTag($name, $type)
		{
			$sql    = "INSERT INTO tags (name, type) VALUES ('$name', '$type')";
			$result = MySQLManager::ExecuteInsert($sql);

			return $result;
		}

		public static function ExistsTag($name, $type)
		{
			$sql    = "SELECT id FROM tags WHERE name='$name' AND type='$type'";
			$result = MySQLManager::ExecuteSelectRow($sql);

			if($result->success)
			{
				$exists = $result->data != null;
				$id     = $exists ? $result->data["id"] : -1;

				return new ServiceResult(true, array("exists" => $exists, "id" => $id));
			}
			
			return $result;
		}

		public static function UpdateTags($id, $tags)
		{
			$result = Tag::RemoveAllTagAssociations($id, Constants::SEARCH_TAG_ID);

			if($result->success)
			{
				foreach($tags as $tagName)
				{
	    			$result = Tag::AssociateTag($id, $tagName, Constants::SEARCH_TAG_ID);

	    			if(!$result->success)
	    				return $result;
				}
			}

			return $result;
		}

		private static function RemoveAllTagAssociations($id, $type)
		{
			$sql 	= "DELETE FROM tags_per_id WHERE id = '$id'";
			$result = MySQLManager::ExecuteDelete($sql, false);

			return $result;
		}

		private static function AssociateTag($id, $tagName, $type)
		{
			$result = Tag::ExistsTag($tagName, $type);

			if($result->success)
			{
				if($result->data["exists"])
					$tagId = $result->data["id"];
				else
				{
					$result = Tag::AddTag($tagName, $type);

					if($result->success)
						$tagId = $result->data["insert_id"]; 
					else
						return $result;
				}

				$sql 	= "INSERT INTO tags_per_id (id, tag_id) VALUES ('$id', '$tagId')";
				$result = MySQLManager::ExecuteInsert($sql);

				return $result;
			}
			else
				return $result;
		}

		public static function Search($searchText)
		{
			$searchType = Constants::SEARCH_TAG_ID;
			$sql    	= "SELECT tags_per_id.id as id
							FROM tags_per_id
					   		INNER JOIN tags ON tags_per_id.tag_id = tags.id
					   		WHERE tags.type = '$searchType' and tags.name LIKE '$searchText'";
			$result 	= MySQLManager::ExecuteSelectRows($sql);
			
			return $result;
		}
	}
?>