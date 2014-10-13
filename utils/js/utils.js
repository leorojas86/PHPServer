function ajax(url, elementId)
{
	ajaxCallbackFunction = function(xmlhttp) 
	{
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) 
		  	document.getElementById(elementId).innerHTML = xmlhttp.responseText;
	}

	request(url, "GET", ajaxCallbackFunction);
}

function request(url, params, method, callback) 
{
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
}

//http://stackoverflow.com/questions/133925/javascript-post-request-like-a-form-submit