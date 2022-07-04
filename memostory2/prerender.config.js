module.exports = {
    // ставьте true для отладки и запуска полноценного хромиум браузера, false - для продакшена
    WITH_RENDERER_DEBUG: false,

    // для рендеринга нужна абсолютная ссылка на API - устанавливатся через env (см. package.json scripts):
    SERVER_URI: process.env.SERVER_URI ? process.env.SERVER_URI : "https://packhouse.ru",

    COUNTERS_HEADER: [
        "<!-- Google Tag Manager -->\n" +
        "<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':\n" +
        "new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],\n" +
        "j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=\n" +
        "'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);\n" +
        "})(window,document,'script','dataLayer','GTM-TVZ525D');</script>\n" +
        "<!-- End Google Tag Manager -->"
    ],
    COUNTERS_BODY_START: [
        "<!-- Google Tag Manager (noscript) -->\n" +
        "<noscript><iframe src=\"https://www.googletagmanager.com/ns.html?id=GTM-TVZ525D\"\n" +
        "height=\"0\" width=\"0\" style=\"display:none;visibility:hidden\"></iframe></noscript>\n" +
        "<!-- End Google Tag Manager (noscript) -->"
    ],
    COUNTERS_FOOTER: [
        ""
    ]
}
