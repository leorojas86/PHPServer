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
	var loadingText 			= LocManager.instance.getLocalizedString("loading_text");
	var pageContainer 			= document.getElementById("page_container");
	pageContainer.innerHTML  	= 	"<div id='group_container'>" + loadingText + "</div>";

	InventoryGroupController.instance.renderRootGroup();
};

function onSearchButtonClick()//TODO: Move the code that invokes the search here
{
	var searchTesxtInput = document.getElementById('search_input');
	var params 	    	 = "service=Group&method=Search&searchText=" + searchTesxtInput.value;
	RequestUtils.instance.request(Constants.API_URL, "POST", onSearchCallback, params);
}

function onSearchCallback(xmlhttp)
{
	//if(RequestUtils.instance.checkForValidResponse(xmlhttp))
		alert(xmlhttp.responseText);
}