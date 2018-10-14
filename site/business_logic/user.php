<?php

function GetUser ($Parameters,$UserId) {
    $LookupUserId = @$Parameters['UserId'] ?? $UserId;
    return _GetUser($LookupUserId);
}


function _GetUser ($UserId) {
	$Sql = "SELECT * FROM user WHERE UserId = $UserId";
	$Result = Mysqlx_Query($Sql);
	return Mysql_GetAssoc($Result);
}

