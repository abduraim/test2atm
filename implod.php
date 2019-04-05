<?php

$input = [
    'asdf' => 123,
    'qwer' => 234,
    'zxcvx' => [
        'jkl' => 432,
        'oiu' => 321,
    ]
];

$output = json_encode($input);

echo $output;