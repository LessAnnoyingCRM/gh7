<?php

function TestHelloWorld() {
    return(array('Message'=>'Hello World'));
}

function TestS3() {
    $S3Filename = 'test.mp4';
    $LocalFilename = '/tmp/Sample.mp3';
    $Url = _UploadMp4S3($S3Filename,$LocalFilename);

    return(array('FileUrl'=>$Url));
}

