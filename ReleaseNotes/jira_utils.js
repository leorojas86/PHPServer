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
	while(this.replaceNextJiraTag(plainText, function(resultText) { plainText = resultText; }))
	{

	}

	onAllTagsReplaced(plainText);
};

JiraUtilsClass.prototype.replaceNextJiraTag = function(plainText, onNextTagReplaced)
{
	var tagFirstIndex = plainText.indexOf("{");

	if(tagFirstIndex != -1)
	{
		var tagLastIndex = plainText.indexOf("}");
		var tag 		 = plainText.substring(tagFirstIndex, tagLastIndex + 1);
		plainText 		 = plainText.replace(tag, "Replaced");

		onNextTagReplaced(plainText);

		return true;
	}

	onNextTagReplaced(plainText);

	return false;
}
