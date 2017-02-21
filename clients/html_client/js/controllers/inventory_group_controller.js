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

		var html = InventoryGroupHeaderController.instance.getGroupHeaderHTML(groupData);
		html 	+= isFolderGroup ? getGroupChildrenHTML(groupData) : getGroupInfoHTML(groupData);

		document.getElementById("group_container").innerHTML = html;

		if(!isFolderGroup)
			loadImage();

		assignEvents(groupId, isFolderGroup, parentGroupId, groupData);
	};

	function assignEvents(groupId, isFolderGroup, parentGroupId, groupData)
	{
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
			document.getElementById("fileToUpload").onchange   		= onSelectedFileChange;
			document.getElementById("update_group_button").onclick 	= function() { onUpdateGroupDataClick(groupId); };
			document.getElementById("uploadFileButton").onclick    	= uploadFile;
		}

		InventoryGroupHeaderController.instance.assignEvents(parentGroupId);
	}

	function assignButtonClick(elementId, subGroupId)
	{
		document.getElementById(elementId).onclick 	= function() { onSubGroupButtonClick(subGroupId); };
	}

	function loadImage()
	{
		var data = JSON.parse(InventoryGroupController.instance.groupData.data);

		if(data.files != null && data.files.length > 0)
		{
			var imageURL 			 	= FilesService.instance.getFileURL(data.files[0]);
			var canvas 				 	= document.getElementById('imageContainer');
			var imageContainerComponent = new ImageContainerComponent(canvas);
			imageContainerComponent.loadImage(imageURL, onProgress);
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

	this.renderRootGroup = function()
	{
		this.renderLoadingText();
		GroupsService.instance.loadRootGroup(onLoadGroupCallback);
	};

	function onLoadGroupCallback(resultData)
	{
		if(resultData.success) 
			InventoryGroupController.instance.renderGroup(resultData.data);
		else
			alert(resultData.data);
	}

	this.renderLoadingText = function()
	{
		window.scrollTo(0, 0);

		var loadingText 			= LocManager.instance.getLocalizedText("loading_text");
		var groupContainer  		= document.getElementById("group_container");
		groupContainer.innerHTML 	= loadingText;
	};

	this.loadAjaxGroup = function(groupId)
	{
		this.renderLoadingText();
		GroupsService.instance.loadGroup(groupId, onLoadGroupCallback);
	};

	function uploadFile()
	{
		var canvas 	  = document.getElementById('imageContainer');
		var imageData = canvas.toDataURL("image/jpeg", 0.95);
		FilesService.instance.uploadFile(imageData, "jpg", InventoryGroupController.instance.groupData, onUploadCompleted, onProgress);
	}

	function onProgress(progress) 
	{
		var progressString = progress.toString();
		
		if(progressString.length > 5)
			progressString = progressString.slice(0, 5);

		document.getElementById('progressNumber').innerHTML = (progress * 100).toString() + '%';
	}

	function onUploadCompleted(resultData)
	{
		if(resultData.success)
			InventoryGroupController.instance.loadAjaxGroup(InventoryGroupController.instance.groupData.id);

		alert("result = " + JSON.stringify(resultData));
	}

	function onSelectedFileChange()
	{
		var fileInput 	= document.getElementById('fileToUpload');
		var canvas 		= document.getElementById('imageContainer');

		var imageContainerComponent = new ImageContainerComponent(canvas);
		imageContainerComponent.renderImage(fileInput);
	}

	function onSubGroupButtonClick(groupId)
	{
		InventoryGroupController.instance.loadAjaxGroup(groupId);
	}

	function onUpdateGroupDataClick(groupId)
	{
		var groupData 		= document.getElementById('group_data');
		var data 			= JSON.parse(InventoryGroupController.instance.groupData.data);
		data.customData 	= groupData.value;
		GroupsService.instance.updateGroupData(groupId, JSON.stringify(data), onUpdateGroupDataCallback);
	}

	function onUpdateGroupDataCallback(resultData)
	{
		alert("success = '" + resultData.success + "'");
	}
}