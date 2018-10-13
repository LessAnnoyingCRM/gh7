<?php

function SendVoiceMessage ($Parameters, $UserId) {
	$MatchId = $Parameters['MatchId'];
	$DateSent = gmdate("Y-m-d H:i:s");
	$Message = $Parameters['Message'];

	$Sql = "INSERT INTO message (SendingUserId, MatchId, DateSent, Message)
			VALUES ($UserId, $MatchId, $DateSent, $Message)";

	try {
		mysqli_query($Conn, $Sql);
		$MessageId = mysqli_insert_id($Conn);
	} catch (Exception $e) {
		error_log($e->getMessage());
		return "Error";
	}

	return array(
		"MessageId" => $MessageId
	);
}

function GetVoiceMessages ($Parameters, $UserId) {

	$MatchId = $Parameters['MatchId'];
	$UserId = $UserId;

	$Sql = "SELECT * FROM message 
			WHERE MatchId = $MatchId AND DateAchived IS NULL
			ORDER BY DateSent ASC";

	try {
		$Result = mysqli_query($Conn, $Sql);
		$MessagesArray = Mysql_GetAssocArray($Result, "MessageId");
		$ReturnArray = array();
		foreach($MessagesArray as $MessageId => $ThisMessage){
			$ReturnArray[$MessageId] = array(
				"Message" => $ThisMessage['RecordingFile'],
				"DateSent" => $ThisMessage['DateSent'],
				"UserId" => $ThisMessage['SendingUserId']
			);
		}
	} catch (Exception $e) {
		error_log($e->getMessage());
		return "Error";
	}

	return array("Conversation" => $ReturnArray);
}

function GetAllConversations ($Parameters, $UserId, $IsHost) {
	$TypeOfUserId = ($IsHost ? "HostId" : "GuestId");

	$Sql = "SELECT * FROM message 
			LEFT JOIN match ON message.MatchId = match.MatchId
			WHERE match.$TypeOfUserId = $TypeOfUserId AND match.DateUnmatched IS NULL AND message.DateAchived IS NULL
			ORDER BY message.DateSent ASC";

	try {	
		$Result = mysqli_query($Conn, $Sql);
		$MessagesArray = Mysql_GetAssocArray($Result, "MessageId");
		$ConversationsArray = array();

		foreach ($MessagesArray as $MessageId => $ThisMessage) {
			if (!is_array($ConversationsArray[$ThisMessage['MatchId']])) {
				$ConversationsArray[$ThisMessage['MatchId']] = array("Conversation" => array());
			}
			$ConversationsArray[$ThisMessage['MatchId']]["Conversation"][$MessageId] = array(
				"Message" => $ThisMessage['RecordingFile'],
				"DateSent" => $ThisMessage['DateSent'],
				"UserId" => $ThisMessage['SendingUserId']
			);
		}
	} catch (Exception $e) {
		error_log($e->getMessage());
		return "Error";
	}

	return $ConversationsArray;
}

