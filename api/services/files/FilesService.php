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
					case "Download":
						$result = FilesService::Download($payload);
					break;
					default:
						$result = new ServiceResult(false, "Unsupported Files service method '$method'", UtilsConstants::UNSUPPORTED_SERVICE_METHOD_ERROR_CODE);
					break;
				}
			}

			return $result;
		}

		private static function GetFilePath($fileName)
		{
			$path 				 	= dirname(__FILE__);
			$uploadsFolder 	= "$path/../../../uploads";
			return "$uploadsFolder/$fileName";
		}

		private static function Upload($payload)
		{
			$fileData = $_POST["fileToUpload"];
			$fileName	= $payload->fileName;
			$filePath = FilesService::GetFilePath($fileName);
			$result 	= FileUploadManager::UploadFile($fileData, $filePath);

			if($result->success)
				return new ServiceResult(true, array('file_name' => $fileName));

			return $result;
		}

		private static function Download($payload)
		{
			$fileName	= $payload->fileName;
			$filePath = FilesService::GetFilePath($fileName);
			return FileUploadManager::DownloadFile($filePath);
		}
	}

?>
