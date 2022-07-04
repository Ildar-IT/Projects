import config from "@/config";

const getters = {

	page(state) {
		return state.page;
	},
	windowHeight(state) {
		return state.windowHeight;
	},
	/*
	* isWindowXS работает только для моб экрана, остальные геттеры по нарастанию
	* */
	isWindowXS(state) {
		return state.windowWidth < config.WIDTH_SM;
	},
	isWindowSM(state) {
		return state.windowWidth >= config.WIDTH_SM;
	},
	isWindowHeaderMD(state) {
		return state.windowWidth >= config.HEADER_MD;
	},
	isWindowMD(state) {
		return state.windowWidth >= config.WIDTH_MD;
	},
	isWindowLG(state) {
		return state.windowWidth >= config.WIDTH_LG;
	},
	isWindowXL(state) {
		return state.windowWidth >= config.WIDTH_XL;
	},
	isEmailNotValidated(state) {
		return !!((state.session?.user?.UF_EMAIL_CONFIRMED == 0 || !state.session?.user?.UF_EMAIL_CONFIRMED) && state.session?.user?.EMAIL)
	},
	isPhoneNotValidated(state) {
		return state.session?.user?.LOGIN !== state.session?.user?.PHONE_NUMBER;
	}
};
export default getters;