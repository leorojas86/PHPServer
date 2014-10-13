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
				alert("Login");
			}

			function onRegisterButtonClick()
			{
				request("http://localhost:8888?service=User,method=Register,username=test,password=test", "POST", onRegisterCallback);
			}

			function onRegisterCallback(xmlhttp)
			{
				alert("result = " + xmlhttp.responseText);
			}

		</script>
	</head>
	<body>
		<?php 

		if(Session::IsUserLoggedIn())
			echo '<p>User is logged in</p>'; 
		else
		{
			echo '<p>User Name</p>
				  <input type="text" name="user_name">
				  <p>User Password</p>
				  <input type="text" name="user_password"> <br/><br/>
				  <button type="button" onclick="onLoginButtonClick()">Login</button>
				  <br/><br/>
				  <button type="button" onclick="onRegisterButtonClick()">Register</button>';
		}

		?> 
	</body>
</html>