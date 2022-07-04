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
        });
    },

    /**
     * Для удобства вынесено в экшены, так как используется в нескольких местах.
     * @param store
     * @param tariff
     */
    applyForTariff(store, payload) { // payload Tariff + 
        console.log("payload", payload)
        return actions.post(store, {
            action: 'TariffController',
            params: {'tariffId': payload.tariff.ID, period: payload.period} // + добавить параметры 
        })
            .then((response) => {
                store.state.alert = {
                    text: "Готово! Вы перешли на тариф " + tariff.NAME + "!",
                    type: 'success'
                };
            }).catch((error) => {
                // store.state.alert = {
                //     text: "Что-то пошло не так: " + error.message,
                //     type: 'success'
                // };
            }).finally(() => {
            });
    },

    // TODO: переименовать, чтобы отражало дейсвтие
    logoImageForOrderForm(store, params = {}) {
        return store.commit('logoImageForOrderForm', params);
    },

    /*

    openMap({commit}, params) {
        commit('openMap');
    },

    // запросы, которые не должны кэшироваться, используется POST:

    fetchUser({commit}, params) {
        let options = {
            data: params,
            method: 'POST'
        };
        return API.fetchAction('UserSession', options)
            .then((response) => {
                commit('setUser', response);
            });
    },
    auth({commit}, params) {
        let options = {
            data: params,
            method: 'POST'
        };
        return API.fetchAction('Auth', options)
            .then((response) => {
                commit('setUser', response);
            });
    },
    out({commit}, params) {
        let options = {
            data: params,
            method: 'POST'
        };
        return API.fetchAction('Out', options)
            .then((response) => {
                commit('setUser', response);
            });
    },
    postForm({commit}, params) {
        let options = {
            data: params,
            method: 'POST'
        };
        /!*console.log('dispatch post form');*!/
        return API.fetchAction('Contacts', options);
    },
    route({commit}, params) {
        commit('setRoute', params);
    },*/
};

export default actions;
