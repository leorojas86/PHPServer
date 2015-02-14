<?php 
	require_once "inventory_app/model/Config.php";
	require_once "utils/php/MySQLManager.php";
	require_once "utils/php/SessionManager.php";

	MySQLManager::Connect(Config::DB_SERVER, Config::DB_USER, Config::DB_PASS, Config::DB_NAME);

	SessionManager::StartSession();
?>