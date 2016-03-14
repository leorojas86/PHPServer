//Singleton instance
var SearchPopup = { instance : new SearchPopupClass() };

//Constructors
function SearchPopupClass()
{
}

//Methods
SearchPopupClass.prototype.show = function()
{
	var searchText 		= LocManager.instance.getLocalizedText("search_button_text");
	var defaultValue 	= "";
	var html 	   		= "<input type='text' id='search_input_text' class='input_class margin_class' value = '" + defaultValue + "'> <br/><br/>" +
					 	  "<button type='button' id='search_button'	class='button_class margin_class'>" + searchText + "</button>";

	document.getElementById("search_popup_container").innerHTML = html;
	
	document.getElementById('search_button').onclick  = function(){ SearchPopup.instance.onSearchButtonClick(); };
	
	document.getElementById('background_container').addEventListener('mousedown', function() { UserProfilePopup.instance.hide(); });
};

SearchPopupClass.prototype.hide = function()
{
	document.getElementById("search_popup_container").innerHTML = "";
};

SearchPopupClass.prototype.onSearchButtonClick = function()
{
	var searchTesxtInput = document.getElementById('search_input_text');
	ServiceClient.instance.searchGroups(searchTesxtInput.value, this.onSearchCallback);
};

SearchPopupClass.prototype.onSearchCallback = function(resultData)
{
	//if(resultData.success)
	alert(resultData.data);
};