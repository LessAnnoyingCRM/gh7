<?php

function GetMatches ($UserId) {
	$User = GetUser($UserId);

	if($User['IsHost'])
		$Sql = "SELECT * FROM match WHERE HostId = $UserId";
	} else {
		$Sql = "SELECT * FROM match WHERE GuestId = $UserId";
	}
	
	return mysqli_query($Conn, $Sql);
}
