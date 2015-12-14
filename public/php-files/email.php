<?php  
	$subscriber_email = $_POST["email"];
    $subscriber_list = "subscriber-list.txt";

    $filehandler = fopen($subscriber_list, 'a');
    $full_subscriber_email = $subscriber_email . "\n";
    fwrite($filehandler, $full_subscriber_email);
    fclose($filehandler);
?>