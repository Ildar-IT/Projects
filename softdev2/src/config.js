export default {
    //API_DEFAULT_ACTION: '/api/Form',

    STORAGE_AUTH_TOKEN: "auth",
    STORAGE_PROP_ORDER_HASH: "orderHash",
    STORAGE_PROP_USER_ID: "userId",

    API_EXCEPTION_NOT_FOUND: 'NOT_FOUND',
    API_EXCEPTION_FORBIDDEN: 'FORBIDDEN',
    API_EXCEPTION_EXISTS :'EXISTS',

    SUBSCRIPTION_URL: "/api/Subscribe",
    SUBMIT_URL: "/api/SubmitAmbassador",

    //in _variables.scss, config.js and plugins/vuetify.js
    ERROR_CODE_FORBIDDEN: "403",
    ERROR_CODE_NOT_FOUND: "404",
    ERROR_CODE_EXISTS: "EXISTS",
    ERROR_CODE_WRONG_PARAMS: "WRONG_PARAMS",

    //in _variables.scss, config.js and plugins/vuetify.js

    WIDTH_SM: 768,
    WIDTH_MD: 1184,
    WIDTH_LG: 1704,

    LANGUAGE_CODE_EN: "en",
    LANGUAGE_CODE_RU: "ru",

    LANGUAGES: [
        {name: 'English', url: '/', shortName: 'En', code: "en"},
        // {name: 'Русский', url: '/', shortName:'Ру', code: "ru"}
    ],

    MAPBOX: {
        accessToken: "pk.eyJ1IjoicGxheW5leHQiLCJhIjoiY2w0NGdhcXJqMDJ3ODNjcGp6cmRud3Z5cCJ9.pnR1Kl5gpu8tCXQPyY6S3Q",
        style: "mapbox://styles/playnext/cl3ujogub002z15penxokhxmo",
    }
}