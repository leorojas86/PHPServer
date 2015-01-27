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
	this.jiraSettings 		  = null;
	this.requestIssuesInfoURL = null;
}

//http://localhost:8888/php/jira.php?jira_url=https://mightyplay.atlassian.net&project=CENDEVMATH&issue_ids=938,937,936,937,936,937,936,937,936,937,936,937,936
JiraUtilsClass.prototype.initialize = function(jiraSettings)
{
	this.jiraSettings    	  = jiraSettings;
	this.requestIssuesInfoURL = jiraSettings["JiraAPIURL"] + "?jira_url=" + jiraSettings["JiraURL"] + "&project=" + jiraSettings["JiraProjectId"] + "&issue_ids=[ISSUE_IDS]";
};

JiraUtilsClass.prototype.replaceJiraTags = function(plainText, onAllTagsReplaced)
{
	this.replaceJiraTagsAsyncronous(plainText, onAllTagsReplaced);
};

//https://mightyplay.atlassian.net/rest/api/latest/issue/CENDEVMATH-938?fields=summary
//https://answers.atlassian.com/questions/69356/cross-origin-resource-sharing-with-jira-rest-api-and-javascript
JiraUtilsClass.prototype.replaceJiraTagsAsyncronous = function(plainText, onAllTagsReplaced)
{
	var issueIds     = "";
	var temporalText = plainText;
	var nextJiraTag  = this.getNextJiraTag(temporalText);

	while(nextJiraTag != null)
	{
		var tagJSON	 = JSON.parse(nextJiraTag);
		var tickedId = tagJSON["JiraTicketId"];
		issueIds 	 += issueIds == "" ? tickedId : "," + tickedId;
		temporalText = temporalText.replace(nextJiraTag, tagJSON["JiraTicketId"]);
		nextJiraTag  = this.getNextJiraTag(temporalText);
	}

	if(issueIds != "")//There are issues on the plain text
	{
		var requestURL = this.requestIssuesInfoURL.replace("[ISSUE_IDS]", issueIds);
		var context    = this;
		RequestUtils.getInstance().request(requestURL, "GET", function(xmlhttp) { context.onRequestIssuesInfoResponse(xmlhttp, plainText, onAllTagsReplaced); } );
	}
	else
		onAllTagsReplaced(plainText);
}

JiraUtilsClass.prototype.getNextJiraTag = function(plainText)
{
	var tagFirstIndex = plainText.indexOf("{");

	if(tagFirstIndex != -1)
	{
		var tagLastIndex = plainText.indexOf("}");
		var tag 		 = plainText.substring(tagFirstIndex, tagLastIndex + 1);

		return tag;
	}

	return null;
}

JiraUtilsClass.prototype.onRequestIssuesInfoResponse = function(xmlhttp, plainText, onAllTagsReplaced)
{
	if(RequestUtils.getInstance().checkForValidResponse(xmlhttp))
	{
		var issuesInfo = JSON.parse(xmlhttp.responseText);

		for(var x = 0; x < issuesInfo.length; x++)
		{
			var currentIssueInfo    = issuesInfo[x];
			var currentIssueSummary = currentIssueInfo["fields"]["summary"];
			var nextJiraTag         = this.getNextJiraTag(plainText);
			plainText 				= plainText.replace(nextJiraTag, currentIssueSummary);
		}

		onAllTagsReplaced(plainText);
	}
}