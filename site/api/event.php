<?php

function CreateEvent($Parameters) {
	$MatchId = $Parameters['MatchId'];
	$Location = $Parameters['Location'];
	$EventDate = $Parameters['EventDate'];

	$Sql = "INSERT INTO event (MatchId, Location, EventDate)
			VALUES ($MatchId, $Location, $EventDate)";

	try {
		mysqli_query($Conn, $Sql);
		$EventId = mysqli_insert_id($Conn);
	} catch (Exception $e) {
		error_log($e->getMessage());
		return "Error";
	}

	return array("EventId" => $EventId);
}

function ConfirmEvent($Parameters, $UserId, $IsHost) {
	$EventId = $Parameters['EventId'];
	$WhichUser_DateConfirmed = ($IsHost ? "DateHostConfirmed" : "DateGuestConfirmed");
	$Sql = "UPDATE event 
			SET WhichUser_DateConfirmed = '$DateConfirmed'
			WHERE EventId = $EventId";

	try {
		mysqli_query($Conn, $Sql);
	} catch (Exception $e) {
		error_log($e->getMessage());
		return "Error";
	}

	return array();
}