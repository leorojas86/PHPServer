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

				var addOption    = '"Add"';
				var deleteOption = '"Delete"';

		    	switch(event.target.id)
		    	{
		    		case "folders_scroll_panel":
		    			contextMenu.innerHTML  = "<button onclick='onContextMenuOptionSelected(" + addOption + ")'> Add </button>";	
		    		break;
		    		default:
		    			contextMenu.innerHTML  = "<button onclick='onContextMenuOptionSelected(" + deleteOption + ")'> Delete </button>";	
		    		break;
		    	}
		    }

		    function hideContextMenu()
		    {
		    	var contextMenu           = document.getElementById('context_menu_container');
		    	contextMenu.style.display = 'none';
		    }

		    function onContextMenuOptionSelected(option)
		    {
		    	hideContextMenu();
		    	//alert(option);

		    	switch(option)
		    	{
		    		case "Add":

		    		var folderName = prompt("Nombre del folder", "");

					if(folderName != null) 
					{
					    //alert(folderName);
					    //alert(_currentGroupData.id);
					    addSubGroup(folderName);
					}

		    		break;
		    	}
		    }

		    var _copyingGroupId		   = null;
			var _parentGroupId		   = null;
			
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

			function onAddSubGroupClick()
			{
				var newGroupName 	 = document.getElementById('new_group_name');
				addSubGroup(newGroupName.value);
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
				var params = "service=Group&method=GetGroupAjax&id=" + groupId + "&copyingGroupId=" + _copyingGroupId;

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

			function onCopyButtonClick(groupId)
			{
				_copyingGroupId = groupId;
			}

			function onPasteButtonClick(parentGroupId)
			{
				_parentGroupId  = parentGroupId;
				var params 	    = "service=Group&method=Move&id=" + _copyingGroupId + "&parentGroupId=" + parentGroupId;
				_copyingGroupId = null;
				request("http://localhost:8888", params, "POST", onMoveGroupCallback);
			}

			function onMoveGroupCallback(xmlhttp)
			{
				if(checkForValidResponse(xmlhttp))
				{
					alert(xmlhttp.responseText);

					var result = JSON.parse(xmlhttp.responseText);

					if(result.success)
						loadAjaxGroup(_parentGroupId);
				}
			}

			function onDeleteButtonClick(groupId, parentGroupId)
			{
				_parentGroupId = parentGroupId;
				var remove 	   = confirm("Are you sure that you want to remove the current group");

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
					alert(xmlhttp.responseText);
					var result = JSON.parse(xmlhttp.responseText);

					if(result.success)
						loadAjaxGroup(_parentGroupId);
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