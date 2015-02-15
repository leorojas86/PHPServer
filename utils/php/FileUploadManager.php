<?php 
	class ImageUploadManager
	{
		public static function UploadFile()
		{
			$target_dir 	= "uploads/";
			$target_file 	= $target_dir . basename($_FILES["fileToUpload"]["name"]);
			$fileType 		= pathinfo($target_file, PATHINFO_EXTENSION);

			error_log("file type = $fileType");

			// Check if file already exists
			if(file_exists($target_file)) 
			{
			    echo "Sorry, file already exists.";
			    return new ServiceResult(false, null, "Error executing Mysql query", Constants::MYSQL_ERROR_CODE);
			}

			// Check file size
			if($_FILES["fileToUpload"]["size"] > 500000) 
			{
			    echo "Sorry, your file is too large.";
			    $uploadOk = 0;
			}

			    if(move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) 
			    {
			        echo "The file ". basename( $_FILES["fileToUpload"]["name"]). " has been uploaded.";
			    } 
			    else 
			    {
			        echo "Sorry, there was an error uploading your file.";
			    }
		}
	} 
?>