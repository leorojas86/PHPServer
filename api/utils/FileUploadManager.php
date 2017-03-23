<?php
	require_once "utils/UtilsConstants.php";
	require_once "utils/ServiceResult.php";

	class FileUploadManager
	{
		public static function UploadFile($fileData, $filePath)
		{
			//TODO: this is for images, handle differnt file types
			file_put_contents($filePath, base64_decode(explode(",", $fileData)[1]));
			return new ServiceResult(true);
		}

		public static function DownloadFile($fileData, $filePath)
		{
			$fileContent = file_get_contents($filePath);
			return new ServiceResult(true, $fileContent);
		}
	}
?>
