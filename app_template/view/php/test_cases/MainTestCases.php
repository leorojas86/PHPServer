<?php 

require_once "app_template/model/Session.php";

?>

<!DOCTYPE html>
<html  lang="en">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
		<title>PHP Test</title>
		<script src="utils/js/utils.js" /> </script>
		<script type="text/javascript">
			
			//showAlert();

		</script>
	</head>
	<body>
		<?php 

		if(Session::IsUserLoggedIn())
			echo '<p>User is logged in</p>'; 
		else
			echo '<p>User is NOT logged in</p>'; 

		?> 
	</body>
</html>