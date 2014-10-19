<?php 

require_once "app_template/model/Session.php";

?>

<!DOCTYPE html>
<html  lang="en">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
		<title>PHP Test</title>
		<script src="utils/js/utils.js" /> </script>
		<script type="text/javascript">
			
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
				if (xmlhttp.readyState == 4 && xmlhttp.status == 200) 
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
				if (xmlhttp.readyState == 4 && xmlhttp.status == 200) 
					alert("result '" + xmlhttp.responseText + "'");
			}

			function onUpdateUserDataClick()
			{
				var userData = document.getElementById('user_data');
				var params   = "service=User&method=UpdateData&data=" + userData.value;

				alert("params = " + params);

				request("http://localhost:8888", params, "POST", onUpdateUserDataCallback);
			}

			function onUpdateUserDataCallback(xmlhttp)
			{
				if(xmlhttp.readyState == 4 && xmlhttp.status == 200) 
				{
					alert("result '" + xmlhttp.responseText + "'");

					var result = JSON.parse(xmlhttp.responseText);

					if(result.success)
						location.reload();
				}
			}

		</script>
	</head>
	<body>
		<?php 

		if(Session::IsUserLoggedIn())
		{
			$loggedInUserData = Session::GetLoggedIdUserData();
			$userName 		  = $loggedInUserData["name"];
			$userData         = $loggedInUserData["data"];

			echo "<p>User Name</p> <p>$userName</p>
			 	  <p>User Data</p>
				  <input type='text' id='user_data'  value = '$userData'>
				  <button type='button' onclick='onUpdateUserDataClick()'>Update</button>";
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