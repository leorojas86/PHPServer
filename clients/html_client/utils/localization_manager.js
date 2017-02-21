var LocManager = { instance : new LocalizationManagerClass() };

LocalizationManagerClass.prototype._onLocalizationTableLoaded = null;

function LocalizationManagerClass()
{	
	this.localizationTable = CacheUtils.instance.getObject("LocalizationTable");

	if(this.localizationTable != null)
		console.log("localization table loaded from cache");

	this.loadLocalizationTable = function(localizationTableURL, onLocalizationTableLoaded, force)
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

	this.onLoadLocalizationTableCallback = function(xmlhttp, success)
	{
		if(success) 
		{
			this.localizationTable = JSON.parse(xmlhttp.responseText);
			CacheUtils.instance.setObject("LocalizationTable", this.localizationTable);
			this.notifyLocalizationLoaded(true);
		}
		else
		{
			console.log("could not read the localization table");
			this.notifyLocalizationLoaded(false);
		}
	};

	this.getLocalizedText = function(key)
	{
		return this.localizationTable[key];
	};

	this.notifyLocalizationLoaded = function(success)
	{
		this._onLocalizationTableLoaded(success);
		this._onLocalizationTableLoaded = null;
	};
}

