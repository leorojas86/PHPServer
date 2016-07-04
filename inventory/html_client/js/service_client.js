//Singleton instance
var ServiceClient = { instance : new ServiceClientClass() };

function ServiceClientClass()
{
	//Methods
	this.initialize = function(onInitializationCompleted)
	{
		UsersService.instance.initialize(onInitializationCompleted);
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

	this.request = function(serviceURL, method, payload, callback)
	{
		var params = "payload=" + JSON.stringify(payload);

		this.requestWithParams(serviceURL, method, params, callback);
	};

	this.requestWithParams = function(serviceURL, method, params, callback)
	{
		RequestUtils.instance.request(serviceURL, method, function(xmlhttp, success, duration) { ServiceClient.instance.onRequestResponse(params, xmlhttp, success, callback, duration); }, params);
	};

	this.getPayload = function(service, method)
	{
		var payload 		= new Object();
		payload["userId"] 	= UsersService.instance.loggedUser != null ? UsersService.instance.loggedUser.id : null;
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
}


