<?php

function GetMatches ($Parameters, $UserId) {
	global $Conn;
	
	$User = GetUser($UserId);

	if($User['IsHost'])
		$Sql = "SELECT * FROM match WHERE HostId = $UserId";
	} else {
		$Sql = "SELECT * FROM match WHERE GuestId = $UserId";
	}
	
	return mysqli_query($Conn, $Sql);
}

function GuestApproveMatch ($Parameters) {
	global $Conn;

	$MatchId = $Parameters['MatchId'];
	$DateGuestApproved = gmdate("Y-m-d H:i:s");

	$Sql = "UPDATE match 
			SET DateGuestApproved = $DateGuestApproved 
			WHERE MatchId = $MatchId";

	try {
		mysqli_query($Conn, $Sql);
	} catch (Exception $e) {
		error_log($e->getMessage());
		return "Error";
	}

	return array();
}

function HostConfirmMatch ($Parameters) {
	global $Conn;

	$MatchId = $Parameters['MatchId'];
	$DateHostMatched = gmdate("Y-m-d H:i:s");

	$Sql = "UPDATE match
			SET DateHostMatched = '$DateHostMatched'
}