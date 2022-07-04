import config from "../config";

const getters = {


    /*
    * isWindowXS работает только для моб экрана, остальные геттеры по нарастанию
    * */
    isWindowXS(state) {
        return state.windowWidth < config.WIDTH_SM;
    },
    isWindowSM(state) {
        return state.windowWidth >= config.WIDTH_SM;
    },
    isWindowMD(state) {
        return state.windowWidth >= config.WIDTH_MD;
    },
    isWindowLG(state) {
        return state.windowWidth >= config.WIDTH_LG;
    },



};
export default getters;
