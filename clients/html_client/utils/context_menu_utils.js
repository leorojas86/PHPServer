//Singleton instance
var ContextMenuUtils = { instance : new ContextMenuUtilsClass() };

ContextMenuUtilsClass.prototype.isShown = false;

//http://stackoverflow.com/questions/4909167/how-to-add-a-custom-right-click-menu-to-a-webpage
//http://www.codeproject.com/Tips/630793/Context-Menu-on-Right-Click-in-Webpage
function ContextMenuUtilsClass()
{
	this.onOptionSelectecCallback = null;
	this.element 				  = null;

	ContextMenuUtilsClass.prototype.hideContextMenu = function()
	{
		if(this.isShown)
		{
			this.element.innerHTML = "";
			this.element 		   = null;

			this.isShown = false;
		}
	};

	ContextMenuUtilsClass.prototype.showContextMenu = function(element, event, options, onOptionSelectecCallback)
	{
		if(this.isShown)
			this.hideContextMenu();

		this.element 				  = element;
		this.onOptionSelectecCallback = onOptionSelectecCallback;
		document.onclick              = function() { ContextMenuUtils.instance.hideContextMenu(); };

		var pageScrolledXOffset = window.pageXOffset || document.documentElement.scrollLeft;
		var pageScrolledYOffset = window.pageYOffset || document.documentElement.scrollTop;

		//alert("event.clientX = " + event.clientX);

		element.style.position = "absolute";
		element.style.left 	   = event.clientX + -2 + pageScrolledXOffset + "px";
		element.style.top  	   = event.clientY + -2 + pageScrolledYOffset + "px";
		element.style.display  = 'inline';

		var elementHTML = "";

		for(var x = 0; x < options.length; x++)
		{
			var currentOption       = options[x];
			var currentOptionScaped = '"' + currentOption + '"';
			var optionButton        = "<button class='contextMenu' onclick='onContextMenuButtonClick(" + currentOptionScaped + ");' > " + currentOption + " </button>";
			elementHTML 			+= optionButton + "<br>";
		}

		element.innerHTML = elementHTML;

		this.isShown = true;

		//event.preventDefault();
	};
}

function onContextMenuButtonClick(option)//TODO: move this to the class
{
	ContextMenuUtils.instance.hideContextMenu();
	ContextMenuUtils.instance.onOptionSelectecCallback(option);
}

