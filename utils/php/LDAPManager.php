<?php
	require_once "utils/php/ServiceResult.php";

class LDAPManager
{
	const LDAP_SEARCH_FILTER = "(userPrincipalName=[user])";

	private static $_ldapHost   = null;
	private static $_ldapPort   = null;
	private static $_ldapBaseDN = null;
	private static $_ldapDomain = null;

	public static function Initialize($ldapHost, $ldapPort, $ldapBaseDN, $ldapDomain)
	{
		LDAPManager::$_ldapHost   = $ldapHost;
		LDAPManager::$_ldapPort   = $ldapPort;
		LDAPManager::$_ldapBaseDN = $ldapBaseDN;
		LDAPManager::$_ldapDomain = $ldapDomain;
	}

	public static function Autenticate($user, $password)
	{
		$autenticationData = null;
		// connect to ldap server
		$ldapConnection = ldap_connect(LDAPManager::$_ldapHost, LDAPManager::$_ldapPort);

		if($ldapConnection) 
		{
			$user = "$user@" . LDAPManager::$_ldapDomain;

			//die("host = " . LDAPManager::$_ldapHost . " port = " .  LDAPManager::$_ldapPort . " user = " . $user . " password = " . $password);
		    // binding to ldap server
		    $ldapBind = ldap_bind($ldapConnection, $user, $password);

		    // verify binding
		    if($ldapBind) 
		    {
		        //echo "LDAP bind successful...";

		        // You may add in any filter part on here. "uid" is a profile data inside the LDAP. You may filter by other columns depends on your LDAP setup.
		        $ldapSearchFilter = str_replace("[user]", $user, LDAPManager::LDAP_SEARCH_FILTER);
			    $search 		  = ldap_search($ldapConnection, LDAPManager::$_ldapBaseDN, $ldapSearchFilter);
			    $info   		  = ldap_get_entries($ldapConnection, $search);
			    $count  		  = $info["count"];

			    if($count == 1)
			 	{
			 		$userInfo 		   = $info[0];
			 		$autenticationData = array("uid" => $userInfo["uid"][0], "displayname" => $userInfo["displayname"][0], "userPrincipalName" => $userInfo["userprincipalname"][0], "mail" => $userInfo["mail"][0]);
			    }
			    else
			    {
			    	//echo "Could not retrieve the user information";
			    }
		    }
		    else 
		    {
		        //echo "LDAP bind failed...";
		    }

		    ldap_close($ldapConnection);
		}
		//else
			//echo "Could not connect to LDAP server.";

		return $autenticationData;
	}
}

?>