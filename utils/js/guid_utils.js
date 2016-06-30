//Singleton instance
var GUIDUtils = { instance : new GUIDUtils() };

function GUIDUtils()
{
	this.generateNewGUID = function()
	{
		var guid = (this.s4() + this.s4() + "-" + this.s4() + "-" + this.s4() + "-" + this.s4() + "-" + this.s4() + this.s4() + this.s4()).toLowerCase();
		return guid;
	};

	this.s4 = function()
	{
	    return (((1+Math.random())*0x10000)|0).toString(16).substring(1); 
	};
}
