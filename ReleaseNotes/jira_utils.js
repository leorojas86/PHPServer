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
	this.jiraAPIURL   = null;
}

JiraUtilsClass.prototype.initialize = function(jiraSettings)
{
	this.jiraSettings    = jiraSettings;
	this.jiraAPIIssueURL = jiraSettings["JiraURL"] + "/rest/api/latest/issue/" + jiraSettings["JiraProjectId"] + "-[ISSUE_ID]?fields=summary";
};

JiraUtilsClass.prototype.replaceJiraTags = function(plainText, onAllTagsReplaced)
{
	this.replaceJiraTagsAsyncronous(plainText, onAllTagsReplaced);
};

//https://mightyplay.atlassian.net/rest/api/latest/issue/CENDEVMATH-938?fields=summary
//https://answers.atlassian.com/questions/69356/cross-origin-resource-sharing-with-jira-rest-api-and-javascript
JiraUtilsClass.prototype.replaceJiraTagsAsyncronous = function(plainText, onAllTagsReplaced)
{
	var tagFirstIndex = plainText.indexOf("{");

	if(tagFirstIndex != -1)
	{
		var tagLastIndex    = plainText.indexOf("}");
		var tag 		    = plainText.substring(tagFirstIndex, tagLastIndex + 1);
		var tagJSON 	    = JSON.parse(tag);
		var issueRestAPIURL = this.jiraAPIIssueURL.replace("[ISSUE_ID]", tagJSON["JiraTicketId"]);
		var context 		= this;

		RequestUtils.getInstance().request(issueRestAPIURL, "GET", function(xmlhttp) 
		{
			if(RequestUtils.getInstance().checkForValidResponse(xmlhttp))
			{
				var apiResponseJSON = JSON.parse(xmlhttp.responseText);
				var replaceText     = tagJSON["JiraTicketId"] + " - " + apiResponseJSON["fields"]["summary"];
				plainText           = plainText.replace(tag, replaceText);
			}
			else
				plainText  = plainText.replace(tag, "Could not get ticket '" + tagJSON["JiraTicketId"] + "' info, please check if you are authenticated on jira -> " + context.jiraSettings["JiraURL"]);

			context.replaceJiraTagsAsyncronous(plainText, onAllTagsReplaced);
		});
	}
	else
		onAllTagsReplaced(plainText);
}