import Config from "@/config";
const getters = {
    windowHeight(state) {
        return state.windowHeight;
    },
    isWindowXS(state) {
      return state.windowWidth < Config.WIDTH_SM;
    },
    isWindowSM(state) {
      return state.windowWidth >= Config.WIDTH_SM;
    },
    isWindowMD(state) {
      return state.windowWidth >= Config.WIDTH_MD;
    },
    isWindowLG(state) {
      return state.windowWidth >= Config.WIDTH_LG;
    },
    isWindowXL(state) {
      return state.windowWidth >= Config.WIDTH_XL;
    },
} 
export default getters;