//Singleton instance
var InventoryController = { instance : new InventoryControllerClass() };

//Variables
InventoryControllerClass.prototype._currentGroupData 	= null;
InventoryControllerClass.prototype._cuttingGroupId 		= null;
InventoryControllerClass.prototype._folderId 			= null;

//Constructors
function InventoryControllerClass()
{
}

//Methods
InventoryControllerClass.prototype.render = function()
{
	var loadingText 		= LocManager.instance.getLocalizedString("loading_text");
	var searchButtonText  	= LocManager.instance.getLocalizedString("search_button_text");

	var pageContainer 		= document.getElementById("page_container");
	pageContainer.innerHTML	= 	"<div id='inventory_container' align='center'>" +
									"<div id='group_container'>" + loadingText + "</div>" +
									"<input type='text' id='search_input' value = ''>" +
				   	 				"<button id='search_button' type='button'>" + searchButtonText + "</button>" +
				   	 			"</div>";

	InventoryGroupController.instance.renderRootGroup();

	document.getElementById("search_button").onclick = function() { InventoryController.instance.onSearchButtonClick(); }
};

InventoryControllerClass.prototype.onSearchButtonClick = function()//TODO: Move the code that invokes the search here
{
	var searchTesxtInput = document.getElementById('search_input');
	ServiceClient.instance.searchGroups(searchTesxtInput.value, this.onSearchCallback);
}

InventoryControllerClass.prototype.onSearchCallback = function(resultData)
{
	//if(resultData.success)
		alert(resultData.data);
}