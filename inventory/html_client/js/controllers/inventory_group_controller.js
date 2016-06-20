//Singleton instance
var InventoryGroupController = { instance : new InventoryGroupControllerClass() };

InventoryGroupControllerClass.prototype._groupData = null;

//Constructor
function InventoryGroupControllerClass()
{
}

//Methods
InventoryGroupControllerClass.prototype.renderGroup = function(groupData)
{
	this._groupData     = groupData;
	var groupId       	= groupData.id;
	var parentGroupId 	= groupData.parent_group_id;
	var hasParentGroup 	= parentGroupId != 0;
	var isFolderGroup   = groupData.type == Constants.GROUP_ID_FOLDER;

	var html = this.getGroupHeaderHTML(groupData);

	if(isFolderGroup)
		html += this.getGroupChildrenHTML(groupData);
	else
		html += this.getGroupInfoHTML(groupData);

	document.getElementById("group_container").innerHTML = html;

	if(!isFolderGroup)
		this.loadImage();

	if(hasParentGroup)
		document.getElementById("back_button").onclick = function() { InventoryGroupController.instance.onBackButtonClick(parentGroupId); }

	if(isFolderGroup)
	{
		InventoryContextMenuController.instance.initContextMenu();
		/*for(var index in subGroups)
		{
			var subGroup     = subGroups[index];
			var subGroupId	 = subGroup.id;
			document.getElementById("folder_image_" + subGroupId).onclick = function() { InventoryGroupController.instance.onSubGroupButtonClick(subGroupId); };
		}*/
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

InventoryGroupControllerClass.prototype.loadImage = function()
{
	try
	{
		var data = JSON.parse(this._groupData.data);

		if(data.files != null && data.files.length > 0)
		{
			var imageName 		= data.files[0];
			var imageURL 		= Constants.API_URL + "/uploads/" + imageName;
			var canvas 			= document.getElementById('imageContainer');
			var image 			= new Image();
			image.onload 		= function() { ImageRenderingUtils.instance.loadImageIntoCanvas(image, canvas, canvas.parentElement.offsetWidth * 0.9, Constants.IMAGE_MAX_SIZE); };
			image.src 			= imageURL;
		}
	}
	catch(e)
	{
        //alert(e); //error in the above string(in this case,yes)!
    }
}

InventoryGroupControllerClass.prototype.getGroupInfoHTML = function(groupData)
{
	var updateButtonText  = LocManager.instance.getLocalizedText("update_button_text");
	var uploadText   	  = LocManager.instance.getLocalizedText("upload_text");

	var html = "<div id='item_scroll_panel' class='item_scroll_panel_class'>";
			html += "<p>Data"+ 
						"<input type='text' id='group_data' 			class='input_class'	value = '" + groupData.data + "'>" +
						"<button 			id='update_group_button' 	class='button_class'>" + updateButtonText + "</button>" +
					"</p>";

			html +=	"Select an image to upload:" + 
					"<input type='file' id='fileToUpload' 		class='input_class'>" +
					"<button 			id='uploadFileButton' 	class='button_class'>" + uploadText + "</button>" + 
					"<div 				id='progressNumber'></div>" +
					"<canvas 			id='imageContainer' class='imageContainerClass' width='800' height='800'></canvas>";
		html += "</div>";

	return html;
};

InventoryGroupControllerClass.prototype.getGroupChildrenHTML = function(groupData)
{
	var rightClickOptions 	= LocManager.instance.getLocalizedText("right_click_tooltip");
	var subGroups 	  		= this.sortSubgroups(groupData.sub_groups);

	var html = "<div id='folders_scroll_panel' class='folders_scroll_panel_class' title='" + rightClickOptions + "'>";

	for(var index in subGroups)
	{
		var subGroup     = subGroups[index];
		var subGroupName = subGroup.name;
		var subGroupId	 = subGroup.id;
		var subGroupType = subGroup.type;
		var icon 		 = subGroupType == Constants.GROUP_ID_FOLDER ? Constants.IMAGE_FOLDER : Constants.IMAGE_FILE;
		var clickEvent   = "onclick='InventoryGroupController.instance.onSubGroupButtonClick(" + subGroupId + ");'"

		html += "<div id='folder_" + subGroupId + "' class='folder_class'>"+
					"<div id='folder_image_" + subGroupId + "' class='folder_image_class " + icon + "' " + clickEvent + "> </div>"+
					"<label id='folder_label_" + subGroupId + "' >" + subGroupName + "</label>"+
				"</div>";
	}

	html += "</div>";

	return html;
};

InventoryGroupControllerClass.prototype.sortSubgroups = function(subGroups)
{
	var folders = new Array();
	var items   = new Array();

	for(var index in subGroups)
	{
		var subGroup = subGroups[index];

		if(subGroup.type == Constants.GROUP_ID_FOLDER)
			folders.push(subGroup);
		else
			items.push(subGroup);
	}

	return folders.concat(items);
};

InventoryGroupControllerClass.prototype.getGroupHeaderHTML = function(groupData)
{
	var backButtonTooltip = LocManager.instance.getLocalizedText("back_button_tooltip");
	var backButtonText    = LocManager.instance.getLocalizedText("back_button_text");
	var searchButtonText  = LocManager.instance.getLocalizedText("search_button_text");
	var rootGroupText  	  = LocManager.instance.getLocalizedText("root_group_text");
	
	var groupPath     	= groupData.path.replace("RootGroup/", rootGroupText + "/");
	var hasParentGroup 	= groupData.parent_group_id != 0;
	var subGroupType  	= groupData.type;
	var isFolderGroup   = subGroupType == Constants.GROUP_ID_FOLDER;

	var html = "<div id='group_header' class='group_header_class'>";
			html += "<div id='group_path' class='group_path_class'>" + groupPath + "</div>";

			if(hasParentGroup)
				html += "<button id='back_button' class='group_path_class button_class' title='" + backButtonTooltip + "'>" + backButtonText + "</button>";

			html += "<button id='search_button' class='search_button_class button_class'>" + searchButtonText + "</button>";
		html += "</div>";

	return html;
};

InventoryGroupControllerClass.prototype.renderRootGroup = function()
{
	this.renderLoadingText();
	ServiceClient.instance.loadRootGroup(function(resultData) { InventoryGroupController.instance.onLoadGroupCallback(resultData); });
};

InventoryGroupControllerClass.prototype.onLoadGroupCallback = function(resultData)
{
	if(resultData.success) 
		this.renderGroup(resultData.data);
	//TODO: Report error
};

InventoryGroupControllerClass.prototype.renderLoadingText = function()
{
	var loadingText 			= LocManager.instance.getLocalizedText("loading_text");
	var groupContainer  		= document.getElementById("group_container");
	groupContainer.innerHTML 	= loadingText;
};

InventoryGroupControllerClass.prototype.loadAjaxGroup = function(groupId)
{
	this.renderLoadingText();
	ServiceClient.instance.loadGroup(groupId, function(resultData) { InventoryGroupController.instance.onLoadGroupCallback(resultData); });
};

InventoryGroupControllerClass.prototype.uploadFile = function()
{
	var canvas 	  = document.getElementById('imageContainer');
	var imageData = canvas.toDataURL("image/jpeg", 0.95);
	ServiceClient.instance.uploadFile(imageData, "jpg", this._groupData, function(resultData) { InventoryGroupController.instance.onUploadCompleted(resultData); }, onProgress);
};

function onProgress(progress) 
{
	document.getElementById('progressNumber').innerHTML = (progress * 100).toString() + '%';
}

InventoryGroupControllerClass.prototype.onUploadCompleted = function(resultData)
{
	if(resultData.success)
		this.loadAjaxGroup(this._groupData.id);

	alert("result = " + JSON.stringify(resultData));
}

InventoryGroupControllerClass.prototype.onSelectedFileChange = function()
{
	var fileInput 	= document.getElementById('fileToUpload');
	var canvas 		= document.getElementById('imageContainer');

	ImageRenderingUtils.instance.renderImage(fileInput, canvas, canvas.parentElement.offsetWidth * 0.9, Constants.IMAGE_MAX_SIZE);
};

InventoryGroupControllerClass.prototype.onSubGroupButtonClick = function(groupId)
{
	this.loadAjaxGroup(groupId);
};

InventoryGroupControllerClass.prototype.onUpdateGroupDataClick = function(groupId)
{
	var groupData = document.getElementById('group_data');
	ServiceClient.instance.updateGroupData(groupId, this._groupData.name, groupData.value, onUpdateGroupDataCallback);
};

function onUpdateGroupDataCallback(resultData)
{
	alert("success = '" + resultData.success + "'");
}

InventoryGroupControllerClass.prototype.onBackButtonClick = function(parentGroupId)
{
	this.loadAjaxGroup(parentGroupId);
};

InventoryGroupControllerClass.prototype.onSearchButtonClick = function()//TODO: Move the code that invokes the search here
{
	SearchPopup.instance.show();
};

InventoryGroupControllerClass.prototype.onKeyUp = function(event)
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