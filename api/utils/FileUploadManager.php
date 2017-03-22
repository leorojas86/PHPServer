<?php
	require_once "utils/UtilsConstants.php";
	require_once "utils/ServiceResult.php";

	class FileUploadManager
	{
		public static function UploadFile($fileData, $filePath)
		{
			file_put_contents($filePath, base64_decode(explode(",", $fileData)[1]));
			return new ServiceResult(true);
		}

		public static function DownloadFile($fileData, $filePath)
		{
			return new ServiceResult(true, file_get_contents($filePath));
		}
	}
?>
