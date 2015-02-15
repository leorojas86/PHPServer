var URLUtils = 
(
	function() 
	{
	    var _instance = null;
	 
	    return {
			        getInstance : function () 
			        {
			            if(_instance == null)
			                 _instance = new URLUtilsClass();
			            
			            return _instance;
			        }
			    };
	}
)();

function URLUtilsClass()
{
	
}

URLUtilsClass.prototype.getHostName = function()
{
	var host 		 = window.location.href;
	var paramsIndex  = host.indexOf("?");

	if(paramsIndex != -1)
		host = host.substring(0, paramsIndex);//Remove params if necessary

	return host;
};

URLUtilsClass.prototype.redirect = function(url)
{
	window.location = url;
};

URLUtilsClass.prototype.reloadCurrentURL = function()
{
	window.location.reload();
};

URLUtilsClass.prototype.getURLParam = function(paramName)
{
	var value = window.location.search.split(paramName + "=")[1];

	if(value.indexOf("&"))
		value = value.split("&")[0];

	return value;
};

URLUtilsClass.prototype.openInNewTab = function(url)
{
	var win = window.open(url, '_blank');
  	win.focus();
};