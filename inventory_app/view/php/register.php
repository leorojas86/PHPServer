<!DOCTYPE html>
<html  lang="en">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
		<title>Register</title>
		<link rel="stylesheet" href="inventory_app/view/css/main_page.css">
		<script src="utils/js/request_utils.js" 						type="text/javascript" ></script>
		<script src="utils/js/url_utils.js"     						type="text/javascript" ></script>
		<script src="utils/js/localization_manager.js" 					type="text/javascript" ></script>
		<script src="inventory_app/view/js/inventory_app_constants.js" 	type="text/javascript" ></script>
		<script src="inventory_app/view/js/register_renderer.js" 		type="text/javascript" ></script>
		<script type="text/javascript">

			function onPageLoaded() 
		    {
		    	LocManager.getInstance().loadLocalizationTable(InventoryAppConstants.ENGLISH_LOCALIZATION_TABLE, onLocalizationLoaded);
			}

			function onLocalizationLoaded(sender)
			{
				var registerRenderer = new RegisterRenderer();
				registerRenderer.render();
			}

			function onRegisterButtonClick()
			{
				var userName     = document.getElementById('user_name');
				var userEmail    = document.getElementById('user_email');	
				var userPassword = document.getElementById('user_password');	
				var params 		 = "service=User&method=Register&name=" + userName.value + "&email=" + userEmail.value + "&password=" + userPassword.value;

				RequestUtils.getInstance().request(InventoryAppConstants.API_URL, "POST", onRegisterCallback, params);
			}

			function onRegisterCallback(xmlhttp)
			{
				if(RequestUtils.getInstance().checkForValidResponse(xmlhttp)) 
				{
					var result = JSON.parse(xmlhttp.responseText);

					if(result.success)
					{
						var host = URLUtils.getInstance().getHostName();
						URLUtils.getInstance().redirect(host + "?page=Home");
					}
				}
			}

		</script>
	</head>
	<body id='body' onload="onPageLoaded();">
	</body>
</html>