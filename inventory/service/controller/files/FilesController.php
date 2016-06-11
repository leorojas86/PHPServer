<?php 

	require_once "inventory/service/model/Environment.php";
	require_once "inventory/service/model/database/User.php";
	require_once "utils/php/FileUploadManager.php";
	require_once "inventory/service/model/database/Group.php";


	class FilesController
	{
		public static function Service($method)
		{
			switch ($method) 
			{
				case "Upload": 	
					$result = FilesController::Upload();	
				break;
				default: 		 
					$result = new ServiceResult(false, "Unsupported Files service method '$method'", UtilsConstants::UNSUPPORTED_SERVICE_METHOD_ERROR_CODE); 
				break;
			}

			return $result;
		}

		private static function Upload()
		{
			$groupId 	= $_POST["groupId"];
			$extension 	= $_POST["extension"];
			$fileData 	= $_POST["fileToUpload"];
			$userId   	= SessionManager::GetUserData()["id"];
			$guid 		= FilesController::GetRandomGUID();
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

		private static function GetRandomGUID()
		{
			return sprintf('%04X%04X-%04X-%04X-%04X-%04X%04X%04X', 
							mt_rand(0, 65535), 
							mt_rand(0, 65535), 
							mt_rand(0, 65535), 
							mt_rand(16384, 20479), 
							mt_rand(32768, 49151), 
							mt_rand(0, 65535), 
							mt_rand(0, 65535), 
							mt_rand(0, 65535));
		}		
	}

?>