<?php 

	require_once "inventory_app/utils/php/MySQLManager.php";
	require_once "inventory_app/model/Session.php";

	$server = 'localhost';
	$user   = 'root';
	$pass   = 'root';
	$db     = 'generic_db';

	MySQLManager::Connect($server, $user, $pass, $db);

	Session::Start();
	
?>