var JiraUtils = 
(
	function() 
	{
	    var _instance = null;
	 
	    return {
			        getInstance : function () 
			        {
			            if(_instance == null)
			                 _instance = new JiraUtilsClass();
			            
			            return _instance;
			        }
			    };
	}
)();

function JiraUtilsClass()
{
	this.jiraSettings = null;
}

JiraUtilsClass.prototype.initialize = function(jiraSettings)
{
	this.jiraSettings = jiraSettings;
};

JiraUtilsClass.prototype.replaceJiraTags = function(plainText, onAllTagsReplaced)
{
	
	onAllTagsReplaced(plainText);
};
