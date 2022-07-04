import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from '@/router/routes';
import state from '@/store/state'
import store from '@/store'
import {mergeObjects} from "@/utils/utils";

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    history: true,
    scrollBehavior(to, from, savedPosition) {
        if (to.hash) {
            return {
                selector: to.hash,
                offset: {x: 0, y: 100}
            }
        }
    },
    base: process.env.BASE_URL,
    routes,
    state
})

const scrollToTop = () => {
    window.scrollTo({
        'behavior': undefined, //'smooth',
        'left': 0,
        'top': 0
    });
};


router.afterEach((to, from) => {
    setTimeout(() => {
        /** Todo fix unexpected token "?" */
        //if (to?.name !== from?.name) scrollToTop();
        if (to !== undefined && from !== undefined && to.path !== from.path) scrollToTop();

        // Всегда закрываем бургер меню
        state.isBurgerMenuShown = false;
    }, 300);
});

router.beforeEach((to, from, next) => {

    // загружаем данные текущего роута (кэшируемые), в т.ч. common данные:
    if (to.meta !== undefined && to.meta.api) {

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


export default router;
