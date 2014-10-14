<?php
function error($message, $type = 'json') {
    if ($type == 'json') {
        echo json_encode([
            'error'   => true,
            'message' => $message
        ]);
    }else{
        echo $message;
    }
    exit;
}

function success($message, $type = 'json') {
    if ($type == 'json') {
        echo json_encode([
            'error'   => false,
            'message' => $message,
        ]);
    }else{
        echo $message;
    }
    exit;
}

$image    = isset($_FILES['image']) ?: [];
$language = isset($_POST['language']) ?: '';

if (empty($image) === true) {
    error('Please enter image');
}

if (empty($language) === true) {
    error('Please enter language');
}

move_uploaded_file($_FILES['image']['tmp_name'], dirname(__FILE__).'/attachment/'.$_FILES["image"]["name"]);

success('Text: IP-NDCM2C36', 'txt');
