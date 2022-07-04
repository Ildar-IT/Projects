import store from "@/store/index";
const mutations = {
    updateWindowWidth: (state) => {
        state.windowWidth = window.innerWidth;
    },
    updateWindowHeight: (state) => {
        state.windowHeight = window.windowHeight;
    }
}
export default mutations;