//Singleton instance
var ServiceClient = { instance : new ServiceClientClass() };

//Variables
ServiceClientClass.prototype.loggedUser = null;

ServiceClientClass.prototype._onInitializationCompleted = null;

//Constructors
function ServiceClientClass()
{
	var loggedUser = CacheUtils.instance.get("LoggedUser");

	if(loggedUser != null)
	{
		this.loggedUser = JSON.parse(loggedUser);
		console.log("session and logged user info loaded from cache");
	}
}

//Methods
ServiceClientClass.prototype.initialize = function(onInitializationCompleted)
{
	this._onInitializationCompleted = onInitializationCompleted;
	this.notifyOnInitializationCompleted();
};

ServiceClientClass.prototype.notifyOnInitializationCompleted = function(success)
{
	this._onInitializationCompleted(success);
	this._onInitializationCompleted = null;
};

ServiceClientClass.prototype.register = function(name, password, email, callback)
{
	var payload 		= this.getPayload("User", "Register");
	payload["name"]  	= name;
	payload["email"]   	= email;
	payload["password"] = password;

	this.request("POST", payload, callback);
};

ServiceClientClass.prototype.login = function(email, password, callback)
{
	var payload 		= this.getPayload("User", "Login");
	payload["email"]  	= email;
	payload["password"] = password;
	var loginCallback	=  function(resultData) { ServiceClient.instance.onLoginCallback(resultData, callback) };
	
	this.request("POST", payload, loginCallback);
};

ServiceClientClass.prototype.updateUserData = function(data, callback)
{
	var payload 	= this.getPayload("User", "UpdateData");
	payload["data"] = data;

	this.request("POST", payload, callback);
};

ServiceClientClass.prototype.onLoginCallback = function(resultData, callback)
{
	if(resultData.success)
	{
		this.loggedUser = resultData.data;
		CacheUtils.instance.set("LoggedUser", JSON.stringify(this.loggedUser));
	}

	callback(resultData);
};

ServiceClientClass.prototype.loadRootGroup = function(callback)
{
	var payload = this.getPayload("Group", "GetRootGroup");

	this.request("POST", payload, callback);
};

ServiceClientClass.prototype.loadGroup = function(groupId, callback)
{
	var payload 	= this.getPayload("Group", "GetGroup");
	payload["id"]   = groupId;

	this.request("POST", payload, callback);
};

ServiceClientClass.prototype.addSubGroup = function(parentGroupId, newGroupName, type, data, callback)
{
	var payload 				= this.getPayload("Group", "AddSubGroup");
	payload["parentGroupId"]   	= parentGroupId;
	payload["name"]   			= newGroupName;
	payload["type"]   			= type;
	payload["data"]   			= data;

	this.request("POST", payload, callback);
};

ServiceClientClass.prototype.deleteGroup = function(groupId, callback)
{
	var payload 	= this.getPayload("Group", "Delete");
	payload["id"]   = groupId;

	this.request("POST", payload, callback);
};

ServiceClientClass.prototype.renameGroup = function(groupId, name, callback)
{
	var payload 	= this.getPayload("Group", "Rename");
	payload["id"]   = groupId;
	payload["name"] = name;

	this.request("POST", payload, callback);
};

ServiceClientClass.prototype.moveGroup = function(groupId, parentGroupId, callback)
{
	var payload 				= this.getPayload("Group", "Move");
	payload["id"]   			= groupId;
	payload["parentGroupId"]   	= parentGroupId;

	this.request("POST", payload, callback);
};

ServiceClientClass.prototype.updateGroupData = function(groupId, groupData, callback)
{
	var payload 	= this.getPayload("Group", "UpdateData");
	payload["id"]   = groupId;
	payload["data"] = groupData;

	this.request("POST", payload, callback);
};

ServiceClientClass.prototype.searchGroups = function(searchText, callback)
{
	var payload 			= this.getPayload("Group", "Search");
	payload["searchText"]   = searchText;

	this.request("POST", payload, callback);
};

ServiceClientClass.prototype.profile = function(key, duration)
{
	/*var name   	= "Profile_" + key; 
	var params 	= "service=Analytic&method=Event&name=" + name + "&data=" + duration;
	params 		= this.addSessionId(params);
	RequestUtils.instance.request(Constants.API_URL, "POST", function(xmlhttp, success, duration) 
{ 
	var test = duration;
}, params);*/
};

ServiceClientClass.prototype.uploadFile = function(fileData, extension, groupId, callback, onProgress)
{
	var payload 			= this.getPayload("File", "Upload");
	payload["extension"]   	= extension;
	payload["groupId"] 		= groupId;

	var params 				= new Object();
	params["payload"]   	= JSON.stringify(payload);
	params["fileToUpload"]  = fileData;

	this.requestWithParams("POST", params, callback);
};

ServiceClientClass.prototype.request = function(method, payload, callback)
{
	var params = "payload="+JSON.stringify(payload);

	this.requestWithParams(method, params, callback);
};

ServiceClientClass.prototype.requestWithParams = function(method, params, callback)
{
	RequestUtils.instance.request(Constants.API_URL, method, function(xmlhttp, success, duration) { ServiceClient.instance.onRequestResponse(params, xmlhttp, success, callback, duration); }, params);
};

ServiceClientClass.prototype.getPayload = function(service, method)
{
	var payload = new Object();

	payload["userId"] 	= this.loggedUser != null ? this.loggedUser.id : null;
	payload["service"]  = service;
	payload["method"]   = method;

	return payload;
};

ServiceClientClass.prototype.onRequestResponse = function(params, xmlhttp, success, callback, duration)
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

ServiceClientClass.prototype.logout = function()
{
	this.loggedUser = null;

	CacheUtils.instance.clear();
};


