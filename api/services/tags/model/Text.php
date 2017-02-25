<?php
	class Text
	{
		public static function GetSearchJoin()
		{
			return "INNER JOIN text_tags_per_guid ON guids.guid = text_tags_per_guid.id
					INNER JOIN text_tags ON text_tags_per_guid.text_tag_id = text_tags.id";
		}

		public static function GetSearchWhere($searchText)
		{
			$text 			= $searchText->text;
			$typesText 	= MySQLManager::GetListSQL($searchText->types);

			return "( text_tags_per_guid.type IN ($typesText) AND text_tags.text = '$text' )";
		}

		public static function UpdateTextTags($guid, $textTags, $type)
		{
			$result = Text::RemoveAllTextTagAssociations($guid, $type);

			if($result->success)
			{
				foreach($textTags as $text)
				{
	    			$result = Text::AssociateTextTag($guid, $text, $type);

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
			$sql    = "SELECT guid FROM text_tags WHERE text='$text'";
			$result = MySQLManager::ExecuteSelectRow($sql);

			if($result->success)
			{
				$exists = $result->data != null;
				$guid   = $exists ? $result->data["guid"] : -1;

				return new ServiceResult(true, array("exists" => $exists, "guid" => $guid));
			}

			return $result;
		}

		private static function RemoveAllTextTagAssociations($guid, $type)
		{
			$sql 	= "DELETE FROM text_tags_per_guid WHERE guid = '$guid' and type = '$type'";
			$result = MySQLManager::ExecuteDelete($sql, false);

			return $result;
		}

		private static function AssociateTextTag($guid, $text, $type)
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

				$sql 	= "INSERT INTO text_tags_per_guid (guid, text_tag_id, type) VALUES ('$guid', '$tagId', '$type')";
				$result = MySQLManager::ExecuteInsert($sql);
			}

			return $result;
		}
	}
?>
