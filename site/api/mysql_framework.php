<?php 

$Conn = mysqli_connect('192.168.33.16', 'gh7', 'globalhacrm', 'local');

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