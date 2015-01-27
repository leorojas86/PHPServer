<?php 
	
	//http://localhost:8888/php/jira.php?jira_url=https://mightyplay.atlassian.net&project=CENDEVMATH&issue_ids=938,937,936

	function CurlRequest($url)
	{
		// Create a curl handle
		$ch = curl_init($url);

		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

		curl_setopt($ch, CURLOPT_USERPWD, "phpauth:ohWowThisI54L0ngPW!");

		// Execute
		$response = curl_exec($ch);

		if(curl_errno($ch))
			echo 'Curl error: ' . curl_error($ch);
		
		return $response;
	}

	$jiraURL       = $_GET["jira_url"]; 
	$project       = $_GET["project"]; 
	$issueIds      = $_GET["issue_ids"];
	$issueIdsArray = explode(",", $issueIds);
	$responseArray = array();

	foreach($issueIdsArray as $issueId)
    {
    	$response 		 = CurlRequest("$jiraURL/rest/api/latest/issue/$project-$issueId?fields=summary");
    	$responseArray[] = $response;
    	
    }

    echo "$response";
?>