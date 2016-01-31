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
		this.loggedUser = loggedUser;
		console.log("logged user info loaded from cache");
		//alert(this.loggedUser);
	}
}

//Methods
ServiceClientClass.prototype.initialize = function(onInitializationCompleted)
{
	this._onInitializationCompleted = onInitializationCompleted;

	//if(this.loggedUser == null)
	//{
		//TODO: Initialize server session
	//}
	//else
		this.notifyOnInitializationCompleted();
};

ServiceClientClass.prototype.notifyOnInitializationCompleted = function(success)
{
	this._onInitializationCompleted(success);
	this._onInitializationCompleted = null;
};

ServiceClientClass.prototype.register = function(name, password, email)
{
	var params = "service=User&method=Register&name=" + name + "&email=" + email + "&password=" + password;
	this.request("POST", params, callback);
};

ServiceClientClass.prototype.login = function(email, password, callback)
{
	var params 			= "service=User&method=Login" + "&email=" + email + "&password=" + password;
	var thisVar 		= this;
	var loginCallback	=  function(resultData) { thisVar.onLoginCallback(resultData, callback) };
	this.request("POST", params, loginCallback);
};

ServiceClientClass.prototype.onLoginCallback = function(resultData, callback)
{
	if(resultData.success)
	{
		this.loggedUser = resultData.data;
		CacheUtils.instance.set("LoggedUser", this.loggedUser);
		//alert(this.loggedUser);
	}

	//alert(ServiceClient.instance.loggedUser);

	callback(resultData);
};

ServiceClientClass.prototype.loadRootGroup = function(callback)
{
	var params = "service=Group&method=GetRootGroupData";
	this.request("POST", params, callback);
};

ServiceClientClass.prototype.loadGroup = function(groupId, callback)
{
	var params = "service=Group&method=GetGroupData&id=" + groupId;
	this.request("POST", params, callback);
};

ServiceClientClass.prototype.addSubGroup = function(parentGroupId, newGroupName, type, callback)
{
	var params = "service=Group&method=AddSubGroup&parentGroupId=" + parentGroupId + "&name=" + newGroupName + "&type=" + type;
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

ServiceClientClass.prototype.updateUserData = function(data, callback)
{
	var params = "service=User&method=UpdateData&data=" + data;
	this.request("POST", params, callback);
};

ServiceClientClass.prototype.uploadFile = function(fileData, callback, onProgress)
{
	var params 				 = new Object();
	params["service"]   	 = "File";
	params["method"]   	 	 = "Upload";
	params["fileToUpload"]   = fileData;

	this.request("POST", params, callback);
};

ServiceClientClass.prototype.request = function(method, params, callback)
{
	var thisVar = this;
	RequestUtils.instance.request(Constants.API_URL, "POST", function(xmlhttp, success) { thisVar.onRequestResponse(params, xmlhttp, success, callback) }, params);
};

ServiceClientClass.prototype.onRequestResponse = function(params, xmlhttp, success, callback)
{
	var resultData = success ? JSON.parse(xmlhttp.responseText) : { success : false, data : xmlhttp.responseText };

	if(resultData.success)
		CacheUtils.instance.set(params, xmlhttp.responseText);
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
