<?php
	require_once "utils/UtilsConstants.php";
	require_once "utils/ServiceResult.php";

	class FileUploadManager
	{
		public static function UploadFile($fileData, $filePath)
		{
			//TODO: this is for images, handle differnt file types, get content type
			file_put_contents($filePath, base64_decode($fileData));
			return new ServiceResult(true);
		}

		public static function DownloadFile($filePath)
		{
			$fileContent = base64_encode(file_get_contents($filePath));
			return new ServiceResult(true, $fileContent);
		}
	}
?>
