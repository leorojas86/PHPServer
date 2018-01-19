//Singleton instance
var CacheUtils = { instance : new CacheUtilsClass() };

//Constructors
function CacheUtilsClass()
{
	this.get = function(key)
	{
		return localStorage.getItem(key);
	};

	this.getObject = function(key)
	{
		var json = this.get(key);
		return json != null ? JSON.parse(json) : null;
	}

	this.set = function(key, value)
	{
		localStorage.setItem(key, value);
	};

	this.setObject = function(key, object)
	{
		var json = JSON.stringify(object);
		this.set(key, json);
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

