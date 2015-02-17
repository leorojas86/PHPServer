<?php 

require_once "inventory_app/model/Environment.php";
require_once "inventory_app/model/database/User.php";
require_once "utils/php/FileUploadManager.php";

class FilesController
{
	public static function Service($method)
	{
		switch ($method) 
		{
			case "Upload": 	$result = FilesController::Upload();	break;
			default: 		 
				$result = new ServiceResult(false, null, "Unsupported user service method '$method'", UtilsConstants::UNSUPPORTED_SERVICE_METHOD_ERROR_CODE); 
			break;
		}

		return $result;
	}

	private static function Upload()
	{
		return ImageUploadManager::UploadFile("fileToUpload", "uploads");
	}
}

?>