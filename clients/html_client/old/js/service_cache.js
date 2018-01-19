//Singleton instance
var ServiceCache = { instance : new ServiceCacheClass() };

function ServiceCacheClass()
{
	this.enabled = true;

	this.cacheGroupResult = function(groupGuid, result)
	{
		if(this.enabled && result.success)
			CacheUtils.instance.setObject("Group_" + groupGuid, result);
	};

	this.getCachedGroupResult = function(groupGuid)
	{
		if(this.enabled)
		{
			var object = CacheUtils.instance.getObject("Group_" + groupGuid);

			if(object != null)
				console.log("Getting cached group with guid = " + groupGuid);

			return object;
		}

		return null;
	}

	this.removeCachedGroupResult = function(groupGuid)
	{
		if(this.enabled)
			CacheUtils.instance.remove("Group_" + groupGuid);
	}
}
