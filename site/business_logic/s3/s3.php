<?php
require('aws.phar');
require_once('config.php');
use Aws\S3\S3Client;

# AWS credentials must be defined in config.php


$S3Filename = 'test.mp4';
$LocalFilename = '/tmp/Sample.mp3';
$Url = UploadMp4S3($S3Filename,$LocalFilename);

echo "$Url\n";


function UploadMp4S3($S3Filename,$LocalFilename,$ContentType = 'audio/mpeg') {

    $S3 = new Aws\S3\S3Client([
        'version' => '2006-03-01',
        'region' => 'us-east-1',
        'credentials' => [
            'key'    => AWS_KEY,
            'secret' => AWS_SECRET,
        ]
    ]);

    $Result = $S3->putObject([
        'Bucket' => 'gh7',
        'ACL' => 'public-read',
        'Key' => $S3Filename,
        #'ContentDisposition' => ,
        #'ContentEncoding' => ,
        #'ContentType' => $ContentType,
        #'Body' => <string || resource || Psr\Http\Message\StreamInterface>,
        'SourceFile' => $LocalFilename,

    ]);

    return($Result->get('ObjectURL'));

}

