<?php 
	class Text
	{
		public static function UpdateTextTags($id, $textTags, $type)
		{
			$result = Text::RemoveAllTextTagAssociations($id, $type);

			if($result->success)
			{
				foreach($textTags as $text)
				{
	    			$result = Text::AssociateTextTag($id, $text, $type);

	    			if(!$result->success)
	    				return $result;
				}
			}

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
			$result = Text::ExistsTextTag($text);

			if($result->success)
			{
				if($result->data["exists"])
					$tagId = $result->data["id"];
				else
				{
					$result = Text::AddTextTag($text);

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