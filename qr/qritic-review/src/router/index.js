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
    //base: process.env.BASE_URL,
    linkExactActiveClass: 'link-active',
    routes
});

router.beforeEach((to, from, next) => {

    const loaded = {user: true, page: false};

    const setLoaded = (mode) => {
        loaded[mode] = true;
        if (loaded.user && loaded.page) next();
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
        store.dispatch('fetchPage', params)
            .then((response) => {
                if ( response.redirect ) {
                    self.location.href = response.redirect;
                }
                else setLoaded("page");
            })
            .catch((err) => {
                console.error("Could not fetch API data: ", err);

                if(err.code === Config.API_EXCEPTION_NOT_FOUND) {
                    router.replace({name: 'page404'});
                }
                else if (err.code === Config.API_EXCEPTION_SUSPENDED) {
                    router.replace({name: 'suspended'});
                }
                else if (err.code === Config.API_EXCEPTION_RESTART) {
                    router.replace({name: 'home'});
                }
                else{
                    router.replace({name: 'page500'});
                }

                //next();
            });
    } else setLoaded("page");
});

router.afterEach((to, from) => {

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
        //todo раскомментить and check timout value
        // if(typeof dataLayer) dataLayer.push({'event': 'render-event'});
    }, 500);

    // сообщаем пререндереру, что страница загрузилась:
    setTimeout(() => {
        document.dispatchEvent(new Event('render-event'));
    }, 1000);
});
export default router;
