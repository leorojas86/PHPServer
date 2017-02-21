//Singleton instance
var TagsService = { instance : new TagsServiceClass() };

function TagsServiceClass()
{
	this.updateSearchTags = function(groupId, data, type)
	{
		var text 	= data.replace(new RegExp("]|{|}|,|:|<|>|=|\t|\"", 'g'), ' ');
		text        = text.replace(/\[/g,' ');
		text 		= text.replace(new RegExp(" +", 'g'), ',');
		text 		= text.toLowerCase();

		//alert(tags);
		var payload 	  = ServiceClient.instance.getPayload("Tag", "UpdateTags");
		payload["id"]     = groupId;
		payload["texts"]  = { text : text, type : type };
		/*var currentDate   = new Date();
		payload["dates"]  = [ { date : currentDate, type : 3 } ];
		payload["values"] = [ { value : 3, type : 4 }, { value : 4, type : 5 } ];*/

		ServiceClient.instance.request(App.ENVIRONMENT.SERVICES.TAGS.URL, "POST", payload, function(result) {});//TODO: Handle result
	};

	this.searchGroups = function(searchText, types, callback)
	{
		var payload 			= ServiceClient.instance.getPayload("Tag", "Search");
		payload["searchText"]   = { text : searchText.toLowerCase(), types : types };
		/*var currentDate   		= new Date();
		var yesterday   		= new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 1);
		payload["searchDates"]  = [ { min : yesterday, max : currentDate, type : 3 } ];
		payload["searchValues"] = [ { min : 3, max : 4, type : 4 }, { min : 3, max : 4, type : 5 } ];*/

		ServiceClient.instance.request(App.ENVIRONMENT.SERVICES.TAGS.URL, "POST", payload, function(resultData) { onSearchGroupsCallback(resultData, callback); });
	};

	function onSearchGroupsCallback(resultData, callback)
	{
		//GroupsService.instance.getGroupsByIds(resultData, callback);

		if(resultData.success && resultData.data.length > 0)
			GroupsService.instance.getGroupsByIds(resultData.data, callback);
		else
			callback(resultData);
	}
}