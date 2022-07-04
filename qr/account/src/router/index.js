import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from '@/router/routes';
import store from '../store/index';
import {mergeObjects} from "@/utils/utils";
import metrika from "@/utils/metrika";
import Config from "@/config";

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    //base: process.env.BASE_URL,
    linkExactActiveClass: 'link-active',
    routes
});

router.beforeEach((to, from, next) => {
    // if(to.path == "/logURL") {
    //     console.log(to.query.hash)
    //     store.dispatch('request', {
    //       action: 'AuthEmailURLController',
    //       params: {hash: to.query.hash}
    //   }).then((res) => {
    //     router.replace({name: 'dashboard'});
    //   }).catch(() => {
    //     router.replace({name: 'login'});
    //   })      
    // }
    const loaded = {user: true, page: false};
    store.state.isTypeClicked = false;
    store.state.isMobileConfiguratorOpened = false;
    const setLoaded = (mode) => {
        loaded[mode] = true;
        if (loaded.user && loaded.page) next(); //переход на отдельную страницу, перед ней можно все хардкодить, либо в ее if
    };

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
    if (to.meta && to.meta.api) {
        //to сохраняем в state потому что используется в мутациях
        //store.dispatch('route', to);
        // let params = Object.assign({}, {name: to.meta.api, params: to.params}, to.meta);// this works only with target:es6, but we need IE11

        // lastActionName = to.meta.api;
        let params = mergeObjects({}, {action: to.meta.api, method: to.meta.method, params: to.params}, to.meta);
        if (to.meta.query) {
            // forward GET arguments to API request
            params.query = {};
            Object.keys(to.meta.query).map(key => {
                console.log("KEY " + key + " maps from " + to.meta.query[key]);
                params.query[key] = to.query[to.meta.query[key]];
            });
        }
        store.dispatch('fetchPage', params)
            .then(() => {
                setLoaded("page");
            })
            .catch((err) => {
                if (err.code === Config.API_EXCEPTION_NOT_FOUND) {
                    router.replace({name: 'error404'});
                } else if (err.code === Config.API_EXCEPTION_FORBIDDEN) {
                    router.replace({name: 'login'});
                } else if (err === "Could not find user by empty id") { // надо с бека тоже присылась  err.code === Config.API_EXCEPTION_FORBIDDEN
                    router.replace({name: 'login'});
                } else {
                    router.replace({name: 'error500'});
                }
                //next();
            });
    } else setLoaded("page");
});


router.afterEach((to, from) => {

    // всегда закрыть меню, если открыто
    store.state.isMenuOpen = false;

    // небольшая задержка, чтобы в браузере сменился URL
    setTimeout(() => {
        // сообщаем Метрике явно, на какой URL пришли:
        metrika.hit();

        // scroll to top
        window.scrollTo({
            'behavior': 'auto', //'smooth',
            'left': 0,
            'top': 0
        });

        // сообщаем в ГТМ, что страница доступна
        // if(typeof dataLayer) dataLayer.push({'event': 'render-event'});
    }, 500);

    // сообщаем пререндереру, что страница загрузилась:
    setTimeout(() => {
        document.dispatchEvent(new Event('render-event'));
    }, 1000);
});
export default router;
