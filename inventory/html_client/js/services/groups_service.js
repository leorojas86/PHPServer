//Singleton instance
var GroupsService = { instance : new GroupsServiceClass() };

function GroupsServiceClass()
{
	//var newGUID = GUIDUtils.instance.generateNewGUID();

	//alert(newGUID);

	this.createRootGroup = function(callback)
	{
		this.addGroup(null, "RootGroup", Constants.GROUP_ID_FOLDER, callback);
	};

	this.loadRootGroup = function(callback)
	{
		this.loadGroup(UsersService.instance.loggedUser.rootGroupId, callback);
	};

	this.loadGroup = function(groupId, callback)
	{
		var cachedResult = ServiceCache.instance.getCachedGroupResult(groupId);

		if(cachedResult != null)
			callback(cachedResult);
		else
		{
			var payload 	= ServiceClient.instance.getPayload("Group", "Get");
			payload["id"]   = groupId;

			ServiceClient.instance.request(Constants.SERVICES.GROUPS.URL, "POST", payload, function(result) { onLoadGroupCallback(groupId, result, callback); });
		}
	};

	function onLoadGroupCallback(groupId, result, callback)
	{
		ServiceCache.instance.cacheGroupResult(groupId, result);
		callback(result);
	}

	this.addGroup = function(parentGroupId, name, type, callback)
	{
		var payload 				= ServiceClient.instance.getPayload("Group", "Add");
		payload["parentGroupId"]   	= parentGroupId;
		payload["data"]   			= "{ \"name\":\"" + name + "\", \"type\":\"" + type + "\", \"customData\":\"{}\", \"subgroups\":[] }";

		ServiceCache.instance.removeCachedGroupResult(parentGroupId);
		ServiceClient.instance.request(Constants.SERVICES.GROUPS.URL, "POST", payload, function(result) { onAddGroupCallback(result, payload, callback); });
	};

	function onAddGroupCallback(result, payload, callback)
	{
		if(result.success)
		{
			var tagsData = payload["data"];
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

	this.renameGroup = function(groupData, parentGroupId, newName, callback)
	{
		var data  = JSON.parse(groupData.data);
		data.name = newName;

		ServiceCache.instance.removeCachedGroupResult(parentGroupId);
		this.updateGroupData(groupData.id, JSON.stringify(data), callback);
	};

	this.moveGroup = function(groupId, parentGroupId, oldParentGroupId, callback)
	{
		var payload 				= ServiceClient.instance.getPayload("Group", "Move");
		payload["id"]   			= groupId;
		payload["parentGroupId"]   	= parentGroupId;

		ServiceCache.instance.removeCachedGroupResult(groupId);
		ServiceCache.instance.removeCachedGroupResult(parentGroupId);
		ServiceCache.instance.removeCachedGroupResult(oldParentGroupId);
		ServiceClient.instance.request(Constants.SERVICES.GROUPS.URL, "POST", payload, callback);
	};

	this.updateGroupData = function(groupId, groupData, callback)
	{
		var payload 	= ServiceClient.instance.getPayload("Group", "Update");
		payload["id"]   = groupId;
		payload["data"] = groupData;

		ServiceCache.instance.removeCachedGroupResult(groupId);
		ServiceClient.instance.request(Constants.SERVICES.GROUPS.URL, "POST", payload, callback);
		TagsService.instance.updateSearchTags(groupId, groupData, Constants.SEARCH_TAGS_TYPES.GROUP_DATA_TEXT_TYPE);//TODO: queue this steps
	};

	this.getGroupsByIds = function(ids, callback)//TODO: improve this
	{
		var payload 	 = ServiceClient.instance.getPayload("Group", "GetGroups");
		payload["ids"]   = ids;
		ServiceClient.instance.request(Constants.SERVICES.GROUPS.URL, "POST", payload, callback);
	};
}