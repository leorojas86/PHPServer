//Singleton instance
var LoginPopup = { instance : new LoginPopupClass() };

function LoginPopupClass()
{
	//Methods
	this.show = function()
	{
		var emailText 	  		= LocManager.instance.getLocalizedText("email_text");
		var passwordText  		= LocManager.instance.getLocalizedText("password_text");
		var passwordText  		= LocManager.instance.getLocalizedText("password_text");
		var loginButtonText 	= LocManager.instance.getLocalizedText("login_button_text");
		var registerButtonText  = LocManager.instance.getLocalizedText("register_button_text");
		var defaultValues 		= "leo";

		var html =  "<div class='login_popup_class popup_container'>" +
						"<p class='margin_class'>" + emailText + "</p>" +
						"<input type='text' id='user_email'   		class='input_class margin_class' value = '" + defaultValues + "'> <br/><br/>" +
			  			"<p class='margin_class'>" + passwordText + "</p>" +
			  			"<input type='text' id='user_password' 		class='input_class margin_class' value = '" + defaultValues + "'> <br/><br/>" + 
			  			"<button id='login_button'	class='button_class margin_class'>" + loginButtonText + "</button>" +
			  			"<br><br>" +
			  			"<button id='register_button'	class='button_class margin_class'>" + registerButtonText + "</button>" +
			  		"</div>";


		document.getElementById("login_popup_container").innerHTML = html;

		document.getElementById('user_password').onkeyup 	= function(){ LoginPopup.instance.onKeyUp(); };
		document.getElementById('login_button').onclick  	= function(){ LoginPopup.instance.onLoginButtonClick(); };
		document.getElementById('register_button').onclick  = function(){ LoginPopup.instance.onRegisterButtonClick(); };

		document.getElementById('background_container').addEventListener('mousedown', function() { LoginPopup.instance.hide(); });
	};

	this.hide = function()
	{
		document.getElementById("login_popup_container").innerHTML = "";
	};

	this.onKeyUp = function(event)
	{
		switch(event.which) 
		{
		    case 13://enter 
		    	this.login();
		    break;
		    default: console.log("pressed key = " + event.which); break;
		}
	};
				
	this.onLoginButtonClick = function()
	{
		var userEmail    = document.getElementById('user_email');	
		var userPassword = document.getElementById('user_password');	
		
		this.login(userEmail.value, userPassword.value);
		this.hide();
	};

	this.login = function(email, password)//TODO: Display login while request is waiting.
	{
		UsersService.instance.login(email, password, LoginPopup.instance.onLogingCallback);
	};

	this.onLogingCallback = function(resultData)
	{
		if(resultData.success)
		{
			HeaderController.instance.render();
			InventoryController.instance.render();
		}
		else
			alert("Login Failed, " + resultData.data);
	};

	this.onRegisterButtonClick = function()
	{
		RegistrationController.instance.render();
		this.hide();
	};
}