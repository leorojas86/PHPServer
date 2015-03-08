<!DOCTYPE html>
<html lang="en">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
		<title>Register</title>
		<link rel="stylesheet" href="inventory_app/view/css/main_page.css">
		<script src="utils/js/request_utils.js" 						type="text/javascript" ></script>
		<script src="utils/js/url_utils.js"     						type="text/javascript" ></script>
		<script src="utils/js/localization_manager.js" 					type="text/javascript" ></script>
		<script src="inventory_app/view/js/inventory_app_constants.js" 	type="text/javascript" ></script>
		<script type="text/javascript">

			function onPageLoaded() 
		    {
		    	LocManager.getInstance().loadLocalizationTable(InventoryAppConstants.ENGLISH_LOCALIZATION_TABLE, onLocalizationLoaded, false);
			}

			function onLocalizationLoaded(sender)
			{
				var userNameText  		= LocManager.getInstance().getLocalizedString("user_name_text");
				var emailText 	  		= LocManager.getInstance().getLocalizedString("email_text");
				var passwordText  		= LocManager.getInstance().getLocalizedString("password_text");
				var confirmPasswordText = LocManager.getInstance().getLocalizedString("confirm_password_text");
				var registerButtonText  = LocManager.getInstance().getLocalizedString("register_button_text");
				var defaultValues 		= "leo";

				var body 	   = document.getElementById("body");
				body.innerHTML = 	"<p>" + userNameText + "</p>" +
				  					"<input type='text' id='user_name'     value = '" + defaultValues + "'>" +
				  					"<p>" + emailText + "</p>" +
				  					"<input type='text' id='user_email'    value = '" + defaultValues + "'> <br/><br/>" +
				  					"<p>" + passwordText + "</p>" +
				  					"<input type='text' id='user_password' value = '" + defaultValues + "'> <br/><br/>" +
				  					"<p>" + confirmPasswordText + "</p>" +
				  					"<input type='text' id='user_confirm_password' value = '" + defaultValues + "'> <br/><br/>" +
				  					"<button type='button' onclick='onRegisterButtonClick();'>" + registerButtonText + "</button>";
			}

			function onRegisterButtonClick()
			{
				var userName     		= document.getElementById('user_name');
				var userEmail    		= document.getElementById('user_email');	
				var userPassword 		= document.getElementById('user_password');
				var userConfirmPassword = document.getElementById('user_confirm_password');

				if(userPassword.value == userConfirmPassword.value)
				{
					var params = "service=User&method=Register&name=" + userName.value + "&email=" + userEmail.value + "&password=" + userPassword.value;
					RequestUtils.getInstance().request(InventoryAppConstants.API_URL, "POST", onRegisterCallback, params);
				}
				else
				{
					var passwordsDontMatchText = LocManager.getInstance().getLocalizedString("passwords_dont_match_text");
					alert(passwordsDontMatchText);
				}
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
					else
						alert(xmlhttp.responseText);
				}
			}

		</script>
	</head>
	<body id='body' onload="onPageLoaded();">
	</body>
</html>