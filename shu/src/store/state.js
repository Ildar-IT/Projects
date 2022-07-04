
let state = {

    // данные из БЕ - переустанавливаются при каждом fetchPage
    response: {},	// объект ответа от БЕ в чистом виде
    session: {},	// данные текущей сессии

    page: {},			// индивидуальные для каждой страницы
    currentPage: {},	// текущая страница
    common: {},

    windowWidth: window.innerWidth,
    windowHeight: window.innerHeight,

    aosDelay: 100,

    swipers: {
        'insta-shu': null,
        'NewItems' : null,
        'PopularItems' : null,
        'ProductPage' : null
    },

    isMenuOpen: false,

    activeSelectId: null
}
export default state;