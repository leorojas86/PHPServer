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
	var thisVar			= this;
	var loginCallback	=  function(resultData) { thisVar.onLoginCallback(resultData, callback) };
	RequestUtils.instance.request(Constants.API_URL, "POST", function(xmlhttp, success) { thisVar.onRequestResponse(xmlhttp, success, loginCallback) }, params);
}

ServiceClientClass.prototype.onLoginCallback = function(resultData, callback)
{
	if(resultData.success)
		loggedUser = resultData.data;

	callback(resultData);
}

ServiceClientClass.prototype.onRequestResponse = function(xmlhttp, success, callback)
{
 	var resultData = null;

	if(success)
	{
		resultData = JSON.parse(xmlhttp.responseText);

		if(!resultData.success)
			this.logResponse(xmlhttp);
	}
	else
		this.logResponse(xmlhttp);

	callback(resultData);
}

ServiceClientClass.prototype.logResponse = function(xmlhttp)
{
	console.log("Response Text = " + xmlhttp.responseText);
}
