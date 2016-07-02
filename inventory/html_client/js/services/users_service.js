//Singleton instance
var UsersService = { instance : new UsersServiceClass() };

function UsersServiceClass()
{
	//Variables
	this.loggedUser = null;

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
		var payload 		= ServiceClient.instance.getPayload("User", "Register");
		payload["name"]  	= name;
		payload["email"]   	= email;
		payload["password"] = password;

		ServiceClient.instance.request("POST", payload, callback);
	};

	this.login = function(email, password, callback)
	{
		var payload 		= ServiceClient.instance.getPayload("User", "Login");
		payload["email"]  	= email;
		payload["password"] = password;
		var loginCallback	=  function(resultData) { UsersService.instance.onLoginCallback(resultData, callback) };
		
		ServiceClient.instance.request("POST", payload, loginCallback);
	};

	this.updateUserData = function(data, callback)
	{
		var payload 	= ServiceClient.instance.getPayload("User", "UpdateData");
		payload["data"] = data;

		ServiceClient.instance.request("POST", payload, callback);
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

	this.logout = function()
	{
		this.loggedUser = null;

		CacheUtils.instance.clear();
	};
}