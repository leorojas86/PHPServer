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
		var params = { payload: JSON.stringify(payload) };

		this.requestWithParams(serviceURL, method, params, callback);
	};

	this.requestWithParams = function(serviceURL, method, params, callback, onProgress)
	{
		RequestUtils.instance.request(serviceURL, method, function(xmlhttp, success, duration) { ServiceClient.instance.onRequestResponse(params, xmlhttp, success, callback, duration); }, params, onProgress);
	};

	this.getPayload = function(service, method)
	{
		var payload =
		{
			userGuid: UsersService.instance.loggedUser != null ? UsersService.instance.loggedUser.guid : null,
			service: service,
			method: method
		};

		return payload;
	};

	this.onRequestResponse = function(params, xmlhttp, success, callback, duration)
	{
		this.profile(params, duration);

		//alert(xmlhttp.responseText);
		var resultData = success ? JSON.parse(xmlhttp.responseText) : { success : false, data : xmlhttp.responseText };

		callback(resultData);
	};
}
