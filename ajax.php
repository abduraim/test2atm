<?php


if (isset($_REQUEST['get_car_marks'])) {
    $result = [
        ['car_mark' => 'Toyota'],
        ['car_mark' => 'BMW'],
        ['car_mark' => 'Jeep'],
        ['car_mark' => 'Mercedes'],
        ['car_mark' => 'Жигули'],
        ['car_mark' => 'Иж'],
        ['car_mark' => 'Волга'],
        ['car_mark' => 'УАЗ'],
    ];

//    $result['success'] = true;

    exit(json_encode($result));
}


if (isset($_REQUEST['get_car_models'])) {

    if (isset($_REQUEST['car_mark'])) {

        // Делаем выборку моделей определенной марки и возвращаем результат
        $result = [
            ['car_model' => 'Camry', 'car_type' => 'Легковой'],
            ['car_model' => 'Spectra', 'car_type' => 'Кроссовер'],
            ['car_model' => '2101', 'car_type' => 'Минивэн'],
            ['car_model' => '4510', 'car_type' => 'Кроссовер'],
            ['car_model' => 'Civic', 'car_type' => 'Минивэн'],
            ['car_model' => 'Prado', 'car_type' => 'Легковой'],
            ['car_model' => 'Pajero', 'car_type' => 'Кроссовер'],
            ['car_model' => 's500', 'car_type' => 'Минивэн'],
            ['car_model' => 'GLK', 'car_type' => 'Легковой'],
        ];

        // Возвращаем результат
        exit(json_encode($result));
    }
}





