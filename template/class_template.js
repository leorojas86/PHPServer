var TemplateUtils = 
(
	function() 
	{
	    var _instance = null;
	 
	    return {
			        getInstance : function() 
			        {
			            if(_instance == null)
			                 _instance = new TemplateClass();
			            
			            return _instance;
			        }
			    };
	}
)();

function TemplateClass()
{
}

TemplateClass.prototype.templateMethod = function()
{
};