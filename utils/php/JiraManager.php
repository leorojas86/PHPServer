<?php 
	require_once "utils/php/ServiceResult.php";
	
	class JiraManager
	{
		private static $_jiraURL          = null;
		private static $_jiraProjectId    = null;
		private static $_jiraUser         = null;
		private static $_jiraUserPassword = null;
		private static $_curlJiraUserInfo = null;

		public static function Initialize($jiraURL, $jiraProjectId, $jiraUser, $jiraUserPassword)
		{
			JiraManager::$_jiraURL   		= $jiraURL;
			JiraManager::$_jiraProjectId   	= $jiraProjectId;
			JiraManager::$_jiraUser 		= $jiraUser;
			JiraManager::$_jiraUserPassword = $jiraUserPassword;
			JiraManager::$_curlJiraUserInfo = "$jiraUser:$jiraUserPassword";
		}

		public static function CurlRequest($url)
		{			
			// Create a curl handle
			$ch = curl_init($url);

			curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
			curl_setopt($ch, CURLOPT_USERPWD, JiraManager::$_curlJiraUserInfo);

			// Execute
			$response = curl_exec($ch);

			if(curl_errno($ch))
				echo 'Curl error: ' . curl_error($ch);
			
			return $response;
		}

		public static function GetUssuesInfo($issueIds)
		{
			$jiraURL       = JiraManager::$_jiraURL; 
			$project       = JiraManager::$_jiraProjectId;
			$issueIdsArray = explode(",", $issueIds);
			$issuesInfo    = "[";

			foreach($issueIdsArray as $issueId)
		    {
		    	$response   = JiraManager::CurlRequest("$jiraURL/rest/api/latest/issue/$project-$issueId?fields=summary");
		    	$issuesInfo .= $issuesInfo == "[" ? $response : "," . $response;
		    }

		    $issuesInfo .= "]";

    		return $issuesInfo;
		}
	}
	
?>