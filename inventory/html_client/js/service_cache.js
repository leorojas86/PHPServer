//Singleton instance
var ServiceCache = { instance : new ServiceCacheClass() };

function ServiceCacheClass()
{
	this.cacheGroupResult = function(groupId, result)
	{
		if(result.success)
		{
			var json = JSON.stringify(result);
			CacheUtils.instance.set("Group_" + groupId, json);
		}
	};

	this.getCachedGroupResult = function(groupId)
	{
		var json = CacheUtils.instance.get("Group_" + groupId);

		if(json != null)
		{
			console.log("Getting cached group with id = " + groupId);
			return JSON.parse(json);
		}

		return null;
	}

	this.removeCachedGroupResult = function(groupId)
	{
		CacheUtils.instance.remove("Group_" + groupId);
	}
}