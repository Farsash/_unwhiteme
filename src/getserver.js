const folder = '1';

function To_send(){
    this.box_report = { '1': 0,'2': 0,'3': 0,'4': 0,'5': 0,'6': 0 };
    this.send = function(){

        console.log('Отправка данных')

        // создать объект для формы
        let formData = new FormData();
        formData.append("1", this.box_report['1']);
        formData.append("2", this.box_report['2']);
        formData.append("3", this.box_report['3']);
        formData.append("4", this.box_report['4']);
        formData.append("5", this.box_report['5']);
        formData.append("6", this.box_report['6']);

        // отослать
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "/edit");
        xhr.send(formData);


    }
}

var xhr = new XMLHttpRequest();

// 2. Конфигурируем его: GET-запрос на URL 'phones.json'
xhr.open('GET', '/edit', false);

// 3. Отсылаем запрос
xhr.send();

// 4. Если код ответа сервера не 200, то это ошибка
if (xhr.status != 200) {
  // обработать ошибку
  alert( xhr.status + ': ' + xhr.statusText ); // пример вывода: 404: Not Found
} else {
  // вывести результат
  console.log( xhr.responseText ); // responseText -- текст ответа.
}




export {folder, To_send}