var RequestUtils = 
(
	function() 
	{
	    var _instance = null;
	 
	    return {
			        getInstance : function () 
			        {
			            if(_instance == null)
			                 _instance = new RequestUtilsClass();
			            
			            return _instance;
			        }
			    };
	}
)();

function RequestUtilsClass()
{
}

RequestUtilsClass.prototype.ajax = function(url, elementId, params)
{
	var context = this;

	this.request(url, "GET", function(xmlhttp) { context.ajaxCallbackFunction(elementId, xmlhttp); }, params);
};

RequestUtilsClass.prototype.ajaxCallbackFunction = function(elementId, xmlhttp)
{
	if(this.checkForValidResponse(xmlhttp))
	  	document.getElementById(elementId).innerHTML = xmlhttp.responseText;
};

RequestUtilsClass.prototype.request = function(url, method, callback, params) 
{
	params 					   = params || "";//Default parameter = ""
	var xmlhttp 			   = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() { callback(xmlhttp) };

	switch(method)
	{
		case "POST":

			xmlhttp.open(method, url, true);

			//Send the proper header information along with the request
			xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			xmlhttp.setRequestHeader("Content-length", params.length);
			xmlhttp.setRequestHeader("Connection", "close");

			xmlhttp.send(params);
			
		break;
		case "GET":

			if(params.length > 0)
				url += "?" + params;

			xmlhttp.open(method, url, true);
			xmlhttp.send();

		break;
		default:
			alert("Unsupported request method '" + method + "'");
		break;
	}
};

RequestUtilsClass.prototype.checkForValidResponse = function(xmlhttp)
{
	return xmlhttp.readyState == 4 && xmlhttp.status == 200;
};