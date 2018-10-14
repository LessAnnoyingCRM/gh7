<?php

function SendVoiceMessage ($Parameters, $UserId) {

    // there must be a $_FILES associated with the request
    if ($_FILES) {
        $UploadInfo = array_pop($_FILES);
        $LocalFilename = $UploadInfo['tmp_name'];
        $FileType = $UploadInfo['type'];
    }
    else{
        return array();
    }

    // add an entry to the DB about the file
	$MatchId = $Parameters['MatchId'] ?? 0;
    $SendingUserId = $UserId;
	$DateSent = gmdate("Y-m-d H:i:s");
	$Sql = "INSERT INTO message (SendingUserId, MatchId, DateSent)
			VALUES ($SendingUserId, $MatchId, '$DateSent')";
	Mysqlx_Query($Sql);
    $MessageIdReturn = Mysql_GetLastCreatedId("MessageId");
    $MessageId = $MessageIdReturn['MessageId'];

    // upload the file
    $S3Filename = $MessageId.'.mp4';
    $Url = _UploadMp4S3($S3Filename,$LocalFilename,$FileType);

    // update the DB with the url
    $Sql = "UPDATE message
            SET MessageUrl='$Url'
            WHERE MessageId=$MessageId
            ";
    Mysqlx_Query($Sql);

    return array('MessageId'=>$MessageId,'MessageUrl'=>$Url);
}

function GetVoiceMessages ($Parameters) {
	$MatchId = $Parameters['MatchId'];

	$Sql = "SELECT MessageId,SendingUserId,DateSent,MessageUrl FROM message
			WHERE MatchId = $MatchId AND DateArchived IS NULL
			ORDER BY DateSent ASC";

	$Result = Mysqlx_Query($Sql);
	$MessagesArray = Mysql_GetAssocArray($Result);

	$ReturnArray = array();
	foreach($MessagesArray as $ThisMessage){
	    $ReturnArray['Conversation'][$ThisMessage['MessageId']] =
            array(
                "Message" => $ThisMessage['MessageUrl'],
                "DateSent" => $ThisMessage['DateSent'],
                "UserId" => $ThisMessage['SendingUserId'],
                "MatchId" => $MatchId
            );
    }

    return $ReturnArray;
}

function GetAllConversations ($Parameters, $UserId) {

    // Get all the messages that the user is participating in
	$Sql = "SELECT message.* FROM message,pairing 
			WHERE message.MatchId=pairing.MatchId
			  AND pairing.DateUnmatched IS NULL
			  AND message.DateArchived IS NULL
			  AND (pairing.GuestId=$UserId OR pairing.HostId=$UserId)
			ORDER BY message.DateSent ASC";
	$Result = Mysqlx_Query($Sql);
	$MessagesArray = Mysql_GetAssocArray($Result);

	// reformat the messages per conversation
	$ConversationsArray = array();

	foreach ($MessagesArray as $ThisMessage) {

	    $ConversationsArray[$ThisMessage['MatchId']]["Conversation"][] =
            array(
                "MessageId" => $ThisMessage['MessageId'],
                "Message" => $ThisMessage['MessageUrl'],
                "DateSent" => $ThisMessage['DateSent'],
                "FromUserId" => $ThisMessage['SendingUserId']
            );

	}

	return $ConversationsArray;
}


use Aws\S3\S3Client;
function _UploadMp4S3($S3Filename,$LocalFilename,$ContentType = 'audio/mp4') {

    $S3 = new Aws\S3\S3Client([
        'version' => '2006-03-01',
        'region' => 'us-east-1',
        'credentials' => [
            'key'    => AWS_KEY,
            'secret' => AWS_SECRET,
        ]
    ]);

    $Result = $S3->putObject([
        'Bucket' => 'gh7',
        'ACL' => 'public-read',
        'Key' => $S3Filename,
        'ContentType' => $ContentType,
        'SourceFile' => $LocalFilename,

    ]);

    return($Result->get('ObjectURL'));

}
