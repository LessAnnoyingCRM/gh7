<?php

function SendVoiceMessage ($Parameters) {
	
	$SendingUserId = $Parameters['Sender'];
	$MatchId = $Parameters['MatchId'];
	$DateSent = gmdate("Y-m-d H:i:s");
	$Message = $Parameters['Message'];

	$Sql = "INSERT INTO message (SendingUserId, MatchId, DateSent, Message)
			VALUES ($SendingUserId, $MatchId, $DateSent, $Message)";

	try {
		mysqli_query($Conn, $Sql);
	} catch (Exception $e) {
		return array("Error" => true, "Message" => $e->getMessage());
	}

	return array("Error" => false);
}

function GetVoiceMessages ($MatchId) {
	$Sql = "SELECT * FROM message WHERE MatchId = $MatchId";
	return mysqli_query($Conn, $Sql);
}



