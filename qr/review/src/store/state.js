let state = {
	// основной обхект ответа от БЕ
	response: {},

	// текущая сессия - выставляется после успешной авторизации (setSession)
	// TODO: по-хорошему, это должно переустанавливаться при каждом fetchPage
	session: {
		user: '',
		authToken: null,
	},

	// данные из БЕ
	common: {},			// общие для всех страниц
	page: {},			// индивидуальные для каждой страницы
	currentPage: {},	// текущая страница






	// todo ---------- check if this is needed	(all below) ----------------
	layoutSwiper:null,
	fullscreenSlider: null,
	windowWidth: window.innerWidth,
	windowHeight: window.innerHeight,
};

export default state;
