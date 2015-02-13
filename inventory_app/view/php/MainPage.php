<!DOCTYPE html>
<html  lang="en">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
		<title>PHP Test</title>
		<link rel="stylesheet" href="inventory_app/view/css/main_page.css">
		<script src="utils/js/request_utils.js" type="text/javascript" ></script>
		<!-- http://stackoverflow.com/questions/4909167/how-to-add-a-custom-right-click-menu-to-a-webpage -->
		<!-- http://www.codeproject.com/Tips/630793/Context-Menu-on-Right-Click-in-Webpage -->
		<script type="text/javascript">

			var _currentGroupData = null;
			var _cuttingGroupId   = null;

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
		    	var contextMenu        	   = document.getElementById('context_menu_container');
		    	contextMenu.style.position = "absolute";
		    	contextMenu.style.left 	   = event.clientX + "px";
				contextMenu.style.top  	   = event.clientY + "px";
				contextMenu.style.display  = 'inline';

				var addItemOption      = '"Add Item"';
				var addFolderOption    = '"Add Folder"';
				var deleteFolderOption = '"Delete Folder"';
				var cutFolderOption    = '"Cut Folder"';
				var pasteFolderOption  = '"Paste Folder"';
				var renameFolderOption = '"Rename Folder"';

				var target      = event.target;
		    	var folderId    = '"' + target.parentNode.id + '"';
		    	var optionStyle = "style='width:120px; height:20px;'";

		    	switch(event.target.id)
		    	{
		    		case "folders_scroll_panel":
		    			var addItemButton      = "<button onclick='onContextMenuOptionSelected(" + folderId + ", " + addItemOption + ")'     " + optionStyle +" > Agregar Item </button>";
		    			var addGroupButton     = "<button onclick='onContextMenuOptionSelected(" + folderId + ", " + addFolderOption + ")'   " + optionStyle +" > Agregar Folder </button>";
		    			var pasteGroupButton   = "<button onclick='onContextMenuOptionSelected(" + folderId + ", " + pasteFolderOption + ")' " + optionStyle +" > Pegar Folder </button>";

		    			if(canPasteFolder())
							contextMenu.innerHTML  = addItemButton + "<br>" + addGroupButton + "<br>" + pasteGroupButton;
						else
							contextMenu.innerHTML  = addItemButton + "<br>" + addGroupButton;
		    		break;
		    		default:
		    			var renameButtonHTML  = "<button onclick='onContextMenuOptionSelected(" + folderId + ", " + renameFolderOption + ")' " + optionStyle +" > Renombrar Folder </button>";
		    			var cutButtonHTML     = "<button onclick='onContextMenuOptionSelected(" + folderId + ", " + cutFolderOption + ")'    " + optionStyle +" > Cortar Folder </button>";
		    			var deleteButtonHTML  = "<button onclick='onContextMenuOptionSelected(" + folderId + ", " + deleteFolderOption + ")' " + optionStyle +"> Borrar Folder </button>";
		    			contextMenu.innerHTML = renameButtonHTML + "<br>" + cutButtonHTML + "<br>" + deleteButtonHTML;	
		    		break;
		    	}
		    }

		    function canPasteFolder()
		    {
		    	return _currentGroupData != null && _currentGroupData.can_paste;
		    }

		    function hideContextMenu()
		    {
		    	var contextMenu           = document.getElementById('context_menu_container');
		    	contextMenu.style.display = 'none';
		    }

		    function onContextMenuOptionSelected(folderId, option)
		    {
		    	hideContextMenu();

		    	folderId = folderId.replace("folder_", "");

		    	switch(option)
		    	{
		    		case "Add Folder":
			    		var folderName       = prompt("Escriba el nombre del nuevo folder", "");
			    		var defaultGroupType = 0;

						if(folderName != null && folderName != "") 
						    addSubGroup(folderName, defaultGroupType);
		    		break;
		    		case "Delete Folder":
		    			removeSubgroupGroup(folderId);
		    		break;
		    		case "Cut Folder":
		    			_cuttingGroupId = folderId;
		    		break;
		    		case "Paste Folder":
		    			pasteGroup();
		    		break;
		    		case "Rename Folder":
		    			RenameFolder(folderId);
		    		break;
		    		case "Add Item":
		    			AddItem(folderId);
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
			
			function onLoginButtonClick()
			{
				var userEmail    = document.getElementById('user_email');	
				var userPassword = document.getElementById('user_password');	
				var params 		 = "service=User&method=Login" + "&email=" + userEmail.value + "&password=" + userPassword.value;

				//alert("params = " + params);

				RequestUtils.getInstance().request("http://localhost:8888", "POST", onLoginCallback, params);
			}

			function onLoginCallback(xmlhttp)
			{
				if(RequestUtils.getInstance().checkForValidResponse(xmlhttp)) 
				{
					alert("result '" + xmlhttp.responseText + "'");

					var result = JSON.parse(xmlhttp.responseText);

					if(result.success)
						location.reload();
				}
			}

			function onRegisterButtonClick()
			{
				var userName     = document.getElementById('user_name');
				var userEmail    = document.getElementById('user_email');	
				var userPassword = document.getElementById('user_password');	
				var params 		 = "service=User&method=Register&name=" + userName.value + "&email=" + userEmail.value + "&password=" + userPassword.value;

				//alert("params = " + params);

				RequestUtils.getInstance().request("http://localhost:8888", "POST", onRegisterCallback, params);
			}

			function onRegisterCallback(xmlhttp)
			{
				if(RequestUtils.getInstance().checkForValidResponse(xmlhttp)) 
					alert("result '" + xmlhttp.responseText + "'");
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
	<body onclick='hideContextMenu();'>

		<?php 

		if(Session::IsUserLoggedIn())
		{
		 	echo "<div id='group_container'></div>";
		 	echo "<div id='context_menu_container' style='position: absolute; left: 100px; top: 150px;' ></div>";
		}
		else
		{
			echo "<p>User Name</p>
				  <input type='text' id='user_name'     value = 'leo'>
				  <p>User Email</p>
				  <input type='text' id='user_email'    value = 'leo'> <br/><br/>
				  <p>User Password</p>
				  <input type='text' id='user_password' value = 'leo'> <br/><br/>
				  <button type='button' onclick='onLoginButtonClick()''>Login</button>
				  <br/><br/>
				  <button type='button' onclick='onRegisterButtonClick()'>Register</button>";
		}

		?> 
	</body>
</html>