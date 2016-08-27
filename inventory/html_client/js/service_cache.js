//Singleton instance
var ServiceCache = { instance : new ServiceCacheClass() };

function ServiceCacheClass()
{
	this.enabled = true;

	this.cacheGroupResult = function(groupId, result)
	{
		if(this.enabled && result.success)
			CacheUtils.instance.setObject("Group_" + groupId, result);
	};

	this.getCachedGroupResult = function(groupId)
	{
		if(this.enabled)
		{
			var object = CacheUtils.instance.getObject("Group_" + groupId);

			if(object != null)
				console.log("Getting cached group with id = " + groupId);

			return object;
		}

		return null;
	}

	this.removeCachedGroupResult = function(groupId)
	{
		if(this.enabled)
			CacheUtils.instance.remove("Group_" + groupId);
	}
}