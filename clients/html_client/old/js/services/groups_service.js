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
		this.loadGroup(UsersService.instance.loggedUser.rootGroupGuid, callback);
	};

	this.loadGroup = function(groupGuid, callback)
	{
		var cachedResult = ServiceCache.instance.getCachedGroupResult(groupGuid);

		if(cachedResult != null)
			callback(cachedResult);
		else
		{
			var payload 		= ServiceClient.instance.getPayload("Group", "Get");
			payload["guid"] = groupGuid;

			ServiceClient.instance.request(App.instance.ENVIRONMENT.SERVICES.GROUPS.URL, "POST", payload, function(result) { onLoadGroupCallback(groupGuid, result, callback); });
		}
	};

	function onLoadGroupCallback(groupGuid, result, callback)
	{
		ServiceCache.instance.cacheGroupResult(groupGuid, result);
		callback(result);
	}

	this.addGroup = function(parentGroupGuid, name, type, callback)
	{
		var payload 								= ServiceClient.instance.getPayload("Group", "Add");
		payload['guid']							= GUIDUtils.instance.generateNewGUID();
		payload["parentGroupGuid"]  = parentGroupGuid;
		payload["data"]   					= "{ \"name\":\"" + name + "\", \"type\":\"" + type + "\", \"customData\":\"{}\", \"subgroups\":[] }";

		ServiceCache.instance.removeCachedGroupResult(parentGroupGuid);
		ServiceClient.instance.request(App.instance.ENVIRONMENT.SERVICES.GROUPS.URL, "POST", payload, function(result) { onAddGroupCallback(result, payload, callback); });
	};

	function onAddGroupCallback(result, payload, callback)
	{
		if(result.success)
		{
			var tagsData = payload["data"];
			//TODO: UPDATE GUID
			TagsService.instance.updateSearchTags(result.data.guid, tagsData, Constants.SEARCH_TAGS_TYPES.GROUP_NAME_TYPE);//TODO: queue this steps
		}

		callback(result);
	};

	this.deleteGroup = function(groupGuid, parentGroupGuid, callback)
	{
		var payload 		= ServiceClient.instance.getPayload("Group", "Delete");
		payload["guid"] = groupGuid;

		ServiceCache.instance.removeCachedGroupResult(groupGuid);
		ServiceCache.instance.removeCachedGroupResult(parentGroupGuid);
		ServiceClient.instance.request(App.instance.ENVIRONMENT.SERVICES.GROUPS.URL, "POST", payload, callback);
	};

	this.renameGroup = function(groupData, parentGroupGuid, newName, callback)
	{
		var data  = JSON.parse(groupData.data);
		data.name = newName;

		ServiceCache.instance.removeCachedGroupResult(parentGroupGuid);
		this.updateGroupData(groupData.guid, JSON.stringify(data), callback);
	};

	this.moveGroup = function(groupGuid, parentGroupGuid, oldParentGroupGuid, callback)
	{
		var payload 								= ServiceClient.instance.getPayload("Group", "Move");
		payload["guid"]   					= groupGuid;
		payload["parentGroupGuid"] 	= parentGroupGuid;

		ServiceCache.instance.removeCachedGroupResult(groupGuid);
		ServiceCache.instance.removeCachedGroupResult(parentGroupGuid);
		ServiceCache.instance.removeCachedGroupResult(oldParentGroupGuid);
		ServiceClient.instance.request(App.instance.ENVIRONMENT.SERVICES.GROUPS.URL, "POST", payload, callback);
	};

	this.updateGroupData = function(groupGuid, groupData, callback)
	{
		var payload 		= ServiceClient.instance.getPayload("Group", "Update");
		payload["guid"] = groupGuid;
		payload["data"] = groupData;

		ServiceCache.instance.removeCachedGroupResult(groupGuid);
		ServiceClient.instance.request(App.instance.ENVIRONMENT.SERVICES.GROUPS.URL, "POST", payload, callback);
		TagsService.instance.updateSearchTags(groupGuid, groupData, Constants.SEARCH_TAGS_TYPES.GROUP_DATA_TEXT_TYPE);//TODO: queue this steps
	};

	this.getGroupsByIds = function(guids, callback)//TODO: improve this
	{
		var payload 	 		= ServiceClient.instance.getPayload("Group", "GetGroups");
		payload["guids"]  = guids;
		ServiceClient.instance.request(App.instance.ENVIRONMENT.SERVICES.GROUPS.URL, "POST", payload, callback);
	};
}
