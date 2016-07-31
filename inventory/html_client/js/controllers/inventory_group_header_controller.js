//Singleton instance
var InventoryGroupHeaderController = { instance : new InventoryGroupHeaderControllerClass() };

function InventoryGroupHeaderControllerClass()
{
	this.getGroupHeaderHTML = function(groupData)
	{
		var backButtonTooltip = LocManager.instance.getLocalizedText("back_button_tooltip");
		var backButtonText    = LocManager.instance.getLocalizedText("back_button_text");
		var searchButtonText  = LocManager.instance.getLocalizedText("search_button_text");
		var rootGroupText  	  = LocManager.instance.getLocalizedText("root_group_text");
		
		var groupPath     	= groupData.path.replace("RootGroup/", rootGroupText + "/");
		var hasParentGroup 	= groupData.parent_group_id != 0;
		var data 	 		= JSON.parse(groupData.data);
		var subGroupType  	= data.type;
		var isFolderGroup   = subGroupType == Constants.GROUP_ID_FOLDER;

		var html = "<div id='group_header' class='group_header_class'>";
				html += "<div id='group_path' class='group_path_class'>" + groupPath + "</div>";

				if(hasParentGroup)
					html += "<button id='back_button' class='group_path_class button_class' title='" + backButtonTooltip + "'>" + backButtonText + "</button>";

				html += "<button id='search_button' class='search_button_class button_class'>" + searchButtonText + "</button>";
			html += "</div>";

		return html;
	};

	this.assignEvents = function(parentGroupId)
	{
		var backButton = document.getElementById("back_button");

		if(backButton != null)
			backButton.onclick = function() { InventoryGroupHeaderController.instance.onBackButtonClick(parentGroupId); }

		document.getElementById("search_button").onclick = function() { InventoryGroupHeaderController.instance.onSearchButtonClick(); }
		document.onkeyup 								 = function(event) { InventoryGroupHeaderController.instance.onKeyUp(event); }
	};

	this.onBackButtonClick = function(parentGroupId)
	{
		InventoryGroupController.instance.loadAjaxGroup(parentGroupId);
	};

	this.onSearchButtonClick = function()//TODO: Move the code that invokes the search here
	{
		SearchPopup.instance.show();
	};

	this.onKeyUp = function(event)
	{
		switch(event.which) 
		{
		    case 37://left arrow button
		    	var backButton = document.getElementById("back_button");

				if(backButton != null) 
					backButton.onclick.apply(backButton);
		    break;
		    default: /*console.log("pressed key = " + event.which);*/ break;
		}
	};
}