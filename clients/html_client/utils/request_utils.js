var RequestUtils = { instance : new RequestUtilsClass() };

function RequestUtilsClass()
{
	this.request = function(url, method, callback, params, onProgress)
	{
		var startTime 	= new Date();
		params 					= params || "";//Default parameter = ""
		var xmlhttp 		= new XMLHttpRequest();
		xmlhttp.onload	= function() { checkForReadyResponse(xmlhttp, callback, startTime); };
		xmlhttp.onerror	= function() { checkForReadyResponse(xmlhttp, callback, startTime); };

		notifyProgress(xmlhttp, onProgress);

		var async = true;

		xmlhttp.open(method, url, async);

		switch(method)
		{
			case "POST":

				var formData = new FormData();

		    for(var id in params)
		    	formData.append(id, params[id]);

			  xmlhttp.send(formData);

			break;
			case "GET":

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


	function notifyProgress(xmlhttp, onProgress)
	{
		if(onProgress != null)
		{
			onProgress(0);

			xmlhttp.onprogress = function(evt)
			{
				if(evt.lengthComputable)
				{
				   var progress = evt.loaded / evt.total;
				   onProgress(progress.toFixed(2));
				}
			};

			xmlhttp.upload.onprogress = xmlhttp.onprogress;
		}
	}

	function checkForReadyResponse(xmlhttp, callback, startTime)
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
