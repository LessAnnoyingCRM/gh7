<?php 

function CreateMatch ($Parameters, $UserId) {
	$Sql = "INSERT INTO pairing (HostId, GuestId) VALUES ($Parameters[HostId], $UserId)";
	$Result = Mysqlx_Query($Sql);
	return Mysql_GetLastCreatedId("MatchId");
}

function GetPotentialMatches($Parameters, $UserId, $IsHost) {

    $User = _GetUser($UserId);

    if ($User['IsHost']) {
        $Sql = "SELECT user.UserId AS OtherUserId, user.Name, user.Picture AS ProfilePictureURL, pairing.MatchId, user.Profile
        		FROM pairing
        		LEFT JOIN user ON user.UserId = pairing.GuestId 
        		WHERE DateGuestApproved IS NOT NULL AND DateUnmatched IS NULL AND pairing.HostId = $UserId";
    }
    else {
        $Sql = "SELECT user.UserId AS OtherUserId, user.Name, user.Picture AS ProfilePictureURL, pairing.MatchId, user.Profile
        		FROM pairing 
        		LEFT JOIN user ON user.UserId = pairing.HostId
        		WHERE DateHostMatched IS NULL AND pairing.DateUnmatched IS NULL";
    }

    $Result = Mysqlx_Query($Sql);
    $ResultArray = Mysql_GetAssocArray($Result);

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

function HandleResponse($Parameters, $UserId, $IsHost) {
	$OtherUserId = $Parameters['OtherUserId'];
	$Type = $Parameters['Type'];
	$Date = gmdate('Y-m-d H:i:s');
	if ($IsHost) {
		if($Type = 'Like') {
			$Sql = "UPDATE pairing 
				SET DateHostMatched AS $Date
				WHERE HostId = $UserId AND GuestId = $OtherUserId";
			$Return = array("NewMatch" => $OtherUserId);
		} else {
			$Sql = "UPDATE pairing 
				SET DateLastPresented AS $Date
				WHERE HostId = $UserId AND GuestId = $OtherUserId";
			$Return = array();
		}
	} else {
		$Sql = "UPDATE pairing
				SET ".($Type = 'Like' ? "DateGuestApproved AS $Date" : "DateLastPresented AS $Date")."
				WHERE GuestId = $UserId AND HostId = $OtherUserId";
		$Return = array();
	}
	Mysqlx_Query($Sql);
	return $Return;
}

function GetCurrentMatch ($Parameters, $UserId, $IsHost) {
	$Sql = "SELECT *
			FROM pairing
			LEFT JOIN event ON event.MatchId = pairing.MatchId
			WHERE event.EventHappened != 1 
				AND DateGuestApproved IS NOT NULL 
				AND DateHostMatched IS NOT NULL 
				AND DateUnmatched IS NULL
				AND ".($IsHost ? "HostId = $UserId" : "GuestId = $UserId")."
			ORDER BY DateHostMatched DESC 
			LIMIT 1";
	return Mysqlx_Query($Sql);
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
