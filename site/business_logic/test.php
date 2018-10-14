<?php

function TestHelloWorld() {
    return(array('Message'=>'Hello World'));
}

function TestS3() {

    if ($_FILES) {
        $FileInfo = array_pop($_FILES);
        $S3Filename = $FileInfo['name'];
        $LocalFilename = $FileInfo['tmp_name'];
        $FileType = $FileInfo['type'];
        $Url = _UploadMp4S3($S3Filename,$LocalFilename,$FileType);
        return(array('FileUrl'=>$Url));
    }
    else{
        return array();
    }
}

