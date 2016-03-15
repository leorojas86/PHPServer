//Singleton instance
var UserProfilePopup = { instance : new UserProfilePopupClass() };

//Constructors
function UserProfilePopupClass()
{
}

//Methods
UserProfilePopupClass.prototype.show = function()
{
	var logoutText = LocManager.instance.getLocalizedText("logout_text");

	var html = "<button id='logout_button' class='button_class margin_class'>" + logoutText + "</button>";

	document.getElementById("user_profile_popup_container").innerHTML = html;
	
	document.getElementById('logout_button').onclick  = function(){ UserProfilePopup.instance.onLogoutButtonClick(); };
	
	document.getElementById('background_container').addEventListener('mousedown', function() { UserProfilePopup.instance.hide(); });
};

UserProfilePopupClass.prototype.hide = function()
{
	document.getElementById("user_profile_popup_container").innerHTML = "";
};

UserProfilePopupClass.prototype.onLogoutButtonClick = function()
{
	ServiceClient.instance.logout();
	HeaderController.instance.render();
	HomeController.instance.render();
	this.hide();
};