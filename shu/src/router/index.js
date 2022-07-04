import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from '@/router/routes';
import store from '@/store';
import {mergeObjects} from "@/utils/utils";

Vue.use(VueRouter);

const router = new VueRouter({
    /*scrollBehavior(to, from, savedPosition) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({
                    //selector: to.hash ? to.hash : null,
                    //offset: {x: 0, y: 100
                    left: 0, top: 0
                });
            }, 700);
        });
    },*/
    /*scrollBehavior(to, from, savedPosition) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({ left: 0, top: 0 })
            }, 500)
        })
    },*/
    mode: 'history',
    //base: process.env.BASE_URL,
    routes

});

const scrollToTop = (to, from, offset=0) => {
    let top = 0;
    //console.log('scrolling to:', to);
    let hash = to.hash||to.meta?.hash;

    if(hash) {
        hash = hash.match(/^\#.+/) ? hash.substring(1) : hash;
        const el = document.getElementById(hash);
        //console.log('Rect:', el.getBoundingClientRect());
        if ( el ) top = el.getBoundingClientRect().top + window.scrollY + offset;
        else console.log("El not found: "+hash);
    }
    window.scrollTo({
        'behavior': 'smooth', //'smooth',
        'left': 0,
        top
    });
};

router.beforeEach((to, from, next) => {

    // загружаем данные текущего роута (кэшируемые), в т.ч. common данные:
    if (to.meta?.api) {

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
    setTimeout(() => {

        if (to !== undefined && from !== undefined && to.name !== from.name) scrollToTop(to, from);

        // Всегда закрываем бургер меню
        store.state.isBurgerMenuShown = false;
    }, 500);
});

export default router;
