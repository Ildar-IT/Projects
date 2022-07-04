import config from '@/config'

let state = {
    // данные из БЕ - переустанавливаются при каждом fetchPage
    response: {},	// объект ответа от БЕ в чистом виде
    session: {},	// данные текущей сессии
    common: {
        premiumPopUpDialog: false,
    },			// общие для всех страниц
    page: {},			// индивидуальные для каждой страницы
    currentPage: {},	// текущая страница

    // TODO здесь этот справочник временно - перенести в БЕ
    templateCards: [ //это что?
        {
            NAME: 'ЗВЕЗДЫ',
            PICTURE: require('@/assets/ЗВЕЗДЫ.png'),
            link: '',
            type: 'STICKER',
            btn: 'Скачать макет',
            isPremium: false
        },
        {
            NAME: 'КРУГИ',
            PICTURE: require('@/assets/КРУГИ.png'),
            link: '',
            type: 'CARD',
            btn: 'Скачать макет',
            isPremium: true
        },
/*        {
            NAME: 'Тейбл-тент',
            PICTURE: require('@/assets/Тейблтент.jpg'),
            link: '',
            type: 'TABLETENT',
            btn: 'Скачать макет',
            isPremium: true
        },*/
    ],

    statPeriods: [
        {name: 'За сегодня', number: 1, isPremium: false},
        //{name: 'За последние 7 дней', number: 7, isPremium: false},
        //{name: 'За последние 30 дней', number: 30, isPremium: false},
         {name: 'За эту неделю', number: -1, isPremium: false},
         {name: 'За этот месяц', number: -2, isPremium: false},
         {name: 'За этот год', number: -3, isPremium: false}
    ],

    // авторизация отправляет смски, здесь хранится время последней такой отправки (для блокировки частых отправок)
    lastAuthSMSSentAt: null,

    isMenuOpen: false,  // показано ли мобильное меню
    message: null, // параметры глобального диалога - удобно для системных сообщений/ошибок
    alert: null, // параметры глобального алерта - удобно для системных сообщений/ошибок

    // реактивные размеры экрана
    windowWidth: window.innerWidth,
    windowHeight: window.innerHeight,
    // TODO: is these used?
    //phone: '+7',
    //email: '',
};

export default state;
