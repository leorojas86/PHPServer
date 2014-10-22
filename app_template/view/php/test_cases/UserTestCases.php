<?php 

require_once "model/Session.php";
require_once "controller/database/GroupsController.php";

?>

<!DOCTYPE html>
<html  lang="en">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
		<title>PHP Test</title>
		<script src="utils/js/utils.js" type="text/javascript" > </script>
		<script type="text/javascript" >

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

			function onAddSubGroupClick(parentGroupId)
			{
				_parentGroupId 		 = parentGroupId;
				var newGroupName 	 = document.getElementById('new_group_name');
				var defaultGroupType = 0;
				var params    		 = "service=Group&method=AddSubGroup&parentGroupId=" + parentGroupId + "&name=" + newGroupName.value + "&type=" + defaultGroupType;

				//alert("params = " + params);

				request("http://localhost:8888", params, "POST", onAddSubGroupCallback);
			}

			function onAddSubGroupCallback(xmlhttp)
			{
				if(checkForValidResponse(xmlhttp)) 
				{
					alert("result '" + xmlhttp.responseText + "'");

					var result = JSON.parse(xmlhttp.responseText);

					if(result.success)
					{
						var params = "service=Group&method=GetTestingGroupAjax&id=" + _parentGroupId;

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
				var params = "service=Group&method=GetTestingGroupAjax&id=" + groupId + "&copyingGroupId=" + _copyingGroupId;

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
						groupContaner.innerHTML = result.data;
					}
				}
			}

			function onCopyButtonClick(groupId)
			{
				_copyingGroupId = groupId;
			}

			function onPasteButtonClick(parentGroupId)
			{
				var params = "service=Group&method=Move&id=" + _copyingGroupId + "&parentGroupId=" + parentGroupId;
				request("http://localhost:8888", params, "POST", onDeleteGroupCallback);
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
					{
						loadAjaxGroup(_parentGroupId);
					}
				}
			}

		</script>
	</head>
	<body>
		<?php 

		if(Session::IsUserLoggedIn())
		{
			$loggedInUserData = Session::GetLoggedIdUserData();
			$userId   		  = $loggedInUserData["id"];
			$userName 		  = $loggedInUserData["name"];
			$userData         = $loggedInUserData["data"];

			//echo "userData = " . json_encode($loggedInUserData);

			echo "<p>User Name</p> <p>$userName</p>
			 	  <p>User Data</p>
				  <input type='text' id='user_data'  value = '$userData'>
				  <button type='button' onclick='onUpdateUserDataClick()'>Update</button><br/><br/><br/><br/>";

			$rootGroupResult = Group::GetUserRootGroup($userId);

			if($rootGroupResult->success)
			{
				$groupId         = $rootGroupResult->data["id"];
				$groupAjaxResult = GroupsController::GetTestingGroupAjax($groupId, null);

				if($groupAjaxResult->success)
				{
					$groupAjax = $groupAjaxResult->data;

					echo "<div id='group_container'>
							$groupAjax
				 	  	</div>";
			 	}
		 	}
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