<?php 

function CreateMatch ($Parameters, $UserId) {
	$Sql = "INSERT INTO pairing (HostId, GuestId) VALUES ($Parameters[HostId], $UserId)";
	$Result = Mysqlx_Query($Sql);
	return Mysql_GetLastCreatedId("MatchId");
}

function GetPotentialMatches($Parameters, $UserId) {

    $User = _GetUser($UserId);

    if ($User['IsHost']) {
        $Sql = "SELECT UserId FROM user WHERE !IsHost";
    }
    else {
        $Sql = "SELECT UserId FROM user WHERE IsHost";
    }

    $Result = Mysqlx_Query($Sql);
    return Mysql_GetAssocArray($Result);
}

function GetMatches ($Parameters, $UserId, $IsHost) {
	if ($IsHost) {
		$Sql = "SELECT * FROM pairing WHERE HostId = $UserId";
	} else {
		$Sql = "SELECT * FROM pairing WHERE GuestId = $UserId";
	}
	
	$Result = Mysqlx_Query($Sql);
	return Mysql_GetAssocArray($Result);
}

function GuestApproveMatch ($Parameters) {
	$MatchId = $Parameters['MatchId'];
	$DateGuestApproved = gmdate("Y-m-d H:i:s");

	$Sql = "UPDATE pairing 
			SET DateGuestApproved = '$DateGuestApproved' 
			WHERE MatchId = $MatchId";
	
	Mysqlx_Query($Sql);
	return(['DateGuestApproved'=>$DateGuestApproved]);

}

function HostConfirmMatch ($Parameters) {
	$MatchId = $Parameters['MatchId'];
	$DateHostMatched = gmdate("Y-m-d H:i:s");

	$Sql = "UPDATE pairing
			SET DateHostMatched = '$DateHostMatched'
			WHERE MatchId = $MatchId";

	Mysqlx_Query($Sql);
    return(['DateHostMatched'=>$DateHostMatched]);

}
