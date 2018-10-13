<?php

function Api_Return ($Result) {
	if ($Result && $Result != "Error") {
		return json_encode(array("Error" => false, "Content" => $Result));
	} else {
		return json_encode(array("Error" => true));
	}
}