<?php

//PHP settings
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

//frameworks
include_once('./api_framework.php');
include_once('./mysql_framework.php');

//business logic
include_once('../business_logic/user.php');