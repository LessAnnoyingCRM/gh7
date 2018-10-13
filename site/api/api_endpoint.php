<?php 

$Function = @$_REQUEST['Function']; //The name of the function
$UserId = @$_REQUEST['UserId']; // This for now it's gonna be either 1 (Guest) or 2 (Host)
$Parameters = @$_REQUEST['Parameters']; //The parameters associated with it
$IsHost = $UserId == 2;

if ($Function == "GetUser") {
	$Result = GetUser($UserId);
	return Api_Return($Result);
} else if ($Function == "SendVoiceMessage") {
	
} else if ($Function == "GetAllConversations") {
	
} else if ($Function == "GetVoiceMessages") {
	
} else if ($Function == "DeleteVoiceMessage") {
	
} else if ($Function == "CreateEvent") {
	
} else if ($Function == "UpdateEvent") {
	
} else if ($Function == "ConfirmEvent") {
	
} else if ($Function == "DeleteEvent") {
	
} else if ($Function == "RateUser") {
	
} else if ($Function == "RateEvent") {
	
} else if ($Function == "GetUserRating") {
	
} else if ($Function == "GetPotentialMatches") {
	
} else if ($Function == "GuestApproveMatch") {
	
} else if ($Function == "HostConfirmMatch") {
	
} else if ($Function == "Unmatch") {
	
} else {
	return json_encode(array("Error" => true));
}

function Api_Return ($Result) {
	if ($Result != "Error") {
		return json_encode(array("Error" => false, "Content" => $Result));
	} else {
		return json_encode(array("Error" => true));
	}
}
 

?>