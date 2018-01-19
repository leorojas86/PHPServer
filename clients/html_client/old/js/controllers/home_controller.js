//Singleton instance
var HomeController = { instance : new HomeControllerClass() };

function HomeControllerClass()
{
	//Methods
	this.render = function()
	{
		var pageContainer 		= document.getElementById("page_container");
		pageContainer.innerHTML = "Home";
	};
}