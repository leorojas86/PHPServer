var RequestUtils = { instance : new RequestUtilsClass() };

function RequestUtilsClass()
{
	this.request = function(url, method, callback, params, onProgress) 
	{
		var thisVar     = this;
		var startTime 	= new Date();
		params 			= params || "";//Default parameter = ""
		var xmlhttp 	= new XMLHttpRequest();
		xmlhttp.onload	= function() { thisVar.checkForReadyResponse(xmlhttp, callback, startTime); };
		xmlhttp.onerror	= function() { thisVar.checkForReadyResponse(xmlhttp, callback, startTime); };

		this.notifyProgress(xmlhttp, onProgress);

		var async = true;

		switch(method)
		{
			case "POST":

				if((typeof params) == "string")
				{
					xmlhttp.open(method, url, async);

					//Send the proper header information along with the request
					xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

					xmlhttp.send(params);
				}
				else
				{
					xmlhttp.open(method, url, async);

					var fd = new FormData();

				    for(var id in params)
				    	fd.append(id, params[id]);

				    xmlhttp.send(fd);
				}
				
			break;
			case "GET":

				xmlhttp.open(method, url, async);

				if(params.length > 0)
					url += "?" + params;

				xmlhttp.send(params);

			break;
			default:
				alert("Unsupported request method '" + method + "'");
			break;
		}

		return xmlhttp;
	};


	this.notifyProgress = function(xmlhttp, onProgress)
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

	this.checkForReadyResponse = function(xmlhttp, callback, startTime)
	{
		if(xmlhttp.readyState == 4) //Done
		{
			var currentTime = new Date();
			var duration 	= currentTime - startTime;
			var success 	= xmlhttp.status == 200;

			//alert("duration = " + duration);
			callback(xmlhttp, success, duration);
		}
	};
}
