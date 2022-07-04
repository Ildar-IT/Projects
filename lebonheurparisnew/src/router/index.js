import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store';
import routes from '@/router/routes';
import {mergeObjects} from "@/utils/utils";

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

const scrollTo = (hash=null, offset=0, behavior='smooth') => {
    let top = 0;

    if ( hash ) {
        hash = hash.match(/^\#.+/) ? hash.substring(1) : hash;
        const el = document.getElementById(hash);
        //console.log('Rect:', el.getBoundingClientRect());
        if (el) top = el.getBoundingClientRect().top + window.scrollY + offset;
        else {
            console.warn("Scroll to element not found: " + hash);
            return;
        }
    }

    window.scrollTo({
        behavior,
        left: 0,
        top
    });
};

router.beforeEach((to, from, next) => {
    // если мы навигируем только по hash-ам на том же роуте - просто скроллим
    if (from.meta?.api === to.meta?.api && to.meta?.hash) {
        scrollTo(to.meta?.hash);
        //next();
        //router.replace(to);
        store.state.isBurgerMenuShown = false;
        return;
    }

    // загружаем данные текущего роута (кэшируемые), в т.ч. common данные:
    if (to.meta?.api) {
        store.state.isLoading = true;

        let params = mergeObjects({}, {action: to.meta.api, method: to.meta.method, params: to.params}, to.meta);
        store.dispatch('fetchPage', params)
            .then(() => {
                next();
            })
            .catch((err) => {
                console.error("API error: ", err);
                /*if (err.code === Config.API_EXCEPTION_NOT_FOUND) {
                  router.replace({name: 'error404'});
                } else if (err.code == Config.ERROR_CODE_FORBIDDEN || err.code == Config.API_EXCEPTION_FORBIDDEN) {
                  router.replace({name: 'login'});
                } else if (err.code === Config.API_EXCEPTION_SUSPENDED) {
                  router.replace({name: 'report-accepted'});
                } else {
                  router.replace({name: 'error500'});
                }*/
                //next();
            });
    } else {
        next();
    }
});

router.afterEach((to, from) => {
    store.state.isLoading = false;
    store.state.isHeaderInversed = to.meta?.isHeaderInversed;// && !to.meta?.hash;

    setTimeout(() => {
        if (from?.path && to?.path !== from.path ) {
            scrollTo(null, 0, 'instant');
            if ( to.meta?.hash) {
                // yet more pause to allow dom-model to appear
                setTimeout(()=>scrollTo(to.meta?.hash, 0, 'smooth'),500);
            }
        }

        store.state.isBurgerMenuShown = false;

    }, 310);
});

export default router
