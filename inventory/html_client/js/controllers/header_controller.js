//Singleton instance
var HeaderController = { instance : new HeaderControllerClass() };

function HeaderControllerClass()
{
	//Methods
	this.render = function()
	{
		var headerContainer = document.getElementById("header_container");

		if(ServiceClient.instance.loggedUser != null)
		{
			//var loginText				= LocManager.instance.getLocalizedText("login_text");
			var userName	= ServiceClient.instance.loggedUser.name;
			var logoutText	= userName.length < 3 ? userName : userName.substring(0, 3); //LocManager.instance.getLocalizedText("logout_text");

			headerContainer.innerHTML = "<button id='user_profile_button' class='button_class session_button_class'>" + logoutText + "</button>";

			document.getElementById('user_profile_button').onclick = UserProfilePopup.instance.show;
		}
		else
		{
			var loginText = LocManager.instance.getLocalizedText("login_text");

			headerContainer.innerHTML = "<button id='header_login_button' class='button_class session_button_class'>" + loginText + "</button>";
			
			document.getElementById('header_login_button').onclick = LoginPopup.instance.show;
		}
	};
}