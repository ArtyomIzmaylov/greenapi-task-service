# README #

### Instalation  
1) Клонировать репозиторий git clone git@gitlab.lenvendo.ru:product/project/kamaz/backend/app/kamaz_backend.git
2) Скопировать из корня приложения файл окружения cp .env.sample .env установить необходимые параметры

| Описание                                      | Значение | require | default  |
|-----------------------------------------------|----------|---------|----------|
| Имя приложения                                |     APP_NAME     | true    | greenapi |
| Имя микросервиса M1                           |      APP_M1    | true    | M1       |
| Имя микросервиса M2                           |       APP_M2   | true    | M2       |
| Очередь для расчета                           |      QUEUE_CALCULATE    | true    |  queue.calculate        |
| Очередь результата                            |      QUEUE_RESULT    | true    |     queue.result     |
| Порт сервиса M1                               |        PORT_M1  | true    |    8080      |
| URL, по которому можно подключитсья к кролику |        RABBIT_URL  | true    |      amqp://rabbitmq    |
|                                               |          |         |          |
3) Поднять окружение make up
4) Сделать POST-запрос по следующему эндпоинту:
* localhost:8080/api/sendMessage(по умолчанию)
* порт будет другим, если вы меняли env-переменную PORT_M1
* В body нужно передать:
  {
  "calcNumber" : "100"
  }
  вместо 100, можете другое число.
* В headers нужно передать заголовок с ключом "X-Request-ID"(к примеру "X-Request-ID" : d41afd82-22a4-4299-a68f-e320b665c2d3, в качестве значения использует UID - все это нужно для идемпотености сообщения)

5) Как результат получите ответ,в котором как раз будет X-Request-ID, и увеличенный вдвое переданный параметр calcNUmber
