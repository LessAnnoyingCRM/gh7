<?php

$OutputText= '';
$OutputText .= '$_REQUEST:'."\n";
$OutputText .= print_r($_REQUEST,true)."\n\n";
$OutputText .= '$_FILES:'."\n";
$OutputText .= print_r($_FILES,true)."\n\n";
$OutputText .= '$_HTTP_POST_FILES:'."\n";
$OutputText .= print_r($HTTP_POST_FILES,true)."\n\n";

if ($_FILES) {
    foreach	($_FILES as $File) {
        echo('saving '.$File['tmp_name']);
        `cp $File[tmp_name] /tmp/save`;
    }
}

$out = '/tmp/'.round(microtime(true) * 1000);
$file = fopen($out,'w');
fwrite($file, $OutputText);
fclose($file);