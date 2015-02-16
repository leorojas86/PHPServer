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

//https://developer.mozilla.org/en/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest
function RequestUtilsClass()
{
}

/*

oReq.addEventListener("progress", updateProgress, false);

// progress on transfers from the server to the client (downloads)
function updateProgress (oEvent) {
  if (oEvent.lengthComputable) {
    var percentComplete = oEvent.loaded / oEvent.total;
    // ...
  } else {
    // Unable to compute progress information since the total size is unknown
  }
}
*/


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

RequestUtilsClass.prototype.request = function(url, method, callback, params, onProgress) 
{
	params 				= params || "";//Default parameter = ""
	var xmlhttp 		= new XMLHttpRequest();
	xmlhttp.onload		= function() { callback(xmlhttp) };
	xmlhttp.onprogress 	= function(evt)
	{
		if(onProgress != null && evt.lengthComputable) 
		   onProgress(evt.loaded / evt.total);
	};

	switch(method)
	{
		case "POST":

			if((typeof params) == "string")
			{
				xmlhttp.open(method, url, true);

				//Send the proper header information along with the request
				xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
				xmlhttp.setRequestHeader("Content-length", params.length);
				xmlhttp.setRequestHeader("Connection", "close");

				xmlhttp.send(params);
			}
			else
			{
				console.log((typeof params));

				var fd = new FormData();

			    for(var id in params)
			    	fd.append(id, params[id]);

			    xmlhttp.open("POST", url);
			    xmlhttp.send(fd);
			}
			
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

	return xmlhttp;
};

RequestUtilsClass.prototype.checkForValidResponse = function(xmlhttp)
{
	return xmlhttp.readyState == 4 && xmlhttp.status == 200;
};