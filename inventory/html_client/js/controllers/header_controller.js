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
	var loginText				= LocManager.instance.getLocalizedText("login_text");

	var headerContainer 		= document.getElementById("header_container");
	headerContainer.innerHTML  	= "<div id='session_button' class='session_button_class'> <p class='session_button_text_class'>" + loginText + "</p> </div>";
};