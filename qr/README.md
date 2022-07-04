# qr

## субпроекты
*qritic-review* = сервис qritic.ru (frontend) = qritic.ru<br>
*qritic-account* = личный кабинет сервиса qritic.ru (frontend) = my.qritic.ru<br>
*review* = сервис qr-feedback (frontend) = qrfb.ru<br>
*account* = личный кабинет сервиса qr-feedback (frontend) = my.qrfb.ru<br>
*vcard* = сервис qr-vcard (frontend) = qr-vcard.ru<br>
*vcard-account* = личный кабинет пользователя сервиса qr-vcard (frontend) = my.qr-vcard.ru<br>
*tag* = сервис qr-tag (frontend) = qr-tag.ru<br>
*tag-account* = личный кабинет пользователя сервиса qr-tag (frontend) = my.qr-tag.ru<br>
*api* = общий backend<br> 

## Запуск для девелопмента
Важно вначале настроить адрес бэкенда в .env.local в папке субпроекта.
```
SERVER=http://qr.es.dev.playnext.net/
#SERVER=https://qrfb.ru/
```
Затем, как обычно: 
```
cd <subproject-frontend-folder>
npm install
npm run serve
```

## Релиз
Как обычно, необходимо в папку htdocs разместить ссылки на bitrix + upload, затем:
```
cd <subproject-frontend-folder>
npm install
npm run build
cd ../api
php ~/composer.phar install
```

## Важные ссылки и внешние аккаунты
Проект qr-vcard связан с Google Pay API for Passes.
Пользователь: appdev@playnext.ru
Консоль Google Cloud: https://console.cloud.google.com/
Консоль Google Pay Merchant Center: https://pay.google.com/gp/m/u/3/issuer/list
