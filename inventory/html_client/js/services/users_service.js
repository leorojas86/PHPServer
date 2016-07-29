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
		notifyOnInitializationCompleted();
	};

	function notifyOnInitializationCompleted(success)
	{
		UsersService.instance._onInitializationCompleted(success);
		UsersService.instance._onInitializationCompleted = null;
	}

	this.register = function(name, password, email, callback)
	{
		GroupsService.instance.createRootGroup(function(result) { onRootGroupCreated(result, name, password, email, callback); });
	};

	function onRootGroupCreated(result, name, password, email, callback)
	{
		if(result.success)
		{
			var payload 			= ServiceClient.instance.getPayload("User", "Register");
			payload["name"]  		= name;
			payload["email"]   		= email;
			payload["password"] 	= password;
			payload["rootGroupId"]	= result.data.insert_id;

			ServiceClient.instance.request(Constants.SERVICES.USERS.URL, "POST", payload, callback);
		}
		else
			callback(result);
	}

	this.login = function(email, password, callback)
	{
		var payload 		= ServiceClient.instance.getPayload("User", "Login");
		payload["email"]  	= email;
		payload["password"] = password;
		var loginCallback	=  function(resultData) { onLoginCallback(resultData, callback) };
		
		ServiceClient.instance.request(Constants.SERVICES.USERS.URL, "POST", payload, loginCallback);
	};

	this.updateUserData = function(data, callback)
	{
		var payload 	= ServiceClient.instance.getPayload("User", "UpdateData");
		payload["data"] = data;

		ServiceClient.instance.request(Constants.SERVICES.USERS.URL, "POST", payload, callback);
	};

	function onLoginCallback(resultData, callback)
	{
		if(resultData.success)
		{
			UsersService.instance.loggedUser = resultData.data;
			CacheUtils.instance.setObject("LoggedUser", UsersService.instance.loggedUser);
		}

		callback(resultData);
	}

	this.logout = function()
	{
		this.loggedUser = null;

		CacheUtils.instance.clear();
	};
}