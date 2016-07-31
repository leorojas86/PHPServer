var InventoryUtils = { instance : new InventoryUtilsClass() };

function InventoryUtilsClass()
{
	this.sortSubgroups = function(subGroups)
	{
		var folders = new Array();
		var items   = new Array();

		for(var index in subGroups)
		{
			var subGroup = subGroups[index];
			var data 	 = JSON.parse(subGroup.data);//TODO: improve this

			if(data.type == Constants.GROUP_ID_FOLDER)
				folders.push(subGroup);
			else
				items.push(subGroup);
		}

		return folders.concat(items);
	};

	this.findSubGroup = function(subgroups, groupId)
	{
		for(var i = 0; i < subgroups.length; i++)
		{
			var currentSubGroup = subgroups[i];

			if(currentSubGroup.id == groupId)
				return currentSubGroup;
		}

		return null;
	}
}