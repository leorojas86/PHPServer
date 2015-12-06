//Singleton instance
var ServiceClient = { instance : new ServiceClientClass() };

//Variables

ServiceClientClass.prototype.loggedUser = null;

ServiceClientClass.prototype._onInitializationCompleted = null;

//Constructors
function ServiceClientClass()
{
}

//Methods
ServiceClientClass.prototype.initialize = function(onInitializationCompleted)
{
	this._onInitializationCompleted = onInitializationCompleted;

	//if(this.loggedUser == null)
	//{
		//TODO: Initialize server session
	//}
	//else
		this.notifyOnInitializationCompleted();
};


ServiceClientClass.prototype.notifyOnInitializationCompleted = function(success)
{
	this._onInitializationCompleted(success);
	this._onInitializationCompleted = null;
}