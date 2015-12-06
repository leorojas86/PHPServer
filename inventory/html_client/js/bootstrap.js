
//Singleton instance
var Bootstrap = { instance : new BootstrapClass() };

//Variables
BootstrapClass.prototype._isInitialized 		= false;
BootstrapClass.prototype._onBootstrapCompleted 	= null;

//Constructors
function BootstrapClass()
{
}

//Methods
BootstrapClass.prototype.initialize = function(onBootstrapCompleted)
{
	this._onBootstrapCompleted = onBootstrapCompleted;

	if(!this._isInitialized)
	{
		console.log("Initializing app");
		var thisVar = this;
		LocManager.instance.loadLocalizationTable(InventoryAppConstants.ENGLISH_LOCALIZATION_TABLE, function() { thisVar.onLocalizationLoaded(); }, false);
	}
	else
		this.notifyCompleted();
};

BootstrapClass.prototype.onLocalizationLoaded = function(success)
{
	var thisVar = this;
	ServiceClient.instance.initialize(function() { thisVar.onServiceClientInitialized(); });
};

BootstrapClass.prototype.onServiceClientInitialized = function(success)
{
	this.notifyCompleted(success);
	this._isInitialized = true;
};

BootstrapClass.prototype.notifyCompleted = function(success)
{
	this._onBootstrapCompleted(success);
};

