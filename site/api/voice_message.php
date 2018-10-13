<?php

function InsertVoiceMessage ($Parameters) {
	$Keys = array_keys($Parameters);
	$Values = array_values($Parameters);
	$Sql = "INSERT INTO user ($Keys) VALUES ($Values)";
	mysqli_query($Conn, $Sql);
}

function GetVoiceMessages ($MatchId) {
	$Sql = "SELECT * FROM message WHERE MatchId = $MatchId";
	return mysqli_query($Conn, $Sql);
}



