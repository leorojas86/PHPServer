//Singleton instance
var RegistrationController = { instance : new RegistrationControllerClass() };

//Variables
RegistrationControllerClass.prototype._templateVariable = null;

//Constructors
function RegistrationControllerClass()
{
}

//Methods
RegistrationControllerClass.prototype.render = function()
{
	var userNameText  		= LocManager.instance.getLocalizedString("user_name_text");
	var emailText 	  		= LocManager.instance.getLocalizedString("email_text");
	var passwordText  		= LocManager.instance.getLocalizedString("password_text");
	var confirmPasswordText = LocManager.instance.getLocalizedString("confirm_password_text");
	var registerButtonText  = LocManager.instance.getLocalizedString("register_button_text");
	var defaultValues 		= "leo";

	var pageContainer 	   	= document.getElementById("page_container");
	pageContainer.innerHTML = 	"<p>" + userNameText + "</p>" +
	  					"<input type='text' id='user_name'     value = '" + defaultValues + "'>" +
	  					"<p>" + emailText + "</p>" +
	  					"<input type='text' id='user_email'    value = '" + defaultValues + "'> <br/><br/>" +
	  					"<p>" + passwordText + "</p>" +
	  					"<input type='text' id='user_password' value = '" + defaultValues + "'> <br/><br/>" +
	  					"<p>" + confirmPasswordText + "</p>" +
	  					"<input type='text' id='user_confirm_password' value = '" + defaultValues + "'> <br/><br/>" +
	  					"<button type='button' onclick='onRegisterButtonClick();'>" + registerButtonText + "</button>";
};

function onRegisterButtonClick()
{
	var userName     		= document.getElementById('user_name');
	var userEmail    		= document.getElementById('user_email');	
	var userPassword 		= document.getElementById('user_password');
	var userConfirmPassword = document.getElementById('user_confirm_password');

	if(userPassword.value == userConfirmPassword.value)//TODO: Validate email
		ServiceClient.instance.register(userName.value, userPassword.value, userEmail.value, RegistrationController.instance.onRegisterCallback);
	else
	{
		var passwordsDontMatchText = LocManager.instance.getLocalizedString("passwords_dont_match_text");
		alert(passwordsDontMatchText);
	}
}

RegistrationControllerClass.prototype.onRegisterCallback = function(resultData)
{
	if(resultData.success)
	{
		var userEmail    = document.getElementById('user_email');	
		var userPassword = document.getElementById('user_password');	
		LoginController.instance.login(userEmail.value, userPassword.value);
	}
	else
		alert(resultData.data);
};