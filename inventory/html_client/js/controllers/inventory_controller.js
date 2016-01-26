var _currentGroupData = null;
var _cuttingGroupId   = null;
var _folderId         = null;
var groupRenderer     = new InventoryGroupController();


//Singleton instance
var InventoryController = { instance : new InventoryControllerClass() };

//Constructors
function InventoryControllerClass()
{
	document.onkeyup = onKeyUp;
}

//Methods
InventoryControllerClass.prototype.render = function()
{
	this.clearHTML();
	ServiceClient.instance.loadRootGroup(onLoadGroupCallback);
}

InventoryControllerClass.prototype.clearHTML = function()
{
	var loadingText = LocManager.instance.getLocalizedString("loading_text");
	var body 	    = document.getElementById("body");
	body.innerHTML  = 	"<div id='group_container'>" + loadingText + "</div>" +
						"<div id='context_menu_container' style='position: absolute; left: 100px; top: 150px;' ></div>";
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

function showContextMenu(event) 
{
	var options = new Array();

	switch(event.target.id)
	{
		case "folders_scroll_panel":
			options.push(Constants.MENU_ITEM_ADD_ITEM);
			options.push(Constants.MENU_ITEM_ADD_FOLDER);

			if(canPasteFolder())
				options.push(Constants.MENU_ITEM_PASTE);
		break;
		default:
			options.push(Constants.MENU_ITEM_RENAME);
			options.push(Constants.MENU_ITEM_CUT);
			options.push(Constants.MENU_ITEM_DELETE);
		break;
	}

	_folderId 		= event.target.parentNode.id.replace("folder_", "");
	var contextMenu = document.getElementById('context_menu_container');

	ContextMenuUtils.getInstance().showContextMenu(contextMenu, { "x" : event.clientX, "y" : event.clientY }, options, onContextMenuOptionSelected);
}

function canPasteFolder()
{
	return _currentGroupData != null && _currentGroupData.can_paste;
}

function onContextMenuOptionSelected(option)
{
	switch(option)
	{
		case Constants.MENU_ITEM_ADD_ITEM: 		addItem(_folderId); 			break;
		case Constants.MENU_ITEM_ADD_FOLDER: 	addFolder();      				break;
		case Constants.MENU_ITEM_PASTE: 		pasteGroup();          			break;
		case Constants.MENU_ITEM_RENAME:    	renameGroup(_folderId); 		break;
		case Constants.MENU_ITEM_CUT: 			_cuttingGroupId = _folderId;	break;
		case Constants.MENU_ITEM_DELETE: 		removeSubgroupGroup(_folderId);	break;
	}
}

function addItem(folderId)
{
	var typeNewItemNameText = LocManager.instance.getLocalizedString("type_new_item_name");
	var itemName 			= prompt(typeNewItemNameText, "");

	if(itemName != null && itemName != "") 
		addSubGroup(itemName, Constants.GROUP_ID_ITEM);
}

function addFolder()
{
	var typeFolderNameText = LocManager.instance.getLocalizedString("type_new_folder_name");
	var folderName         = prompt(typeFolderNameText, "");

	if(folderName != null && folderName != "") 
	    addSubGroup(folderName, Constants.GROUP_ID_FOLDER);
}

function renameGroup(folderId)
{
	var typeNewFolderName = LocManager.instance.getLocalizedString("type_new_name");
	var folderName 		  = prompt(typeNewFolderName, "");

	if(folderName != null && folderName != "") 
	{
		var params = "service=Group&method=Rename&id=" + folderId + "&name=" + folderName;
		RequestUtils.instance.request(Constants.API_URL, "POST", onRenameCallback, params);
	}
}

function onRenameCallback(xmlhttp)
{
	refreshCurrentGroup(xmlhttp);
}

function onUpdateUserDataClick()
{
	var userData = document.getElementById('user_data');
	var params   = "service=User&method=UpdateData&data=" + userData.value;
	RequestUtils.instance.request(Constants.API_URL, "POST", onUpdateUserDataCallback, params);
}

function onUpdateUserDataCallback(xmlhttp)
{
	if(RequestUtils.instance.checkForValidResponse(xmlhttp)) 
	{
		var result = JSON.parse(xmlhttp.responseText);

		if(result.success)
			location.reload();
	}
}

function onUpdateGroupDataClick(groupId)
{
	var groupData = document.getElementById('group_data');
	var params    = "service=Group&method=UpdateData&id=" + groupId + "&data=" + groupData.value;
	RequestUtils.instance.request(Constants.API_URL, "POST", onUpdateGroupDataCallback, params);
}

function onUpdateGroupDataCallback(xmlhttp)
{
	//if(RequestUtils.instance.checkForValidResponse(xmlhttp)) 
		alert("result '" + xmlhttp.responseText + "'");
}

function addSubGroup(newGroupName, type)
{
	ServiceClient.instance.addSubGroup(_currentGroupData.id, newGroupName, type, onAddSubGroupCallback);
}

function onAddSubGroupCallback(resultData)
{
	if(resultData.success) 
		InventoryController.instance.loadAjaxGroup(_currentGroupData.id);
	//TODO: Handle error case
}

function onSubGroupClick(groupId)
{
	InventoryController.instance.loadAjaxGroup(groupId);
}

function onBackButtonClick(parentGroupId)
{
	InventoryController.instance.loadAjaxGroup(parentGroupId);
}

InventoryControllerClass.prototype.loadAjaxGroup = function(groupId)
{
	this.clearHTML();
	ServiceClient.instance.loadGroup(groupId, onLoadGroupCallback);
}

function onLoadGroupCallback(resultData)
{
	if(resultData.success) 
	{
		_currentGroupData = resultData.data;
		groupRenderer.render(_currentGroupData);
	}
	//TODO: Report error
}

function onSearchButtonClick()
{
	var searchTesxtInput = document.getElementById('search_input');
	var params 	    	 = "service=Group&method=Search&searchText=" + searchTesxtInput.value;
	RequestUtils.instance.request(Constants.API_URL, "POST", onSearchCallback, params);
}

function onSearchCallback(xmlhttp)
{
	//if(RequestUtils.instance.checkForValidResponse(xmlhttp))
		alert(xmlhttp.responseText);
}

function pasteGroup()
{
	var params 	    = "service=Group&method=Move&id=" + _cuttingGroupId + "&parentGroupId=" + _currentGroupData.id;
	_cuttingGroupId = null;
	RequestUtils.instance.request(Constants.API_URL, "POST", onMoveGroupCallback, params);
}

function onMoveGroupCallback(xmlhttp)
{
	refreshCurrentGroup(xmlhttp);
}

function refreshCurrentGroup(xmlhttp)
{
	if(RequestUtils.instance.checkForValidResponse(xmlhttp))
	{
		var result = JSON.parse(xmlhttp.responseText);

		if(result.success)
			InventoryController.instance.loadAjaxGroup(_currentGroupData.id);
	}
}

function removeSubgroupGroup(groupId)
{
	var folderLabel 		= document.getElementById('folder_label_' + groupId);
	var deleteFolderText 	= LocManager.instance.getLocalizedString("sure_to_delete_folder");
	deleteFolderText 		= deleteFolderText.replace("[folder]", folderLabel.textContent);
	var remove      		= confirm(deleteFolderText);

	if(remove) 
		ServiceClient.instance.deleteGroup(groupId, onDeleteGroupCallback);
}

function onDeleteGroupCallback(resultData)
{
	if(resultData.success)
		InventoryController.instance.loadAjaxGroup(_currentGroupData.id);
	//TODO: handle error case
}