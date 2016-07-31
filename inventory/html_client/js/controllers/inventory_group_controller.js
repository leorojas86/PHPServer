//Singleton instance
var InventoryGroupController = { instance : new InventoryGroupControllerClass() };

function InventoryGroupControllerClass()
{
	//Variables
	this.groupData = null;

	//Methods
	this.renderGroup = function(groupData)
	{
		this.groupData      = groupData;
		var data 			= JSON.parse(this.groupData.data);
		var groupId       	= groupData.id;
		var parentGroupId 	= groupData.parent_group_id;
		var hasParentGroup 	= parentGroupId != 0;
		var isFolderGroup   = data.type == Constants.GROUP_ID_FOLDER;

		var html = getGroupHeaderHTML(groupData);
		html 	+= isFolderGroup ? getGroupChildrenHTML(groupData) : getGroupInfoHTML(groupData);

		document.getElementById("group_container").innerHTML = html;

		if(!isFolderGroup)
			this.loadImage();

		if(hasParentGroup)
			document.getElementById("back_button").onclick = function() { InventoryGroupController.instance.onBackButtonClick(parentGroupId); }

		if(isFolderGroup)
		{
			InventoryContextMenuController.instance.initContextMenu();
			
			for(var index in groupData.sub_groups)
			{
				var subGroup     = groupData.sub_groups[index];
				var subGroupId	 = subGroup.id;
				assignButtonClick("folder_image_" + subGroupId, subGroupId);
			}
		}
		else
		{
			document.getElementById("fileToUpload").onchange   		= function() { InventoryGroupController.instance.onSelectedFileChange(); }
			document.getElementById("update_group_button").onclick 	= function() { InventoryGroupController.instance.onUpdateGroupDataClick(groupId); }
			document.getElementById("uploadFileButton").onclick    	= function() { InventoryGroupController.instance.uploadFile(); }
		}

		document.getElementById("search_button").onclick = function() { InventoryGroupController.instance.onSearchButtonClick(); }
		document.onkeyup 								 = function(event) { InventoryGroupController.instance.onKeyUp(event); }
	};

	function assignButtonClick(elementId, subGroupId)
	{
		document.getElementById(elementId).onclick 	= function() { onSubGroupButtonClick(subGroupId); };
	}

	this.loadImage = function()
	{
		var data = JSON.parse(this.groupData.data);

		if(data.files != null && data.files.length > 0)
		{
			var imageURL 			 	= FilesService.instance.getFileURL(data.files[0]);
			var canvas 				 	= document.getElementById('imageContainer');
			var imageContainerComponent = new ImageContainerComponent(canvas);
			imageContainerComponent.loadImage(imageURL);
		}
	}

	function getGroupInfoHTML(groupData)
	{
		var updateButtonText  = LocManager.instance.getLocalizedText("update_button_text");
		var uploadText   	  = LocManager.instance.getLocalizedText("upload_text");
		var customData		  = JSON.parse(groupData.data).customData;

		var html = "<div id='item_scroll_panel' class='item_scroll_panel_class'>";
				html += "<p>Data"+ 
							"<input type='text' id='group_data' 			class='input_class'	value = '" + customData + "'>" +
							"<button 			id='update_group_button' 	class='button_class'>" + updateButtonText + "</button>" +
						"</p>";

				html +=	"Select an image to upload:" + 
						"<input type='file' id='fileToUpload' 		class='input_class'>" +
						"<button 			id='uploadFileButton' 	class='button_class'>" + uploadText + "</button>" + 
						"<div 				id='progressNumber'></div>" +
						"<canvas 			id='imageContainer' class='imageContainerClass' width='800' height='800'></canvas>";
			html += "</div>";

		return html;
	}

	function getGroupChildrenHTML(groupData)
	{
		var rightClickOptions 	= LocManager.instance.getLocalizedText("right_click_tooltip");
		var subGroups 	  		= InventoryUtils.instance.sortSubgroups(groupData.sub_groups);

		var html = "<div id='folders_scroll_panel' class='folders_scroll_panel_class' title='" + rightClickOptions + "'>";

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

	function getGroupHeaderHTML(groupData)
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
	}

	this.renderRootGroup = function()
	{
		this.renderLoadingText();
		GroupsService.instance.loadRootGroup(function(resultData) { InventoryGroupController.instance.onLoadGroupCallback(resultData); });
	};

	this.onLoadGroupCallback = function(resultData)
	{
		if(resultData.success) 
			this.renderGroup(resultData.data);
		else
			alert(resultData.data);
	};

	this.renderLoadingText = function()
	{
		var loadingText 			= LocManager.instance.getLocalizedText("loading_text");
		var groupContainer  		= document.getElementById("group_container");
		groupContainer.innerHTML 	= loadingText;
	};

	this.loadAjaxGroup = function(groupId)
	{
		this.renderLoadingText();
		GroupsService.instance.loadGroup(groupId, function(resultData) { InventoryGroupController.instance.onLoadGroupCallback(resultData); });
	};

	this.uploadFile = function()
	{
		var canvas 	  = document.getElementById('imageContainer');
		var imageData = canvas.toDataURL("image/jpeg", 0.95);
		FilesService.instance.uploadFile(imageData, "jpg", this.groupData, function(resultData) { InventoryGroupController.instance.onUploadCompleted(resultData); }, onProgress);
	};

	function onProgress(progress) 
	{
		document.getElementById('progressNumber').innerHTML = (progress * 100).toString() + '%';
	}

	this.onUploadCompleted = function(resultData)
	{
		if(resultData.success)
			this.loadAjaxGroup(this.groupData.id);

		alert("result = " + JSON.stringify(resultData));
	}

	this.onSelectedFileChange = function()
	{
		var fileInput 	= document.getElementById('fileToUpload');
		var canvas 		= document.getElementById('imageContainer');

		var imageContainerComponent = new ImageContainerComponent(canvas);
		imageContainerComponent.renderImage(fileInput);
	};

	function onSubGroupButtonClick(groupId)
	{
		InventoryGroupController.instance.loadAjaxGroup(groupId);
	}

	this.onUpdateGroupDataClick = function(groupId)
	{
		var groupData 		= document.getElementById('group_data');
		var data 			= JSON.parse(this.groupData.data);
		data.customData 	= groupData.value;
		GroupsService.instance.updateGroupData(groupId, JSON.stringify(data), onUpdateGroupDataCallback);
	};

	function onUpdateGroupDataCallback(resultData)
	{
		alert("success = '" + resultData.success + "'");
	}

	this.onBackButtonClick = function(parentGroupId)
	{
		this.loadAjaxGroup(parentGroupId);
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