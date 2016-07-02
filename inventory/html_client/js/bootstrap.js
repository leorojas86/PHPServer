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
			LocManager.instance.loadLocalizationTable(Constants.ENGLISH_LOCALIZATION_TABLE, function() { Bootstrap.instance.onLocalizationLoaded(); }, false);
		else
			this.onBootstrapCompleted(true);
	};

	this.onLocalizationLoaded = function(success)
	{
		ServiceClient.instance.initialize(function() { Bootstrap.instance.onServiceClientInitialized(); });
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