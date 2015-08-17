var SessionUtils = 
(
	function() 
	{
	    var _instance = null;
	 
	    return {
			        getInstance : function() 
			        {
			            if(_instance == null)
			                 _instance = new SessionUtilsClass();
			            
			            return _instance;
			        }
			    };
	}
)();

function SessionUtilsClass()
{
	this.sessionId = null;
}