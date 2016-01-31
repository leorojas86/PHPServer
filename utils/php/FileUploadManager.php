<?php 
	require_once "utils/php/UtilsConstants.php"; 
	require_once "utils/php/ServiceResult.php";

	class FileUploadManager
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
			        	return new ServiceResult(false, "Unknown error occurred uploading file", UtilsConstants::FILE_SIZE_IS_TO_LARGE_ERROR_CODE);
				}
				else
					return new ServiceResult(false, "File size is too large", UtilsConstants::FILE_SIZE_IS_TO_LARGE_ERROR_CODE);
			}
			else
				return new ServiceResult(false, "File already exists", UtilsConstants::FILE_ALREADY_EXIST_ERROR_CODE);
		}

		public static function UploadImageData($fileName, $destinationFolder)
		{
			$file 	 = $destinationFolder . "/" . "test.jpg";
			$img 	 = $_POST[$fileName];
			/*$img 	 = str_replace('data:image/png;base64,', '', $img);
			$img 	 = str_replace(' ', '+', $img);
			$data 	 = base64_decode($img);
			$success = file_put_contents($file, $data);*/

			file_put_contents($file, base64_decode(explode(",", $img)[1]));

			return new ServiceResult(true);
		}
	} 
?>