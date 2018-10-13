<?php 

function CreateMatch ($Parameters, $UserId) {
	global $Conn;
	$Sql = "INSERT INTO pairing (HostId, GuestId) VALUES ($Parameters[HostId], $UserId)";
	$Result = Mysqlx_Query($Sql);
	return Mysql_GetLastCreatedId("MatchId");
}

function GetMatches ($Parameters, $UserId) {
	global $Conn;

	$User = GetUser($UserId);

	if ($User['IsHost']) {
		$Sql = "SELECT * FROM pairing WHERE HostId = $UserId";
	} else {
		$Sql = "SELECT * FROM pairing WHERE GuestId = $UserId";
	}
	
	$Result = Mysqlx_Query($Sql);
	return Mysql_GetAssocArray($Result);
}

function GuestApproveMatch ($Parameters) {
	global $Conn;

	$MatchId = $Parameters['MatchId'];
	$DateGuestApproved = gmdate("Y-m-d H:i:s");

	$Sql = "UPDATE pairing 
			SET DateGuestApproved = '$DateGuestApproved' 
			WHERE MatchId = $MatchId";
	
	return Mysqlx_Query($Sql);
}

function HostConfirmMatch ($Parameters) {
	global $Conn;

	$MatchId = $Parameters['MatchId'];
	$DateHostMatched = gmdate("Y-m-d H:i:s");

	$Sql = "UPDATE pairing
			SET DateHostMatched = '$DateHostMatched'
			WHERE MatchId = $MatchId";

	return Mysqlx_Query($Sql);
}