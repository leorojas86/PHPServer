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
					$result = new ServiceResult(false, "Unsupported user service method '$method'", UtilsConstants::UNSUPPORTED_SERVICE_METHOD_ERROR_CODE); 
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
					$groupData 			= $result->data["data"] != null ? json_decode($result->data["data"]) : array();
					$files 				= isset($groupData["files"]) ? $groupData["files"] : array();
					$files[] 			= $fileName;
					$groupData["files"] = $files;
					$groupDataString 	= json_encode($groupData);
					$result 			= Group::UpdateData($groupId, $groupDataString);
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