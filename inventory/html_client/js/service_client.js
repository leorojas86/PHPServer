//Singleton instance
var ServiceClient = { instance : new ServiceClientClass() };

function ServiceClientClass()
{
	//Methods
	this.initialize = function(onInitializationCompleted)
	{
		UsersService.instance.initialize(onInitializationCompleted);
	};

	this.updateSearchTags = function(groupId, data, removeOldTags)
	{
		var regexp 	= new RegExp("]|{|}|,|:|<|>|=|\t|\"", 'g');
		var regexp2 = new RegExp(" +", 'g');
		var tags 	= data.replace(regexp, '').replace(/\[/g,'').replace(regexp2, ',').toLowerCase();

		//alert(tags);

		//TODO: queue this steps
		var payload 				= this.getPayload("Tag", "UpdateTags");
		payload["id"]   			= groupId;
		payload["tags"] 			= tags;
		payload["remove_old_tags"] 	= removeOldTags;

		this.request("POST", payload, function(result) {});
	};

	this.searchGroups = function(searchText, callback)
	{
		var payload 			= this.getPayload("Tag", "Search");
		payload["searchText"]   = searchText.toLowerCase();

		this.request("POST", payload, function(resultData) { ServiceClient.instance.onSearchGroupIdsCallback(resultData, callback); });
	};

	this.onSearchGroupIdsCallback = function(resultData, callback)
	{
		if(resultData.success && resultData.data.length > 0)
		{
			var payload 	 = this.getPayload("Group", "GetGroups");
			payload["ids"]   = resultData.data;
			this.request("POST", payload, callback);
		}
		else
			callback(resultData);
	};

	this.profile = function(key, duration)
	{
		/*var name   	= "Profile_" + key; 
		var params 	= "service=Analytic&method=Event&name=" + name + "&data=" + duration;
		params 		= this.addSessionId(params);
		RequestUtils.instance.request(Constants.API_URL, "POST", function(xmlhttp, success, duration) 
	{ 
		var test = duration;
	}, params);*/
	};

	this.uploadFile = function(fileData, extension, groupData, callback, onProgress)
	{
		var payload 			= this.getPayload("File", "Upload");
		payload["extension"]   	= extension;

		var params 				= new Object();
		params["payload"]   	= JSON.stringify(payload);
		params["fileToUpload"]  = fileData;

		this.requestWithParams("POST", params, function(result) { ServiceClient.instance.onFileUploadCompleted(result, groupData, callback); });
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

			this.updateGroupData(groupData.id, groupData.name, JSON.stringify(data), callback);
		}
		else
			callback(result);
	};

	this.request = function(method, payload, callback)
	{
		var params = "payload=" + JSON.stringify(payload);

		this.requestWithParams(method, params, callback);
	};

	this.requestWithParams = function(method, params, callback)
	{
		RequestUtils.instance.request(Constants.API_URL, method, function(xmlhttp, success, duration) { ServiceClient.instance.onRequestResponse(params, xmlhttp, success, callback, duration); }, params);
	};

	this.getPayload = function(service, method)
	{
		var payload 		= new Object();
		payload["userId"] 	= UsersService.instance.loggedUser != null ? UsersService.instance.loggedUser.id : null;
		payload["service"]  = service;
		payload["method"]   = method;

		return payload;
	};

	this.onRequestResponse = function(params, xmlhttp, success, callback, duration)
	{
		this.profile(params, duration);

		var resultData = success ? JSON.parse(xmlhttp.responseText) : { success : false, data : xmlhttp.responseText };

		if(resultData.success)
		{
			CacheUtils.instance.set(params, xmlhttp.responseText);
		}
		else
		{
			console.log("Error Response Text = " + xmlhttp.responseText);

			var cachedResult = CacheUtils.instance.get(params);

			if(cachedResult != null)
			{
				resultData = JSON.parse(cachedResult);
				console.log("Getting cached response = " + cachedResult);
			}
			else
				console.log("Could not get cached response = " + cachedResult);
		}

		callback(resultData);
	};
}


