//Singleton instance
var HomeController = { instance : new HomeControllerClass() };

//Variables
HomeControllerClass.prototype._templateVariable = null;

//Constructors
function HomeControllerClass()
{
}

//Methods
HomeControllerClass.prototype.render = function()
{
	var pageContainer 		= document.getElementById("page_container");
	pageContainer.innerHTML = "Home";
};