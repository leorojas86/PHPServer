var RequestUtils = { instance : new RequestUtilsClass() };

function RequestUtilsClass()
{
}

RequestUtilsClass.prototype.request = function(url, method, callback, params, onProgress) 
{
	var thisVar     = this;
	params 			= params || "";//Default parameter = ""
	var xmlhttp 	= new XMLHttpRequest();
	xmlhttp.onload	= function() { thisVar.checkForReadyResponse(xmlhttp, callback); };
	xmlhttp.onerror	= function() { thisVar.checkForReadyResponse(xmlhttp, callback); };

	this.notifyProgress(xmlhttp, onProgress);

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
			xmlhttp.send(params);

		break;
		default:
			alert("Unsupported request method '" + method + "'");
		break;
	}

	return xmlhttp;
};

RequestUtilsClass.prototype.notifyProgress = function(xmlhttp, onProgress)
{
	if(onProgress != null)
	{
		xmlhttp.onprogress = function(evt)
		{
			if(evt.lengthComputable) 
			   onProgress(evt.loaded / evt.total);
		};
	}
};

RequestUtilsClass.prototype.checkForReadyResponse = function(xmlhttp, callback)
{
	if(xmlhttp.readyState == 4)
	{
		var success = xmlhttp.status == 200;
		callback(xmlhttp, success);
	}
};