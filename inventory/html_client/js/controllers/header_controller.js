//Singleton instance
var HeaderController = { instance : new HeaderControllerClass() };

//Variables
HeaderControllerClass.prototype._templateVariable = null;

//Constructors
function HeaderControllerClass()
{
}

//Methods
HeaderControllerClass.prototype.render = function()
{
	var headerContainer = document.getElementById("header_container");

	if(ServiceClient.instance.loggedUser != null)
	{
		//var loginText				= LocManager.instance.getLocalizedText("login_text");
		var userName	= ServiceClient.instance.loggedUser.name;
		var logoutText	= userName.length < 3 ? userName : userName.substring(0, 3); //LocManager.instance.getLocalizedText("logout_text");

		headerContainer.innerHTML = "<button id='logout_button' class='button_class session_button_class'>" + logoutText + "</button>";

		document.getElementById('logout_button').onclick = function(){ HeaderController.instance.onLogoutButtonClick(); };
	}
	else
	{
		var loginText = LocManager.instance.getLocalizedText("login_text");

		headerContainer.innerHTML = "<button id='header_login_button' class='button_class session_button_class'>" + loginText + "</button>";
		document.getElementById('header_login_button').onclick = function(){ HeaderController.instance.onLoginButtonClick(); };
	}
};

HeaderControllerClass.prototype.onLogoutButtonClick = function()
{
	ServiceClient.instance.logout();
	this.render();
	LoginController.instance.render();
};

HeaderControllerClass.prototype.onLoginButtonClick = function()
{
	LoginController.instance.render();
}