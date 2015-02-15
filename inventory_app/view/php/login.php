<!DOCTYPE html>
<html  lang="en">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
		<title>Login</title>
		<link rel="stylesheet" href="inventory_app/view/css/main_page.css">
		<script src="utils/js/request_utils.js" 						type="text/javascript" ></script>
		<script src="utils/js/url_utils.js"     						type="text/javascript" ></script>
		<script src="utils/js/localization_manager.js" 					type="text/javascript" ></script>
		<script src="inventory_app/view/js/inventory_app_constants.js" 	type="text/javascript" ></script>
		<script type="text/javascript">

			function onPageLoaded() 
		    {
		    	LocManager.getInstance().loadLocalizationTable(InventoryAppConstants.ENGLISH_LOCALIZATION_TABLE, onLocalizationLoaded);
			}

			function onLocalizationLoaded(sender)
			{
				var body 	   = document.getElementById("body");
				body.innerHTML = 	"<p>User Email</p>" +
									"<input type='text' id='user_email'    value = 'leo'> <br/><br/>" +
				  					"<p>User Password</p>" +
				  					"<input type='text' id='user_password' value = 'leo'> <br/><br/>" + 
				  					"<button type='button' onclick='onLoginButtonClick();'>Login</button>" +
				  					"<br><br><br>" +
				  					"<button type='button' onclick='onRegisterButtonClick();'>Register</button>";
			}
			
			function onLoginButtonClick()
			{
				var userEmail    = document.getElementById('user_email');	
				var userPassword = document.getElementById('user_password');	
				var params 		 = "service=User&method=Login" + "&email=" + userEmail.value + "&password=" + userPassword.value;

				RequestUtils.getInstance().request(InventoryAppConstants.API_URL, "POST", onLoginCallback, params);
			}

			function onLoginCallback(xmlhttp)
			{
				if(RequestUtils.getInstance().checkForValidResponse(xmlhttp)) 
				{
					var result = JSON.parse(xmlhttp.responseText);

					if(result.success)
					{
						var host = URLUtils.getInstance().getHostName();
						URLUtils.getInstance().redirect(host + "?page=Home");
					}
					else
						alert(xmlhttp.responseText);
				}
			}

			function onRegisterButtonClick()
			{
				var host = URLUtils.getInstance().getHostName();
				URLUtils.getInstance().redirect(host + "?page=Register");
			}

		</script>
	</head>
	<body id="body" onload="onPageLoaded();">
	</body>
</html>