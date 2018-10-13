<?php 

function CreateMatch ($Parameters, $UserId) {
	global $Conn;
	$Sql = "INSERT INTO pair (HostId, GuestId) VALUES ($Parameters[HostId], $UserId)";
	$Result = mysqli_query($Conn, $Sql);
	return Mysql_GetLastCreatedId("MatchId");
}