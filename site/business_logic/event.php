<?php

function CreateEvent($Parameters) {
	$MatchId = $Parameters['MatchId'];
	$Location = $Parameters['Location'];
	$EventDate = $Parameters['EventDate'];

	$Sql = "INSERT INTO event (MatchId, Location, EventDate)
			VALUES ($MatchId, $Location, $EventDate)";

	Mysqlx_Query($Sql);
	return Mysql_GetLastCreatedId("EventId");
}

function ConfirmEvent($Parameters, $UserId, $IsHost) {
	$EventId = $Parameters['EventId'];
	$DateConfirmed = ($IsHost ? "DateHostConfirmed" : "DateGuestConfirmed");
	$Sql = "UPDATE event 
			SET WhichUser_DateConfirmed = '$DateConfirmed'
			WHERE EventId = $EventId";

	return Mysqlx_Query($Sql);
}