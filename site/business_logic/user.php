<?php

function GetUser ($UserId) {
	global $Conn;
	$Sql = "SELECT * FROM user WHERE UserId = $UserId";
	$Result = mysqli_query($Conn, $Sql);
	return Mysql_GetAssocArray($Result);
}




?>