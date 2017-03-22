//Singleton instance
var FilesService = { instance : new FilesServiceClass() };

function FilesServiceClass()
{
	this.uploadFile = function(fileData, fileName, groupData, callback, onProgress)
	{
		var payload 				= ServiceClient.instance.getPayload("File", "Upload");
		payload["fileName"]	= fileName;
		var params 				  =
		{
			payload: JSON.stringify(payload),
			fileToUpload: fileData
		};

		ServiceClient.instance.requestWithParams(App.instance.ENVIRONMENT.SERVICES.FILES.URL, "POST", params, function(result) { onFileUploadCompleted(result, groupData, callback); }, onProgress);
	};

	function onFileUploadCompleted(result, groupData, callback)
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

			GroupsService.instance.updateGroupData(groupData.guid, JSON.stringify(data), callback);
		}
		else
			callback(result);
	}

	this.getFileURL = function(fileName)
	{
		return App.instance.ENVIRONMENT.SERVICES.FILES.URL + "?payload={fileName:'" + fileName + "'}" ;//App.instance.ENVIRONMENT.SERVICES.FILES.UPLOADS_FOLDER + fileName;
	}
}
