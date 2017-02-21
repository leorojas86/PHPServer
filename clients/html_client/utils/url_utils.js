var URLUtils = { instance : new URLUtilsClass() };

function URLUtilsClass()
{
	this.getServerURL = function()
	{
		var url 		  			= window.location.href;
		var protocolIndex 			= url.indexOf("//");
		var protocol  				= url.substring(0, protocolIndex);
		var path    				= url.substring(protocolIndex + 2, url.length);
		var nextPathSeparatorIndex 	= path.indexOf("/");
		var server  				= nextPathSeparatorIndex != -1 ? path.substring(0, nextPathSeparatorIndex) : path;

		return protocol + "//" + server + "/";
	};

	this.redirect = function(url)
	{
		window.location = url;
	};

	this.reloadCurrentURL = function()
	{
		window.location.reload();
	};

	this.getURLParam = function(paramName)
	{
		var url = window.location.search;
		if(url.indexOf("=") != -1)
		{
			var value = window.location.search.split(paramName + "=")[1];
			return value.indexOf("&") ? value.split("&")[0] : value;
		}
		return false;
	};

	this.openInNewTab = function(url)
	{
		var win = window.open(url, '_blank');
	  	win.focus();
	};
}
