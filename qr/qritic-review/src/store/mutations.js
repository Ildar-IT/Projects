import Vue from 'vue';
import config from "../config";
import headful from "headful";
import router from '../router/index';

const mutations = {
	setResponse: (state, payload) => {
		if (!state.response) state.response = {};
		if (!payload) state.response = {};
		for (const actionName in payload) {
			Vue.set(state.response, actionName, payload[actionName]);
		}
	},

	setPage: (state, payload) => {
		if (payload.page) {
			console.log("2nd time here");

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
		if (payload.user) {
			if (payload.user.sessid) {
				Cookie.set(Config.STORAGE_BITRIX_SESSID, payload.user.sessid);
				sessionStorage.setItem(
					Config.STORAGE_BITRIX_SESSID,
					payload.user.sessid
				);
			}
		}

		// let currentPage = '';
		//   // в state есть routeTo - открываемая страница
		//   if (state.routeTo.meta.api)
		// 	  currentPage = state.routeTo.meta.api;
		//   else {
		// 	  currentPage = state.routeTo.name;
		// 	  currentPage = currentPage.charAt(0).toUpperCase() + currentPage.slice(1);
		//   }
		//
		//   if ( state.page[currentPage] ) {
		// 	  headful({
		// 		  title: state.page[currentPage].title || '',
		// 		  keywords: state.page[currentPage].keywords || '',
		// 		  description: state.page[currentPage].description || ''
		// 	  });
		//   }
	},
	setSession: (state, payload) => {
		if (payload?.session) {
			if (!state.session) state.session = {};
			state.session.user = payload.session.user;
			if (payload.session.auth) {
				state.session.auth = payload.session.auth;
				localStorage.setItem(config.STORAGE_AUTH_TOKEN, state.session.auth);
				//console.log("Auth set: " + state.session.auth);
			} else {
				localStorage.removeItem(config.STORAGE_AUTH_TOKEN);
				console.log("Auth unset");
				// TODO: решить, нужен ли здесьредирект на auth
			}
		} else {
			localStorage.removeItem(config.STORAGE_AUTH_TOKEN);
			console.log("Auth unset");
		}
	},
	updateWindowWidth: (state) => {
		state.windowWidth = window.innerWidth;

	}
};

export default mutations;
