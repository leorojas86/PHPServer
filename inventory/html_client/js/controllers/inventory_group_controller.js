//Singleton instance
var InventoryGroupController = { instance : new InventoryGroupControllerClass() };

//Constructor
function InventoryGroupControllerClass()
{
	document.onkeyup = onKeyUp;
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

//Methods
InventoryGroupControllerClass.prototype.renderGroup = function(groupData)
{
	var backButtonTooltip = LocManager.instance.getLocalizedString("back_button_tooltip");
	var backButtonText    = LocManager.instance.getLocalizedString("back_button_text");
	var rightClickOptions = LocManager.instance.getLocalizedString("right_click_tooltip");
	var updateButtonText  = LocManager.instance.getLocalizedString("update_button_text");

	var groupId       = groupData.id;
	var groupPath     = groupData.path;
	var parentGroupId = groupData.parent_group_id;
	var subGroupType  = groupData.type;
	var subGroups 	  = groupData.sub_groups;

	var groupAjax  = "<div id='folders_area' class='folders_area_class'>";
	var groupPath  = groupPath.replace("RootGroup/", "Principal/");

	if(parentGroupId != 0)
		groupAjax += "<p id='group_path' class='group_path_class'>" + groupPath + " <button id='back_button' type='button' onclick='onBackButtonClick(" + parentGroupId + ");' title='" + backButtonTooltip + "' >" + backButtonText + "</button> </p>";
	else
		groupAjax += "<p id='group_path' class='group_path_class'>" + groupPath + "</p>";

	if(subGroupType == Constants.GROUP_ID_FOLDER)
	{
		groupAjax += "<div id='folders_scroll_panel' class='folders_scroll_panel_class' oncontextmenu='showContextMenu(event); return false;' title='" + rightClickOptions + "'>";

		for (var index in subGroups)
		{
			var subGroup     = subGroups[index];
			var subGroupName = subGroup.name;
			var subGroupId	 = subGroup.id;
			var subGroupType = subGroup.type;
			var icon 		 = URLUtils.instance.getServerURL() + (subGroupType == Constants.GROUP_ID_FOLDER ? "inventory/html_client/images/Folder.png" : "inventory/html_client/images/File.png");

			groupAjax += "<div id='folder_" + subGroupId + "' class='folder_class'>"+
								"<img id='folder_image_" + subGroupId + "' class='folder_image_class' src='" + icon + "' onclick='onSubGroupClick(" + subGroupId + ");'/>"+
								"<label id='folder_label_" + subGroupId + "' >" + subGroupName + "</label>"+
						   "</div>";
		}

		groupAjax += "</div>";
	}
	else
	{
		groupAjax += "<p>Data"+ 
							"<input type='text' id='group_data' value = '" + groupData.data + "'>" +
							"<button id='update_group_button'>" + updateButtonText + "</button>" +
					   "</p>";

		groupAjax +=	"Select an image to upload:" + 
					 	"<input type='hidden' name='service' value='File'>" + 
					 	"<input type='hidden' name='method'  value='Upload'>" +
						"<input type='file'   name='fileToUpload' id='fileToUpload' onchange='onSelectedFileChange();'>" +
						"<input type='button' onclick='uploadFile();' value='Upload Image' >" + 
						"<div id='progressNumber'></div>" +
						"<canvas id='imageContainer' width='500' height='500'></canvas>" +
						"<img id='test'> </img>";
	}

	groupAjax += "</div>";

	var groupContainer  		= document.getElementById("group_container");
	groupContainer.innerHTML 	= groupAjax;

	document.getElementById("update_group_button").onclick = function() { InventoryGroupController.instance.onUpdateGroupDataClick(groupId); }
};

InventoryGroupControllerClass.prototype.renderRootGroup = function()
{
	this.clearHTML();
	var thisVar = this;
	ServiceClient.instance.loadRootGroup(function(resultData) { thisVar.onLoadGroupCallback(resultData) });
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
	var thisVar = this;
	ServiceClient.instance.loadGroup(groupId, function(resultData) { thisVar.onLoadGroupCallback(resultData) });
};

function uploadFile()
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

function onSelectedFileChange()
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
}

function onSubGroupClick(groupId)
{
	InventoryGroupController.instance.loadAjaxGroup(groupId);
}

InventoryGroupControllerClass.prototype.onUpdateGroupDataClick = function(groupId)
{
	var groupData = document.getElementById('group_data');
	ServiceClient.instance.updateGroupData(groupId, groupData.value, onUpdateGroupDataCallback);
};

function onUpdateGroupDataCallback(resultData)
{
	alert("success = '" + resultData.success + "'");
}

function onBackButtonClick(parentGroupId)
{
	InventoryGroupController.instance.loadAjaxGroup(parentGroupId);
}