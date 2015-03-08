var ServiceClientManager = 
(
	function() 
	{
	    var _instance = null;
	 
	    return {
			        getInstance : function() 
			        {
			            if(_instance == null)
			                 _instance = new ServiceClientManagerClass();
			            
			            return _instance;
			        }
			    };
	}
)();

function ServiceClientManagerClass()
{
}

ServiceClientManagerClass.prototype.request = function()
{
};