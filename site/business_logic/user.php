<?php

function GetUser ($UserId) {
	$Sql = "SELECT * FROM user WHERE UserId = $UserId";
	$Result = Mysqlx_Query($Sql);
	return Mysql_GetAssocArray($Result);
}

