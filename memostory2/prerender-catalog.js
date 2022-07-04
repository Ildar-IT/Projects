/*
 *
 *  Пререндер рубрик каталога и товаров.
 *  Настраивается дополнительно через аргумент env.URL_CODE.
 *  Запускайте через соотв. npm-задачу.
 *
 */
const prerenderWebpack = require("./prerender.webpack.js");
const Config = require("./prerender.config.js");

const URL_CODE = process.env.URL_CODE ? process.env.URL_CODE : "catalog";
console.log('Requesting catalog URLs, mode: '+URL_CODE);

// запросить список URL для пререндеринга:
const url = Config.SERVER_URI + "/api/PrerenderURLs/";
let routes = [];	// по умолчанию в спике только главная страница

try {
    const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                console.log("response: ",xhr.responseText);
                let res = JSON.parse(xhr.responseText);
                //console.log("response: ",prerenderRoutes);
                if (res.result && res.result.urls) routes = res.result.urls;
            } else
                throw "Ошибка при запросе " +
                url +
                ", HTTP status: " +
                xhr.status;
        }
    };
    console.log("Запрашиваем: ", url);
    xhr.open("POST", url, false);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify({"code": URL_CODE}));
} catch (e) {
    throw "Ошибка: " + e;
}

if ( !routes.length ) {
    console.log("No routes to render");
    process.exit();
}
module.exports = prerenderWebpack(routes);