//Singleton instance
var ServiceCache = { instance : new ServiceCacheClass() };

function ServiceCacheClass()
{
	this.cacheGroupResult = function(groupId, result)
	{
		if(result.success)
			CacheUtils.instance.setObject("Group_" + groupId, result);
	};

	this.getCachedGroupResult = function(groupId)
	{
		var object = CacheUtils.instance.getObject("Group_" + groupId);

		if(object != null)
			console.log("Getting cached group with id = " + groupId);

		return object;
	}

	this.removeCachedGroupResult = function(groupId)
	{
		CacheUtils.instance.remove("Group_" + groupId);
	}
}