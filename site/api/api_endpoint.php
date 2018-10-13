<?php 

$Function = @$_REQUEST['Function']; //The name of the function
$Parameters = @$_REQUEST['Parameters']; //The name of the function

if ($Function == "CreateUser") {
	
} else if ($Function == "UpdateUser") {
	
} else if ($Function == "DeleteUser") {
	
} else if ($Function == "GetUser") {
	
} else if ($Function == "CreateVoiceBio") {
	
} else if ($Function == "UpdateVoiceBio") {
	
} else if ($Function == "UploadProfilePicture") {
	
} else if ($Function == "Login") {
	
} else if ($Function == "Logout") {
	
} else if ($Function == "Register") {
	
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
 

?>