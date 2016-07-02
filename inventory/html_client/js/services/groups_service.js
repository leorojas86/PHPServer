//Singleton instance
var GroupsService = { instance : new GroupsServiceClass() };

function GroupsServiceClass()
{
	this.loadRootGroup = function(callback)
	{
		var payload = ServiceClient.instance.getPayload("Group", "GetRootGroup");

		ServiceClient.instance.request("POST", payload, callback);
	};

	this.loadGroup = function(groupId, callback)
	{
		var payload 	= ServiceClient.instance.getPayload("Group", "GetGroup");
		payload["id"]   = groupId;

		ServiceClient.instance.request("POST", payload, callback);
	};

	this.addSubGroup = function(parentGroupId, newGroupName, type, data, callback)
	{
		var payload 				= ServiceClient.instance.getPayload("Group", "AddSubGroup");
		payload["parentGroupId"]   	= parentGroupId;
		payload["name"]   			= newGroupName;
		payload["type"]   			= type;
		payload["data"]   			= data;

		ServiceClient.instance.request("POST", payload, function(result) { ServiceClient.instance.onAddSubGroupCallback(result, payload, callback); });
	};

	this.onAddSubGroupCallback = function(result, payload, callback)
	{
		if(result.success)
		{
			var tagsData = payload["name"];
			ServiceClient.instance.updateSearchTags(result.data.insert_id, tagsData, false);//TODO: queue this steps
			callback(result);
		}
		else
			callback(result);
	};

	this.deleteGroup = function(groupId, callback)
	{
		var payload 	= ServiceClient.instance.getPayload("Group", "Delete");
		payload["id"]   = groupId;

		ServiceClient.instance.request("POST", payload, callback);
	};

	this.renameGroup = function(groupId, name, callback)
	{
		var payload 	= ServiceClient.instance.getPayload("Group", "Rename");
		payload["id"]   = groupId;
		payload["name"] = name;

		ServiceClient.instance.request("POST", payload, callback);
		ServiceClient.instance.updateSearchTags(groupId, name, false);//TODO: queue this steps
	};

	this.moveGroup = function(groupId, parentGroupId, callback)
	{
		var payload 				= ServiceClient.instance.getPayload("Group", "Move");
		payload["id"]   			= groupId;
		payload["parentGroupId"]   	= parentGroupId;

		ServiceClient.instance.request("POST", payload, callback);
	};

	this.updateGroupData = function(groupId, groupName, groupData, callback)
	{
		var payload 	= ServiceClient.instance.getPayload("Group", "UpdateData");
		payload["id"]   = groupId;
		payload["data"] = groupData;

		this.request("POST", payload, callback);

		var tagsData = groupData + " " + groupName;
		ServiceClient.instance.updateSearchTags(groupId, tagsData, true);//TODO: queue this steps
	};
}