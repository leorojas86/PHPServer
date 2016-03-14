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

		public static function UpdateSearchTags($groupId, $groupData)
		{
			$result = Tag::RemoveAllTagAssociations($groupId, Constants::SEARCH_TAG_ID);

			if($result->success)
			{
				$search  	= array("{", "}", "[", "]", ",", ":", '"', "<", ">", "/", "=", "\t");
				$replace  	= ' ';
				$groupData 	= str_replace($search, $replace, $groupData);
				$groupData 	= strtolower($groupData);
				$groupData 	= preg_split('@ @', $groupData, null, PREG_SPLIT_NO_EMPTY);
				$groupData  = array_unique($groupData);

				foreach($groupData as $tagName)
				{
	    			$result = Tag::AssociateTag($groupId, $tagName, Constants::SEARCH_TAG_ID);

	    			if(!$result->success)
	    				return $result;
				}
			}

			return $result;
		}

		private static function RemoveAllTagAssociations($groupId, $type)
		{
			$sql 	= "DELETE FROM tags_per_groups WHERE group_id = '$groupId'";
			$result = MySQLManager::ExecuteDelete($sql, false);

			return $result;
		}

		private static function AssociateTag($groupId, $tagName, $type)
		{
			$result = Tag::ExistsTag($tagName, $type);

			if($result->success)
			{
				if($result->data["exists"])
					$tagId = $result->data["id"];
				else
				{
					$result = Tag::AddTag($tagName,$type);

					if($result->success)
						$tagId = $result->data["insert_id"]; 
					else
						return $result;
				}

				error_log("tag name '$tagName' id '$tagId'");
				$sql 	= "INSERT INTO tags_per_groups (group_id, tag_id) VALUES ('$groupId', '$tagId')";
				$result = MySQLManager::ExecuteInsert($sql);

				return $result;
			}
			else
				return $result;
		}
	}
?>