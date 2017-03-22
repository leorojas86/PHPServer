<?php
	require_once "utils/UtilsConstants.php";
	require_once "utils/ServiceResult.php";

	class FileUploadManager
	{
		public static function UploadFile($fileData, $filePath)
		{
			//$dir = dirname($filePath);

			//if(!file_exists($dir) && !is_dir($dir))
    			//mkdir($dir);

			file_put_contents($filePath, base64_decode(explode(",", $fileData)[1]));

			return new ServiceResult(true);
		}
	}
?>
