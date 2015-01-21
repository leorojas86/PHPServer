var Example = 
(
	function() 
	{
	    var _instance = null;
	 
	    return {
			        getInstance : function () 
			        {
			            if(_instance == null)
			                 _instance = new ExampleClass();
			            
			            return _instance;
			        }
			    };
	}
)();

function ExampleClass()
{	
	this.exampleVariable = "exampleVariable";
	this.exampleCallback = null;
}

ExampleClass.prototype.exampleMethod = function(onExampleCallback)
{
	alert(this.exampleVariable);
	
	this.exampleCallback = onExampleCallback;
};

ExampleClass.prototype.notifyExampleCallback = function()
{
	if(this.exampleCallback != null)
		this.exampleCallback(this);
};