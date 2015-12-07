
//Singleton instance
var LoginController = { instance : new LoginControllerClass() };

//Variables

LoginControllerClass.prototype.onUserLogged				= null;
LoginControllerClass.prototype.onRegisterButtonClicked 	= null;

//Constructors
function LoginControllerClass()
{
}

//Methods
LoginControllerClass.prototype.render = function()
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
			login();
	    break;
	    default: console.log("pressed key = " + event.which); break;
	}
}
			
function onLoginButtonClick()
{
	login();
}

function login()
{
	//alert(EncriptionUtils.getInstance().encript("Hello"));
			
	var userEmail    = document.getElementById('user_email');	
	var userPassword = document.getElementById('user_password');	
	ServiceClient.instance.login(userEmail.value, userPassword.value, function() { LoginControllerClass.instance.notifyOnUserLogged(); } );
}

LoginControllerClass.prototype.notifyOnUserLogged = function()
{
	this.onUserLogged();
}

function onRegisterButtonClick()
{
	this.onRegisterButtonClicked();
}