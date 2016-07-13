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

		var payload 	= ServiceClient.instance.getPayload("Tag", "UpdateTags");
		payload["id"]   = groupId;
		payload["tags"] = tags;
		payload["type"] = Constants.SEARCH_TAGS_TYPES.DATA_TEXT_TYPE;

		ServiceClient.instance.request(Constants.SERVICES.TAGS.URL, "POST", payload, function(result) {});
	};

	this.searchGroups = function(searchText, callback)
	{
		var payload 			= ServiceClient.instance.getPayload("Tag", "Search");
		payload["searchText"]   = searchText.toLowerCase();
		payload["types"]   		= [ Constants.SEARCH_TAGS_TYPES.DATA_TEXT_TYPE ];

		ServiceClient.instance.request(Constants.SERVICES.TAGS.URL, "POST", payload, function(resultData) { GroupsService.instance.getGroupsByIds(resultData, callback); });
	};
}