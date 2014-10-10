<?php 
	require_once "utils/php/MySQLManager.php";

	MySQLManager::Connect();

	$result = MySQLManager::Execute("SELECT name FROM event LIMIT 10");

	if ($result) 
	{
    	printf("Select returned %d rows.\n", $result->num_rows);
    	$result->close();
	}
?>