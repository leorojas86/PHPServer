//Singleton instance
var ServiceClient = { instance : new ServiceClientClass() };

function ServiceClientClass()
{
	//Variables
	this.loggedUser = null;

	var _onInitializationCompleted = null;

	//Initialization
	var loggedUser = CacheUtils.instance.get("LoggedUser");

	if(loggedUser != null)
	{
		this.loggedUser = JSON.parse(loggedUser);
		console.log("session and logged user info loaded from cache");
	}

	//Methods
	this.initialize = function(onInitializationCompleted)
	{
		this._onInitializationCompleted = onInitializationCompleted;
		this.notifyOnInitializationCompleted();
	};

	this.notifyOnInitializationCompleted = function(success)
	{
		this._onInitializationCompleted(success);
		this._onInitializationCompleted = null;
	};

	this.register = function(name, password, email, callback)
	{
		var payload 		= this.getPayload("User", "Register");
		payload["name"]  	= name;
		payload["email"]   	= email;
		payload["password"] = password;

		this.request("POST", payload, callback);
	};

	this.login = function(email, password, callback)
	{
		var payload 		= this.getPayload("User", "Login");
		payload["email"]  	= email;
		payload["password"] = password;
		var loginCallback	=  function(resultData) { ServiceClient.instance.onLoginCallback(resultData, callback) };
		
		this.request("POST", payload, loginCallback);
	};

	this.updateUserData = function(data, callback)
	{
		var payload 	= this.getPayload("User", "UpdateData");
		payload["data"] = data;

		this.request("POST", payload, callback);
	};

	this.onLoginCallback = function(resultData, callback)
	{
		if(resultData.success)
		{
			this.loggedUser = resultData.data;
			CacheUtils.instance.set("LoggedUser", JSON.stringify(this.loggedUser));
		}

		callback(resultData);
	};

	this.loadRootGroup = function(callback)
	{
		var payload = this.getPayload("Group", "GetRootGroup");

		this.request("POST", payload, callback);
	};

	this.loadGroup = function(groupId, callback)
	{
		var payload 	= this.getPayload("Group", "GetGroup");
		payload["id"]   = groupId;

		this.request("POST", payload, callback);
	};

	this.addSubGroup = function(parentGroupId, newGroupName, type, data, callback)
	{
		var payload 				= this.getPayload("Group", "AddSubGroup");
		payload["parentGroupId"]   	= parentGroupId;
		payload["name"]   			= newGroupName;
		payload["type"]   			= type;
		payload["data"]   			= data;

		this.request("POST", payload, function(result) { ServiceClient.instance.onAddSubGroupCallback(result, payload, callback); });
	};

	this.onAddSubGroupCallback = function(result, payload, callback)
	{
		if(result.success)
		{
			var tagsData = payload["name"];
			this.updateSearchTags(result.data.insert_id, tagsData, false);//TODO: queue this steps
			callback(result);
		}
		else
			callback(result);
	};

	this.deleteGroup = function(groupId, callback)
	{
		var payload 	= this.getPayload("Group", "Delete");
		payload["id"]   = groupId;

		this.request("POST", payload, callback);
	};

	this.renameGroup = function(groupId, name, callback)
	{
		var payload 	= this.getPayload("Group", "Rename");
		payload["id"]   = groupId;
		payload["name"] = name;

		this.request("POST", payload, callback);
		this.updateSearchTags(groupId, name, false);//TODO: queue this steps
	};

	this.moveGroup = function(groupId, parentGroupId, callback)
	{
		var payload 				= this.getPayload("Group", "Move");
		payload["id"]   			= groupId;
		payload["parentGroupId"]   	= parentGroupId;

		this.request("POST", payload, callback);
	};

	this.updateGroupData = function(groupId, groupName, groupData, callback)
	{
		var payload 	= this.getPayload("Group", "UpdateData");
		payload["id"]   = groupId;
		payload["data"] = groupData;

		this.request("POST", payload, callback);

		var tagsData = groupData + " " + groupName;
		this.updateSearchTags(groupId, tagsData, true);//TODO: queue this steps
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
		payload["userId"] 	= this.loggedUser != null ? this.loggedUser.id : null;
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

	this.logout = function()
	{
		this.loggedUser = null;

		CacheUtils.instance.clear();
	};
}


