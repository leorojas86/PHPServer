//Singleton instance
var ServiceClient = { instance : new ServiceClientClass() };

//Variables
ServiceClientClass.prototype.loggedUser = null;

ServiceClientClass.prototype._onInitializationCompleted = null;

//Constructors
function ServiceClientClass()
{
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
}

ServiceClientClass.prototype.login = function(email, password, callback)
{
	var params 			= "service=User&method=Login" + "&email=" + email + "&password=" + password;
	var thisVar 		= this;
	var loginCallback	=  function(resultData) { thisVar.onLoginCallback(resultData, callback) };
	this.request("POST", params, loginCallback);
}

ServiceClientClass.prototype.onLoginCallback = function(resultData, callback)
{
	if(resultData.success)
		loggedUser = resultData.data;

	callback(resultData);
}

ServiceClientClass.prototype.loadRootGroup = function(callback)
{
	var params = "service=Group&method=GetRootGroupData";
	this.request("POST", params, callback);
}

ServiceClientClass.prototype.loadGroup = function(groupId, callback)
{
	var params = "service=Group&method=GetGroupData&id=" + groupId;
	this.request("POST", params, callback);
}

ServiceClientClass.prototype.request = function(method, params, callback)
{
	var thisVar = this;
	RequestUtils.instance.request(Constants.API_URL, "POST", function(xmlhttp, success) { thisVar.onRequestResponse(xmlhttp, success, callback) }, params);
}

ServiceClientClass.prototype.onRequestResponse = function(xmlhttp, success, callback)
{
	var resultData = success ? JSON.parse(xmlhttp.responseText) : { success : false, data : xmlhttp.responseText };

	if(!resultData.success)
		console.log("Response Text = " + xmlhttp.responseText)

	callback(resultData);
}
