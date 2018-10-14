<?php

function CreateEvent($Parameters) {

	$MatchId = $Parameters['MatchId'];
	$Location = $Parameters['Location'];
	$EventDate = $Parameters['EventDate'];

	$Sql = "INSERT INTO event (MatchId, Location, EventDate)
			VALUES ($MatchId, '$Location', '$EventDate')";

	Mysqlx_Query($Sql);
	return Mysql_GetLastCreatedId("EventId");
}

function ConfirmEvent($Parameters, $UserId, $IsHost) {

	$EventId = $Parameters['EventId'];
	$DateConfirmedField = ($IsHost ? "DateHostConfirmed" : "DateGuestConfirmed");
    $DateConfirmed = gmdate("Y-m-d H:i:s");

	$Sql = "UPDATE event 
			SET $DateConfirmedField = '$DateConfirmed'
			WHERE EventId = $EventId";
    Mysqlx_Query($Sql);

	return ['DateConfirmed'=>$DateConfirmed];
}
