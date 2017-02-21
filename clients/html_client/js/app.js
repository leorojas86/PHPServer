//Singleton instance
var App = { instance : new AppClass() };

function AppClass()
{
	//Variables
	var _this = this;
	var _isInitialized = false;

	//Methods
	this.initialize = function()
	{
		if(!_isInitialized)
		{
			_loadEnvironment();
			LocManager.instance.loadLocalizationTable(Constants.ENGLISH_LOCALIZATION_TABLE, function() { App.instance.onLocalizationLoaded(); }, false);
		}
		else
			this.onInitializationCompleted(true);
	};

	function _loadEnvironment()
	{
		var environmentParam = URLUtils.instance.getURLParam('env') || 'local';
		environmentParam = environmentParam.toUpperCase();
		console.log('Loading environment = ' + environmentParam);
		_this.ENVIRONMENT = ENVIRONMENTS[environmentParam];

		ServiceCache.instance.enabled = true;
	}

	this.onLocalizationLoaded = function(success)
	{
		ServiceClient.instance.initialize(function() { App.instance.onServiceClientInitialized(); });
	};

	this.onServiceClientInitialized = function(success)
	{
		this.onInitializationCompleted(success);
		_isInitialized = true;
	};

	this.onInitializationCompleted = function(success)
	{
		HeaderController.instance.render();

		if(UsersService.instance.loggedUser != null)
			InventoryController.instance.render();
		else
			HomeController.instance.render();
	};
}

window.onload = function() { App.instance.initialize(); };
