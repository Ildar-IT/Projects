import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import './styles/index.scss';
import './plugins/svgicon';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './plugins/vue-awsome-swiper';

Vue.config.productionTip = false;

new Vue({
    created() {
        AOS.init({
            //startEvent: 'OnMapLoad',
            disable: false,
            useClassNames: false,
            duration: 800,
            offset: 0,
            once: true,
            mirror: false,
        });
    },
    router,
    vuetify,
    store,
    render: h => h(App)
}).$mount('#app');
