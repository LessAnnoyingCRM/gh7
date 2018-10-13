<?php

function RateUser ($Parameters, $UserId) {
	$EventId = $Parameters['EventId'];
	$RatingUserId = $UserId;
	$RatedUserId = $Parameters['RatedUserId'];
	$Criterion = $Parameters['Criterion'];
	$Rating = ($Parameters['Rating'] ? $Parameters['Rating'] : null);
	$Note = ($Parameters['Note'] ? $Parameters['Note'] : null);
	$DateRated = gmdate("Y-m-d H:i:s");

	$Sql = "INSERT INTO rating (EventId, RatingUserId, RatedUserId, Criterion, Rating, Note, DateRated)
			VALUES ($EventId, $RatedUserId, $RatedUserId, $Criterion, $Rating, $Note, $DateRated)";

	Mysqlx_Query($Sql);
}