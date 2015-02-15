<?php 
	require_once "utils/php/UtilsConstants.php"; 
	require_once "utils/php/ServiceResult.php";

	class ImageUploadManager
	{
		public static function UploadFile($fileName, $destinationFolder)
		{
			$target_file 	= $destinationFolder . "/" . basename($_FILES[$fileName]["name"]);
			$fileType 		= pathinfo($target_file, PATHINFO_EXTENSION);

			if(!file_exists($target_file))//Check if file already exists
			{
				if($_FILES[$fileName]["size"] < UtilsConstants::MAX_UPLOAD_FILE_SIZE)//Check file size
				{
					if(move_uploaded_file($_FILES[$fileName]["tmp_name"], $target_file)) 
			        	return new ServiceResult(true);
			    	else 
			        	return new ServiceResult(false, null, "Unknown error occurred uploading file", UtilsConstants::FILE_SIZE_IS_TO_LARGE_ERROR_CODE);
				}
				else
					return new ServiceResult(false, null, "File size is too large", UtilsConstants::FILE_SIZE_IS_TO_LARGE_ERROR_CODE);
			}
			else
				return new ServiceResult(false, null, "File already exists", UtilsConstants::FILE_ALREADY_EXIST_ERROR_CODE);
		}
	} 
?>