//Singleton instance
var InventoryContextMenuController = { instance : new InventoryContextMenuControllerClass() };

//Constructors
function InventoryContextMenuControllerClass()
{
}

InventoryContextMenuControllerClass.prototype.showContextMenu = function(event)//TODO: Move the logic to call this here
{
	var options = new Array();

	switch(event.target.id)
	{
		case "folders_scroll_panel":
			options.push(Constants.MENU_ITEM_ADD_ITEM);
			options.push(Constants.MENU_ITEM_ADD_FOLDER);

			if(this.canPasteFolder())
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

	var onContextMenuOptionSelected = function(option) { InventoryContextMenuController.instance.onContextMenuOptionSelected(option); } 
	ContextMenuUtils.instance.showContextMenu(contextMenu, event, options, onContextMenuOptionSelected);
};

InventoryContextMenuControllerClass.prototype.canPasteFolder = function()
{
	return InventoryController.instance._currentGroupData != null/* && InventoryController.instance._currentGroupData.can_paste*/;
};

InventoryContextMenuControllerClass.prototype.onContextMenuOptionSelected = function(option)
{
	switch(option)
	{
		case Constants.MENU_ITEM_ADD_ITEM: 		addItem(_folderId); 			break;
		case Constants.MENU_ITEM_ADD_FOLDER: 	addFolder();      				break;
		case Constants.MENU_ITEM_PASTE: 		pasteGroup();          			break;
		case Constants.MENU_ITEM_RENAME:    	renameGroup(_folderId); 		break;
		case Constants.MENU_ITEM_CUT: 			InventoryController.instance._cuttingGroupId = _folderId;	break;
		case Constants.MENU_ITEM_DELETE: 		removeSubgroupGroup(_folderId);	break;
	}
};

function addItem(folderId)
{
	var typeNewItemNameText = LocManager.instance.getLocalizedText("type_new_item_name");
	var itemName 			= prompt(typeNewItemNameText, "");

	if(itemName != null && itemName != "") 
		addSubGroup(itemName, Constants.GROUP_ID_ITEM);
}

function addFolder()
{
	var typeFolderNameText = LocManager.instance.getLocalizedText("type_new_folder_name");
	var folderName         = prompt(typeFolderNameText, "");

	if(folderName != null && folderName != "") 
	    addSubGroup(folderName, Constants.GROUP_ID_FOLDER);
}

function renameGroup(folderId)
{
	var typeNewFolderName = LocManager.instance.getLocalizedText("type_new_name");
	var folderName 		  = prompt(typeNewFolderName, "");

	if(folderName != null && folderName != "") 
		ServiceClient.instance.renameGroup(folderId, folderName, onRenameCallback);
}

function onRenameCallback(xmlhttp)
{
	refreshCurrentGroup(xmlhttp);
}

function addSubGroup(newGroupName, type)
{
	ServiceClient.instance.addSubGroup(InventoryController.instance._currentGroupData.id, newGroupName, type, onAddSubGroupCallback);
}

function onAddSubGroupCallback(resultData)
{
	if(resultData.success) 
		InventoryGroupController.instance.loadAjaxGroup(InventoryController.instance._currentGroupData.id);
	//TODO: Handle error case
}

function pasteGroup()
{
	ServiceClient.instance.moveGroup(InventoryController.instance._cuttingGroupId, InventoryController.instance._currentGroupData.id, refreshCurrentGroup);
	InventoryController.instance._cuttingGroupId = null;
}

function refreshCurrentGroup(resultData)
{
	if(resultData.success)
		InventoryGroupController.instance.loadAjaxGroup(InventoryController.instance._currentGroupData.id);
	//TODO: Handle error case
}

function removeSubgroupGroup(groupId)
{
	var folderLabel 		= document.getElementById('folder_label_' + groupId);
	var deleteFolderText 	= LocManager.instance.getLocalizedText("sure_to_delete_folder");
	deleteFolderText 		= deleteFolderText.replace("[folder]", folderLabel.textContent);
	var remove      		= confirm(deleteFolderText);

	if(remove) 
		ServiceClient.instance.deleteGroup(groupId, onDeleteGroupCallback);
}

function onDeleteGroupCallback(resultData)
{
	if(resultData.success)
		InventoryGroupController.instance.loadAjaxGroup(InventoryController.instance._currentGroupData.id);
	//TODO: handle error case
}