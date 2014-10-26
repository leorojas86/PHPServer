<!DOCTYPE html>
<html  lang="en">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
		<title>PHP Test</title>
		<link rel="stylesheet" href="view/css/main_page.css">
		<script src="utils/js/utils.js" type="text/javascript" ></script>
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
	    			var params = "service=Group&method=GetRootGroupAjax";
					request("http://localhost:8888", params, "POST", onGroupContainerAjaxCallback);
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
				contextMenu.style.display = 'inline';

				var addOption    = '"Add Folder"';
				var deleteOption = '"Delete Folder"';
				var cutOption    = '"Cut Folder"';
				var pasteOption  = '"Paste Folder"';

				var target      = event.target;
		    	var folderId    = '"' + target.parentNode.id + '"';
		    	var optionStyle = "style='width:100px; height:20px;'";

		    	switch(event.target.id)
		    	{
		    		case "folders_scroll_panel":
		    			var addGroupButton     = "<button onclick='onContextMenuOptionSelected(" + folderId + ", " + addOption + ")'   " + optionStyle +" > Agregar Folder </button>";
		    			var pasteGroupButton   = "<button onclick='onContextMenuOptionSelected(" + folderId + ", " + pasteOption + ")' " + optionStyle +" > Pegar Folder </button>";

		    			if(canPasteFolder())
							contextMenu.innerHTML  = addGroupButton + "<br>" + pasteGroupButton;
						else
							contextMenu.innerHTML  = addGroupButton;

		    		break;
		    		default:
		    			var deleteButtonHTML  = "<button onclick='onContextMenuOptionSelected(" + folderId + ", " + deleteOption + ")' " + optionStyle +"> Borrar Folder </button>";
		    			var cutButtonHTML     = "<button onclick='onContextMenuOptionSelected(" + folderId + ", " + cutOption + ")'    " + optionStyle +" > Cortar Folder </button>";
		    			contextMenu.innerHTML = deleteButtonHTML + "<br>" + cutButtonHTML;	
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
			    		var folderName = prompt("Escriba el nombre del nuevo folder", "");

						if(folderName != null && folderName != "") 
						    addSubGroup(folderName);
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
		    	}
		    }
			
			function onLoginButtonClick()
			{
				var userEmail    = document.getElementById('user_email');	
				var userPassword = document.getElementById('user_password');	
				var params 		 = "service=User&method=Login" + "&email=" + userEmail.value + "&password=" + userPassword.value;

				//alert("params = " + params);

				request("http://localhost:8888", params, "POST", onLoginCallback);
			}

			function onLoginCallback(xmlhttp)
			{
				if(checkForValidResponse(xmlhttp)) 
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

				request("http://localhost:8888", params, "POST", onRegisterCallback);
			}

			function onRegisterCallback(xmlhttp)
			{
				if(checkForValidResponse(xmlhttp)) 
					alert("result '" + xmlhttp.responseText + "'");
			}

			function onUpdateUserDataClick()
			{
				var userData = document.getElementById('user_data');
				var params   = "service=User&method=UpdateData&data=" + userData.value;

				//alert("params = " + params);

				request("http://localhost:8888", params, "POST", onUpdateUserDataCallback);
			}

			function onUpdateUserDataCallback(xmlhttp)
			{
				if(checkForValidResponse(xmlhttp)) 
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

				request("http://localhost:8888", params, "POST", onUpdateGroupDataCallback);
			}

			function onUpdateGroupDataCallback(xmlhttp)
			{
				if(checkForValidResponse(xmlhttp)) 
					alert("result '" + xmlhttp.responseText + "'");
			}

			function addSubGroup(newGroupName)
			{
				var defaultGroupType = 0;
				var params    		 = "service=Group&method=AddSubGroup&parentGroupId=" + _currentGroupData.id + "&name=" + newGroupName + "&type=" + defaultGroupType;

				request("http://localhost:8888", params, "POST", onAddSubGroupCallback);
			}

			function onAddSubGroupCallback(xmlhttp)
			{
				if(checkForValidResponse(xmlhttp)) 
				{
					//alert("result '" + xmlhttp.responseText + "'");

					var result = JSON.parse(xmlhttp.responseText);

					if(result.success)
					{
						var params = "service=Group&method=GetGroupAjax&id=" + _currentGroupData.id;

						request("http://localhost:8888", params, "POST", onGroupContainerAjaxCallback);
					}
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
				var params = "service=Group&method=GetGroupAjax&id=" + groupId + "&cuttingGroupId=" + _cuttingGroupId;

				//alert("params " + params);
				
				request("http://localhost:8888", params, "POST", onGroupContainerAjaxCallback);
			}

			function onGroupContainerAjaxCallback(xmlhttp)
			{
				if(checkForValidResponse(xmlhttp)) 
				{
					//alert("result '" + xmlhttp.responseText + "'");

					var result = JSON.parse(xmlhttp.responseText);

					if(result.success)
					{
						var groupContaner 	    = document.getElementById('group_container');
						groupContaner.innerHTML = result.data.group_ajax;
						_currentGroupData		= result.data.group_data;
					}
				}
			}

			function pasteGroup()
			{
				var params 	    = "service=Group&method=Move&id=" + _cuttingGroupId + "&parentGroupId=" + _currentGroupData.id;
				_cuttingGroupId = null;
				request("http://localhost:8888", params, "POST", onMoveGroupCallback);
			}

			function onMoveGroupCallback(xmlhttp)
			{
				if(checkForValidResponse(xmlhttp))
				{
					alert(xmlhttp.responseText);

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

					request("http://localhost:8888", params, "POST", onDeleteGroupCallback);
				}
			}

			function onDeleteGroupCallback(xmlhttp)
			{
				if(checkForValidResponse(xmlhttp))
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