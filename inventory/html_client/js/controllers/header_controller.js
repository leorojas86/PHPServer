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
	var pageContainer 			= document.getElementById("header_container");
	pageContainer.innerHTML  	= "<div id='session_button' class='session_button_class' > Session Button </div>";
};