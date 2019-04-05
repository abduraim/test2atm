<?php





$a = ['#', 'Name', 'Sum'];

// Заголовки
foreach (range('A', 'Z') as $key => $char) {
    echo $char . $key + 1  . ' - ' . $a[$key] . "\n";
}


