<!DOCTYPE html>
<html  lang="en">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
		<title>Inventory</title>
		<link rel="stylesheet" href="inventory_app/view/css/main_page.css">
		<script src="utils/js/request_utils.js" 	 						type="text/javascript" ></script>
		<script src="utils/js/context_menu_utils.js" 						type="text/javascript" ></script>
		<script src="utils/js/localization_manager.js" 						type="text/javascript" ></script>
		<script src="inventory_app/view/js/inventory_app_constants.js" 		type="text/javascript" ></script>
		<script src="inventory_app/view/js/inventory_group_renderer.js" 	type="text/javascript" ></script>
		<script type="text/javascript">

			var _currentGroupData = null;
			var _cuttingGroupId   = null;
			var _folderId         = null;
			var groupRenderer     = new InventoryGroupRenderer();

			function onPageLoaded() 
		    {
		    	LocManager.getInstance().loadLocalizationTable(InventoryAppConstants.ENGLISH_LOCALIZATION_TABLE, onLocalizationLoaded, false);
			}

			function onLocalizationLoaded(sender)
			{
				document.onkeyup  = onKeyUp;
    			var groupContaner = document.getElementById('group_container');
    			var params 		  = "service=Group&method=GetRootGroupData";
				RequestUtils.getInstance().request(InventoryAppConstants.API_URL, "POST", onGroupContainerAjaxCallback, params);
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
		    			options.push(InventoryAppConstants.MENU_ITEM_ADD_ITEM);
		    			options.push(InventoryAppConstants.MENU_ITEM_ADD_FOLDER);

		    			if(canPasteFolder())
							options.push(InventoryAppConstants.MENU_ITEM_PASTE);
		    		break;
		    		default:
		    			options.push(InventoryAppConstants.MENU_ITEM_RENAME);
		    			options.push(InventoryAppConstants.MENU_ITEM_CUT);
		    			options.push(InventoryAppConstants.MENU_ITEM_DELETE);
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
		    		case InventoryAppConstants.MENU_ITEM_ADD_ITEM: 		addItem(_folderId); 			break;
		    		case InventoryAppConstants.MENU_ITEM_ADD_FOLDER: 	addFolder();      				break;
		    		case InventoryAppConstants.MENU_ITEM_PASTE: 		pasteGroup();          			break;
		    		case InventoryAppConstants.MENU_ITEM_RENAME:    	renameGroup(_folderId); 		break;
		    		case InventoryAppConstants.MENU_ITEM_CUT: 			_cuttingGroupId = _folderId;	break;
		    		case InventoryAppConstants.MENU_ITEM_DELETE: 		removeSubgroupGroup(_folderId);	break;
		    	}
		    }

		    function addItem(folderId)
		    {
		    	var typeNewItemNameText = LocManager.getInstance().getLocalizedString("type_new_item_name");
		    	var itemName 			= prompt(typeNewItemNameText, "");
		    	var itemId 				= 1;

				if(itemName != null && itemName != "") 
					addSubGroup(itemName, itemId);
		    }

		    function addFolder()
		    {
		    	var typeFolderNameText = LocManager.getInstance().getLocalizedString("type_new_folder_name");
	    		var folderName         = prompt(typeFolderNameText, "");
	    		var defaultGroupType   = 0;

				if(folderName != null && folderName != "") 
				    addSubGroup(folderName, defaultGroupType);
		    }

		    function renameGroup(folderId)
		    {
		    	var typeNewFolderName = LocManager.getInstance().getLocalizedString("type_new_name");
		    	var folderName 		  = prompt(typeNewFolderName, "");

				if(folderName != null && folderName != "") 
				{
					var params = "service=Group&method=Rename&id=" + folderId + "&name=" + folderName;
					RequestUtils.getInstance().request(InventoryAppConstants.API_URL, "POST", onRenameCallback, params);
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
				RequestUtils.getInstance().request(InventoryAppConstants.API_URL, "POST", onUpdateUserDataCallback, params);
			}

			function onUpdateUserDataCallback(xmlhttp)
			{
				if(RequestUtils.getInstance().checkForValidResponse(xmlhttp)) 
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
				RequestUtils.getInstance().request(InventoryAppConstants.API_URL, "POST", onUpdateGroupDataCallback, params);
			}

			function onUpdateGroupDataCallback(xmlhttp)
			{
				//if(RequestUtils.getInstance().checkForValidResponse(xmlhttp)) 
					alert("result '" + xmlhttp.responseText + "'");
			}

			function addSubGroup(newGroupName, type)
			{
				var params = "service=Group&method=AddSubGroup&parentGroupId=" + _currentGroupData.id + "&name=" + newGroupName + "&type=" + type;
				RequestUtils.getInstance().request(InventoryAppConstants.API_URL, "POST", onAddSubGroupCallback, params);
			}

			function onAddSubGroupCallback(xmlhttp)
			{
				if(RequestUtils.getInstance().checkForValidResponse(xmlhttp)) 
				{
					var result = JSON.parse(xmlhttp.responseText);

					if(result.success)
						loadAjaxGroup(_currentGroupData.id);
				}
			}

			function onSubGroupClick(groupId)
			{
				loadAjaxGroup(groupId);
			}

			function onBackButtonClick(parentGroupId)
			{
				loadAjaxGroup(parentGroupId);
			}

			function loadAjaxGroup(groupId)
			{
				var params = "service=Group&method=GetGroupData&id=" + groupId + "&cuttingGroupId=" + _cuttingGroupId;
				RequestUtils.getInstance().request(InventoryAppConstants.API_URL, "POST", onGroupContainerAjaxCallback, params);
			}

			function onGroupContainerAjaxCallback(xmlhttp)
			{
				if(RequestUtils.getInstance().checkForValidResponse(xmlhttp)) 
				{
					var result = JSON.parse(xmlhttp.responseText);

					if(result.success)
					{
						_currentGroupData = result.data.group_data;
						groupRenderer.render(_currentGroupData);
					}
				}
			}

			function onSearchButtonClick()
			{
				var searchTesxtInput = document.getElementById('search_input');
				var params 	    	 = "service=Group&method=Search&searchText=" + searchTesxtInput.value;
				RequestUtils.getInstance().request(InventoryAppConstants.API_URL, "POST", onSearchCallback, params);
			}

			function onSearchCallback(xmlhttp)
			{
				//if(RequestUtils.getInstance().checkForValidResponse(xmlhttp))
					alert(xmlhttp.responseText);
			}

			function pasteGroup()
			{
				var params 	    = "service=Group&method=Move&id=" + _cuttingGroupId + "&parentGroupId=" + _currentGroupData.id;
				_cuttingGroupId = null;
				RequestUtils.getInstance().request(InventoryAppConstants.API_URL, "POST", onMoveGroupCallback, params);
			}

			function onMoveGroupCallback(xmlhttp)
			{
				refreshCurrentGroup(xmlhttp);
			}

			function refreshCurrentGroup(xmlhttp)
			{
				if(RequestUtils.getInstance().checkForValidResponse(xmlhttp))
				{
					var result = JSON.parse(xmlhttp.responseText);

					if(result.success)
						loadAjaxGroup(_currentGroupData.id);
				}
			}

			function removeSubgroupGroup(groupId)
			{
				var folderLabel 		= document.getElementById('folder_label_' + groupId);
				var deleteFolderText 	= LocManager.getInstance().getLocalizedString("sure_to_delete_folder");
				deleteFolderText 		= deleteFolderText.replace("[folder]", folderLabel.textContent);
				var remove      		= confirm(deleteFolderText);

				if(remove) 
				{
					var params = "service=Group&method=Delete&id=" + groupId;
					RequestUtils.getInstance().request(InventoryAppConstants.API_URL, "POST", onDeleteGroupCallback, params);
				}
			}

			function onDeleteGroupCallback(xmlhttp)
			{
				if(RequestUtils.getInstance().checkForValidResponse(xmlhttp))
				{
					var result = JSON.parse(xmlhttp.responseText);

					if(result.success)
						loadAjaxGroup(_currentGroupData.id);
				}
			}

		</script>
	</head>
	<body onload="onPageLoaded();">
		<div id='group_container'></div>
		<div id='context_menu_container' style='position: absolute; left: 100px; top: 150px;' ></div>
	</body>
</html>