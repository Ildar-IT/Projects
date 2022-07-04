import Vue from 'vue';
import config from "../config";
import headful from "headful";
import router from '../router/index';
import store from "@/store/index";

const mutations = {
	setResponse: (state, payload) => {
		if (!state.response) state.response = {};
		if (!payload) state.response = {};
		for (const actionName in payload) {
			Vue.set(state.response, actionName, payload[actionName]);
		}
		mutations.setSession(state, payload);


	},

	setPage: (state, payload) => {
		if (payload.page) {
			for (const actionName in payload.page) {
				if (payload.page[actionName]) {
					const { TITLE, KEYWORDS, DESCRIPTION } = payload.page[actionName];
					[
						["title", TITLE],
						["keywords", KEYWORDS],
						["description", DESCRIPTION],
						["url", config.LIVE_HOST + self.location.pathname],
					].forEach(([key, value]) => {
						if (value) {
							headful({
								[key]: value,
							});
						}
					});
				}

				// внимание, такой подход не реактивится:
				//state.page[key] = payload.page[key];
				// поэтому явным образом вызываем Vue.set():
				Vue.set(state.page, actionName, payload.page[actionName]);
				Vue.set(state, "currentPage", payload.page[actionName]);
			}
		}
		if (payload.common) {
			for (const key in payload.common) {
				// внимание, такой подход не реактивится:
				//state.page[key] = payload.page[key];
				// поэтому явным образом вызываем Vue.set():
				Vue.set(state.common, key, payload.common[key]);
			}
		}

		/*if (payload.session) {
			if (payload.session.sessid) {
				Cookie.set(Config.STORAGE_BITRIX_SESSID, payload.session.sessid);
				sessionStorage.setItem(
					Config.STORAGE_BITRIX_SESSID,
					payload.session.sessid
				);
			}
		}*/
	},
	setSession: (state, payload) => {
		console.log("Session payload: ", payload);
		if (payload?.session) {
			if (!state.session) state.session = {};
			Vue.set(state.session, "user", payload.session.user);

			if (payload.session.auth) {
				Vue.set(state.session, "auth", payload.session.auth);
				localStorage.setItem(config.STORAGE_AUTH_TOKEN, state.session.auth);
				console.log("Auth set: " + state.session.auth);
			} else {
				localStorage.removeItem(config.STORAGE_AUTH_TOKEN);
				console.log("Auth unset");
				// TODO: решить, нужен ли здесьредирект на auth
			}
		}
		// важно! если сессия не пришла совсем - ничего не переустанавливаем в storage и state
		// else {
		// 	localStorage.removeItem(config.STORAGE_AUTH_TOKEN);
		// 	console.log("Auth unset");
		// }


	},
	updateWindowWidth: (state) => {
		state.windowWidth = window.innerWidth;
	},
	updateWindowHeight: (state) => {
		state.windowHeight = window.innerHeight;
	}
};

export default mutations;
