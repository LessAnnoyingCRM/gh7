<?php

function GetUser ($UserId) {
	global $Conn;
	$Sql = "SELECT * FROM user WHERE UserId = $UserId";
	$Result = Mysqlx_Query($Sql);
	return Mysql_GetAssocArray($Result);
}




?>