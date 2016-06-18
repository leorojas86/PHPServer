<?php 

	require_once "inventory/service/model/Environment.php";
	require_once "inventory/service/model/database/User.php";
	require_once "utils/php/FileUploadManager.php";
	require_once "utils/php/GUIDUtils.php";
	require_once "inventory/service/model/database/Group.php";


	class FilesController
	{
		public static function Service($method, $payload)
		{
			switch ($method) 
			{
				case "Upload": 	
					$result = FilesController::Upload($payload);	
				break;
				default: 		 
					$result = new ServiceResult(false, "Unsupported Files service method '$method'", UtilsConstants::UNSUPPORTED_SERVICE_METHOD_ERROR_CODE); 
				break;
			}

			return $result;
		}

		private static function Upload($payload)
		{
			$groupId 	= $payload->groupId;
			$extension 	= $payload->extension;
			$fileData 	= $_POST["fileToUpload"];
			$userId   	= $payload->userId;
			$guid 		= GUIDUtils::GetRandomGUID();
			$fileName	= "$userId $guid.$extension";
			$result  	= FileUploadManager::UploadFile($fileData, "uploads/$fileName");

			if($result->success)
			{
				$result = Group::GetGroupData($groupId);

				if($result)
				{
					$stringData			= $result->data["data"];
					$groupData 			= $stringData != null ? json_decode($stringData) : new StdClass();
					$files 				= isset($groupData->files) ? $groupData->files : array();
					$files[] 			= $fileName;
					$groupData->files   = $files;
					$stringData 		= json_encode($groupData);
					$result 			= Group::UpdateData($groupId, $stringData);
				}
			}

			return $result;
		}	
	}

?>