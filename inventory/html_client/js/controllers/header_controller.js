//Singleton instance
var HeaderController = { instance : new HeaderControllerClass() };

//Constructors
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

			document.getElementById('user_profile_button').onclick = function(){ HeaderController.instance.onUserProfileButtonClick(); };
		}
		else
		{
			var loginText = LocManager.instance.getLocalizedText("login_text");

			headerContainer.innerHTML = "<button id='header_login_button' class='button_class session_button_class'>" + loginText + "</button>";
			
			document.getElementById('header_login_button').onclick = function(event)
			{ 
				var eventPosition = { x : event.currentTarget.offsetLeft,  y : event.currentTarget.offsetTop }; 
				HeaderController.instance.onLoginButtonClick(eventPosition); 
			};
		}
	};

	this.onUserProfileButtonClick = function()
	{
		UserProfilePopup.instance.show();
	};

	this.onLoginButtonClick = function(event)
	{
		//alert(event.target);
		//LoginPopup.instance.render();

		LoginPopup.instance.show(event);
	};
}