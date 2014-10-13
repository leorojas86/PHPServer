function ajax(url, elementId)
{
	ajaxCallbackFunction = function(xmlhttp) 
	{
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) 
		  	document.getElementById(elementId).innerHTML = xmlhttp.responseText;
	}

	request(url, "GET", ajaxCallbackFunction);
}

function request(url, method, callback) 
{
	var xmlhttp 			   = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() { callback(xmlhttp) };
	xmlhttp.open(method, url, true);
	xmlhttp.send();
}

//http://stackoverflow.com/questions/133925/javascript-post-request-like-a-form-submit