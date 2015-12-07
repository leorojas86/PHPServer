//Singleton instance
var ServiceClient = { instance : new ServiceClientClass() };

//Variables

ServiceClientClass.prototype.loggedUser = null;

ServiceClientClass.prototype._onInitializationCompleted = null;
ServiceClientClass.prototype._onLoginCallback 			= null;

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
	this._onLoginCallback 	= callback;
	var params 		 		= "service=User&method=Login" + "&email=" + email + "&password=" + password;
	var thisVar		 		= this;
	RequestUtils.instance.request(InventoryAppConstants.API_URL, "POST", function(xmlhttp) { thisVar.onLoginRequestCallback(xmlhttp) }, params);
}

ServiceClientClass.prototype.onLoginRequestCallback = function(xmlhttp)
{
	if(RequestUtils.instance.checkForValidResponse(xmlhttp)) 
	{
		alert(xmlhttp.responseText);
		var result = JSON.parse(xmlhttp.responseText);

		if(result.success)
		{
			loggedUser = result.data;
			this.notifyOnLogin();
		}
		else
			alert(xmlhttp.responseText);
	}
}

ServiceClientClass.prototype.notifyOnLogin = function()
{
	this._onLoginCallback();
	this._onLoginCallback = null;
}
