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
				var params = "service=User&method=Register&name=test&email=test@test.com&password=test";
				request("http://localhost:8888", params, "POST", onRegisterCallback);
			}

			function onRegisterCallback(xmlhttp)
			{
				if (xmlhttp.readyState == 4 && xmlhttp.status == 200) 
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
				  <p>User Email</p>
				  <input type="text" name="user_email"> <br/><br/>
				  <p>User Password</p>
				  <input type="text" name="user_password"> <br/><br/>
				  <button type="button" onclick="onLoginButtonClick()">Login</button>
				  <br/><br/>
				  <button type="button" onclick="onRegisterButtonClick()">Register</button>';
		}

		?> 
	</body>
</html>