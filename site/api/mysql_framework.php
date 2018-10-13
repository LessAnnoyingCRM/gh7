<?php 

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