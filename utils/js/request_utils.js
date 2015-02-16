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

//http://www.matlus.com/html5-file-upload-with-progress/
RequestUtilsClass.prototype.upload = function(apiURL, params) 
{
	var fd = new FormData();

    for(var id in params)
    {
    	console.log("adding param " + id);
    	fd.append(id, params[id]);
    }

    var xhr = new XMLHttpRequest();
    xhr.upload.addEventListener("progress", uploadProgress, false);
    xhr.addEventListener("load", uploadComplete, false);
    xhr.addEventListener("error", uploadFailed, false);
    xhr.addEventListener("abort", uploadCanceled, false);
    xhr.open("POST", apiURL);
    xhr.send(fd);
}

function uploadProgress(evt) {
if (evt.lengthComputable) {
  var percentComplete = Math.round(evt.loaded * 100 / evt.total);
  document.getElementById('progressNumber').innerHTML = percentComplete.toString() + '%';
}
else {
  document.getElementById('progressNumber').innerHTML = 'unable to compute';
}
}

function uploadComplete(evt) {
/* This event is raised when the server send back a response */
alert(evt.target.responseText);
}

function uploadFailed(evt) {
alert("There was an error attempting to upload the file.");
}

function uploadCanceled(evt) {
alert("The upload has been canceled by the user or the browser dropped the connection.");
}

RequestUtilsClass.prototype.checkForValidResponse = function(xmlhttp)
{
	return xmlhttp.readyState == 4 && xmlhttp.status == 200;
};