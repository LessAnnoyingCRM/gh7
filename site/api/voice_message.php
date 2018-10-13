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

function GetAllConversations ($Parameters) {

	$UserId = $Parameters['UserId'];
	$TypeOfUserId = ($Parameters['IsHost'] ? "HostId" : "GuestId");

	$Sql = "SELECT * FROM message 
			LEFT JOIN match ON message.MatchId = match.MatchId
			WHERE match.$TypeOfUserId = $TypeOfUserId AND match.DateUnmatched IS NULL AND message.DateAchived IS NULL
			";
	
	$Result = mysqli_query($Conn, $Sql);

	return array(
		"Error" => false,
		"Conversations" => $ConversationsArray
	);
}



