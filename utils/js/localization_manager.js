var LocManager = { instance : new LocalizationManagerClass() };

LocalizationManagerClass.prototype._onLocalizationTableLoaded = null;

function LocalizationManagerClass()
{	
	this.localizationTable = localStorage.localizationTable == null ? null : JSON.parse(localStorage.localizationTable);

	if(this.localizationTable != null)
		console.log("localization table loaded from local storage");
}

LocalizationManagerClass.prototype.loadLocalizationTable = function(localizationTableURL, onLocalizationTableLoaded, force)
{
	this._onLocalizationTableLoaded = onLocalizationTableLoaded;

	if(this.localizationTable == null || force)
	{
		console.log("Loading localization table at " + localizationTableURL);
		var thisVar 				   = this;
		RequestUtils.instance.request(localizationTableURL, "GET", function(xmlhttp) { thisVar.onLoadLocalizationTableCallback(xmlhttp) });
	}
	else
	{
		console.log("localization table was already loaded");
		this.notifyLocalizationLoaded(true);
	}
};

LocalizationManagerClass.prototype.onLoadLocalizationTableCallback = function(xmlhttp)
{
	if(RequestUtils.instance.checkForValidResponse(xmlhttp)) 
	{
		localStorage.localizationTable = xmlhttp.responseText;
		this.localizationTable 		   = JSON.parse(xmlhttp.responseText);
		this.notifyLocalizationLoaded(true);
	}
	else
	{
		console.log("could not read the localization table");
		this.notifyLocalizationLoaded(false);
	}
};

LocalizationManagerClass.prototype.getLocalizedString = function(key)
{
	return this.localizationTable[key];
};

LocalizationManagerClass.prototype.notifyLocalizationLoaded = function(success)
{
	this._onLocalizationTableLoaded(success);
	this._onLocalizationTableLoaded = null;
}

