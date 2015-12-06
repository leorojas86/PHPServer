var LocManager = 
(
	function() 
	{
	    var _instance = null;
	 
	    return {
			        getInstance : function() 
			        {
			            if(_instance == null)
			                 _instance = new LocalizationManagerClass();
			            
			            return _instance;
			        }
			    };
	}
)();

function LocalizationManagerClass()
{
	this.onLocalizationTableLoaded 	= null;
	this.localizationTable 			= localStorage.localizationTable == null ? null : JSON.parse(localStorage.localizationTable);
}

LocalizationManagerClass.prototype.loadLocalizationTable = function(localizationTableURL, onLocalizationTableLoaded, force)
{
	if(this.localizationTable == null || force)
	{
		console.log("Loading localization table at " + localizationTableURL);
		this.onLocalizationTableLoaded = onLocalizationTableLoaded;
		var context 				   = this;
		RequestUtils.getInstance().request(localizationTableURL, "GET", function(xmlhttp) { context.onLoadLocalizationTableCallback(xmlhttp) });
	}
	else
	{
		console.log("localization table was already loaded");
		onLocalizationTableLoaded(this);
	}
};

LocalizationManagerClass.prototype.onLoadLocalizationTableCallback = function(xmlhttp)
{
	if(RequestUtils.getInstance().checkForValidResponse(xmlhttp)) 
	{
		localStorage.localizationTable = xmlhttp.responseText;
		this.localizationTable 		   = JSON.parse(xmlhttp.responseText);
		this.onLocalizationTableLoaded(this);
		this.onLocalizationTableLoaded = null;
	}
	else
		console.log("could not read the localization table");
};

LocalizationManagerClass.prototype.getLocalizedString = function(key)
{
	return this.localizationTable[key];
};

