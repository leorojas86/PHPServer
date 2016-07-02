//Singleton instance
var InventorySearchResultsController = { instance : new InventorySearchResultsControllerClass() };

function InventorySearchResultsControllerClass()
{
	//Methods
	this.renderSearchResults = function(groupData)
	{
		var html = this.getGroupHeaderHTML(groupData);
		html += this.getGroupChildrenHTML(groupData);

		document.getElementById("group_container").innerHTML 	= html;
		document.getElementById("back_button").onclick 			= function() { InventoryGroupController.instance.renderRootGroup(); }
		document.getElementById("search_button").onclick 		= function() { InventoryGroupController.instance.onSearchButtonClick(); }
		document.onkeyup 								 		= function(event) { InventorySearchResultsController.instance.onKeyUp(event); }
	};

	this.getGroupChildrenHTML = function(subGroups)
	{
		var html = "<div id='folders_scroll_panel' class='folders_scroll_panel_class'>";

		for(var index in subGroups)
		{
			var subGroup     = subGroups[index];
			var subGroupName = subGroup.name;
			var subGroupId	 = subGroup.id;
			var subGroupType = subGroup.type;
			var icon 		 = subGroupType == Constants.GROUP_ID_FOLDER ? Constants.IMAGE_FOLDER : Constants.IMAGE_FILE;
			var clickEvent   = "onclick='InventorySearchResultsController.instance.onSubGroupButtonClick(" + subGroupId + ");'"

			html += "<div id='folder_" + subGroupId + "' class='folder_class'>"+
						"<div id='folder_image_" + subGroupId + "' class='folder_image_class " + icon + "' " + clickEvent + "> </div>"+
						"<label id='folder_label_" + subGroupId + "' >" + subGroupName + "</label>"+
					"</div>";
		}

		html += "</div>";

		return html;
	};

	this.getGroupHeaderHTML = function(groupData)
	{
		var backButtonTooltip = LocManager.instance.getLocalizedText("back_button_tooltip");
		var backButtonText    = LocManager.instance.getLocalizedText("back_button_text");
		var searchResultsText = LocManager.instance.getLocalizedText("search_results_text");
		var searchButtonText  = LocManager.instance.getLocalizedText("search_button_text");
		
		var html = "<div id='group_header' class='group_header_class'>";
				//html += "<div id='search_results_text'>" + searchResultsText + "</div>";
				html += "<div id='group_path' class='group_path_class'>" + searchResultsText + "</div>";
				html += "<button id='back_button' class='group_path_class button_class' title='" + backButtonTooltip + "'>" + backButtonText + "</button>";
				html += "<button id='search_button' class='search_button_class button_class'>" + searchButtonText + "</button>";
			html += "</div>";

		return html;
	};

	this.renderResults = function(searchText)
	{
		InventoryGroupController.instance.renderLoadingText();
		ServiceClient.instance.searchGroups(searchText, this.onSearchCallback);
	};

	this.onSearchCallback = function(resultData)
	{
		if(resultData.success)
			InventorySearchResultsController.instance.renderSearchResults(resultData.data);
	};

	this.onSubGroupButtonClick = function(groupId)
	{
		InventoryGroupController.instance.loadAjaxGroup(groupId);
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
		    default: console.log("pressed key = " + event.which); break;
		}
	};
}