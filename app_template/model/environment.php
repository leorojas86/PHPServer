<?php 
	require_once "utils/php/MySQLManager.php";
	require_once "app_template/model/Session.php";

	$server = 'localhost';
	$user   = 'root';
	$pass   = 'root';
	$db     = 'generic_db';

	MySQLManager::Connect($server, $user, $pass, $db);

	Session::Start();
?>