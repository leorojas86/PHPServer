//Singleton instance
var UsersService = { instance : new UsersServiceClass() };

function UsersServiceClass()
{
	//Initialization
	this.loggedUser = CacheUtils.instance.getObject("LoggedUser");

	if(this.loggedUser != null)
		console.log("session and logged user info loaded from cache");

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
		var payload 			= ServiceClient.instance.getPayload("User", "Register");
		payload["name"]  		= name;
		payload["email"]   		= email;
		payload["password"] 	= password;
		payload["rootGroupId"]	= GUIDUtils.instance.generateNewGUID();

		ServiceClient.instance.request(Constants.SERVICES.USERS.URL, "POST", payload, callback);
	};

	this.login = function(email, password, callback)
	{
		var payload 		= ServiceClient.instance.getPayload("User", "Login");
		payload["email"]  	= email;
		payload["password"] = password;
		var loginCallback	=  function(resultData) { UsersService.instance.onLoginCallback(resultData, callback) };
		
		ServiceClient.instance.request(Constants.SERVICES.USERS.URL, "POST", payload, loginCallback);
	};

	this.updateUserData = function(data, callback)
	{
		var payload 	= ServiceClient.instance.getPayload("User", "UpdateData");
		payload["data"] = data;

		ServiceClient.instance.request(Constants.SERVICES.USERS.URL, "POST", payload, callback);
	};

	this.onLoginCallback = function(resultData, callback)
	{
		if(resultData.success)
		{
			this.loggedUser = resultData.data;
			CacheUtils.instance.setObject("LoggedUser", this.loggedUser);
		}

		callback(resultData);
	};

	this.logout = function()
	{
		this.loggedUser = null;

		CacheUtils.instance.clear();
	};
}