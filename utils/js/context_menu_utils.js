var ContextMenuUtils = 
(
	function() 
	{
	    var _instance = null;
	 
	    return {
			        getInstance : function() 
			        {
			            if(_instance == null)
			                 _instance = new ContextMenuUtilsClass();
			            
			            return _instance;
			        }
			    };
	}
)();

//http://stackoverflow.com/questions/4909167/how-to-add-a-custom-right-click-menu-to-a-webpage
//http://www.codeproject.com/Tips/630793/Context-Menu-on-Right-Click-in-Webpage
function ContextMenuUtilsClass()
{
	this.onOptionSelectecCallback = null;
	this.element 				  = null;
}

function onContextMenuButtonClick(option)
{
	ContextMenuUtils.getInstance().hideContextMenu();
	ContextMenuUtils.getInstance().onOptionSelectecCallback(option);
}

ContextMenuUtilsClass.prototype.hideContextMenu = function()
{
	if(this.element != null)
	{
		this.element.innerHTML = "";
		this.element 		   = null;
	}
};

ContextMenuUtilsClass.prototype.showContextMenu = function(element, position, options, onOptionSelectecCallback)
{
	this.element 				  = element;
	this.onOptionSelectecCallback = onOptionSelectecCallback;
	var context 				  = this;
	document.onclick              = function() { context.hideContextMenu(); };

	element.style.position = "absolute";
	element.style.left 	   = position.x + "px";
	element.style.top  	   = position.y + "px";
	element.style.display  = 'inline';

	var elementHTML = "";

	for(var x = 0; x < options.length; x++)
	{
		var currentOption       = options[x];
		var currentOptionScaped = '"' + currentOption + '"';
		var optionButton        = "<button style='width:120px; height:20px;' onclick='onContextMenuButtonClick(" + currentOptionScaped + ");' > " + currentOption + " </button>";
		elementHTML 			+= optionButton + "<br>";
	}

	element.innerHTML = elementHTML;
};