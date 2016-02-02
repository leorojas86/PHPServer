//Singleton instance
var InventoryGroupController = { instance : new InventoryGroupControllerClass() };

//Constructor
function InventoryGroupControllerClass()
{
}

//Methods
InventoryGroupControllerClass.prototype.renderGroup = function(groupData)
{
	var backButtonTooltip = LocManager.instance.getLocalizedString("back_button_tooltip");
	var backButtonText    = LocManager.instance.getLocalizedString("back_button_text");
	var rightClickOptions = LocManager.instance.getLocalizedString("right_click_tooltip");
	var updateButtonText  = LocManager.instance.getLocalizedString("update_button_text");
	var searchButtonText  = LocManager.instance.getLocalizedString("search_button_text");
	var rootGroupText  	  = LocManager.instance.getLocalizedString("root_group_text");
	var uploadImageText   = LocManager.instance.getLocalizedString("upload_image_text");

	var groupId       = groupData.id;
	var groupPath     = groupData.path;
	var parentGroupId = groupData.parent_group_id;
	var subGroupType  = groupData.type;
	var subGroups 	  = groupData.sub_groups;

	var groupAjax  = "<div id='folders_area' class='folders_area_class'>";
	var groupPath  = groupPath.replace("RootGroup/", rootGroupText + "/");

	var isParentGroup = parentGroupId != 0;

	if(isParentGroup)
		groupAjax += "<p id='group_path' class='group_path_class'>" + groupPath + " <button id='back_button' title='" + backButtonTooltip + "'>" + backButtonText + "</button> </p>";
	else
		groupAjax += "<p id='group_path' class='group_path_class'>" + groupPath + "</p>";

	var isFolderGroup = subGroupType == Constants.GROUP_ID_FOLDER;

	if(isFolderGroup)
	{
		groupAjax += "<div id='folders_scroll_panel' class='folders_scroll_panel_class' title='" + rightClickOptions + "'>";

		for(var index in subGroups)
		{
			var subGroup     = subGroups[index];
			var subGroupName = subGroup.name;
			var subGroupId	 = subGroup.id;
			var subGroupType = subGroup.type;
			var icon 		 = URLUtils.instance.getServerURL() + (subGroupType == Constants.GROUP_ID_FOLDER ? "inventory/html_client/images/Folder.png" : "inventory/html_client/images/File.png");
			var clickEvent   = "onclick='InventoryGroupController.instance.onSubGroupButtonClick(" + subGroupId + ");'"

			groupAjax += "<div id='folder_" + subGroupId + "' class='folder_class'>"+
							"<img id='folder_image_" + subGroupId + "' class='folder_image_class' src='" + icon + "' " + clickEvent + "/>"+
							"<label id='folder_label_" + subGroupId + "' >" + subGroupName + "</label>"+
						 "</div>";
		}

		groupAjax += "</div>";

		groupAjax += "<input type='text' id='search_input' value = ''>";
		groupAjax += "<button id='search_button'>" + searchButtonText + "</button>";
	}
	else
	{
		groupAjax += "<p>Data"+ 
							"<input type='text' id='group_data' value = '" + groupData.data + "'>" +
							"<button id='update_group_button'>" + updateButtonText + "</button>" +
					   "</p>";

		groupAjax +=	"Select an image to upload:" + 
						"<input type='file' id='fileToUpload'>" +
						"<button 			id='uploadFileButton'>" + uploadImageText + "</button>" + 
						"<div 				id='progressNumber'></div>" +
						"<canvas 			id='imageContainer' width='500' height='500'></canvas>";
	}

	groupAjax += "</div>";

	var groupContainer  		= document.getElementById("group_container");
	groupContainer.innerHTML 	= groupAjax;

	if(isParentGroup)
		document.getElementById("back_button").onclick = function() { InventoryGroupController.instance.onBackButtonClick(parentGroupId); }

	if(isFolderGroup)
	{
		document.getElementById("search_button").onclick 				= function() 		{ InventoryGroupController.instance.onSearchButtonClick(); }
		document.getElementById("folders_scroll_panel").oncontextmenu	= function(event) 	{ InventoryContextMenuController.instance.showContextMenu(event); return false; }

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

	document.onkeyup = function(event) { InventoryGroupController.instance.onKeyUp(event); }
};

InventoryGroupControllerClass.prototype.renderRootGroup = function()
{
	this.clearHTML();
	ServiceClient.instance.loadRootGroup(function(resultData) { InventoryGroupController.instance.onLoadGroupCallback(resultData); });
};

InventoryGroupControllerClass.prototype.onLoadGroupCallback = function(resultData)
{
	if(resultData.success) 
	{
		InventoryController.instance._currentGroupData = resultData.data;
		this.renderGroup(InventoryController.instance._currentGroupData);
	}
	//TODO: Report error
};

InventoryGroupControllerClass.prototype.clearHTML = function()
{
	var loadingText 			= LocManager.instance.getLocalizedString("loading_text");
	var groupContainer  		= document.getElementById("group_container");
	groupContainer.innerHTML 	= loadingText;
};

InventoryGroupControllerClass.prototype.loadAjaxGroup = function(groupId)
{
	this.clearHTML();
	ServiceClient.instance.loadGroup(groupId, function(resultData) { InventoryGroupController.instance.onLoadGroupCallback(resultData); });
};

InventoryGroupControllerClass.prototype.uploadFile = function()
{
	var imageData = imageContainer.toDataURL("image/jpeg");
	ServiceClient.instance.uploadFile(imageData, onUploadCompleted, onProgress);
}

function onProgress(progress) 
{
	document.getElementById('progressNumber').innerHTML = (progress * 100).toString() + '%';
}

function onUploadCompleted(resultData)
{
	alert("success = " + resultData.success);
}

InventoryGroupControllerClass.prototype.onSelectedFileChange = function()
{
	var fileInput = document.getElementById('fileToUpload');
	var ext       = fileInput.value.match(/\.([^\.]+)$/)[1];

    switch(ext)
    {
        case 'jpg':
        case 'bmp':
        case 'png':
        case 'tif':
            var imageContainer = document.getElementById('imageContainer');
            imageContainer.src = fileInput.files[0];
            var reader   	   = new FileReader();
	        reader.onload 	   = function(e) 
	        {	
			    var img = new Image();
			    
			    img.onload = function() 
			    { 
			    	var fitScale  = MathUtils.instance.getFitScale({ "x":img.width, "y":img.height }, { "x":imageContainer.width, "y":imageContainer.height }, "FitIn");
			    	var fitWidth  = img.width  * fitScale;
			    	var fitHeight = img.height * fitScale;
			    	var fitX      = (imageContainer.width  - fitWidth)  / 2;
			    	var fitY      = (imageContainer.height - fitHeight) / 2;

			    	imageContainer.getContext("2d").clearRect(0,0, imageContainer.width, imageContainer.height);
			    	imageContainer.getContext("2d").drawImage(img, fitX, fitY, fitWidth, fitHeight); 
			    };
			    img.src = e.target.result;
	        }

	        reader.readAsDataURL(fileInput.files[0]);
        break;
        default:
            alert('Selected file is not a valid image');
            fileInput.value	   = '';
            imageContainer.src = '';
    }
};

InventoryGroupControllerClass.prototype.onSubGroupButtonClick = function(groupId)
{
	this.loadAjaxGroup(groupId);
};

InventoryGroupControllerClass.prototype.onUpdateGroupDataClick = function(groupId)
{
	var groupData = document.getElementById('group_data');
	ServiceClient.instance.updateGroupData(groupId, groupData.value, onUpdateGroupDataCallback);
};

function onUpdateGroupDataCallback(resultData)
{
	alert("success = '" + resultData.success + "'");
}

InventoryGroupControllerClass.prototype.onBackButtonClick = function(parentGroupId)
{
	this.loadAjaxGroup(parentGroupId);
}


InventoryGroupControllerClass.prototype.onSearchButtonClick = function()//TODO: Move the code that invokes the search here
{
	var searchTesxtInput = document.getElementById('search_input');
	ServiceClient.instance.searchGroups(searchTesxtInput.value, this.onSearchCallback);
}

InventoryGroupControllerClass.prototype.onSearchCallback = function(resultData)
{
	//if(resultData.success)
		alert(resultData.data);
}

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
}