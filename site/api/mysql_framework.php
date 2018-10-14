<?php 

$Conn = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE);

function Mysql_GetAssocArray ($MysqlResult, $IndexName = false) {
	$DataArray = array();
	while ($Row = mysqli_fetch_assoc($MysqlResult)) {
		if ($IndexName) {
			$DataArray[$Row[$IndexName]] = $Row;
		} else {
			$DataArray[] = $Row;
		}
	}
	return $DataArray;
}

function Mysql_GetAssoc ($MysqlResult, $IndexName = false) {
    $DataArray = array();
    $Row = mysqli_fetch_assoc($MysqlResult);
    return $Row;
}

function Mysql_GetLastCreatedId ($IndexId) {
	global $Conn;
	try {
		if (!mysqli_affected_rows($Conn)) return "Error";
		return array("$IndexId" => mysqli_insert_id($Conn));
	} catch (Error $e) {
		return "Error";
	}
}

function Mysqlx_Query($Sql) {
	global $Conn;
	try {
		$Result = mysqli_query($Conn, $Sql);
		if ($Result === true) {
			return array();
		}
		return $Result;
	} catch (Exception $e) {
		error_log($e->getMessage());
		return "Error";
	}
}