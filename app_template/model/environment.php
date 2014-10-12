<?php 
	require_once "utils/php/MySQLManager.php";
	require_once "app_template/model/Session.php";

	$server = 'localhost';
	$user   = 'root';
	$pass   = 'root';
	$db     = 'mysql';

	MySQLManager::Connect($server, $user, $pass, $db);

	Session::Start();

	$result = MySQLManager::Execute("SELECT name FROM event LIMIT 10");

	if ($result) 
	{
    	//printf("Select returned %d rows.\n", $result->num_rows);
    	$result->close();
	}
	else
		echo "Error executing query";
?>