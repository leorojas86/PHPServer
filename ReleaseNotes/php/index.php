<!DOCTYPE html>
<html lang="en">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
		<title>Release Notes</title>
	</head>
	<body>
		<div>
		<?php 

			echo "TEST RESPONSE: ";

			// Create a curl handle
			$ch = curl_init('https://mightyplay.atlassian.net/rest/api/latest/issue/CENDEVMATH-938?fields=summary');

			curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

			// Execute
			$response = curl_exec($ch);

			if(!curl_errno($ch))
			{
			    //$info = curl_getinfo($ch);

			 	//echo 'Took ' . $info['total_time'] . ' seconds to send a request to ' . $info['url'];

			 	echo "$response";
			}

			// Check if any error occurred
			//if(!curl_errno($ch))
			//{
			    //$info = curl_getinfo($ch);

			 //echo 'Took ' . $info['total_time'] . ' seconds to send a request to ' . $info['url'];
			//}

			// Close handle
			//curl_close($ch);

		?>
		<div>
	</body>
</html>