# Модуль валидации форм

Этот модуль предоставляет комплексное решение для валидации форм в вашем приложении. Он включает различные типы валидации, настраиваемые сообщения и интеграцию с UI-компонентами.

## Типы валидации

Модуль поддерживает следующие типы валидации:

- `text`: Базовая валидация текстового ввода с минимальной длиной
- `matrix`: Валидация ввода на основе заранее заданного шаблона
- `email`: Валидация формата электронной почты
- `phone`: Валидация номера телефона с требованием длины
- `checkbox`: Валидация флажка
- `select`: Валидация выпадающего списка
- `toggle-group`: Валидация группы переключателей (как радиокнопки)
- `file`: Валидация загрузки файла с ограничением размера
- `custom-upload`: Пользовательская валидация загрузки файла
- `custom-example`: Пример пользовательской валидации

## Атрибуты

### Контейнер формы

- `data-form-validate`: Помечает контейнер формы для валидации
- `data-parent-validate`: Указывает тип валидации для контейнера формы
- `data-message-base`: Основное сообщение об ошибке для формы
- `data-message-extra`: Дополнительное сообщение об ошибке для формы
- `data-callback`: Указывает функцию обратного вызова, которая будет вызвана после отправки формы

### Контейнеры полей

- `data-validate-type`: Указывает тип валидации для поля
- `data-required`: Помечает поле как обязательное
- `data-on-input-validate`: Включает валидацию при вводе
- `data-limitation`: Указывает шаблон ограничения для поля (digits, letters, letters-and-digits, cyrillic, latin)
- `data-matrix`: Указывает шаблон матрицы для валидации матрицы
- `data-matrix-limitation`: Указывает шаблон ограничения для валидации матрицы
- `data-phone-length`: Указывает минимальную длину для валидации номера телефона
- `data-max-size`: Указывает максимальный размер файла для валидации загрузки файла
- `data-message-base`: Основное сообщение об ошибке для поля
- `data-message-extra`: Дополнительное сообщение об ошибке для поля
- `data-message-success`: Сообщение об успешной валидации для поля

## Примеры

### Базовый текстовый ввод

```pug
+field-text(
  name='username',
  label='Username',
  required=true,
  validateType='text',
  minlength='3',
  messageBase='Username is required',
  messageExtra='Имя пользователя должно содержать не менее 3 символов'
)
```

### Ввод электронной почты

```pug
+field-text(
  name='email',
  label='Email',
  required=true,
  validateType='email',
  messageBase='Email is required',
  messageExtra='Пожалуйста, введите действительный адрес электронной почты'
)
```

### Ввод номера телефона

```pug
+field-text(
  name='phone',
  label='Phone',
  required=true,
  validateType='phone',
  phoneLength='10',
  messageBase='Phone number is required',
  messageExtra='Номер телефона должен содержать не менее 10 цифр'
)
```

### Флажок

```pug
+field-checkbox(
  name='terms',
  label='I agree to the terms and conditions',
  required=true,
  validateType='checkbox',
  messageBase='Вы должны согласиться с условиями'
)
```

### Выпадающий список

```pug
+custom-select(
  name='country',
  label='Country',
  required=true,
  validateType='select',
  messageBase='Пожалуйста, выберите страну'
)
```

### Загрузка файла

```pug
+field-file(
  name='resume',
  label='Resume',
  required=true,
  validateType='file',
  maxSize='5242880',
  messageBase='Please upload your resume',
  messageExtra='Размер файла должен быть меньше 5 МБ'
)
```

## Интеграция с UI-компонентами

Модуль разработан для беспроблемной работы с следующими UI-компонентами:

- `field-text`: Поле ввода текста
- `field-checkbox`: Поле флажка
- `custom-select`: Пользовательский выпадающий список
- `field-file`: Поле загрузки файла

Каждый из этих компонентов может быть использован с модулем валидации формы, указав соответствующий атрибут `data-validate-type`.

## Обратные вызовы

Модуль поддерживает функции обратного вызова для отправки формы. Вы можете указать функцию обратного вызова, используя атрибут `data-callback` на контейнере формы. Функция обратного вызова будет вызвана после валидации и отправки формы.

### Пример функции обратного вызова

```javascript
const callbacks = {
  base: {
    reset: true,
    resetTimeout: 500,
    successCallback: (event) => {
      console.log('Форма успешно отправлена');
    },
    errorCallback: (event) => {
      console.log('Отправка формы не удалась');
    }
  }
};
```

## Инициализация

Для инициализации модуля валидации формы необходимо создать экземпляр класса `Form` и вызвать метод `init`.

```javascript
import {Form} from './modules/form-validate/form';

const form = new Form();
window.form = form;
form.init();
