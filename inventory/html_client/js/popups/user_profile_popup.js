//Singleton instance
var UserProfilePopup = { instance : new UserProfilePopupClass() };

function UserProfilePopupClass()
{
	//Methods
	this.show = function()
	{
		var logoutText = LocManager.instance.getLocalizedText("logout_text");

		var html =  "<div class='user_profile_popup_class popup_container'>" + 
						"<button id='logout_button' class='button_class margin_class'>" + logoutText + "</button>" +
					"<div>";

		document.getElementById("user_profile_popup_container").innerHTML = html;
		
		document.getElementById('logout_button').onclick  = function(){ UserProfilePopup.instance.onLogoutButtonClick(); };
		
		document.getElementById('background_container').addEventListener('mousedown', function() { UserProfilePopup.instance.hide(); });
	};

	this.hide = function()
	{
		document.getElementById("user_profile_popup_container").innerHTML = "";
	};

	this.onLogoutButtonClick = function()
	{
		ServiceClient.instance.logout();
		HeaderController.instance.render();
		HomeController.instance.render();
		this.hide();
	};
}