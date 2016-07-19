//Singleton instance
var TagsService = { instance : new TagsServiceClass() };

function TagsServiceClass()
{
	this.updateSearchTags = function(groupId, data, type)
	{
		var regexp 	= new RegExp("]|{|}|,|:|<|>|=|\t|\"", 'g');
		var regexp2 = new RegExp(" +", 'g');
		var text 	= data.replace(regexp, '').replace(/\[/g,'').replace(regexp2, ',').toLowerCase();

		//alert(tags);
		var payload 	  = ServiceClient.instance.getPayload("Tag", "UpdateTags");
		payload["id"]     = groupId;
		payload["texts"]  = { text : text, type : type };
		/*var currentDate   = new Date();
		payload["dates"]  = [ { date : currentDate, type : 3 } ];
		payload["values"] = [ { value : 3, type : 4 }, { value : 4, type : 5 } ];*/

		ServiceClient.instance.request(Constants.SERVICES.TAGS.URL, "POST", payload, function(result) {});//TODO: Handle result
	};

	this.searchGroups = function(searchText, types, callback)
	{
		var payload 			= ServiceClient.instance.getPayload("Tag", "Search");
		payload["searchText"]   = { text : searchText.toLowerCase(), types : types };
		/*var currentDate   		= new Date();
		var yesterday   		= new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 1);
		payload["searchDates"]  = [ { min : yesterday, max : currentDate, type : 3 } ];
		payload["searchValues"] = [ { min : 3, max : 4, type : 4 }, { min : 3, max : 4, type : 5 } ];*/

		ServiceClient.instance.request(Constants.SERVICES.TAGS.URL, "POST", payload, function(resultData) { GroupsService.instance.getGroupsByIds(resultData, callback); });
	};
}