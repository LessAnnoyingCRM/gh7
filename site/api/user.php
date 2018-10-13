<?php

function CreateUser ($Parameters) {
	global $Conn;

	$Keys = array_keys($Parameters);
	$Values = array_values($Parameters);
	$Sql = "INSERT INTO user ($Keys) VALUES ($Values)";
	return mysqli_query($Conn, $Sql);
}

function GetUser ($UserId) {
	global $Conn;
	
	$Sql = "SELECT FROM user WHERE UserId = $UserId";
	return mysqli_query($Conn, $Sql);
}