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
	var loadingText 		= LocManager.instance.getLocalizedText("loading_text");
	var pageContainer 		= document.getElementById("page_container");
	pageContainer.innerHTML	= 	"<div id='inventory_container' align='center'>" +
									"<div id='group_container' class='group_container_class' >" + loadingText + "</div>" +
				   	 			"</div>";

	InventoryGroupController.instance.renderRootGroup();
};