//Singleton instance
var InventorySearchResultsController = { instance : new InventorySearchResultsControllerClass() };

function InventorySearchResultsControllerClass()
{
	this.renderResults = function(searchText)
	{
		InventoryGroupController.instance.renderLoadingText();
		
		var types = [Constants.SEARCH_TAGS_TYPES.GROUP_DATA_TEXT_TYPE, Constants.SEARCH_TAGS_TYPES.GROUP_NAME_TYPE];
		TagsService.instance.searchGroups(searchText, types, onSearchCallback);
	};

	function onSearchCallback(resultData)
	{
		if(resultData.success)
			renderSearchResults(resultData.data);
	}

	function renderSearchResults(groupData)
	{
		var html = getGroupHeaderHTML(groupData);
		html += getGroupChildrenHTML(groupData);

		document.getElementById("group_container").innerHTML 	= html;
		document.getElementById("back_button").onclick 			= onBackButtonClick;
		document.getElementById("search_button").onclick 		= onSearchButtonClick;
		document.onkeyup 								 		= onKeyUp;

		for(var index in groupData)
		{
			var subGroup     = groupData[index];
			var subGroupId	 = subGroup.id;
			
			assignButtonClick("folder_image_" + subGroupId, subGroupId);
		}
	}

	function assignButtonClick(elementId, subGroupId)
	{
		document.getElementById(elementId).onclick 	= function() { onSubGroupButtonClick(subGroupId); };
	}

	function getGroupChildrenHTML(subGroups)
	{
		var html = "<div id='folders_scroll_panel' class='folders_scroll_panel_class'>";

		for(var index in subGroups)
		{
			var subGroup     = subGroups[index];
			var data 		 = JSON.parse(subGroup.data);
			var subGroupName = data.name;
			var subGroupId	 = subGroup.id;
			var subGroupType = data.type;
			var icon 		 = subGroupType == Constants.GROUP_ID_FOLDER ? Constants.IMAGE_FOLDER : Constants.IMAGE_FILE;
			
			html += "<div id='folder_" + subGroupId + "' class='folder_class'>"+
						"<div id='folder_image_" + subGroupId + "' class='folder_image_class " + icon + "'> </div>"+
						"<label id='folder_label_" + subGroupId + "' >" + subGroupName + "</label>"+
					"</div>";
		}

		html += "</div>";

		return html;
	}

	function onSubGroupButtonClick(groupId)
	{
		InventoryGroupController.instance.loadAjaxGroup(groupId);
	}

	function getGroupHeaderHTML(groupData)
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
	}

	function onSearchButtonClick()
	{
		SearchPopup.instance.show();
	}

	function onKeyUp(event)
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
	}

	function onBackButtonClick()
	{
		InventoryGroupController.instance.renderRootGroup();
	}
}