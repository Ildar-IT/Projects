import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from '@/router/routes';
import store from '../store/index';
import {mergeObjects} from "@/utils/utils";
import metrika from "@/utils/metrika";
import Config from "@/config"

Vue.use(VueRouter);

const router = new VueRouter({
	mode: 'history',
	scrollBehavior(to, from, savedPosition) {
		if (to.hash) {
			return {
				selector: to.hash,
				offset: {x: 0, y: 100}
			}
		}
	},
	//base: process.env.BASE_URL,
	linkExactActiveClass: 'link-active',
	routes
});

router.beforeEach((to, from, next) => {

	store.state.isRouting = true;
	store.state.previousRoute = from;

	const loaded = {user: true, page: false};
	const setLoaded = (mode) => {
		loaded[mode] = true;
		if (loaded.user && loaded.page) next();
	};

	// на всякий случай редирект на memory-places для мобильного аппа
	// todo придумать более изящное решение
	if (store.state.common.isMobileApp && to.meta?.hideInApp) {
		//console.log("TO ", to.name, store.state.common.isMobileApp);
		router.replace({name: 'memory-places'}).catch((err) => {
			console.error("Err", err);
		});
		return;
	}

	// 1. загружаем данные юзаера (некэшируемые), они не зависят от роута:
	/*if (!to.meta || !to.meta['noAuth']) {
		store.dispatch('fetchUser').then(() => {
			setLoaded("user");
		}).catch(() => {
			// здесь не вызываем next() - его вызовем ниже после получения fetchPage
			console.warn("User data is empty...");
			/!*router.push(<RawLocation>{
				name: "auth", params: {
					redirect: to.name
				}
			});*!/
		});
	}
	else setLoaded("user");*/

	// 2. загружаем данные текущего роута (кэшируемые), в т.ч. common данные:
	if (to.meta?.api) {

		// todo зачем была задержка загрузки?
		//setTimeout(() => {
			let params = mergeObjects({}, {action: to.meta.api, method: to.meta.method, params: to.params}, to.meta);
			store.dispatch('fetchPage', params)
				.then(() => {

					// // установить анимацию перехода на появление
					// const îsMobileApp = store.state.common?.îsMobileApp;
					// console.log("îsMobileApp ", îsMobileApp);
					//
					// if (îsMobileApp) {
					// 	// если возвращаемся из child, то возвращаемся с анимацией перехода routingAppIn
					// 	store.state.transitionName = to?.meta?.isChild ? 'routingAppChildIn' : 'routingAppIn';
					// 	console.log("from?.meta?.isChild", to?.meta?.isChild);
					// } else {
					// 	store.state.transitionName = 'route';
					// }
					// console.log("store.state.transitionName ", store.state.transitionName);
					setTimeout(() => {
						setLoaded("page");
					}, 10)
				})
				.catch((err) => {
					///console.log("API error: ", err)
					if (err.code === Config.API_EXCEPTION_NOT_FOUND) {
						router.replace({name: 'error404'});
					} else if (err.code == Config.ERROR_CODE_FORBIDDEN || err.code == Config.API_EXCEPTION_FORBIDDEN) {
						router.replace({name: 'login'});
					} else if (err.code === Config.API_EXCEPTION_SUSPENDED) {
						router.replace({name: 'report-accepted'});
					} else {
						router.replace({name: 'error500'});
					}
					//next();
				});
		//}, 300)
	} else {
		console.log("if (to.meta && to.meta.api) never happened")
		setLoaded("page");
	}
	// store.dispatch('route', to);
	// let params = Object.assign({}, {name: to.meta.api, params: to.params}, to.meta);// this works only with target:es6, but we need IE11
	// lastActionName = to.meta.api;
	// store.state.isTabletMenuOpen = false;
});


router.afterEach((to, from) => {
	// небольшая задержка, чтобы в браузере сменился URL
	// setTimeout(() => {

	// установить анимацию перехода на исчезание
	const isMobileApp = store.state.common?.isMobileApp;
	console.log("isMobileApp ", isMobileApp);

	if (isMobileApp) {
		// если возвращаемся из child, то возвращаемся с анимацией перехода routingAppBack
		store.state.transitionName = to?.meta?.isChild ? 'routingAppChild' : 'routingApp';
		console.log("from?.meta?.isChild", to?.meta?.isChild);
	} else {
		store.state.transitionName = 'route';
	}

	// сообщаем Метрике явно, на какой URL пришли:
	metrika.hit();

	setTimeout(()=>{
		// scroll to top
		window.scrollTo({
			'behavior': 'auto', //'smooth',
			'left': 0,
			'top': 0
		});
	},300);	// эта пауза должна быть равна route transition delay (см. vue-transitions)

	// сообщаем в ГТМ, что страница доступна
	//todo раскомментить and check timout value
	// if(typeof dataLayer) dataLayer.push({'event': 'render-event'});
	// }, 500);


	// сообщаем пререндереру, что страница загрузилась:
	setTimeout(() => {

		document.dispatchEvent(new Event('render-event'));
	}, 1000);

	store.state.isRouting = false;
});


export default router;
