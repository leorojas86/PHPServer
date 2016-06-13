<?php 

	require_once "inventory/service/model/database/Tag.php";

	class TagsController
	{
		public static function Service($method, $payload)
		{
			switch ($method) 
			{
				case "UpdateData":			$result = GroupsController::UpdateGroupData($payload);	break;
				case "Search":				$result = GroupsController::SearchGroup($payload);		break;
				default:
					$result = new ServiceResult(false, "Unsupported Search service method '$method'", UtilsConstants::UNSUPPORTED_SERVICE_METHOD_ERROR_CODE); 
				break;
			}

			return $result;
		}

		private static function SearchGroup($payload)
		{
			$searchText = $payload->searchText;
			$result 	= Group::SearchGroups($searchText);	

			if($result->success)
			{
				$groupsByName = $result->data;
				$result 	  = Tag::SearchGroups($searchText);

				if($result->success)
					$result->data = GroupsController::MergeSearchResults($result->data, $groupsByName); 
			}

			return $result;
		}

		private static function MergeSearchResults($result1, $result2)
		{
			$result = array();
			$ids    = array();

			foreach($result1 as $value) 
			{
				$result[] 	= $value;
				$ids[] 		= $value["id"];
			}

			foreach($result2 as $value) 
			{
				$id = $value["id"];

				if(!in_array($id, $ids))
				{
					$result[] 	= $value;
					$ids[] 		= $id;
				}
			}

			return $result;
		}

		private static function RenameGroup($payload)
		{
			$groupId   = $payload->id;
			$groupName = $payload->name;

			return Group::Rename($groupId, $groupName);
		}

		private static function DeleteGroup($payload)
		{
			$groupId = $payload->id;
			return Group::Delete($groupId);
		}

		private static function UpdateGroupData($payload)
		{
			$groupId = $payload->id;
			$data    = $payload->data;

			$result = Group::UpdateData($groupId, $data);

			if($result->success)
				$result = Tag::UpdateSearchTags($groupId, $data);

			return $result;
		}
	}

?>