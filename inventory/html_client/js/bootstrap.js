//Singleton instance
var Bootstrap = { instance : new BootstrapClass() };

function BootstrapClass()
{
	//Variables
	var _isInitialized 			= false;
	var _onBootstrapCompleted 	= null;

	//Methods
	this.initialize = function(onBootstrapCompleted)
	{
		this._onBootstrapCompleted = onBootstrapCompleted;

		if(!this._isInitialized)
		{
			var thisVar = this;
			LocManager.instance.loadLocalizationTable(Constants.ENGLISH_LOCALIZATION_TABLE, function() { thisVar.onLocalizationLoaded(); }, false);
		}
		else
			this.notifyCompleted();
	};

	this.onLocalizationLoaded = function(success)
	{
		var thisVar = this;
		ServiceClient.instance.initialize(function() { thisVar.onServiceClientInitialized(); });
	};

	this.onServiceClientInitialized = function(success)
	{
		this.notifyCompleted(success);
		this._isInitialized = true;
	};

	this.notifyCompleted = function(success)
	{
		this._onBootstrapCompleted(success);
	};
}

