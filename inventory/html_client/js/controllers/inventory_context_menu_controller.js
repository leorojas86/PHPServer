//Singleton instance
var InventoryContextMenuController = { instance : new InventoryContextMenuControllerClass() };

function InventoryContextMenuControllerClass()
{
	var _cuttingGroupId = null;
	var _folderId 		= null;

	this.initContextMenu = function()
	{
		var scrollPanel 			= document.getElementById("folders_scroll_panel");
		scrollPanel.oncontextmenu 	= function(event) { InventoryContextMenuController.instance.showContextMenu(event); return false; };

		var isIOS = /(iPad|iPhone|iPod)/g.test(navigator.userAgent);

		if(isIOS)//HACK: Fix iOS oncontextmenu event, TODO: move this to a utils class
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

				if(startTime != null && elapsedTime > 500)//Hold for half a second
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
	};

	this.showContextMenu = function(event)//TODO: Move the logic to call this here
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

		_folderId  		= event.target.parentNode.id.replace("folder_", "");
		var contextMenu = document.getElementById('context_menu_container');

		var onContextMenuOptionSelected = function(option) { InventoryContextMenuController.instance.onContextMenuOptionSelected(option); } 
		ContextMenuUtils.instance.showContextMenu(contextMenu, event, options, onContextMenuOptionSelected);
	};

	this.canPasteFolder = function()
	{
		return _cuttingGroupId != null;
	};

	this.onContextMenuOptionSelected = function(option)
	{
		switch(option)
		{
			case Constants.MENU_ITEM_ADD_ITEM: 		this.addItem(_folderId); 			break;
			case Constants.MENU_ITEM_ADD_FOLDER: 	this.addFolder();      				break;
			case Constants.MENU_ITEM_PASTE: 		this.pasteGroup();          			break;
			case Constants.MENU_ITEM_RENAME:    	this.renameGroup(_folderId); 		break;
			case Constants.MENU_ITEM_CUT: 			_cuttingGroupId = _folderId;	break;
			case Constants.MENU_ITEM_DELETE: 		this.removeSubgroupGroup(_folderId);	break;
		}
	};

	this.addItem = function(folderId)
	{
		var typeNewItemNameText = LocManager.instance.getLocalizedText("type_new_item_name");
		var itemName 			= prompt(typeNewItemNameText, "");

		if(itemName != null && itemName != "")
		{
			InventoryGroupController.instance.renderLoadingText();
			this.addSubGroup(itemName, Constants.GROUP_ID_ITEM);
		}
	};

	this.addFolder = function()
	{
		var typeFolderNameText = LocManager.instance.getLocalizedText("type_new_folder_name");
		var folderName         = prompt(typeFolderNameText, "");

		if(folderName != null && folderName != "")
		{
			InventoryGroupController.instance.renderLoadingText();
		    this.addSubGroup(folderName, Constants.GROUP_ID_FOLDER);
		}
	};

	this.renameGroup = function(folderId)
	{
		var typeNewFolderName = LocManager.instance.getLocalizedText("type_new_name");
		var folderName 		  = prompt(typeNewFolderName, "");

		if(folderName != null && folderName != "") 
		{
			InventoryGroupController.instance.renderLoadingText();
			var subgroup = InventoryGroupController.instance.findSubGroup(folderId);
			GroupsService.instance.renameGroup(subgroup, InventoryGroupController.instance.groupData.id, folderName, this.refreshCurrentGroup);
		}
	};

	this.addSubGroup = function(newGroupName, type)
	{
		GroupsService.instance.addSubGroup(InventoryGroupController.instance.groupData.id, newGroupName, type, null, this.onAddSubGroupCallback);
	};

	this.onAddSubGroupCallback = function(resultData)
	{
		if(resultData.success) 
			InventoryGroupController.instance.loadAjaxGroup(InventoryGroupController.instance.groupData.id);
		else
			alert(resultData.data);
	};

	this.pasteGroup = function()
	{
		InventoryGroupController.instance.renderLoadingText();
		GroupsService.instance.moveGroup(_cuttingGroupId, InventoryGroupController.instance.groupData.id, this.refreshCurrentGroup);
		_cuttingGroupId = null;
	};

	this.refreshCurrentGroup = function(resultData)
	{
		if(resultData.success)
			InventoryGroupController.instance.loadAjaxGroup(InventoryGroupController.instance.groupData.id);
		else
			alert(resultData.data);
	};

	this.removeSubgroupGroup = function(groupId)
	{
		var folderLabel 		= document.getElementById('folder_label_' + groupId);
		var deleteFolderText 	= LocManager.instance.getLocalizedText("sure_to_delete_folder");
		deleteFolderText 		= deleteFolderText.replace("[folder]", folderLabel.textContent);
		var remove      		= confirm(deleteFolderText);

		if(remove) 
		{
			InventoryGroupController.instance.renderLoadingText();
			GroupsService.instance.deleteGroup(groupId, InventoryGroupController.instance.groupData.id, this.onDeleteGroupCallback);
		}
	};

	this.onDeleteGroupCallback = function(resultData)
	{
		if(resultData.success)
			InventoryGroupController.instance.loadAjaxGroup(InventoryGroupController.instance.groupData.id);
		else
			alert(resultData.data);
	};
}