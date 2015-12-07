function InventoryGroupRenderer()
{
}

function uploadFile()
{
	var file   				 = document.getElementById('fileToUpload').files[0];
	var imageContainer 		 = document.getElementById('imageContainer');
	var imageData 			 = imageContainer.toDataURL("image/jpeg");
	var params 				 = new Object();
	params["service"]   	 = "File";
	params["method"]   	 	 = "Upload";
	params["fileToUpload"]   = imageData;

	var test = document.getElementById("test");
	test.src = imageData;

	RequestUtils.instance.request(InventoryAppConstants.API_URL, "POST", onUploadCompleted, params, onProgress);
}

function onProgress(progress) 
{
	document.getElementById('progressNumber').innerHTML = (progress * 100).toString() + '%';
}

function onUploadCompleted(xmlhttp)
{
	alert(xmlhttp.responseText);
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
			    	var fitScale  = MathUtils.getInstance().getFitScale({ "x":img.width, "y":img.height }, { "x":imageContainer.width, "y":imageContainer.height }, "FitIn");
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

InventoryGroupRenderer.prototype.render = function(groupData)
{
	var backButtonTooltip = LocManager.instance.getLocalizedString("back_button_tooltip");
	var backButtonText    = LocManager.instance.getLocalizedString("back_button_text");
	var rightClickOptions = LocManager.instance.getLocalizedString("right_click_tooltip");
	var updateButtonText  = LocManager.instance.getLocalizedString("update_button_text");
	var searchButtonText  = LocManager.instance.getLocalizedString("search_button_text");

	var groupId       = groupData.id;
	var groupPath     = groupData.path;
	var parentGroupId = groupData.parent_group_id;
	var subGroupType  = groupData.type;
	var subGroups 	  = groupData.sub_groups;

	var groupAjax  = "<div id='folders_area' align='center'>";
	var groupPath  = groupPath.replace("RootGroup/", "Principal/");

	if(parentGroupId != 0)
		groupAjax += "<p style='height:20px'>" + groupPath + " <button id='back_button' type='button' onclick='onBackButtonClick(" + parentGroupId + ");' title='" + backButtonTooltip + "' >" + backButtonText + "</button> </p>";
	else
		groupAjax += "<p style='height:20px'>" + groupPath + "</p>";

	if(subGroupType == InventoryAppConstants.GROUP_ID_FOLDER)
	{
		groupAjax += "<div id='folders_scroll_panel' oncontextmenu='showContextMenu(event); return false;' align='center' style='overflow:scroll; width:600px; height:400px; border:1px solid gray;' title='" + rightClickOptions + "'>";

		for (var index in subGroups)
		{
			var subGroup     = subGroups[index];
			var subGroupName = subGroup.name;
			var subGroupId	 = subGroup.id;
			var subGroupType = subGroup.type;
			var icon 		 = subGroupType == InventoryAppConstants.GROUP_ID_FOLDER ? "inventory/app/images/Folder.png" : "inventory/app/images/File.png";

			groupAjax += "<div id='folder_" + subGroupId + "' style='width:100px; height:120px; float: left;'>"+
								"<img id='folder_image_" + subGroupId + "' src='" + icon + "' onclick='onSubGroupClick(" + subGroupId + ");' style='cursor:pointer; cursor:hand; width:100px; height:88px;'/>"+
								"<label id='folder_label_" + subGroupId + "' >" + subGroupName + "</label>"+
						   "</div>";
		}

		groupAjax += "</div>";

		groupAjax += "<input type='text' id='search_input' value = ''>" +
				   	 "<button type='button' onclick='onSearchButtonClick();'>" + searchButtonText + "</button>";
	}
	else
	{
		groupAjax += "<p>Data"+ 
							"<input type='text' id='group_data' value = '" + groupData.data + "'>" +
							"<button type='button' onclick='onUpdateGroupDataClick(" + groupId + ");'>" + updateButtonText + "</button>" +
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

	var groupContaner 	    = document.getElementById('group_container');
	groupContaner.innerHTML = groupAjax;
};