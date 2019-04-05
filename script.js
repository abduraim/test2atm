$(function () {




    // Определяем компонент
    new CarSelectComponent($('.car_select_component'));


    // Скрытие, при любом другом клике
    $(document).on('click', function () {
        rollUpCollapsible();
    });


    // let inputBoxes = $('.input_element');
    //
    // $(inputBoxes).each(function (key, item) {
    //     new InputBox($(item));
    // });


});

// Функция сворачивающая все сворачиваемые элементы страницы (при "свободных" кликах)
var rollUpCollapsible = function () {
    $('.collapsible.open').removeClass('open');
};




let CarSelectComponent = function ($container) {
    let self = this;
    this.$container = $container;

    this.InputMark = new InputBox(this.$container.find('.preselect_element[data-field=car_mark]'));
    this.InputModel = new InputBox(this.$container.find('.preselect_element[data-field=car_model]'));


};



// Component
var InputBox = function ($element) {
    var self = this;

    this.$element = $element;
    this.$input = this.$element.find('input');
    this.$list = this.$element.find('ul.preselect_list');

    // Название свойства в исходном массиве
    this.fieldName = this.$element.data('field');

    // Список Авто
    this.sourceArray = this.getSourceArray();

    // Массив транслитерации
    this.translateAlphabet = this.getTranslateAlphabet();

    // Добавляем переводы в исходный массив
    this.addTranslateValuesToSource();

    // Текущий список подсказок
    this.currentSelectArray = this.sourceArray;

    this.currentSelectLineInListPosition = -1;


    // Обработка ввода
    this.$input.on('change', function (event) {
        console.log($(this).val());
        this.currentSelectLineInListPosition = -1;
    });


    this.$input.on('keydown', function (event) {
        var code = event.keyCode || event.which;
        if (code === 13 && self.currentSelectArray.length) { // enter

            rollUpCollapsible();
            self.currentSelectLineInListPosition = -1;

            // select upper item
            console.log(self.currentSelectArray[self.currentSelectLineInListPosition]);

            // focus on next input
            //$(this).blur();

        } else if (code === 27 && self.currentSelectArray.length) { // esc
            rollUpCollapsible();
        } else if (code === 40 && self.currentSelectArray.length) { // стрелка вниз
            self.$list.addClass('open');
            self.goDownInSelectList();
        } else if (code === 38 && self.currentSelectArray.length) {// стрелка вверх

            self.goUpInSelectList();
        } else {
            //self.showSelectList();
        }
    });

    this.$input.on('keyup', function (event) {
        var code = event.keyCode || event.which;
        if (code !== 13 && code !== 27 && code !== 40 && code !== 38) {
            self.showSelectList();
            self.refreshSelectList();
        }
    });

    this.$input.on('click', function (event) {
        event.stopPropagation();
        self.refreshSelectList();
        self.showSelectList();
    })
};

// Перемещение вниз по списку select'a
InputBox.prototype.goDownInSelectList = function() {

    let allCounts = this.currentSelectArray.length;

    if (this.currentSelectLineInListPosition + 1 >= allCounts) {
        return true;
    } else {
        this.currentSelectLineInListPosition ++;
        this.renderNewCurrentPositionInSeletList();
    }
};

// Перемещение вверх по списку select'a
InputBox.prototype.goUpInSelectList = function() {

    let allCounts = this.currentSelectArray.length;

    if (this.currentSelectLineInListPosition <= 0) {
        rollUpCollapsible();
        this.currentSelectLineInListPosition = -1;
        return true;
    } else {
        this.currentSelectLineInListPosition --;
        this.renderNewCurrentPositionInSeletList();
    }

};

// Рендер текущего положения в списке
InputBox.prototype.renderNewCurrentPositionInSeletList = function() {
    // Снимаем со всех выделение
    this.$list.find('li').removeClass('selected');

    // Находим текущий элемент списка и выделяем его
    let $currentLi = $(this.$list.find('li')[this.currentSelectLineInListPosition]);

    // Определяем позицию выделения (чтобы оно всегда было в видимой части)
    let liTopPos = $currentLi.position().top;
    let scrollPos = this.$list.scrollTop();
    let liHeight = $currentLi.outerHeight();
    let listHeight = this.$list.outerHeight();

    if (liTopPos + liHeight > listHeight) {
        this.$list.scrollTop(scrollPos + liHeight);
    }
    if (liTopPos < 0) {
        this.$list.scrollTop(scrollPos - liHeight);
    }


    $currentLi.addClass('selected');
    this.$input.val($currentLi.text());
};

// Получить входящий список вариантов
InputBox.prototype.getSourceArray = function () {
    let str = {
        1: {
            'car_mark': 'audi',
            'car_model': 'spectra',
            'car_type': 'легковой',
        },
        2: {
            'car_mark': 'уаз',
            'car_model': '2101',
            'car_type': 'джип',
        },
        3: {
            'car_mark': 'alfa romeo',
            'car_model': 'ceed',
            'car_type': 'кроссовер',
        },
        4: {
            'car_mark': 'волга',
            'car_model': '5510',
            'car_type': 'легковой',
        },
        5: {
            'car_mark': 'kia',
            'car_model': 'elantra',
            'car_type': 'кроссовер',
        },
        6: {
            'car_mark': 'Уаз',
            'car_model': 'Патриот',
            'car_type': 'джип',
        },
        7: {
            'car_mark': 'иж',
            'car_model': 'москвич',
            'car_type': 'легковой',
        },
        8: {
            'car_mark': 'Волга-Аккорд',
            'car_model': '4333',
            'car_type': 'легковой',
        },
        9: {
            'car_mark': 'audi',
            'car_model': 'asdfasdf',
            'car_type': 'легковой',
        },
    };
    return str;
};

// Добавляем "неправильные" значения в массив для будущего сравнения с вводом
InputBox.prototype.addTranslateValuesToSource = function() {
    for (car in this.sourceArray) {
        this.sourceArray[car][this.fieldName + '_trans'] = this.getTranslate(this.sourceArray[car][this.fieldName]);
    }
    console.log(this.sourceArray);
};

// Возвращает переведенное слово
InputBox.prototype.getTranslate = function(inputStr) {
    let outputStr = '';

    inputStr = inputStr.toUpperCase();

    for (let i = 0; i < inputStr.length; i ++) {
        let isCatch = false;
        this.translateAlphabet.forEach(function (translateLetter) {

            for (key in translateLetter) {
                if (key == inputStr.charAt(i)) {
                    outputStr += translateLetter[key];
                    isCatch = true;
                } else if (translateLetter[key] == inputStr.charAt(i)) {
                    outputStr += key;
                    isCatch = true;
                }
            }
        });
        if (!isCatch) {
            outputStr += inputStr.charAt(i);
        }
    };

    return outputStr;
};

// Возвращает массив соответствия клавиш
InputBox.prototype.getTranslateAlphabet = function () {
    return [
        {' ': ' '},

        {'0': '0'},
        {'1': '1'},
        {'2': '2'},
        {'3': '3'},
        {'4': '4'},
        {'5': '5'},
        {'6': '6'},
        {'7': '7'},
        {'8': '8'},
        {'9': '9'},

        {'Q': 'Й'},
        {'W': 'Ц'},
        {'E': 'У'},
        {'R': 'К'},
        {'T': 'Е'},
        {'Y': 'Н'},
        {'U': 'Г'},
        {'I': 'Ш'},
        {'O': 'Щ'},
        {'P': 'З'},
        {'{': 'Х'},
        {'}': 'Ъ'},
        {'A': 'Ф'},
        {'S': 'Ы'},
        {'D': 'В'},
        {'F': 'А'},
        {'G': 'П'},
        {'H': 'Р'},
        {'J': 'О'},
        {'K': 'Л'},
        {'L': 'Д'},
        {':': 'Ж'},
        {';': 'Ж'},
        {'"': 'Э'},
        {"'": 'Э'},
        {'Z': 'Я'},
        {'X': 'Ч'},
        {'C': 'С'},
        {'V': 'М'},
        {'B': 'И'},
        {'N': 'Т'},
        {'M': 'Ь'},
        {'<': 'Б'},
        {',': 'Б'},
        {'>': 'Ю'},
        {'.': 'Ю'},
        {'?': ','},
        {'/': '.'},
    ];
};

// Показ выпадающего списка
InputBox.prototype.showSelectList = function () {
    this.$list.addClass('open');
};

// Обновление состава выпадающего списка
InputBox.prototype.refreshSelectList = function() {
    // Определяем введеное значение
    let strInput = this.$input.val().toUpperCase();

    // Получаем соответствующий список
    this.currentSelectArray =  this.getEqualsList(strInput);

    // Очищаем список
    this.$list.empty();

    // Рендерим новый список
    this.renderSelectList();
};

// Возвращает массив соответствующих значений
InputBox.prototype.getEqualsList = function (strInput) {

    let outputArray = [];

    for (car in this.sourceArray) {
        if (this.sourceArray[car][this.fieldName].toUpperCase().indexOf(strInput) != -1 || this.sourceArray[car][this.fieldName + '_trans'].indexOf(strInput) != -1) {
            outputArray.push(this.sourceArray[car]);
        }
    };

    return outputArray;
};

// Рендерит список с результатами соответствия
InputBox.prototype.renderSelectList = function () {

    let $list = this.$list;
    let self = this;

    $(this.currentSelectArray).each(function (key, item) {
        let $li = $('<li>', {'class': 'preselect_item', 'data-id': 11}).text(item[self.fieldName]).appendTo($list);

        // Обработка клика по одному из вариантов
        $li.on('click', function (event) {
            self.$input.val($(this).text());
            self.$input.trigger('change');
        });
    });

};

// Окончательный выбор значения
InputBox.prototype.selValue = function () {
    console.log();
};
