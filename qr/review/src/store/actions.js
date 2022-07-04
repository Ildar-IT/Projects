import Config from '@/config';
import {api} from './api';

const actions = {
	/**
	 * Базовый метод, по идее, не должен вызываться вручную.
	 * Используйте post() для отправки форм или кастомных некэшируемых запросов.
	 * Все остальные данные должны грузиться через fetchPage() в цикле загрузки страницы.
	 * @param store
	 * @param params
	 * @returns {Q.Promise<any> | * | Q.Promise<T | never> | PromiseLike<T | never> | Promise<T | never>}
	 */
	request({commit, state}, params) {
		return api(params.action ? params.action : Config.API_DEFAULT_ACTION, params)
			.then(response => {
				commit('setResponse', response);
				return response;
			})/*
			.catch(e => {
				//console.warn("Api error: ", e);
				return null;
			})*/;
	},

	/**
	 * Для свободного обращения к API.
	 * @param store
	 * @param params
	 * @returns {Q.Promise<any> | * | Q.Promise<T | never> | PromiseLike<T | never> | Promise<T | never>}
	 */
	post(store, params) {
		params = params || {};
		params.method = "POST";
		return actions.request(store, params);
	},

	/**
	 * Загружает страницу в роутинге.
	 * @param store
	 * @param params
	 * @returns {Q.Promise<any> | * | Q.Promise<T | never> | PromiseLike<T | never> | Promise<T | never>}
	 */
	fetchPage(store, params) {
		params = params || {};
		params.method = params.method ? params.method : "GET";
		return actions.request(store, params).then((result) => {
			store.commit('setPage', result);
			return result;
		});
	},
};

export default actions;
