//Singleton instance
var ServiceClient = { instance : new ServiceClientClass() };

//Variables
ServiceClientClass.prototype.loggedUser = null;
ServiceClientClass.prototype.sessionId  = null;

ServiceClientClass.prototype._onInitializationCompleted = null;

//Constructors
function ServiceClientClass()
{
	var loggedUser = CacheUtils.instance.get("LoggedUser");
	var sessionId  = CacheUtils.instance.get("SessionId");

	if(loggedUser != null)
	{
		this.loggedUser = JSON.parse(loggedUser);
		this.sessionId  = sessionId;
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
	var payload 			= new Object();
	payload["service"]   	= "User";
	payload["method"]   	= "Register";
	payload["name"]  		= name;
	payload["email"]   		= email;
	payload["password"]   	= password;

	var params 	= "payload="+JSON.stringify(payload);

	this.request("POST", params, callback);
};

ServiceClientClass.prototype.login = function(email, password, callback)
{
	var payload 			= new Object();
	payload["service"]   	= "User";
	payload["method"]   	= "Login";
	payload["email"]  		= email;
	payload["password"]   	= password;

	var params 			= "payload="+JSON.stringify(payload);
	var loginCallback	=  function(resultData) { ServiceClient.instance.onLoginCallback(resultData, callback) };
	this.request("POST", params, loginCallback);
};

ServiceClientClass.prototype.updateUserData = function(data, callback)
{
	var params = "service=User&method=UpdateData&data=" + data;
	this.request("POST", params, callback);
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
	var params = "service=Group&method=GetRootGroup";
	this.request("POST", params, callback);
};

ServiceClientClass.prototype.loadGroup = function(groupId, callback)
{
	var params = "service=Group&method=GetGroup&id=" + groupId;
	this.request("POST", params, callback);
};

ServiceClientClass.prototype.addSubGroup = function(parentGroupId, newGroupName, type, data, callback)
{
	var params = "service=Group&method=AddSubGroup&parentGroupId=" + parentGroupId + "&name=" + newGroupName + "&type=" + type + '&data=' + data;
	this.request("POST", params, callback);
};

ServiceClientClass.prototype.deleteGroup = function(groupId, callback)
{
	var params = "service=Group&method=Delete&id=" + groupId;
	this.request("POST", params, callback);
};

ServiceClientClass.prototype.renameGroup = function(groupId, name, callback)
{
	var params = "service=Group&method=Rename&id=" + groupId + "&name=" + name;
	this.request("POST", params, callback);
};

ServiceClientClass.prototype.moveGroup = function(groupId, parentGroupId, callback)
{
	var params = "service=Group&method=Move&id=" + groupId + "&parentGroupId=" + parentGroupId;
	this.request("POST", params, callback);
};

ServiceClientClass.prototype.updateGroupData = function(groupId, groupData, callback)
{
	var params = "service=Group&method=UpdateData&id=" + groupId + "&data=" + groupData;
	this.request("POST", params, callback);
};

ServiceClientClass.prototype.searchGroups = function(searchText, callback)
{
	var params = "service=Group&method=Search&searchText=" + searchText;
	this.request("POST", params, callback);
};

ServiceClientClass.prototype.profile = function(key, duration)
{
	var name   	= "Profile_" + key; 
	var params 	= "service=Analytic&method=Event&name=" + name + "&data=" + duration;
	params 		= this.addSessionId(params);
	RequestUtils.instance.request(Constants.API_URL, "POST", function(xmlhttp, success, duration) 
{ /* DO NOTHING */ 
	var test = duration;
}, params);
};

ServiceClientClass.prototype.uploadFile = function(fileData, extension, groupId, callback, onProgress)
{
	var params 				= new Object();
	params["service"]   	= "File";
	params["method"]   	 	= "Upload";
	params["fileToUpload"]  = fileData;
	params["extension"]   	= extension;
	params["groupId"] 		= groupId;

	this.request("POST", params, callback);
};

ServiceClientClass.prototype.request = function(method, params, callback)
{
	params = this.addSessionId(params);
	RequestUtils.instance.request(Constants.API_URL, "POST", function(xmlhttp, success, duration) { ServiceClient.instance.onRequestResponse(params, xmlhttp, success, callback, duration); }, params);
};

ServiceClientClass.prototype.addSessionId = function(params)
{
	if(this.sessionId != null)
	{
		//alert("session = " + this.sessionId);

		if((typeof params) == "string")
			params += "&sessionId=" + this.sessionId;
		else
			params["sessionId"] = this.sessionId;
	}

	return params;
};

ServiceClientClass.prototype.onRequestResponse = function(params, xmlhttp, success, callback, duration)
{
	this.profile(params, duration);

	var resultData = success ? JSON.parse(xmlhttp.responseText) : { success : false, data : xmlhttp.responseText };

	if(resultData.success)
	{
		CacheUtils.instance.set(params, xmlhttp.responseText);
		this.sessionId = resultData.sessionId;

		//alert("session = " + this.sessionId);
		CacheUtils.instance.set("SessionId", this.sessionId);
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
	this.sessionId  = null;
	//CacheUtils.instance.set("LoggedUser", null);
	//CacheUtils.instance.set("SessionId", null);
	CacheUtils.instance.clear();
};


