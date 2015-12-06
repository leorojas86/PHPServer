
//Singleton instance
//var TemplateUtils = { instance : new TemplateClass() };

//Variables
LoginController.prototype._templateVariable = null;

//Constructors
function LoginController()
{
}

//Methods
LoginController.prototype.render = function()
{
	var emailText 	  		= LocManager.instance.getLocalizedString("email_text");
	var passwordText  		= LocManager.instance.getLocalizedString("password_text");
	var passwordText  		= LocManager.instance.getLocalizedString("password_text");
	var loginButtonText 	= LocManager.instance.getLocalizedString("login_button_text");
	var registerButtonText  = LocManager.instance.getLocalizedString("register_button_text");
	var defaultValues 		= "leo";

	var body 	   = document.getElementById("body");
	body.innerHTML = 	"<p>" + emailText + "</p>" +
						"<input type='text' id='user_email'    value = '" + defaultValues + "'> <br/><br/>" +
	  					"<p>" + passwordText + "</p>" +
	  					"<input type='text' id='user_password' value = '" + defaultValues + "'> <br/><br/>" + 
	  					"<button type='button' onclick='onLoginButtonClick();'>" + loginButtonText + "</button>" +
	  					"<br><br><br>" +
	  					"<button type='button' onclick='onRegisterButtonClick();'>" + registerButtonText + "</button>";

	var userPassword     = document.getElementById('user_password');
	userPassword.onkeyup = onKeyUp;
};

function onKeyUp(event)
{
	switch(event.which) 
	{
	    case 13://enter
	    	onLoginButtonClick();
	    break;
	    default: console.log("pressed key = " + event.which); break;
	}
}
			
function onLoginButtonClick()
{
	//alert(EncriptionUtils.getInstance().encript("Hello"));
			
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
			var host = URLUtils.instance.getHostName();
			URLUtils.instance.redirect(host + "?page=Home");
		}
		else
			alert(xmlhttp.responseText);
	}
}

function onRegisterButtonClick()
{
	var host = URLUtils.instance.getHostName();
	URLUtils.instance.redirect(host + "?page=Register");
}