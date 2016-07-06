//Singleton instance
var CacheUtils = { instance : new CacheUtilsClass() };

//Constructors
function CacheUtilsClass()
{
	this.get = function(key)
	{
		return localStorage.getItem(key);
	};

	this.set = function(key, value)
	{
		localStorage.setItem(key, value);
	};

	this.remove = function(key)
	{
		localStorage.removeItem(key);
	};

	this.clear = function()
	{
		localStorage.clear();
	};
}

