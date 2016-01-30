var LocManager = { instance : new LocalizationManagerClass() };

LocalizationManagerClass.prototype._onLocalizationTableLoaded = null;

function LocalizationManagerClass()
{	
	var localizationTable = CacheUtils.instance.get("LocalizationTable");

	if(localizationTable != null)
	{
		this.localizationTable = JSON.parse(localizationTable);
		console.log("localization table loaded from cache");
	}
}

LocalizationManagerClass.prototype.loadLocalizationTable = function(localizationTableURL, onLocalizationTableLoaded, force)
{
	this._onLocalizationTableLoaded = onLocalizationTableLoaded;

	if(this.localizationTable == null || force)
	{
		console.log("Loading localization table from url = " + localizationTableURL);
		var thisVar = this;
		RequestUtils.instance.request(localizationTableURL, "GET", function(xmlhttp, success) { thisVar.onLoadLocalizationTableCallback(xmlhttp, success) });
	}
	else
		this.notifyLocalizationLoaded(true);
};

LocalizationManagerClass.prototype.onLoadLocalizationTableCallback = function(xmlhttp, success)
{
	if(success) 
	{
		CacheUtils.instance.set("LocalizationTable", xmlhttp.responseText);
		this.localizationTable = JSON.parse(xmlhttp.responseText);
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
};

