//Singleton instance
var InventoryController = { instance : new InventoryControllerClass() };

//Variables


//Constructors
function InventoryControllerClass()
{
}

//Methods
InventoryControllerClass.prototype.render = function()
{
	var pageContainer 		= document.getElementById("page_container");
	pageContainer.innerHTML	= 	"<div id='inventory_container' align='center'>" +
									"<div id='group_container' class='group_container_class' ></div>" +
				   	 			"</div>";

	InventoryGroupController.instance.renderRootGroup();
};