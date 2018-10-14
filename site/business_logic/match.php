<?php 

function CreateMatch ($Parameters, $UserId) {
	$Sql = "INSERT INTO pairing (HostId, GuestId) VALUES ($Parameters[HostId], $UserId)";
	$Result = Mysqlx_Query($Sql);
	return Mysql_GetLastCreatedId("MatchId");
}

function GetPotentialMatches($Parameters, $UserId, $IsHost) {

    $User = _GetUser($UserId);

    if ($User['IsHost']) {
        $Sql = "SELECT user.UserId AS OtherUserId, user.Name, user.Picture AS ProfilePictureUrl, pairing.MatchId, user.Profile
        		FROM pairing
        		LEFT JOIN user ON user.UserId = pairing.GuestId 
        		WHERE DateGuestApproved IS NOT NULL AND DateUnmatched IS NULL AND pairing.HostId = $UserId";
    }
    else {
        $Sql = "SELECT user.UserId AS OtherUserId, user.Name, user.Picture AS ProfilePictureUrl, pairing.MatchId, user.Profile
        		FROM pairing 
        		LEFT JOIN user ON user.UserId = pairing.HostId
        		WHERE DateHostMatched IS NULL AND DateUnmatched IS NULL AND pairing.GuestId = $UserId";
    }

    $Result = Mysqlx_Query($Sql);
    $ResultArray = Mysql_GetAssocArray($Result, "MatchId");

    foreach($ResultArray as &$ThisRow) {
    	$ProfileData = json_decode($ThisRow['Profile'], true);
    	$ThisRow['Distance'] = @$ProfileData['Distance'];
    	$ThisRow['CoverPhotoURL'] = @$ProfileData['CoverPhotoURL'];
    }

    return $ResultArray;
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
