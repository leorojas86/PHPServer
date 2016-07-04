//Singleton instance
var FilesService = { instance : new FilesServiceClass() };

function FilesServiceClass()
{
	this.uploadFile = function(fileData, extension, groupData, callback, onProgress)
	{
		var payload 			= ServiceClient.instance.getPayload("File", "Upload");
		payload["extension"]   	= extension;

		var params 				= new Object();
		params["payload"]   	= JSON.stringify(payload);
		params["fileToUpload"]  = fileData;

		ServiceClient.instance.requestWithParams(Constants.SERVICES.FILES.URL, "POST", params, function(result) { FilesService.instance.onFileUploadCompleted(result, groupData, callback); });
	};

	this.onFileUploadCompleted = function(result, groupData, callback)
	{
		if(result.success)
		{
			var data = new Object();

			try
			{
				data = JSON.parse(groupData.data);
			}
			catch(e)
			{
				//Remove old data if the data is not a valid JSON
			}
			
			var files = data.files == null ? new Array() : data.files;
			files.push(result.data.file_name);
			data.files = files;

			GroupsService.instance.updateGroupData(groupData.id, groupData.name, JSON.stringify(data), callback);
		}
		else
			callback(result);
	};

	this.getFileURL = function(fileName)
	{
		return Constants.SERVICES.FILES.URL + "/uploads/" + fileName;
	}
}