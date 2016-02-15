//Singleton instance
var LoginPopup = { instance : new LoginPopupClass() };

//Constructors
function LoginPopupClass()
{
}

//Methods
LoginPopupClass.prototype.show = function()
{
	var emailText 	  		= LocManager.instance.getLocalizedText("email_text");
	var passwordText  		= LocManager.instance.getLocalizedText("password_text");
	var passwordText  		= LocManager.instance.getLocalizedText("password_text");
	var loginButtonText 	= LocManager.instance.getLocalizedText("login_button_text");
	var registerButtonText  = LocManager.instance.getLocalizedText("register_button_text");
	var defaultValues 		= "leo";

	var html =  "<p class='margin_class'>" + emailText + "</p>" +
				"<input type='text' id='user_email'   		class='input_class margin_class' value = '" + defaultValues + "'> <br/><br/>" +
		  		"<p class='margin_class'>" + passwordText + "</p>" +
		  		"<input type='text' id='user_password' 		class='input_class margin_class' value = '" + defaultValues + "'> <br/><br/>" + 
		  		"<button type='button' id='login_button'	class='button_class margin_class'>" + loginButtonText + "</button>" +
		  		"<br><br>" +
		  		"<button type='button' id='register_button'	class='button_class margin_class'>" + registerButtonText + "</button>";


	document.getElementById("login_popup_container").innerHTML = html;

	document.getElementById('user_password').onkeyup 	= function(){ LoginPopup.instance.onKeyUp(); };
	document.getElementById('login_button').onclick  	= function(){ LoginPopup.instance.onLoginButtonClick(); };
	document.getElementById('register_button').onclick  = function(){ LoginPopup.instance.onRegisterButtonClick(); };
};

LoginPopupClass.prototype.hide = function()
{
	document.getElementById("login_popup_container").innerHTML = "";
};

LoginPopupClass.prototype.onKeyUp = function(event)
{
	switch(event.which) 
	{
	    case 13://enter 
	    	this.login();
	    break;
	    default: console.log("pressed key = " + event.which); break;
	}
};
			
LoginPopupClass.prototype.onLoginButtonClick = function()
{
	var userEmail    = document.getElementById('user_email');	
	var userPassword = document.getElementById('user_password');	
	
	this.login(userEmail.value, userPassword.value);
	this.hide();
};

LoginPopupClass.prototype.login = function(email, password)//TODO: Display login while request is waiting.
{
	ServiceClient.instance.login(email, password, LoginPopup.instance.onLogingCallback);
};

LoginPopupClass.prototype.onLogingCallback = function(resultData)
{
	if(resultData.success)
	{
		HeaderController.instance.render();
		InventoryController.instance.render();
	}
	else
		alert("Login Failed, " + resultData.data);
};

LoginPopupClass.prototype.onRegisterButtonClick = function()
{
	RegistrationController.instance.render();
	this.hide();
};