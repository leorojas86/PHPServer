<!DOCTYPE html>
<html  lang="en">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
		<title>Inventory</title>
		<link rel="stylesheet" href="inventory_app/view/css/main_page.css">
		<script src="utils/js/request_utils.js" 	 		type="text/javascript" ></script>
		<script src="utils/js/context_menu_utils.js" 		type="text/javascript" ></script>
		<script src="inventory_app/view/js/constants.js" 	type="text/javascript" ></script>
		<script type="text/javascript">

			var _currentGroupData = null;
			var _cuttingGroupId   = null;
			var _folderId         = null;

			onload = function() 
		    {
    			document.onkeyup  = onKeyUp;
    			var groupContaner = document.getElementById('group_container');

    			if(groupContaner != null)//User is logged in
    			{
	    			var params = "service=Group&method=GetRootGroupData";
					RequestUtils.getInstance().request("http://localhost:8888", "POST", onGroupContainerAjaxCallback, params);
				}
			}

			function onKeyUp(event)
			{
				switch(event.which) 
				{
				    case 8://back button
				    	var backButton = document.getElementById("back_button");

						if(backButton != null) 
   							 backButton.onclick.apply(backButton);
				    break;
				    default:
					break;
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
		    		case InventoryAppConstants.MENU_ITEM_ADD_ITEM:
		    			AddItem(_folderId);
		    		break;
		    		case InventoryAppConstants.MENU_ITEM_ADD_FOLDER:
			    		var folderName       = prompt("Escriba el nombre del nuevo folder", "");
			    		var defaultGroupType = 0;

						if(folderName != null && folderName != "") 
						    addSubGroup(folderName, defaultGroupType);
		    		break;
		    		case InventoryAppConstants.MENU_ITEM_PASTE:
		    			pasteGroup();
		    		break;
		    		case InventoryAppConstants.MENU_ITEM_RENAME:
		    			RenameFolder(_folderId);
		    		break;
		    		case InventoryAppConstants.MENU_ITEM_CUT:
		    			_cuttingGroupId = _folderId;
		    		break;
		    		case InventoryAppConstants.MENU_ITEM_DELETE:
		    			removeSubgroupGroup(_folderId);
		    		break;
		    	}
		    }

		    function AddItem(folderId)
		    {
		    	var itemName = prompt("Escriba el nuevo nombre para el item", "");

				if(itemName != null && itemName != "") 
				{
					var itemId = 1;
					addSubGroup(itemName, itemId);
				}
		    }

		    function RenameFolder(folderId)
		    {
		    	var folderName = prompt("Escriba el nuevo nombre para el folder", "");

				if(folderName != null && folderName != "") 
				{
					var params = "service=Group&method=Rename&id=" + folderId + "&name=" + folderName;

					RequestUtils.getInstance().request("http://localhost:8888", "POST", onRenameCallback, params);
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

				//alert("params = " + params);

				RequestUtils.getInstance().request("http://localhost:8888", "POST", onUpdateUserDataCallback, params);
			}

			function onUpdateUserDataCallback(xmlhttp)
			{
				if(RequestUtils.getInstance().checkForValidResponse(xmlhttp)) 
				{
					alert("result '" + xmlhttp.responseText + "'");

					var result = JSON.parse(xmlhttp.responseText);

					if(result.success)
						location.reload();
				}
			}

		    function onUpdateGroupDataClick(groupId)
			{
				var groupData = document.getElementById('group_data');
				var params    = "service=Group&method=UpdateData&id=" + groupId + "&data=" + groupData.value;

				//alert("params = " + params);

				RequestUtils.getInstance().request("http://localhost:8888", "POST", onUpdateGroupDataCallback, params);
			}

			function onUpdateGroupDataCallback(xmlhttp)
			{
				if(RequestUtils.getInstance().checkForValidResponse(xmlhttp)) 
					alert("result '" + xmlhttp.responseText + "'");
			}

			function addSubGroup(newGroupName, type)
			{
				var params = "service=Group&method=AddSubGroup&parentGroupId=" + _currentGroupData.id + "&name=" + newGroupName + "&type=" + type;

				RequestUtils.getInstance().request("http://localhost:8888", "POST", onAddSubGroupCallback, params);
			}

			function onAddSubGroupCallback(xmlhttp)
			{
				if(RequestUtils.getInstance().checkForValidResponse(xmlhttp)) 
				{
					//alert("result '" + xmlhttp.responseText + "'");

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

				//alert("params " + params);
				
				RequestUtils.getInstance().request("http://localhost:8888", "POST", onGroupContainerAjaxCallback, params);
			}

			function onGroupContainerAjaxCallback(xmlhttp)
			{
				if(RequestUtils.getInstance().checkForValidResponse(xmlhttp)) 
				{
					//alert("result '" + xmlhttp.responseText + "'");

					var result = JSON.parse(xmlhttp.responseText);

					if(result.success)
					{

						//var groupContaner 	    = document.getElementById('group_container');
						//groupContaner.innerHTML = result.data.group_ajax;
						_currentGroupData		= result.data.group_data;
						populateGroupAjax(_currentGroupData);
					}
				}
			}

			function populateGroupAjax(groupData)
			{
				var groupId       = groupData.id;
				var groupPath     = groupData.path;
				var parentGroupId = groupData.parent_group_id;
				var subGroupType  = groupData.type;
				var subGroups 	  = groupData.sub_groups;

				var groupAjax = "<div id='folders_area' align='center'>";
			
				var groupPath  = groupPath.replace("RootGroup/", "Principal/");

				if(parentGroupId != 0)
					groupAjax += "<p>" + groupPath + " <button id='back_button' type='button' onclick='onBackButtonClick(" + parentGroupId + ");'>Atras</button> </p>";
				else
					groupAjax += "<p>" + groupPath + "</p>";

				if(subGroupType == 0)//Constants::DEFAULT_GROUP_TYPE)
				{
					groupAjax += "<div id='folders_scroll_panel' oncontextmenu='showContextMenu(event); return false;' align='center' style='overflow:scroll; width:600px; height:400px; border:1px solid gray;' title='Haga click derecho para ver opciones'>";

					//alert(JSON.stringify(subGroups));

					for (var index in subGroups)
		    		{
		    			var subGroup     = subGroups[index];
		    			var subGroupName = subGroup.name;
		    			var subGroupId	 = subGroup.id;
		    			var subGroupType = subGroup.type;
		    			var icon 		 = null;

		    			if(subGroupType == 0)//Constants::DEFAULT_GROUP_TYPE)
		    				 icon = "inventory_app/view/images/Folder.png";
		    			else
		    				 icon = "inventory_app/view/images/File.png";

		    			groupAjax += "<div id='folder_" + subGroupId + "' style='width:100px; height:120px; float: left;'>"+
											"<img id='folder_image_" + subGroupId + "' src='" + icon + "' onclick='onSubGroupClick(" + subGroupId + ");' style='cursor:pointer; cursor:hand; width:100px; height:88px;'/>"+
											"<label id='folder_label_" + subGroupId + "' >" + subGroupName + "</label>"+
									   "</div>";
		    		}

		    		groupAjax += "</div>";
				}
				else
				{
					groupAjax += "<p>Data"+ 
										"<input type='text' id='group_data' value = '" + groupData.data + "'>"+
										"<button type='button' onclick='onUpdateGroupDataClick(" + groupId + ");'>Update</button>"+
								   "</p>";
				}

				groupAjax += "<input type='text' id='search_input' value = ''>"+
							   "<button type='button' onclick='onSearchButtonClick();'>Search</button>";

	    		groupAjax += "</div>";

	    		var groupContaner 	    = document.getElementById('group_container');
				groupContaner.innerHTML = groupAjax;
			}

			function onSearchButtonClick()
			{
				var searchTesxtInput = document.getElementById('search_input');
				var params 	    	 = "service=Group&method=Search&searchText=" + searchTesxtInput.value;
				RequestUtils.getInstance().request("http://localhost:8888", "POST", onSearchCallback, params);
			}

			function onSearchCallback(xmlhttp)
			{
				if(RequestUtils.getInstance().checkForValidResponse(xmlhttp))
					alert(xmlhttp.responseText);
			}

			function pasteGroup()
			{
				var params 	    = "service=Group&method=Move&id=" + _cuttingGroupId + "&parentGroupId=" + _currentGroupData.id;
				_cuttingGroupId = null;
				RequestUtils.getInstance().request("http://localhost:8888", "POST", onMoveGroupCallback, params);
			}

			function onMoveGroupCallback(xmlhttp)
			{
				refreshCurrentGroup(xmlhttp);
			}

			function refreshCurrentGroup(xmlhttp)
			{
				if(RequestUtils.getInstance().checkForValidResponse(xmlhttp))
				{
					//alert(xmlhttp.responseText);

					var result = JSON.parse(xmlhttp.responseText);

					if(result.success)
						loadAjaxGroup(_currentGroupData.id);
				}
			}

			function removeSubgroupGroup(groupId)
			{
				var folderLabel = document.getElementById('folder_label_' + groupId);
				var remove      = confirm("Está seguro de que desea borrar el folder '" + folderLabel.textContent + "'? \nTodos sus folders hijos y sus contenidos serán borrados.");

				if(remove) 
				{
					var params = "service=Group&method=Delete&id=" + groupId;

					RequestUtils.getInstance().request("http://localhost:8888", "POST", onDeleteGroupCallback, params);
				}
			}

			function onDeleteGroupCallback(xmlhttp)
			{
				if(RequestUtils.getInstance().checkForValidResponse(xmlhttp))
				{
					//alert(xmlhttp.responseText);
					var result = JSON.parse(xmlhttp.responseText);

					if(result.success)
						loadAjaxGroup(_currentGroupData.id);
				}
			}

		</script>
	</head>
	<body>
		<div id='group_container'></div>
		<div id='context_menu_container' style='position: absolute; left: 100px; top: 150px;' ></div>
	</body>
</html>