//Singleton instance
var Bootstrap = { instance : new BootstrapClass() };

function BootstrapClass()
{
	//Variables
	var _isInitialized = false;

	//Methods
	this.initialize = function()
	{
		if(!_isInitialized)
		{
			var thisVar = this;
			LocManager.instance.loadLocalizationTable(Constants.ENGLISH_LOCALIZATION_TABLE, function() { thisVar.onLocalizationLoaded(); }, false);
		}
		else
			this.onBootstrapCompleted(true);
	};

	this.onLocalizationLoaded = function(success)
	{
		var thisVar = this;
		ServiceClient.instance.initialize(function() { thisVar.onServiceClientInitialized(); });
	};

	this.onServiceClientInitialized = function(success)
	{
		this.onBootstrapCompleted(success);
		_isInitialized = true;
	};

	this.onBootstrapCompleted = function(success)
	{
		HeaderController.instance.render();

		if(UsersService.instance.loggedUser != null)
			InventoryController.instance.render();
		else
			HomeController.instance.render();
	};
}

window.onload = function() { Bootstrap.instance.initialize(); };