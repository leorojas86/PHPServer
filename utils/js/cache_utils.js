//Singleton instance
var CacheUtils = { instance : new CacheUtilsClass() };

//Variables
CacheUtilsClass.prototype._templateVariable = null;

//Constructors
function CacheUtilsClass()
{
}

//Methods
CacheUtilsClass.prototype.get = function(key)
{
	return localStorage.getItem(key);
};

CacheUtilsClass.prototype.set = function(key, value)
{
	localStorage.setItem(key, value);
};

CacheUtilsClass.prototype.remove = function(key, value)
{
	localStorage.removeItem('key');
};