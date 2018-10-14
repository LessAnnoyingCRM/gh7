<?php
  require __DIR__ . '../external_libraries/vendor/autoload.php';

  $options = array(
    'cluster' => 'us2',
    'useTLS' => true
  );
  $pusher = new Pusher\Pusher(
    'e92e3453fcbbd00cd48e',
    'fa49d3419be2baeaf173',
    '621532',
    $options
  );

  $data['message'] = 'hello world';
  $pusher->trigger('my-channel', 'my-event', $data);
?>