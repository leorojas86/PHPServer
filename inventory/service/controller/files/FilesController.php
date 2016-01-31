<?php 

	require_once "inventory/service/model/Environment.php";
	require_once "inventory/service/model/database/User.php";
	require_once "utils/php/FileUploadManager.php";

	class FilesController
	{
		public static function Service($method)
		{
			switch ($method) 
			{
				case "Upload": 	$result = FilesController::Upload();	break;
				default: 		 
					$result = new ServiceResult(false, "Unsupported user service method '$method'", UtilsConstants::UNSUPPORTED_SERVICE_METHOD_ERROR_CODE); 
				break;
			}

			return $result;
		}

		private static function Upload()
		{
			//return FileUploadManager::UploadFile("fileToUpload", "uploads");
			return FileUploadManager::UploadImageData("fileToUpload", "uploads");
		}
	}

?>