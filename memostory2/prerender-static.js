/*
 *
 *  Пререндер статических страниц, контент которых не зависит от БЕ.
 *  Запускайте через соотв. npm-задачу.
 *
 */
const prerenderWebpack = require("./prerender.webpack.js");

let routes = [
    "/",
    "/contacts",
    "/about",
    "/about/price",
    "/about/design",
    "/about/news",
    "/about/articles",
    "/work-order",
];

module.exports = prerenderWebpack(routes);
