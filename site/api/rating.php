<?php

function RateUser ($Parameters) {
	$EventId = $Parameters['EventId'];
	$RatingUserId = $Parameters['UserId'];
	$RatedUserId = $Parameters['RatedUserId'];
	$Criterion = $Parameters['Criterion'];
	$Rating = ($Parameters['Rating'] ? $Parameters['Rating'] : null);
	$Note = ($Parameters['Note'] ? $Parameters['Note'] : null);
	$DateRated = gmdate("Y-m-d H:i:s");

	$Sql = "INSERT INTO rating (EventId, RatingUserId, RatedUserId, Criterion, Rating, Note, DateRated)
			VALUES ($EventId, $RatedUserId, $RatedUserId, $Criterion, $Rating, $Note, $DateRated)";

	try {
		mysqli_query($Conn, $Sql);
	} catch (Exception $e) {
		error_log($e->getMessage());
		return "Error";
	}

	return array();
}