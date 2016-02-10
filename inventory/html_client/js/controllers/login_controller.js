//Singleton instance
var LoginController = { instance : new LoginControllerClass() };

//Constructors
function LoginControllerClass()
{
}

//Methods
LoginControllerClass.prototype.render = function()
{
	var emailText 	  		= LocManager.instance.getLocalizedText("email_text");
	var passwordText  		= LocManager.instance.getLocalizedText("password_text");
	var passwordText  		= LocManager.instance.getLocalizedText("password_text");
	var loginButtonText 	= LocManager.instance.getLocalizedText("login_button_text");
	var registerButtonText  = LocManager.instance.getLocalizedText("register_button_text");
	var defaultValues 		= "leo";

	var pageContainer 	   	= document.getElementById("page_container");
	pageContainer.innerHTML = 	"<p>" + emailText + "</p>" +
								"<input type='text' id='user_email'   		class='input_class' value = '" + defaultValues + "'> <br/><br/>" +
	  							"<p>" + passwordText + "</p>" +
	  							"<input type='text' id='user_password' 		class='input_class' value = '" + defaultValues + "'> <br/><br/>" + 
	  							"<button type='button' id='login_button'	class='button_class'>" + loginButtonText + "</button>" +
	  							"<br><br><br>" +
	  							"<button type='button' id='register_button'	class='button_class'>" + registerButtonText + "</button>";

	document.getElementById('user_password').onkeyup 	= function(){ LoginController.instance.onKeyUp(); };
	document.getElementById('login_button').onclick  	= function(){ LoginController.instance.onLoginButtonClick(); };
	document.getElementById('register_button').onclick  = function(){ LoginController.instance.onRegisterButtonClick(); };
};

LoginControllerClass.prototype.onKeyUp = function(event)
{
	switch(event.which) 
	{
	    case 13://enter 
	    	this.login();
	    break;
	    default: console.log("pressed key = " + event.which); break;
	}
};
			
LoginControllerClass.prototype.onLoginButtonClick = function()
{
	var userEmail    = document.getElementById('user_email');	
	var userPassword = document.getElementById('user_password');	
	this.login(userEmail.value, userPassword.value);
};

LoginControllerClass.prototype.login = function(email, password)//TODO: Display login while request is waiting.
{
	ServiceClient.instance.login(email, password, LoginController.instance.onLogingCallback);
};

LoginControllerClass.prototype.onLogingCallback = function(resultData)
{
	if(resultData.success)
	{
		HeaderController.instance.render();
		InventoryController.instance.render();
	}
	else
		alert("Login Failed, " + resultData.data);
};

LoginControllerClass.prototype.onRegisterButtonClick = function()
{
	RegistrationController.instance.render();
};