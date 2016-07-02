//Singleton instance
var TagsService = { instance : new TagsServiceClass() };

function TagsServiceClass()
{
	this.updateSearchTags = function(groupId, data, removeOldTags)
	{
		var regexp 	= new RegExp("]|{|}|,|:|<|>|=|\t|\"", 'g');
		var regexp2 = new RegExp(" +", 'g');
		var tags 	= data.replace(regexp, '').replace(/\[/g,'').replace(regexp2, ',').toLowerCase();

		//alert(tags);

		//TODO: queue this steps
		var payload 				= ServiceClient.instance.getPayload("Tag", "UpdateTags");
		payload["id"]   			= groupId;
		payload["tags"] 			= tags;
		payload["remove_old_tags"] 	= removeOldTags;

		ServiceClient.instance.request("POST", payload, function(result) {});
	};

	this.searchGroups = function(searchText, callback)
	{
		var payload 			= ServiceClient.instance.getPayload("Tag", "Search");
		payload["searchText"]   = searchText.toLowerCase();

		ServiceClient.instance.request("POST", payload, function(resultData) { GroupsService.instance.getGroupsByIds(resultData, callback); });
	};
}