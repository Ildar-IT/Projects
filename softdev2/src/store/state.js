import Config from "@/config";

let state = {

    // данные из БЕ - переустанавливаются при каждом fetchPage
    response: {},	// объект ответа от БЕ в чистом виде
    session: {},	// данные текущей сессии

    page: {},			// индивидуальные для каждой страницы
    currentPage: {},	// текущая страница
    common: {},

    isBurgerMenuShown: false,
    currentLanguageCode: Config.LANGUAGE_CODE_RU,

    windowWidth: window.innerWidth,
    windowHeight: window.innerHeight,

    aosDelay: 100,
    menuLangActive: false,


    swipers: {
        'our-projects': null
    },

}
export default state;