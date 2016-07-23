//Singleton instance
var GroupsService = { instance : new GroupsServiceClass() };

function GroupsServiceClass()
{
	//var newGUID = GUIDUtils.instance.generateNewGUID();

	//alert(newGUID);


	this.loadRootGroup = function(callback)
	{
		var payload = ServiceClient.instance.getPayload("Group", "GetRootGroup");

		ServiceClient.instance.request(Constants.SERVICES.GROUPS.URL, "POST", payload, callback);
		
		//this.loadGroup(UsersService.instance.loggedUser.rootGroupId, callback);
	};

	this.loadGroup = function(groupId, callback)
	{
		var cachedResult = ServiceCache.instance.getCachedGroupResult(groupId);

		if(cachedResult != null)
			callback(cachedResult);
		else
		{
			var payload 	= ServiceClient.instance.getPayload("Group", "GetGroup");
			payload["id"]   = groupId;

			ServiceClient.instance.request(Constants.SERVICES.GROUPS.URL, "POST", payload, function(result) { onLoadGroupCallback(groupId, result, callback); });
		}
	};

	function onLoadGroupCallback(groupId, result, callback)
	{
		ServiceCache.instance.cacheGroupResult(groupId, result);
		callback(result);
	}

	this.addSubGroup = function(parentGroupId, newGroupName, type, data, callback)
	{
		var payload 				= ServiceClient.instance.getPayload("Group", "AddSubGroup");
		payload["parentGroupId"]   	= parentGroupId;
		payload["name"]   			= newGroupName;
		payload["type"]   			= type;
		payload["data"]   			= data;

		ServiceCache.instance.removeCachedGroupResult(parentGroupId);
		ServiceClient.instance.request(Constants.SERVICES.GROUPS.URL, "POST", payload, function(result) { onAddSubGroupCallback(result, payload, callback); });
	};

	function onAddSubGroupCallback(result, payload, callback)
	{
		if(result.success)
		{
			var tagsData = payload["name"];
			TagsService.instance.updateSearchTags(result.data.insert_id, tagsData, Constants.SEARCH_TAGS_TYPES.GROUP_NAME_TYPE);//TODO: queue this steps
		}

		callback(result);
	};

	this.deleteGroup = function(groupId, parentGroupId, callback)
	{
		var payload 	= ServiceClient.instance.getPayload("Group", "Delete");
		payload["id"]   = groupId;

		ServiceCache.instance.removeCachedGroupResult(groupId);
		ServiceCache.instance.removeCachedGroupResult(parentGroupId);
		ServiceClient.instance.request(Constants.SERVICES.GROUPS.URL, "POST", payload, callback);
	};

	this.renameGroup = function(groupId, parentGroupId, name, callback)
	{
		var payload 	= ServiceClient.instance.getPayload("Group", "Rename");
		payload["id"]   = groupId;
		payload["name"] = name;

		ServiceCache.instance.removeCachedGroupResult(groupId);
		ServiceCache.instance.removeCachedGroupResult(parentGroupId);
		ServiceClient.instance.request(Constants.SERVICES.GROUPS.URL, "POST", payload, callback);
		TagsService.instance.updateSearchTags(groupId, name, Constants.SEARCH_TAGS_TYPES.GROUP_NAME_TYPE);//TODO: queue this steps
	};

	this.moveGroup = function(groupId, parentGroupId, callback)
	{
		var payload 				= ServiceClient.instance.getPayload("Group", "Move");
		payload["id"]   			= groupId;
		payload["parentGroupId"]   	= parentGroupId;

		ServiceCache.instance.removeCachedGroupResult(groupId);
		ServiceCache.instance.removeCachedGroupResult(parentGroupId);
		ServiceClient.instance.request(Constants.SERVICES.GROUPS.URL, "POST", payload, callback);
	};

	this.updateGroupData = function(groupId, groupData, callback)
	{
		var payload 	= ServiceClient.instance.getPayload("Group", "UpdateData");
		payload["id"]   = groupId;
		payload["data"] = groupData;

		ServiceCache.instance.removeCachedGroupResult(groupId);
		ServiceClient.instance.request(Constants.SERVICES.GROUPS.URL, "POST", payload, callback);

		TagsService.instance.updateSearchTags(groupId, groupData, Constants.SEARCH_TAGS_TYPES.GROUP_DATA_TEXT_TYPE);//TODO: queue this steps
	};

	this.getGroupsByIds = function(resultData, callback)//TODO: improve this
	{
		if(resultData.success && resultData.data.length > 0)
		{
			var payload 	 = ServiceClient.instance.getPayload("Group", "GetGroups");
			payload["ids"]   = resultData.data;
			ServiceClient.instance.request(Constants.SERVICES.GROUPS.URL, "POST", payload, callback);
		}
		else
			callback(resultData);
	};
}