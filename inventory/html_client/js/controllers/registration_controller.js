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
	var userNameText  		= LocManager.instance.getLocalizedText("user_name_text");
	var emailText 	  		= LocManager.instance.getLocalizedText("email_text");
	var passwordText  		= LocManager.instance.getLocalizedText("password_text");
	var confirmPasswordText = LocManager.instance.getLocalizedText("confirm_password_text");
	var registerButtonText  = LocManager.instance.getLocalizedText("register_button_text");
	var defaultValues 		= "leo";

	var pageContainer 	   	= document.getElementById("page_container");
	pageContainer.innerHTML = 	"<p>" + userNameText + "</p>" +
	  							"<input type='text' 	id='user_name'     			class='input_class'		value = '" + defaultValues + "'>" +
	  							"<p>" + emailText + "</p>" +
	  							"<input type='text' 	id='user_email'    			class='input_class'	value = '" + defaultValues + "'> <br/><br/>" +
	  							"<p>" + passwordText + "</p>" +
	  							"<input type='text' 	id='user_password'   		class='input_class' 	value = '" + defaultValues + "'> <br/><br/>" +
	  							"<p>" + confirmPasswordText + "</p>" +
	  							"<input type='text' 	id='user_confirm_password' 	class='input_class' 	value = '" + defaultValues + "'> <br/><br/>" +
	  							"<button type='button' 	id='register_button' 		class='button_class'>" + registerButtonText + "</button>";

	document.getElementById('register_button').onclick = function(){ RegistrationController.instance.onRegisterButtonClick(); };
};

RegistrationControllerClass.prototype.onRegisterButtonClick = function()
{
	var userName     		= document.getElementById('user_name');
	var userEmail    		= document.getElementById('user_email');
	var userPassword 		= document.getElementById('user_password');
	var userConfirmPassword = document.getElementById('user_confirm_password');

	if(userPassword.value == userConfirmPassword.value)//TODO: Validate email
		ServiceClient.instance.register(userName.value, userPassword.value, userEmail.value, this.onRegisterCallback);
	else
	{
		var passwordsDontMatchText = LocManager.instance.getLocalizedText("passwords_dont_match_text");
		alert(passwordsDontMatchText);
	}
};

RegistrationControllerClass.prototype.onRegisterCallback = function(resultData)
{
	if(resultData.success)
	{
		var userEmail    = document.getElementById('user_email');	
		var userPassword = document.getElementById('user_password');	
		LoginPopup.instance.login(userEmail.value, userPassword.value);
	}
	else
		alert(resultData.data);
};