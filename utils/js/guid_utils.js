var GUIDUtils = 
(
	function() 
	{
	    var _instance = null;
	 
	    return {
			        getInstance : function() 
			        {
			            if(_instance == null)
			                 _instance = new GUIDUtilsClass();
			            
			            return _instance;
			        }
			    };
	}
)();

function GUIDUtilsClass()
{
}

GUIDUtilsClass.prototype.generateNewGUID = function()
{
	var guid = (this.s4() + this.s4() + "-" + this.s4() + "-" + this.s4() + "-" + this.s4() + "-" + this.s4() + this.s4() + this.s4()).toLowerCase();
	return guid;
};

GUIDUtilsClass.prototype.s4 = function()
{
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1); 
}