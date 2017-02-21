//Singleton instance
var SearchPopup = { instance : new SearchPopupClass() };

function SearchPopupClass()
{
	//Methods
	this.show = function()
	{
		var searchText 		= LocManager.instance.getLocalizedText("search_button_text");
		var defaultValue 	= "";
		var html 	   		= "<div class='search_popup_class' align='center'>" + 
								"<div class='search_popup_content_class'>" +
							  		"<input 	type='text' id='search_input_text' 		class='input_class margin_class' value = '" + defaultValue + "'>" +
						 	  		"<button 				id='search_popup_button'	class='button_class margin_class'>" + searchText + "</button>" +
						 	  	"<div>" +
						 	  "</div>";

		document.getElementById("search_popup_container").innerHTML = html;
		document.getElementById('search_popup_button').onclick = function(){ SearchPopup.instance.onSearchButtonClick(); };
		document.getElementById('background_container').addEventListener('mousedown', SearchPopup.instance.hide);
	};

	this.hide = function()
	{
		document.getElementById('background_container').removeEventListener('mousedown', SearchPopup.instance.hide);
		document.getElementById("search_popup_container").innerHTML = "";
	};

	this.onSearchButtonClick = function()
	{
		var searchTesxtInput = document.getElementById('search_input_text');
		InventorySearchResultsController.instance.renderResults(searchTesxtInput.value);
		
		this.hide();
	};
}