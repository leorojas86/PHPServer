//Singleton instance
var InventoryContextMenuController = { instance : new InventoryContextMenuControllerClass() };

InventoryContextMenuControllerClass.prototype._cuttingGroupId 	= null;
InventoryContextMenuControllerClass.prototype._folderId 		= null;

//Constructors
function InventoryContextMenuControllerClass()
{
}

InventoryContextMenuControllerClass.prototype.initContextMenu = function()
{
	var scrollPanel 			= document.getElementById("folders_scroll_panel");
	scrollPanel.oncontextmenu 	= function(event) { InventoryContextMenuController.instance.showContextMenu(event); return false; };

	var isIOS = /(iPad|iPhone|iPod)/g.test(navigator.userAgent);

	if(isIOS)//HACK: Fix iOS oncontextmenu event
	{	
		var startTime = null;

		scrollPanel.addEventListener('touchstart', function(e) 
		{ 
			startTime = new Date(); 
			return false;
		}, true);

		scrollPanel.addEventListener('touchend', function(e) 
		{
			var endTime     = new Date();
			var elapsedTime = endTime - startTime;

			if(startTime != null && elapsedTime > 300)//Hold for half a second
			{
				scrollPanel.style.pointerEvents = "none";
				setTimeout(function()
				{ 
					var touch = e.changedTouches[0];
					InventoryContextMenuController.instance.showContextMenu(touch); 
					scrollPanel.style.pointerEvents = "all";
				}, 500);
			}
			else
				ContextMenuUtils.instance.hideContextMenu();

			return false;
		}, true);
	}
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

	this._folderId  = event.target.parentNode.id.replace("folder_", "");
	var contextMenu = document.getElementById('context_menu_container');

	var onContextMenuOptionSelected = function(option) { InventoryContextMenuController.instance.onContextMenuOptionSelected(option); } 
	ContextMenuUtils.instance.showContextMenu(contextMenu, event, options, onContextMenuOptionSelected);
};

InventoryContextMenuControllerClass.prototype.canPasteFolder = function()
{
	return this._cuttingGroupId != null;
};

InventoryContextMenuControllerClass.prototype.onContextMenuOptionSelected = function(option)
{
	switch(option)
	{
		case Constants.MENU_ITEM_ADD_ITEM: 		this.addItem(this._folderId); 			break;
		case Constants.MENU_ITEM_ADD_FOLDER: 	this.addFolder();      				break;
		case Constants.MENU_ITEM_PASTE: 		this.pasteGroup();          			break;
		case Constants.MENU_ITEM_RENAME:    	this.renameGroup(this._folderId); 		break;
		case Constants.MENU_ITEM_CUT: 			this._cuttingGroupId = this._folderId;	break;
		case Constants.MENU_ITEM_DELETE: 		this.removeSubgroupGroup(this._folderId);	break;
	}
};

InventoryContextMenuControllerClass.prototype.addItem = function(folderId)
{
	var typeNewItemNameText = LocManager.instance.getLocalizedText("type_new_item_name");
	var itemName 			= prompt(typeNewItemNameText, "");

	if(itemName != null && itemName != "") 
		this.addSubGroup(itemName, Constants.GROUP_ID_ITEM);
}

InventoryContextMenuControllerClass.prototype.addFolder = function()
{
	var typeFolderNameText = LocManager.instance.getLocalizedText("type_new_folder_name");
	var folderName         = prompt(typeFolderNameText, "");

	if(folderName != null && folderName != "") 
	    this.addSubGroup(folderName, Constants.GROUP_ID_FOLDER);
}

InventoryContextMenuControllerClass.prototype.renameGroup = function(folderId)
{
	var typeNewFolderName = LocManager.instance.getLocalizedText("type_new_name");
	var folderName 		  = prompt(typeNewFolderName, "");

	if(folderName != null && folderName != "") 
		ServiceClient.instance.renameGroup(folderId, folderName, this.refreshCurrentGroup);
}

InventoryContextMenuControllerClass.prototype.addSubGroup = function(newGroupName, type)
{
	ServiceClient.instance.addSubGroup(InventoryGroupController.instance._groupData.id, newGroupName, type, null, this.onAddSubGroupCallback);
}

InventoryContextMenuControllerClass.prototype.onAddSubGroupCallback = function(resultData)
{
	if(resultData.success) 
		InventoryGroupController.instance.loadAjaxGroup(InventoryGroupController.instance._groupData.id);
	//TODO: Handle error case
}

InventoryContextMenuControllerClass.prototype.pasteGroup = function()
{
	ServiceClient.instance.moveGroup(this._cuttingGroupId, InventoryGroupController.instance._groupData.id, this.refreshCurrentGroup);
	this._cuttingGroupId = null;
}

InventoryContextMenuControllerClass.prototype.refreshCurrentGroup = function(resultData)
{
	if(resultData.success)
		InventoryGroupController.instance.loadAjaxGroup(InventoryGroupController.instance._groupData.id);
	//TODO: Handle error case
}

InventoryContextMenuControllerClass.prototype.removeSubgroupGroup = function(groupId)
{
	var folderLabel 		= document.getElementById('folder_label_' + groupId);
	var deleteFolderText 	= LocManager.instance.getLocalizedText("sure_to_delete_folder");
	deleteFolderText 		= deleteFolderText.replace("[folder]", folderLabel.textContent);
	var remove      		= confirm(deleteFolderText);

	if(remove) 
		ServiceClient.instance.deleteGroup(groupId, this.onDeleteGroupCallback);
}

InventoryContextMenuControllerClass.prototype.onDeleteGroupCallback = function(resultData)
{
	if(resultData.success)
		InventoryGroupController.instance.loadAjaxGroup(InventoryGroupController.instance._groupData.id);
	//TODO: handle error case
}