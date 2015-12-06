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
	this.replaceJiraTagsRequestsQueue = new Array();
}

JiraUtilsClass.prototype.replaceJiraTags = function(plainText, versionId, onAllTagsReplaced)
{
	var requestInfo = {text: plainText, version: versionId, callback: onAllTagsReplaced }; 
	this.replaceJiraTagsRequestsQueue.push(requestInfo);

	if(this.replaceJiraTagsRequestsQueue.length == 1)
		this.replaceJiraTagsAsyncronous(plainText, versionId, onAllTagsReplaced);
};

//https://mightyplay.atlassian.net/rest/api/latest/issue/CENDEVMATH-938?fields=summary
JiraUtilsClass.prototype.replaceJiraTagsAsyncronous = function(plainText, versionId, onAllTagsReplaced)
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
		var host    = URLUtils.instance.getHostName();
		var params  = "service=Jira&method=GetIssuesInfo&version_id=" + versionId + "&issues_ids=" + issueIds;
		var context = this;
		RequestUtils.getInstance().request(host, "POST", function(xmlhttp) { context.onRequestIssuesInfoResponse(xmlhttp, plainText, onAllTagsReplaced); }, params);
	}
	else
	{
		onAllTagsReplaced(plainText);
		this.checkForQueue();
	}
};

JiraUtilsClass.prototype.checkForQueue = function()
{
	this.replaceJiraTagsRequestsQueue.splice(0, 1);

	if(this.replaceJiraTagsRequestsQueue.length > 0)
	{
		var requestInfo = this.replaceJiraTagsRequestsQueue[0];

		this.replaceJiraTagsAsyncronous(requestInfo.text, requestInfo.version, requestInfo.callback);
	}
};

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
};

JiraUtilsClass.prototype.onRequestIssuesInfoResponse = function(xmlhttp, plainText, onAllTagsReplaced)
{
	if(RequestUtils.getInstance().checkForValidResponse(xmlhttp))
	{
		var result = JSON.parse(xmlhttp.responseText);

		if(result.success)
		{
			var issuesInfo = result.data;

			for(var x = 0; x < issuesInfo.length; x++)
			{
				var currentIssueInfo    = issuesInfo[x];
				var currentIssueId		= currentIssueInfo["id"];
				var currentIssueKey		= currentIssueInfo["key"];
				var self			    = currentIssueInfo["self"];
				var jiraURL             = self.substring(0, self.indexOf("/rest"));
				var currentIssueURL		= jiraURL + "/browse/" + currentIssueKey;
				var currentIssueSummary = currentIssueInfo["fields"]["summary"];
				var nextJiraTag         = this.getNextJiraTag(plainText);
				var tagJSON	 			= JSON.parse(nextJiraTag);
				var issueHTML		    = "<a href='" + currentIssueURL + "'>" + tagJSON["JiraTicketId"] + " - " + currentIssueSummary + "</a>";
				plainText 				= plainText.replace(nextJiraTag, issueHTML);
			}

			onAllTagsReplaced(plainText);
			this.checkForQueue();
		}
	}
};