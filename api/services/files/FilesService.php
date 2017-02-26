<?php
	require_once "general/Environment.php";
	require_once "utils/FileUploadManager.php";
	require_once "utils/GUIDUtils.php";

	class FilesService
	{
		public static function Service($payload)
		{
			$result = Environment::Init(false);

			if($result->success)
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
			}

			return $result;
		}

		private static function Upload($payload)
		{
			$fileData = $_POST["fileToUpload"];
			$fileName	= $payload->fileName;
			$result  	= FileUploadManager::UploadFile($fileData, "uploads/$fileName");

			if($result->success)
				return new ServiceResult(true, array('file_name' => $fileName));

			return $result;
		}
	}

?>
