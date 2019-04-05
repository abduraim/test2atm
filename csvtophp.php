<?php

//str_getcsv(file_get_contents('csv.csv'), ',', "'");

$csv = array_map('str_getcsv', file('csv.csv'));

$fp = fopen('output.txt', 'a');
foreach ($csv as $item) {
    $str = "['cars_mark' => '$item[0]', 'cars_model' => '$item[1]', 'cars_type' => '$item[4]', 'cars_type_full' => '$item[2]', 'cars_type_2atm' => '$item[3]' ],\r";
    fwrite($fp, $str);
}
fclose($fp);
//file_put_contents('output.txt', $str);






//file_put_contents('output.txt', print_r($csv, true));

//print_r($csv);