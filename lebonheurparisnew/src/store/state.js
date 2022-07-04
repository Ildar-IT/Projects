//import config from '../config'

let state = {

    response: {},	// объект ответа от БЕ в чистом виде
    session: {},	// данные текущей сессии
    common: {},			// общие для всех страниц
    page: {},			// индивидуальные для каждой страницы
    currentPage: {},	// текущая страница
    isLoading: false,

    // реактивные размеры экрана
    windowWidth: window.innerWidth,
    windowHeight: window.innerHeight,

    // глобальные параметр хедера
    isHeaderInversed: false,
    isBurgerMenuShown: false,
    headerHeight: 64,

    menuItems: [
        {name: "Our story", to: {name:"home-story"}},
        {name: "Flavours", to: {name:"home-flavours"}},
        {name: "Shop now", to: {name:"shop"}},
        {name: "Special occasion", to: {name:"home-special"}},
        {name: "Our stores", to: {name:"home-stores"}},
        {name: "Partners & franchise", to: {name:"home-partnership"}},
        {name: "Contact us", to: {name:"home-contacts"}},
        {name: "Terms of sale", to: {name:"under"}},
    ],

    currentLanguageCode: "EN",
    languages: [
        {
            code: "EN",
            name: "English language",
        },
        {
            code: "FR",
            name: "Française",
        }
    ],

    swipers: {
        // todo fill correct keys
        /*'collection-slider': null,
        'ambassadors-slider-sm': null,
        'ambassadors-slider-lg': null*/
    },

    isPopupBasket: false,
    isPopupFlavours: false,
    myBoxImages: [
        require('@/assets/box/plus.svg'),
        require('@/assets/box/plus.svg'),
        require('@/assets/box/plus.svg'),
        require('@/assets/box/plus.svg'),
        require('@/assets/box/plus.svg'),
        require('@/assets/box/plus.svg'),
        require('@/assets/box/plus.svg'),
        require('@/assets/box/plus.svg'),
        require('@/assets/box/plus.svg')
    ],

};

export default state;
