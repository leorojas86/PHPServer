<?php 

	require_once "utils/php/MySQLManager.php";
	require_once "utils/php/SessionManager.php";

	$server = 'localhost';
	$user   = 'root';
	$pass   = 'root';
	$db     = 'generic_db';

	MySQLManager::Connect($server, $user, $pass, $db);

	SessionManager::StartSession();
?>