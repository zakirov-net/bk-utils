# Утилиты для БК-0010(-01), БК-0011(М)

Однофайловые приложения, работающие прямо в браузере (даже в IE11!), призванные помочь в работе с советскими компьютерами серии БК.

## Конвертер .bin-файлов БК в .wav-файлы для загрузки через магнитофонный вход (wav-converter.html)

Собственно, из названия все понятно: берем .bin-файл с БКшной программой, выставляем нужные параметры и получаем звуковой файл, который можно подать на магнитофонный вход БК и загрузить программу в компьютер. Алгоритм разработан Manwe/SandS, размещено здесь: http://thesands.ru/bk0010/wav-converter/  

## Конвертирование картинки для БК (png, gif) в ассемблерный код (image-to-asm.html)

Конвертер сделан по заказу Adam Bazaroff, помогает преобразовывать картинку, нарисованную в Photoshop с соблюдением палитры БК, в ассемблерный код (данные). Можно обрезать картинку, делая спрайт нужного размера. В этой утилитке попробовал использовать Vue.js, знаю, что кривовато, и вообще еще предстоит сильно причесать код и разбить на компоненты.

## Сборка

На данный момент код конвертера картинок собирается из typescript-файлов. Поэтому, если есть желание что-то исправить, сначала устанавливаем Node.js, затем в корне проекта набираем:
```
npm install
``` 
И ждем окончания установки пакетов. Затем для сборки js запускаем команду:
```
npm run build
```
Или для автоматической сборки после редактирования:
```
npm run watch
```

## TODO

- Нормально задокументировать код
- Перевести весь код на typescript
- Написать новые утилиты и доработать функционал существующих :)

Мой сайт: www.zakirov.net

Предложения и замечания - на e-mail: lenar@zakirov.net