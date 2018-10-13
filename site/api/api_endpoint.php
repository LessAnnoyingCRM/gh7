<?php

include_once('../init.php');

$Function = @$_REQUEST['Function']; //The name of the function
$UserId = @$_REQUEST['UserId']; // This for now it's gonna be either 1 (Guest) or 2 (Host)
$Parameters = @$_REQUEST['Parameters']; //The parameters associated with it
$IsHost = $UserId == 2;

if (!$Function || !$UserId) {
	echo Api_Return("Error");
	die();
}

try {
	echo Api_Return(
		call_user_func_array(
			$Function, 
			array_merge($Parameters, array('UserId' => $UserId, 'IsHost' => $IsHost))
		)
	);
} catch (Error $e) {
	echo Api_Return("Error");
}