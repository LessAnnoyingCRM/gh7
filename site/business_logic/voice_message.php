<?php

function SendVoiceMessage ($Parameters, $UserId) {
	$MatchId = $Parameters['MatchId'];
	$DateSent = gmdate("Y-m-d H:i:s");
	$Message = $Parameters['Message'];

	$Sql = "INSERT INTO message (SendingUserId, MatchId, DateSent, Message)
			VALUES ($UserId, $MatchId, $DateSent, $Message)";
	Mysqlx_Query($Sql);
	
	return Mysql_GetLastCreatedId("MessageId");
}

function GetVoiceMessages ($Parameters, $UserId) {
	$MatchId = $Parameters['MatchId'];
	$UserId = $UserId;

	$Sql = "SELECT * FROM message 
			WHERE MatchId = $MatchId AND DateAchived IS NULL
			ORDER BY DateSent ASC";

	$Result = Mysqlx_Query($Sql);
	$MessagesArray = Mysql_GetAssocArray($Result, "MessageId");
	$ReturnArray = array();
	foreach($MessagesArray as $MessageId => $ThisMessage){
		$ReturnArray[$MessageId] = array(
			"Message" => $ThisMessage['RecordingFile'],
			"DateSent" => $ThisMessage['DateSent'],
			"UserId" => $ThisMessage['SendingUserId']
		);
	}
	
	return array("Conversation" => $ReturnArray);
}

function GetAllConversations ($Parameters, $UserId, $IsHost) {
	$TypeOfUserId = ($IsHost ? "HostId" : "GuestId");

	$Sql = "SELECT * FROM message 
			LEFT JOIN pairing ON message.MatchId = pairing.MatchId
			WHERE pairing.$TypeOfUserId = $TypeOfUserId AND pairing.DateUnmatched IS NULL AND message.DateAchived IS NULL
			ORDER BY message.DateSent ASC";

	$Result = Mysqlx_Query($Sql);
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

	return $ConversationsArray;
}

