<?php 
	require_once "utils/php/FileUploadManager.php";
	require_once "utils/php/GUIDUtils.php";

	class FilesService
	{
		public static function Service($payload)
		{
			switch($payload->method) 
			{
				case "Upload": 	
					$result = FilesService::Upload($payload);	
				break;
				default: 		 
					$result = new ServiceResult(false, "Unsupported Files service method '$method'", UtilsConstants::UNSUPPORTED_SERVICE_METHOD_ERROR_CODE); 
				break;
			}

			return $result;
		}

		private static function Upload($payload)
		{
			$userId 	= $payload->userId;
			$extension 	= $payload->extension;
			$fileData 	= $_POST["fileToUpload"];
			$guid 		= GUIDUtils::GetRandomGUID();
			$fileName	= "$userId $guid.$extension";
			$result  	= FileUploadManager::UploadFile($fileData, "uploads/$fileName");

			if($result->success)
				return new ServiceResult(true, array('file_name' => $fileName));

			return $result;
		}	
	}

?>