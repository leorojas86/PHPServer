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
	this.onLocalizationTableLoaded = null;
	this.localizationTable  	   = null;
}

LocalizationManagerClass.prototype.loadLocalizationTable = function(localizationTableURL, onLocalizationTableLoaded)
{
	if(this.localizationTable == null)
	{
		console.log("Loading localization table");
		this.onLocalizationTableLoaded = onLocalizationTableLoaded;
		var context 				   = this;
		RequestUtils.getInstance().request(localizationTableURL, "POST", function(xmlhttp) { context.onLoadLocalizationTableCallback(xmlhttp) });
	}
	else
		console.log("localization table was already loaded");
};

LocalizationManagerClass.prototype.onLoadLocalizationTableCallback = function(xmlhttp)
{
	if(RequestUtils.getInstance().checkForValidResponse(xmlhttp)) 
	{
		this.localizationTable = JSON.parse(xmlhttp.responseText);
		this.onLocalizationTableLoaded(this);
	}
};

LocalizationManagerClass.prototype.getLocalizedString = function(key)
{
	return this.localizationTable[key];
};

